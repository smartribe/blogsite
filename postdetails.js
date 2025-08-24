import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  get,
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVQv9kqrjj73cb3Z3Mt46mW8kZeGu0ddI",
  authDomain: "kensblog-e5b0c.firebaseapp.com",
  projectId: "kensblog-e5b0c",
  storageBucket: "kensblog-e5b0c.firebasestorage.app",
  messagingSenderId: "609093735425",
  appId: "1:609093735425:web:6038dcccfa0933d0d25c00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Get post ID from URL
const param = new URLSearchParams(window.location.search);
const postID = param.get("id");
//If ID exists then use ID to get the specific blog post from the database
if (postID) {
  const blogRef = ref(db, "blogs/" + postID);
  get(blogRef).then((snapshot) => {
    if (snapshot.exists()) {
      const post = snapshot.val();
      //Attach the content to the div in the post.html file
      document.getElementById("post-content").innerHTML = `
      <h1>${post.title}</h1>
       <p class="post-date ">${post.date}</p>
      <img src=${post.imgurl}>
     
       <p>${post.content}</p>

      `;
    } else {
      document.getElementById("post-content").innerHTML =
        "<p>No post found</p>";
    }
  });
} else {
  document.getElementById("post-content").innerHTML = "<p>No post selected</p>";
}
