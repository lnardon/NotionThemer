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

// Helper function to add DOM observers based on a array of elements to keep track of
const observeDOM = (() => {
  let MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  return (obj, callback) => {
    if (!obj || obj.nodeType !== 1) {
      return;
    }
    if (MutationObserver) {
      let mutationObserver = new MutationObserver(callback);

      mutationObserver.observe(obj, { childList: true, subtree: true });
      return mutationObserver;
    } else if (window.addEventListener) {
      obj.addEventListener("DOMNodeInserted", callback, false);
      obj.addEventListener("DOMNodeRemoved", callback, false);
    }
  };
})();

window.onload = () => {
  let themeInfo = localStorage.getItem("@notionThemer");
  if (themeInfo) {
    gotMessage(JSON.parse(themeInfo));
  }
};

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
      // case "changeFont":
      //   changeFont(message[key]);
      //   persist(key, message[key]);
      //   break;
      default:
      // alert("Found No Function");
    }
  });
}
chrome.runtime.onMessage.addListener(gotMessage);

// FUNCTIONS TO MODIFY NOTION'S WEBSITE THEME

function changeBGColor(color) {
  observeDOM(document.querySelector("body"), (m) => {
    let addedNodes = [];
    let removedNodes = [];

    m.forEach(
      (record) =>
        record.addedNodes.length & addedNodes.push(...record.addedNodes)
    );

    m.forEach(
      (record) =>
        record.removedNodes.length & removedNodes.push(...record.removedNodes)
    );
    let divs = document.querySelectorAll("div");
    divs.forEach((div) => {
      if (
        div.style.backgroundColor === "rgb(47, 52, 55)" ||
        div.style.backgroundColor === "rgb(63, 68, 71)" ||
        div.style.backgroundColor === "rgb(55, 60, 63)"
      ) {
        div.style.backgroundColor = color;
      }
    });
  });
}

function changeAllFontsColors(color) {
  let divs = document.querySelectorAll("div");
  divs.forEach((div) => {
    div.style.color = color;
  });
}

// function changeFont() {
//   let link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href =
//     "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap";
//   document.head.appendChild(link);
//   observeDOM(document.querySelector("body"), (m) => {
//     let addedNodes = [];
//     let removedNodes = [];

//     m.forEach(
//       (record) =>
//         record.addedNodes.length & addedNodes.push(...record.addedNodes)
//     );

//     m.forEach(
//       (record) =>
//         record.removedNodes.length & removedNodes.push(...record.removedNodes)
//     );
//     let divs = document.querySelectorAll("div");
//     divs.forEach((div) => {
//       if (div.style.fontFamily) {
//         div.style.fontFamily = "sans-serif";
//       }
//     });
//   });
// }
