function sendMessage(message) {
  localStorage.setItem('crossTabMessage', JSON.stringify({ message, timestamp: Date.now() }));
}

function setupLocalStorageListener(displayMessage) {
  window.addEventListener('storage', (event) => {
    if (event.key === 'crossTabMessage') {
      const { message } = JSON.parse(event.newValue);
      displayMessage(`LocalStorage: ${message}`);
    }
  });
}

export { sendMessage, setupLocalStorageListener };
