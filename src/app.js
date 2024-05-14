import './style.css';
import { sendMessage as sendLocalStorageMessage } from './localStorage';
import { sendMessage as sendBroadcastChannelMessage } from './broadcastChannel';

const messageList = document.getElementById('messageList');

function displayMessage(message) {
  const listItem = document.createElement('li');
  listItem.textContent = message;
  messageList.appendChild(listItem);
}

document.getElementById('sendLocalStorage').addEventListener('click', () => {
  const message = document.getElementById('message').value;
  sendLocalStorageMessage(message);
});

document.getElementById('sendBroadcastChannel').addEventListener('click', () => {
  const message = document.getElementById('message').value;
  sendBroadcastChannelMessage(message);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js').then((registration) => {
    console.log('Service Worker registered');

    // 確保 Service Worker 已經控制頁面
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

  function sendServiceWorkerMessage(message) {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message);
    } else {
      console.log('Service Worker not ready to receive messages');
    }
  }

  document.getElementById('sendServiceWorker').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    sendServiceWorkerMessage(message);
  });
}

// Listen for localStorage messages
window.addEventListener('storage', (event) => {
  if (event.key === 'crossTabMessage') {
    const { message } = JSON.parse(event.newValue);
    displayMessage(`LocalStorage: ${message}`);
  }
});

// Listen for BroadcastChannel messages
const channel = new BroadcastChannel('crossTabChannel');
channel.onmessage = (event) => {
  displayMessage(`BroadcastChannel: ${event.data}`);
};

// Web Locks API demo
document.getElementById('useWebLock').addEventListener('click', () => {
  navigator.locks.request('my_resource', { mode: 'exclusive', ifAvailable: true }, async (lock) => {
    if (!lock) {
      displayMessage('Web Lock not available');
      return;
    }
    displayMessage('Web Lock acquired');
    // Simulate a task that takes some time
    await new Promise(resolve => setTimeout(resolve, 3000));
    displayMessage('Web Lock released');
  });
});

// Clear message list
document.getElementById('clearMessages').addEventListener('click', () => {
  messageList.innerHTML = '';
});
