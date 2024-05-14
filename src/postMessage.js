let newTab = null;

function openNewTab() {
  newTab = window.open(window.location.href, '_blank');
}

function sendPostMessage(message, displayMessage) {
  if (newTab) {
    newTab.postMessage({ source: 'app', message }, '*');
    displayMessage('send message to new tab');
  } else {
    displayMessage('No new tab opened to send the message.');
  }
}

function setupPostMessageListener(displayMessage) {
  window.addEventListener('message', (event) => {
    if (event.data && event.data.source === 'app') {
      displayMessage(`Window.postMessage: ${event.data.message}`);
    }
  });
}

export { openNewTab, sendPostMessage, setupPostMessageListener };
