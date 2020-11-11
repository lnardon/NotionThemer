// Checks if user has already a theme saved
window.onload = () => {
  let hasTheme = localStorage.getItem("@notionThemer");
  if (hasTheme) {
    alert("HAS SAVED THEME");
  }
};

// Helper function to save the themer info
function persist(key, value) {
  let theme = JSON.parse(localStorage.getItem("@notionThemer"));
  if (theme) {
    theme[key] = value;
  } else {
    theme = {};
    theme[key] = value;
  }
  localStorage.setItem("@notionThemer", JSON.stringify(theme));
}

// Script Listener to modify theme
function gotMessage(message, sender, sendResponse) {
  let keys = Object.keys(message);
  keys.forEach((key) => {
    switch (key) {
      case "setPageBGColor":
        changeBGColor(message[key]);
        persist(key, message[key]);
        break;
      case "setAllFontsColors":
        changeAllFontsColors(message[key]);
        persist(key, message[key]);
        break;
      case "setSidebarBGColor":
        setSidebarBGColor(message[key]);
        persist(key, message[key]);
        break;
      default:
        alert("Found No Function");
    }
  });
}
chrome.runtime.onMessage.addListener(gotMessage);

// FUNCTIONS TO MODIFY NOTION'S WEBSITE THEME

function changeBGColor(color) {
  document.getElementsByClassName(
    "notion-frame"
  )[0].style.backgroundColor = color;
}

function changeAllFontsColors(color) {
  let divs = document.querySelectorAll("div");
  divs.forEach((div) => {
    div.style.color = color;
  });
}

function setSidebarBGColor(color) {
  document.getElementsByClassName(
    "notion-sidebar"
  )[1].style.backgroundColor = color;
}
