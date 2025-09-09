// frontend/src/components/WebSocketConnectionPool.js
import { io } from 'socket.io-client';

class WebSocketConnectionPool {
  constructor() {
    this.connections = new Map();
    this.defaultConfig = {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true
    };
    this.maxConnections = 3; // 每个用户最多3个连接
    this.userId = this.generateUserId();
  }

  generateUserId() {
    // 生成唯一用户ID，可以基于浏览器指纹或其他方式
    if (typeof window === 'undefined') {
      // 服务器端渲染时返回默认ID
      return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    let userId = localStorage.getItem('websocket_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('websocket_user_id', userId);
    }
    return userId;
  }

  createConnection(url, options = {}) {
    const connectionId = `conn_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const config = { ...this.defaultConfig, ...options };
    
    // 添加用户ID到连接参数
    const connectionUrl = `${url}?user_id=${this.userId}&connection_id=${connectionId}`;
    
    console.log(`🔌 创建新连接: ${connectionId} for user: ${this.userId}`);
    
    const socket = io(connectionUrl, config);
    
    // 设置连接元数据
    socket.connectionId = connectionId;
    socket.userId = this.userId;
    socket.createdAt = new Date();
    socket.isActive = true;
    
    // 添加事件监听器
    this.setupConnectionListeners(socket, connectionId);
    
    // 存储连接
    this.connections.set(connectionId, socket);
    
    // 检查连接数限制
    this.enforceConnectionLimit();
    
    return { connectionId, socket };
  }

  setupConnectionListeners(socket, connectionId) {
    socket.on('connect', () => {
      console.log(`✅ 连接成功: ${connectionId}`);
      socket.isActive = true;
      this.onConnectionSuccess?.(connectionId, socket);
    });

    socket.on('disconnect', (reason) => {
      console.log(`❌ 连接断开: ${connectionId}, 原因: ${reason}`);
      socket.isActive = false;
      this.onConnectionLost?.(connectionId, socket, reason);
    });

    socket.on('connect_error', (error) => {
      console.error(`❌ 连接错误: ${connectionId}`, error);
      socket.isActive = false;
      this.onConnectionError?.(connectionId, socket, error);
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log(`🔄 重连成功: ${connectionId}, 尝试次数: ${attemptNumber}`);
      socket.isActive = true;
      this.onReconnectionSuccess?.(connectionId, socket, attemptNumber);
    });

    socket.on('reconnect_error', (error) => {
      console.error(`❌ 重连失败: ${connectionId}`, error);
      this.onReconnectionError?.(connectionId, socket, error);
    });

    socket.on('connection_successful', (data) => {
      console.log(`🎉 收到连接确认: ${connectionId}`, data);
      this.onConnectionConfirmed?.(connectionId, socket, data);
    });

    socket.on('server_stats', (stats) => {
      console.log(`📊 服务器统计: ${connectionId}`, stats);
      this.onServerStats?.(connectionId, socket, stats);
    });

    // 监听所有消息
    socket.onAny((eventName, ...args) => {
      console.log(`📨 收到消息 [${connectionId}]:`, eventName, args);
      this.onMessage?.(connectionId, socket, eventName, args);
    });
  }

  enforceConnectionLimit() {
    const activeConnections = Array.from(this.connections.values())
      .filter(conn => conn.isActive);
    
    if (activeConnections.length > this.maxConnections) {
      // 关闭最旧的连接
      const oldestConnection = activeConnections
        .sort((a, b) => a.createdAt - b.createdAt)[0];
      
      console.log(`⚠️ 超过连接限制，关闭最旧连接: ${oldestConnection.connectionId}`);
      this.closeConnection(oldestConnection.connectionId);
    }
  }

  getActiveConnection() {
    const activeConnections = Array.from(this.connections.values())
      .filter(conn => conn.isActive && conn.connected);
    
    if (activeConnections.length > 0) {
      // 返回最新的活跃连接
      return activeConnections.sort((a, b) => b.createdAt - a.createdAt)[0];
    }
    return null;
  }

  getAllActiveConnections() {
    return Array.from(this.connections.values())
      .filter(conn => conn.isActive && conn.connected);
  }

  closeConnection(connectionId) {
    const socket = this.connections.get(connectionId);
    if (socket) {
      console.log(`🔌 关闭连接: ${connectionId}`);
      socket.disconnect();
      this.connections.delete(connectionId);
    }
  }

  closeAllConnections() {
    console.log('🔌 关闭所有连接');
    this.connections.forEach((socket, connectionId) => {
      socket.disconnect();
    });
    this.connections.clear();
  }

  reconnectAll() {
    console.log('🔄 重连所有连接');
    this.connections.forEach((socket, connectionId) => {
      if (!socket.connected) {
        socket.connect();
      }
    });
  }

  getConnectionStats() {
    const activeConnections = Array.from(this.connections.values())
      .filter(conn => conn.isActive && conn.connected);
    
    return {
      totalConnections: this.connections.size,
      activeConnections: activeConnections.length,
      userId: this.userId,
      connections: activeConnections.map(conn => ({
        connectionId: conn.connectionId,
        connected: conn.connected,
        createdAt: conn.createdAt
      }))
    };
  }

  // 事件回调设置方法
  setEventHandlers(handlers) {
    this.onConnectionSuccess = handlers.onConnectionSuccess;
    this.onConnectionLost = handlers.onConnectionLost;
    this.onConnectionError = handlers.onConnectionError;
    this.onReconnectionSuccess = handlers.onReconnectionSuccess;
    this.onReconnectionError = handlers.onReconnectionError;
    this.onConnectionConfirmed = handlers.onConnectionConfirmed;
    this.onServerStats = handlers.onServerStats;
    this.onMessage = handlers.onMessage;
  }
}

// 全局连接池实例
const connectionPool = new WebSocketConnectionPool();
export default connectionPool;
