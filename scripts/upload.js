// alert("Auth Granted!");

/*****FIREBASE */
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
  localStorage.setItem("totalPosts", postsList.length);
});

//!auth
const modalOverlay = document.getElementById("modal-overlay");
const btnLogout = document.getElementById("btnLogout");

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    console.log(firebaseUser.email);
    //   alert(
    //     `Welcome! ${firebaseUser.email}, your uuid is ${firebaseUser.uid}`
    //   );
    if (firebaseUser.uid == "h3FbmGILQcX2u9gH90AOec7IJhv1") {
      // btnLogout.classList.remove("hide");
      modalOverlay.classList.add("hide");
      // if (firebaseUser.displayName)
      //   userEmailContainer.innerText = firebaseUser.displayName;
      // else userEmailContainer.innerText = firebaseUser.email;
    } else {
      let returnToHome = confirm(
        "You do not have permission to author posts. Return to homepage?"
      );
      if (returnToHome == true) window.location.href = "./";
    }
  } else {
    modalOverlay.classList.remove("hide");
    // btnLogout.classList.add("hide");
    // userEmailContainer.innerText = "Not signed in";
  }
});
signInWithGoogleBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
});

/******************* */

tinymce.init({
  selector: "#editor",
  plugins: [
    "code",
    "quickbars",
    "media",
    "link",
    "image",
    "fullscreen",
    "emoticons",
    "codesample",
    "insertdatetime",
    "searchreplace",
  ],
});

const publishBtn = document.getElementById("publish-post");

publishBtn.addEventListener("click", () => {
  const postId = Number(localStorage.getItem("totalPosts")) + 1;
  const postTitle = document.getElementById("post-title").value;
  const postSnippet = document.getElementById("post-snippet").value;
  const postContent = tinymce.get("editor").getContent();

  var today = new Date();

  var now = today.toDateString();
  var nowNum = Date.now().toString();

  console.table({ postId, postTitle, postSnippet, postContent });

  firebase.database().ref(`posts/${postId}`).set({
    title: postTitle,
    snippet: postSnippet,
    content: postContent,
    lastUpdated: now,
    lastUpdatedNumerical: nowNum,
  });

  document.body.style.opacity = "0.5";
  setTimeout(() => {
    window.location.href = "./";
  }, 1500);
});
