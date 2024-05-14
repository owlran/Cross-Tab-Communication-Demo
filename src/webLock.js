import { channel } from './broadcastChannel';

function setupWebLock(displayMessage) {
  document.getElementById('useWebLock').addEventListener('click', () => {
    navigator.locks.request('my_resource', { mode: 'exclusive', ifAvailable: true }, async (lock) => {
      if (!lock) {
        displayMessage('Web Lock not available');
        channel.postMessage({ source: 'app', message: 'Web Lock not available' });
        return;
      }
      displayMessage('Web Lock acquired');
      channel.postMessage({ source: 'app', message: 'Web Lock acquired' });
      // Simulate a task that takes some time
      await new Promise(resolve => setTimeout(resolve, 3000));
      displayMessage('Web Lock released');
      channel.postMessage({ source: 'app', message: 'Web Lock released' });
    });
  });
}

function setupWebLockListener(displayMessage) {
  channel.onmessage = (event) => {
    if (event.data && event.data.source === 'app') {
      if (event.data.message === 'Web Lock not available') {
        displayMessage('Web Lock is currently held by another tab');
      } else if (event.data.message === 'Web Lock acquired') {
        displayMessage('Web Lock has been acquired by another tab');
      } else if (event.data.message === 'Web Lock released') {
        displayMessage('Web Lock has been released by another tab');
      } else {
        displayMessage(`BroadcastChannel: ${event.data.message}`);
      }
    }
  };
}

export { setupWebLock, setupWebLockListener };
