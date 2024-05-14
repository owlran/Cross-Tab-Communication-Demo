import "./style.css";
import { sendMessage as sendLocalStorageMessage } from "./localStorage";

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

const broadcastChannel = new BroadcastChannel("crossTabChannel");

document
  .getElementById("sendBroadcastChannel")
  .addEventListener("click", () => {
    const message = document.getElementById("message").value;
    broadcastChannel.postMessage({ source: "app", message });
  });

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceWorker.js").then((registration) => {
    console.log("Service Worker registered");

    if (navigator.serviceWorker.controller) {
      console.log("Service Worker is controlling the page");
    } else {
      console.log("Service Worker is not controlling the page");
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("Service Worker now controlling the page");
      });
    }
  });

  navigator.serviceWorker.addEventListener("message", (event) => {
    displayMessage(`Service Worker: ${event.data}`);
  });

  function sendServiceWorkerMessage(message) {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message);
    } else {
      console.log("Service Worker not ready to receive messages");
    }
  }

  document.getElementById("sendServiceWorker").addEventListener("click", () => {
    const message = document.getElementById("message").value;
    sendServiceWorkerMessage(message);
  });
}

// Listen for localStorage messages
window.addEventListener("storage", (event) => {
  if (event.key === "crossTabMessage") {
    const { message } = JSON.parse(event.newValue);
    displayMessage(`LocalStorage: ${message}`);
  }
});

// Listen for BroadcastChannel messages
broadcastChannel.onmessage = (event) => {
  if (event.data && event.data.source === "app") {
    displayMessage(`BroadcastChannel: ${event.data.message}`);
  }
};

// Web Locks API demo
document.getElementById("useWebLock").addEventListener("click", () => {
  navigator.locks.request(
    "my_resource",
    { mode: "exclusive", ifAvailable: true },
    async (lock) => {
      if (!lock) {
        displayMessage("Web Lock not available");
        broadcastChannel.postMessage({
          source: "app",
          message: "Web Lock not available",
        });
        return;
      }
      displayMessage("Web Lock acquired");
      broadcastChannel.postMessage({
        source: "app",
        message: "Web Lock acquired",
      });
      // Simulate a task that takes some time
      await new Promise((resolve) => setTimeout(resolve, 3000));
      displayMessage("Web Lock released");
      broadcastChannel.postMessage({
        source: "app",
        message: "Web Lock released",
      });
    }
  );
});

// Listen for Web Lock status changes
broadcastChannel.onmessage = (event) => {
  if (event.data && event.data.source === "app") {
    if (event.data.message === "Web Lock not available") {
      displayMessage("Web Lock is currently held by another tab");
    } else if (event.data.message === "Web Lock acquired") {
      displayMessage("Web Lock has been acquired by another tab");
    } else if (event.data.message === "Web Lock released") {
      displayMessage("Web Lock has been released by another tab");
    } else {
      displayMessage(`BroadcastChannel: ${event.data.message}`);
    }
  }
};

// Window.postMessage demo
let newTab = null;
document.getElementById("openNewTab").addEventListener("click", () => {
  newTab = window.open(window.location.href, "_blank");
});

document.getElementById("sendPostMessage").addEventListener("click", () => {
  const message = document.getElementById("message").value;
  if (newTab) {
    newTab.postMessage({ source: "app", message }, "*");
    displayMessage("send message to new tab");
  } else {
    displayMessage("No new tab opened to send the message.");
  }
});

window.addEventListener("message", (event) => {
  if (event.data && event.data.source === "app") {
    displayMessage(`Window.postMessage: ${event.data.message}`);
  }
});

// Clear message list
document.getElementById("clearMessages").addEventListener("click", () => {
  messageList.innerHTML = "";
});
