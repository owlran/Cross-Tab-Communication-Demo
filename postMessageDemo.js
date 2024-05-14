// add click listener
document.getElementById("postMessageButton").addEventListener("click", () => {
  const messageData = {
    text: "Hello from the original tab!",
    time: new Date().toISOString(),
    source: "myApp",
  };
  window.postMessage(messageData, "*");
});

// 事件监听：处理接收到的消息
window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) return;

  // 检查消息来源
  if (typeof event.data === "object" && event.data.source === "myApp") {
    const messageContent = JSON.stringify(event.data, null, 2);
    document.getElementById("postMessageResult").innerText =
      "Received message: " + messageContent;
  } else {
    console.log("Received an unexpected message:", event.data);
  }
});
