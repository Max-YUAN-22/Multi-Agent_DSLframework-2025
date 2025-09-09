import React, { createContext, useContext, useReducer, useCallback, useRef, useEffect, useState } from 'react';
import WebSocketService from '../components/WebSocketService';

const EventContext = createContext();

const initialState = {
  events: [],
  traffic: {},
  weather: {},
  parking: {},
  safety: {},
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [action.payload, ...state.events] };
    case 'CLEAR_EVENTS':
      return { ...state, events: [] };
    case 'SET_TRAFFIC':
      return { ...state, traffic: action.payload };
    case 'SET_WEATHER':
      return { ...state, weather: action.payload };
    case 'SET_PARKING':
      return { ...state, parking: action.payload };
    case 'SET_SAFETY':
      return { ...state, safety: action.payload };
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  const idCounter = useRef(0);
  const [readyState, setReadyState] = useState(0); // 0 = connecting, 1 = open, 2 = closing, 3 = closed

  useEffect(() => {
    const onMessage = (parsedData) => {
      try {
        if (!parsedData) {
          console.error("Received empty WebSocket message data");
          return;
        }
        const newEvent = {
          ...parsedData,
          id: idCounter.current++,
          at: new Date().toLocaleTimeString(),
        };
        dispatch({ type: 'ADD_EVENT', payload: newEvent });
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
        console.error("Received data:", parsedData);
        const errorEvent = {
          id: idCounter.current++,
          at: new Date().toLocaleTimeString(),
          type: 'error',
          title: 'WebSocket Processing Error',
          payload: { details: `Failed to process message: ${JSON.stringify(parsedData)}` },
        };
        dispatch({ type: 'ADD_EVENT', payload: errorEvent });
      }
    };

    const onConnect = () => setReadyState(1);
    const onDisconnect = () => setReadyState(3);

    WebSocketService.on('message', onMessage);
    WebSocketService.on('connect', onConnect);
    WebSocketService.on('disconnect', onDisconnect);
  }, []);

  const clearEvents = useCallback(() => {
    dispatch({ type: 'CLEAR_EVENTS' });
  }, [dispatch]);

  const sendAgentAction = useCallback((agent, payload, workflow = null) => {
    let message;
    if (workflow) {
      message = {
        type: 'message',
        message_type: 'run_workflow',
        workflow_name: workflow,
        data: payload,
      };
    } else {
      message = {
        type: 'message',
        message_type: agent,
        data: payload,
      };
    }
    console.log('Sending WebSocket message via EventContext:', message);
    WebSocketService.send(message);
  }, []);

  return (
    <EventContext.Provider value={{ state, dispatch, readyState, clearEvents, sendAgentAction }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export default EventContext;