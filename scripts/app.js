const postContainerEl = document.getElementById("container");
const spinner = document.querySelector(".spinner");
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    spinner.style.display = "none";
  }, 2000);
});

var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var postTitle = url.searchParams.get("post");
console.log(postTitle);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAnImC77Go556cENYzF5F3GyvciJnUnrDA",
  authDomain: "blog-nmw.firebaseapp.com",
  databaseURL: "https://blog-nmw-default-rtdb.firebaseio.com",
  projectId: "blog-nmw",
  storageBucket: "blog-nmw.appspot.com",
  messagingSenderId: "68944597841",
  appId: "1:68944597841:web:6f406c9238316f74a43970",
  measurementId: "G-BLS9H8NGTZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let ref = firebase.database().ref();

ref.on("value", function (snapshot) {
  const postsList = Object.keys(snapshot.val().posts);
  postsList.sort();
  postsList.reverse();

  postsList.forEach((postName) => {
    let div = document.createElement("div");
    div.className = "post";
    div.tabIndex = "0";
    div.addEventListener("click", () => {
      window.location.href = "./post/#/" + postName;
    });
    div.innerHTML = `
    <h2><a href="./post/#/${postName}">${
      snapshot.val().posts[postName].title
    }</a></h2>
    <p class='snippet'>${snapshot.val().posts[postName].snippet}</p>
    <p class="last-updated in-posts-card">${
      snapshot.val().posts[postName].lastUpdated
    }</p>
    `;
    postContainerEl.appendChild(div);
    console.log(postName);
  });
});

/*****Intersection observers****
const navbar = document.querySelector("nav");
const post = document.querySelector(".post");

options = {
  rootMargin: "-170px 0px 0px 0px",
};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
    if (!entry.isIntersecting) {
      navbar.classList.add("nav-shadow");
    } else {
      navbar.classList.remove("nav-shadow");
    }
  });
}, options);

observer.observe(post);

*/
