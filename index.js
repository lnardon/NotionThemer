function getInputValue(id) {
  return document.getElementById(id).value;
}

function handleClick() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      setPageBGColor: getInputValue("bgColor"),
      setAllFontsColors: getInputValue("allFontsColor"),
      setSidebarBGColor: getInputValue("sidebarBGColor"),
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("applyBtn").addEventListener("click", handleClick);
});
