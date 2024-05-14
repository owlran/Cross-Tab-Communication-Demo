// public/serviceWorker.js

self.addEventListener('message', (event) => {
  const message = event.data;
  console.log('Received message via Service Worker:', message);
  // 處理接收到的消息
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => client.postMessage(`Echo: ${message}`));
  });
});
