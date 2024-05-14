const channel = new BroadcastChannel('demo_channel');

document.getElementById('broadcastButton').addEventListener('click', function() {
    channel.postMessage('Hello from BroadcastChannel!');
});

channel.onmessage = event => {
    document.getElementById('broadcastResult').innerText = 'BroadcastChannel received: ' + event.data;
};
