const worker = new SharedWorker('/shared-worker.js');
worker.port.start();

document.getElementById('sharedWorkerButton').addEventListener('click', function() {
    worker.port.postMessage('Hello from one tab!');
});

worker.port.onmessage = event => {
    document.getElementById('sharedWorkerResult').innerText = 'SharedWorker received: ' + event.data;
};
