// frontend/src/components/SimpleWebSocketService.js
import { io } from 'socket.io-client';

class SimpleWebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.onConnectCallback = null;
    this.onDisconnectCallback = null;
    this.onMessageCallback = null;
    this.onErrorCallback = null;
    this.userId = this.generateUserId();
    this.lastError = null;
    this.connectionStats = {
      totalConnections: 0,
      successfulConnections: 0,
      failedConnections: 0,
      lastConnectionTime: null,
      lastError: null
    };
  }

  generateUserId() {
    if (typeof window === 'undefined') {
      return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    let userId = localStorage.getItem('websocket_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('websocket_user_id', userId);
    }
    return userId;
  }

  connect(url) {
    console.log('🔌 连接到:', url);
    
    // 先断开现有连接
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    
    try {
      // 确保URL格式正确
      const baseUrl = url.replace(/\/$/, ''); // 移除末尾斜杠
      const connectionUrl = `${baseUrl}?user_id=${this.userId}`;
      
      // 使用Socket.IO连接，增加更多配置选项
      this.socket = io(connectionUrl, {
        transports: ['websocket', 'polling'],
        timeout: 30000,
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 10000,
        maxReconnectionAttempts: 10,
        autoConnect: true,
        upgrade: true,
        rememberUpgrade: true
      });

      this.socket.on('connect', () => {
        console.log('✅ WebSocket连接成功');
        this.isConnected = true;
        this.lastError = null;
        this.connectionStats.successfulConnections++;
        this.connectionStats.lastConnectionTime = new Date().toISOString();
        if (this.onConnectCallback) {
          this.onConnectCallback();
        }
      });

      this.socket.on('disconnect', (reason) => {
        console.log('❌ WebSocket断开连接:', reason);
        this.isConnected = false;
        if (this.onDisconnectCallback) {
          this.onDisconnectCallback(reason);
        }
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ WebSocket连接错误:', error);
        this.isConnected = false;
        this.lastError = error;
        this.connectionStats.failedConnections++;
        this.connectionStats.lastError = error.message || error.toString();
        if (this.onErrorCallback) {
          this.onErrorCallback(error);
        }
      });

      this.socket.on('reconnect', (attemptNumber) => {
        console.log('🔄 WebSocket重连成功，尝试次数:', attemptNumber);
        this.isConnected = true;
        if (this.onConnectCallback) {
          this.onConnectCallback();
        }
      });

      this.socket.on('reconnect_error', (error) => {
        console.error('❌ WebSocket重连失败:', error);
        this.isConnected = false;
      });

      // 监听连接成功事件
      this.socket.on('connection_successful', (data) => {
        console.log('🎉 收到连接成功确认:', data);
        this.isConnected = true;
        if (this.onConnectCallback) {
          this.onConnectCallback();
        }
      });

      // 监听服务器统计
      this.socket.on('server_stats', (stats) => {
        console.log('📊 服务器统计:', stats);
      });

      // 监听所有消息
      this.socket.onAny((eventName, ...args) => {
        console.log('📨 收到消息:', eventName, args);
        if (this.onMessageCallback) {
          const message = args[0] || {};
          this.onMessageCallback(message);
        }
      });

      // 特别监听广播消息
      this.socket.on('broadcast', (data) => {
        console.log('📡 收到广播消息:', data);
        if (this.onMessageCallback) {
          this.onMessageCallback(data);
        }
      });

    } catch (error) {
      console.error('❌ WebSocket初始化失败:', error);
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
    }
  }

  send(event, data) {
    if (!this.isConnected || !this.socket) {
      console.error('❌ WebSocket未连接');
      return;
    }

    console.log('📤 发送消息:', { event, data });
    
    try {
      this.socket.emit(event, data);
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
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    if (this.onDisconnectCallback) {
      this.onDisconnectCallback();
    }
  }

  reconnect() {
    console.log('🔄 手动重连WebSocket...');
    if (this.socket) {
      this.socket.disconnect();
    }
    // 重新连接
    setTimeout(() => {
      this.connect('http://localhost:8008');
    }, 1000);
  }

  getConnectionStats() {
    return {
      ...this.connectionStats,
      connected: this.isConnected,
      userId: this.userId,
      socketId: this.socket?.id || null,
      lastError: this.lastError
    };
  }

  getConnectionStatus() {
    if (!this.socket) {
      return { status: 'disconnected', message: '未初始化连接' };
    }
    
    if (this.isConnected) {
      return { status: 'connected', message: '连接正常' };
    }
    
    if (this.lastError) {
      return { 
        status: 'error', 
        message: `连接错误: ${this.lastError.message || this.lastError}` 
      };
    }
    
    return { status: 'connecting', message: '正在连接...' };
  }

  // 添加手动重连方法
  reconnect() {
    if (this.socket) {
      console.log('🔄 手动重连WebSocket');
      this.socket.disconnect();
      this.socket.connect();
    }
  }
}

const instance = new SimpleWebSocketService();
export default instance;
