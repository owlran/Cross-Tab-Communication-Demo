# Cross-Tab Communication Demo

This project demonstrates different methods of cross-tab communication in a web application. The methods included are LocalStorage, BroadcastChannel, Service Workers, and Web Locks API.

## Usage
Enter a message in the input field.
Click the respective button to send the message using one of the methods.
Open multiple tabs and observe how messages are communicated between them.
Use the "Clear Messages" button to clear the message list.


## Methods Used
Method	Description	Example Code
- LocalStorage	Uses the storage event to listen for changes in LocalStorage and communicate between tabs.	localStorage.setItem('key', value)
- BroadcastChannel	Uses the BroadcastChannel API to broadcast messages to other tabs listening to the same channel.	const channel = new BroadcastChannel('channel_name')
- Service Workers	Uses service workers to manage and relay messages between tabs.	navigator.serviceWorker.controller.postMessage(message)
- Web Locks API	Uses the Web Locks API to coordinate resource access between tabs, ensuring only one tab accesses at a time.	navigator.locks.request('resource', callback)
License

This project is licensed under the MIT License.


### 表格介紹

| Method              | Description                                                                                                 | Example Code                                                 |
|---------------------|-------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| **LocalStorage**    | Uses the `storage` event to listen for changes in LocalStorage and communicate between tabs.                | ```js<br>localStorage.setItem('key', value)<br>```           |
| **BroadcastChannel**| Uses the `BroadcastChannel` API to broadcast messages to other tabs listening to the same channel.          | ```js<br>const channel = new BroadcastChannel('channel_name')<br>``` |
| **Service Workers** | Uses service workers to manage and relay messages between tabs.                                             | ```js<br>navigator.serviceWorker.controller.postMessage(message)<br>``` |
| **Web Locks API**   | Uses the Web Locks API to coordinate resource access between tabs, ensuring only one tab accesses at a time. | ```js<br>navigator.locks.request('resource', callback)<br>``` |
