#!/usr/bin/env node

const WebSocket = require('ws');

console.log('🔍 测试WebSocket连接...');

// 测试后端WebSocket连接
const ws = new WebSocket('ws://localhost:8008/socket.io/?EIO=3&transport=websocket');

ws.on('open', function open() {
  console.log('✅ WebSocket连接成功！');
  
  // 发送测试消息
  const testMessage = {
    type: 'smart_city_simulation',
    data: {
      entry_point: 'autonomous_driving_task',
      start_location: 'A',
      end_location: 'B',
      passengers: 2
    }
  };
  
  console.log('📤 发送测试消息:', testMessage);
  ws.send(JSON.stringify(testMessage));
});

ws.on('message', function message(data) {
  console.log('📥 收到消息:', data.toString());
});

ws.on('error', function error(err) {
  console.log('❌ WebSocket错误:', err.message);
});

ws.on('close', function close() {
  console.log('🔌 WebSocket连接关闭');
});

// 5秒后关闭连接
setTimeout(() => {
  ws.close();
  console.log('🏁 测试完成');
}, 5000);
