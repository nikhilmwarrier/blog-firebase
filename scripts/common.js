document.querySelector(".logo").addEventListener("click", () => {
  window.location.href = "./";
});

// dark-mode media query matched or not
let matched = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (matched) console.log("Currently in dark mode");
else console.log("Currently not in dark mode");
