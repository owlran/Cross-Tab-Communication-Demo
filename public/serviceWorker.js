// serviceWorker.js

self.addEventListener('message', (event) => {
  const message = event.data;
  console.log('Received message via Service Worker:', message);
  // 在這裡處理接收到的消息
  clients.matchAll().then((clients) => {
    clients.forEach((client) => client.postMessage(message));
  });
});
