
import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup
} from 
"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// CONFIG ---------------------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyAtCaQCMmTUOaguvzW9wkNsCjadgc3klJM",
  authDomain: "azarion-b19c5.firebaseapp.com",
  projectId: "azarion-b19c5",
  storageBucket: "azarion-b19c5.firebasestorage.app",
  messagingSenderId: "217138953652",
  appId: "1:217138953652:web:9c1ebe80b07af13e9006e1",
  measurementId: "G-RS2WV81P8Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// MODAL ----------------------------------------------------------------------

window.openModal = () => document.getElementById("main-modal").style.display = "flex";

window.closeModal = () => document.getElementById("main-modal").style.display = "none";

// TABS -----------------------------------------------------------------------

window.showLogin = () => {
    document.getElementById("login-box").style.display = "block";
    document.getElementById("create-box").style.display = "none";
    document.getElementById("tab-login").classList.add("active");
    document.getElementById("tab-create").classList.remove("active");
};

window.showCreate = () => {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("create-box").style.display = "block";
    document.getElementById("tab-create").classList.add("active");
    document.getElementById("tab-login").classList.remove("active");
};

// CRIAR CONTA ----------------------------------------------------------------

document.getElementById("btn-create").addEventListener("click", async () => {
    const email = document.getElementById("create-email").value;
    const password = document.getElementById("create-password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Conta criada com sucesso!");
        closeModal();
        showLogin(); // volta para tela de login
    } 
    catch (error) {
        document.getElementById("create-error").textContent = error.message;
    }
});

// LOGIN ----------------------------------------------------------------------

document.getElementById("btn-login").addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login realizado com sucesso!");
        closeModal();
    } 
    catch (error) {
        document.getElementById("login-error").textContent = error.message;
    }
});

// LOGIN COM GOOGLE ------------------------------------------------------------

const provider = new GoogleAuthProvider();

const googleBtn = document.getElementById("google-login");
if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            alert("Login com Google: " + user.email);
            closeModal();
        }
        catch (error) {
            document.getElementById("login-error").textContent = error.message;
        }
    });
}
