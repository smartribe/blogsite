import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  set,
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
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
const postBlogBtn = document.getElementById("postBlogBtn");

document.addEventListener("DOMContentLoaded", () => {
  loadBlogs();
});

postBlogBtn.addEventListener("click", () => {
  addPost();
});

//Add a blog post
function addPost() {
  const title = document.getElementById("title").value;
  const imgurl = document.getElementById("imgurl").value;
  const content = document.getElementById("content").value;
  const date = new Date().toLocaleDateString();

  const blogRef = ref(db, "blogs/");
  const newPostRef = push(blogRef);
  set(newPostRef, {
    title,
    imgurl,
    content,
    date,
  });
}

//Load blog list on index page
function loadBlogs() {
  const newsContainer = document.getElementById("blogList");
  const blogRef = ref(db, "blogs/");
  onValue(blogRef, (snapshot) => {
    newsContainer.innerHTML = "";
    snapshot.forEach((child) => {
      const postId = child.key;
      const post = child.val();
      const div = document.createElement("div");
      div.classList.add("post-card");
      div.innerHTML = `
            <img src="${post.imgurl}"/>
            <h3>a<a href="#">${post.title}</a></h3>
            `;

      //When a blog is clicked open the post.html page and attach an ID to the url
      div.addEventListener("click", () => {
        window.location.href = `post.html?id=${postId}`;
      });
      newsContainer.appendChild(div);
    });
  });
}
