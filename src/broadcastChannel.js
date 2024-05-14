const channel = new BroadcastChannel('crossTabChannel');

function sendMessage(message) {
  channel.postMessage({ source: 'app', message });
}

function setupBroadcastChannelListener(displayMessage) {
  channel.onmessage = (event) => {
    if (event.data && event.data.source === 'app') {
      displayMessage(`BroadcastChannel: ${event.data.message}`);
    }
  };
}

export { sendMessage, setupBroadcastChannelListener, channel };
