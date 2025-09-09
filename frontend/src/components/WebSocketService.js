// frontend/src/components/WebSocketService.js
import { io } from 'socket.io-client';
import WebSocketConnectionPool from './WebSocketConnectionPool';

class WebSocketService {
  constructor() {
    this.connectionPool = WebSocketConnectionPool;
    this.currentConnection = null;
    this.onConnectCallback = null;
    this.onDisconnectCallback = null;
    this.onMessageCallback = null;
    this.onErrorCallback = null;
    this.isConnected = false;
    this.setupConnectionPoolHandlers();
  }

  setupConnectionPoolHandlers() {
    this.connectionPool.setEventHandlers({
      onConnectionSuccess: (connectionId, socket) => {
        this.currentConnection = socket;
        this.isConnected = true;
        if (this.onConnectCallback) {
          this.onConnectCallback();
        }
      },
      onConnectionLost: (connectionId, socket, reason) => {
        this.isConnected = false;
        if (this.onDisconnectCallback) {
          this.onDisconnectCallback(reason);
        }
      },
      onConnectionError: (connectionId, socket, error) => {
        this.isConnected = false;
        if (this.onErrorCallback) {
          this.onErrorCallback(error);
        }
      },
      onReconnectionSuccess: (connectionId, socket, attemptNumber) => {
        this.currentConnection = socket;
        this.isConnected = true;
        if (this.onConnectCallback) {
          this.onConnectCallback();
        }
      },
      onReconnectionError: (connectionId, socket, error) => {
        this.isConnected = false;
        if (this.onErrorCallback) {
          this.onErrorCallback(error);
        }
      },
      onConnectionConfirmed: (connectionId, socket, data) => {
        this.currentConnection = socket;
        this.isConnected = true;
        if (this.onConnectCallback) {
          this.onConnectCallback();
        }
      },
      onMessage: (connectionId, socket, eventName, args) => {
        if (this.onMessageCallback) {
          const message = args[0] || {};
          this.onMessageCallback(message);
        }
      }
    });
  }

  connect(url) {
    console.log('🔌 使用连接池连接到:', url);
    
    // 检查是否已有活跃连接
    const activeConnection = this.connectionPool.getActiveConnection();
    if (activeConnection && activeConnection.connected) {
      console.log('✅ 使用现有活跃连接');
      this.currentConnection = activeConnection;
      this.isConnected = true;
      if (this.onConnectCallback) {
        this.onConnectCallback();
      }
      return;
    }
    
    // 创建新连接
    const { connectionId, socket } = this.connectionPool.createConnection(url);
    this.currentConnection = socket;
    
    console.log(`🔌 创建新连接: ${connectionId}`);
  }

  send(event, data) {
    if (!this.isConnected || !this.currentConnection) {
      console.error('❌ WebSocket未连接');
      return;
    }

    console.log('📤 发送消息:', { event, data });
    
    try {
      this.currentConnection.emit(event, data);
    } catch (error) {
      console.error('❌ 发送消息失败:', error);
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
    }
  }

  on(event, callback) {
    switch (event) {
      case 'connect':
        this.onConnectCallback = callback;
        break;
      case 'disconnect':
        this.onDisconnectCallback = callback;
        break;
      case 'message':
        this.onMessageCallback = callback;
        break;
      case 'error':
        this.onErrorCallback = callback;
        break;
      default:
        console.error(`Unknown event: ${event}`);
    }
  }

  disconnect() {
    this.isConnected = false;
    this.currentConnection = null;
    // 注意：这里不关闭连接池中的所有连接，只重置当前连接引用
    if (this.onDisconnectCallback) {
      this.onDisconnectCallback();
    }
  }

  reconnect() {
    console.log('🔄 手动重连WebSocket...');
    this.connectionPool.reconnectAll();
  }

  getConnectionStats() {
    return this.connectionPool.getConnectionStats();
  }

  closeAllConnections() {
    console.log('🔌 关闭所有连接');
    this.connectionPool.closeAllConnections();
    this.isConnected = false;
    this.currentConnection = null;
  }
}

const instance = new WebSocketService();
export default instance;