function handleClick() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, "setPageBGColor");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", handleClick);
});
