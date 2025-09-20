import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtb-GnNU1XtNDBbzAqBx-7IZuLzeZ9ibw",
  authDomain: "login-867f1.firebaseapp.com",
  projectId: "login-867f1",
  storageBucket: "login-867f1.appspot.com",  
  messagingSenderId: "584763877235",
  appId: "1:584763877235:web:7ce15bc2cac6b82e110706"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const showSignupBtn = document.getElementById('show-signup');
  const showLoginBtn = document.getElementById('show-login');
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  if (showSignupBtn && showLoginBtn && signupForm && loginForm) {
    showSignupBtn.addEventListener('click', () => {
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
      showSignupBtn.classList.add('active');
      showLoginBtn.classList.remove('active');
    });

    showLoginBtn.addEventListener('click', () => {
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
      showLoginBtn.classList.add('active');
      showSignupBtn.classList.remove('active');
    });

    // Signup
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        window.location.href = "/dashboard";  // ✅ safer redirect
      } catch (err) {
        alert(err.message);
      }
    });

    // Login
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "/dashboard";  // ✅ safer redirect
      } catch (err) {
        alert(err.message);
      }
    });
  }
});
