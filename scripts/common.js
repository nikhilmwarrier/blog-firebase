document.querySelector(".logo").addEventListener("click", () => {
  window.location.href = "./";
});

// dark-mode media query matched or not
let matched = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (matched) document.body.classList.add("dark");
else document.body.classList.remove("dark");
