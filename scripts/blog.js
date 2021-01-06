const postContentEl = document.getElementById("content");

function getHash(substri) {
  return window.location.hash.substring(substri);
}

var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var postTitle = getHash(2);
if (postTitle <= 0) {
  window.location.href = "./index.html";
}
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

window.addEventListener("hashchange", () => {
  window.location.reload();
});

function fixData() {
  ref.on("value", function (snapshot) {
    document.title = snapshot.val().posts[postTitle].title;
    postContentEl.innerHTML = `
  <h1>${snapshot.val().posts[postTitle].title}</h1>
  <p>${snapshot.val().posts[postTitle].content}</p>
  <p class="last-updated">Last Updated: ${
    snapshot.val().posts[postTitle].lastUpdated
  } </p>
  <p class="share" tabindex="0" onclick="share('${
    snapshot.val().posts[postTitle].title
  } - nikhilmwarrier Dev Blog')">
  Share this post
  <span class="material-icons">share</span>
  </p>
  `;
  });
}

fixData();

function share(text) {
  if (navigator.share) {
    navigator
      .share({
        title: document.title,
        url: window.location.href,
        text: text,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  } else {
    const el = document.createElement("textarea");
    el.value = window.location.href;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Link Copied");
  }
}
