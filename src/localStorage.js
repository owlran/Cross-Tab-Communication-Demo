// localStorage.js

function sendMessage(message) {
  localStorage.setItem('crossTabMessage', JSON.stringify({ message, timestamp: Date.now() }));
}

window.addEventListener('storage', (event) => {
  if (event.key === 'crossTabMessage') {
    const { message } = JSON.parse(event.newValue);
    console.log('Received message via localStorage:', message);
    // 在這裡處理接收到的消息
  }
});

export { sendMessage };
