document.getElementById('webLocksButton').addEventListener('click', function() {
    navigator.locks.request('my_resource', async lock => {
        document.getElementById('webLocksResult').innerText = 'Lock acquired, holding for 1 second...';
        await new Promise(resolve => setTimeout(resolve, 1000));
        document.getElementById('webLocksResult').innerText = 'Lock released';
    });
});
