// broadcastChannel.js

const channel = new BroadcastChannel('crossTabChannel');

function sendMessage(message) {
  channel.postMessage(message);
}

channel.onmessage = (event) => {
  console.log('Received message via BroadcastChannel:', event.data);
  // 在這裡處理接收到的消息
};

export { sendMessage };
