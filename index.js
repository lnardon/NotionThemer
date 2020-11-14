window.onload = () => {
  const theme = localStorage.getItem("notionTheme");
  if (theme) {
    let parsedTheme = JSON.parse(theme);
    let keys = Object.keys(parsedTheme);
    keys.forEach((key) => {
      document.getElementById(key).value = parsedTheme[key];
    });
  }
};

function getInputValue(id) {
  return document.getElementById(id).value;
}

function handleClick() {
  const theme = {
    setPageBGColor: getInputValue("setPageBGColor"),
    setAllFontsColors: getInputValue("setAllFontsColors"),
    setIconsColor: getInputValue("setIconsColor"),
    changeFont: "a",
  };

  localStorage.setItem("notionTheme", JSON.stringify(theme));
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, theme);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("applyBtn").addEventListener("click", handleClick);
});
