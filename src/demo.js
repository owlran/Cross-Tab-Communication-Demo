import "./style.css";
import {
  sendMessage as sendLocalStorageMessage,
  setupLocalStorageListener,
} from "./localStorage";
import {
  sendMessage as sendBroadcastChannelMessage,
  setupBroadcastChannelListener,
} from "./broadcastChannel";
import {
  registerServiceWorker,
  sendServiceWorkerMessage,
} from "./serviceWorker";
import { setupWebLock, setupWebLockListener } from "./webLock";
import {
  openNewTab,
  sendPostMessage,
  setupPostMessageListener,
} from "./postMessage";

const messageList = document.getElementById("messageList");

function displayMessage(message) {
  const listItem = document.createElement("li");
  listItem.textContent = message;
  messageList.appendChild(listItem);
}

document.getElementById("sendLocalStorage").addEventListener("click", () => {
  const message = document.getElementById("message").value;
  sendLocalStorageMessage(message);
});

document
  .getElementById("sendBroadcastChannel")
  .addEventListener("click", () => {
    const message = document.getElementById("message").value;
    sendBroadcastChannelMessage(message);
  });

registerServiceWorker(displayMessage);

document.getElementById("sendServiceWorker").addEventListener("click", () => {
  const message = document.getElementById("message").value;
  sendServiceWorkerMessage(message);
});

setupLocalStorageListener(displayMessage);
setupBroadcastChannelListener(displayMessage);

setupWebLock(displayMessage);
setupWebLockListener(displayMessage);

document.getElementById("openNewTab").addEventListener("click", openNewTab);

document.getElementById("sendPostMessage").addEventListener("click", () => {
  const message = document.getElementById("message").value;
  sendPostMessage(message);
});

setupPostMessageListener(displayMessage);

document.getElementById("clearMessages").addEventListener("click", () => {
  messageList.innerHTML = "";
});

// Detection of multiple tabs
const detectionChannel = new BroadcastChannel("detectionChannel");

detectionChannel.postMessage("tab_opened");

detectionChannel.onmessage = (event) => {
  if (event.data === "tab_opened") {
    document.getElementById("overlay").style.display = "flex";
  }
};

document.getElementById("refreshPage").addEventListener("click", () => {
  location.reload();
});
