document.body.style.opacity = "0";
let inputPassword = prompt("Enter password");

if (inputPassword == "reallyweird") {
  alert("Auth Granted!");
  document.body.style.opacity = "1";
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
    const postId = document.getElementById("post-id").value;
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
} else {
  alert("Wrong Password. Press 'OK' to continue to homepage");
  window.location.href = "./";
}
