document.querySelector(".logo").addEventListener("click", () => {
  window.location.href = "./";
});

function themeInit() {
  let theme = localStorage.getItem("theme");

  if (theme == "dark") {
    console.log("dark");
    document.body.classList.add("dark");
  } else if (theme == "light") {
    document.body.classList.remove("dark");
  } else {
    // dark-mode media query matched or not
    let matched = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (matched) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
}

themeInit();

function toggleTheme() {
  let toggleIcon = document.querySelector(".material-icons.theme-toggle-icon");
  let theme = "";

  document.body.classList.toggle("dark");
  if (document.body.className == "dark") {
    theme = "dark";
  } else {
    theme = "light";
  }
  if (theme == "light") {
    toggleIcon.innerHTML = "dark_mode";
    localStorage.setItem("theme", "light");
  } else if (theme == "dark") {
    toggleIcon.innerHTML = "brightness_low";
    localStorage.setItem("theme", "dark");
  }
}
