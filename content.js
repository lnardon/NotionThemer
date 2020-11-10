// Checks if user has already a theme saved
window.onload = () => {
  let hasTheme = localStorage.getItem("@notionThemer");
  if (hasTheme) {
    alert("HAS SAVED THEME");
    console.log(JSON.parse(hasTheme));
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
  switch (message) {
    case "setPageBGColor":
      persist("pageBGColor", "#171717");
      break;
    default:
      alert("Found No Function");
  }
}
chrome.runtime.onMessage.addListener(gotMessage);

// FUNCTIONS TO MODIFY NOTION'S WEBSITE THEME
