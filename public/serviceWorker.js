self.addEventListener("message", (event) => {
  const message = event.data;
  console.log("Received message via Service Worker:", message);
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => client.postMessage(`Echo: ${message}`));
  });
});
