import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtb-GnNU1XtNDBbzAqBx-7IZuLzeZ9ibw",
    authDomain: "login-867f1.firebaseapp.com",
    projectId: "login-867f1",
    storageBucket: "login-867f1.firebasestorage.app",
    messagingSenderId: "584763877235",
    appId: "1:584763877235:web:7ce15bc2cac6b82e110706"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get DOM elements for toggling forms
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// Event listener to show Signup form
showSignupBtn.addEventListener('click', () => {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    showSignupBtn.classList.add('active');
    showLoginBtn.classList.remove('active');
});

// Event listener to show Login form
showLoginBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    showLoginBtn.classList.add('active');
    showSignupBtn.classList.remove('active');
});


// --- YOUR FIREBASE LOGIC GOES BELOW ---

// Example: Handling signup
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("creating account")
            window.location.href = "/";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
    console.log('Signing up with:', email, password);
});

// Example: Handling login
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    // Your Firebase login function here
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = "/"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

    console.log('Logging in with:', email, password);
});