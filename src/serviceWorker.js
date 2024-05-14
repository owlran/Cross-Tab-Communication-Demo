function registerServiceWorker(displayMessage) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js').then((registration) => {
      console.log('Service Worker registered');

      if (navigator.serviceWorker.controller) {
        console.log('Service Worker is controlling the page');
      } else {
        console.log('Service Worker is not controlling the page');
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('Service Worker now controlling the page');
        });
      }
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      displayMessage(`Service Worker: ${event.data}`);
    });
  }
}

function sendServiceWorkerMessage(message) {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  } else {
    console.log('Service Worker not ready to receive messages');
  }
}

export { registerServiceWorker, sendServiceWorkerMessage };
