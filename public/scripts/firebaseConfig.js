// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
  
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNgXdY_zQBFLfyrmQ3OhKD-HKfZHu6VXc",
    authDomain: "meu-amigaozinho.firebaseapp.com",
    databaseURL: "https://meu-amigaozinho-default-rtdb.firebaseio.com",
    projectId: "meu-amigaozinho",
    storageBucket: "meu-amigaozinho.appspot.com",
    messagingSenderId: "907656799680",
    appId: "1:907656799680:web:7748c79a0c6c58276a1425",
    measurementId: "G-6RSJRY89HX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const colRef = collection(db, 'animais')

getDocs(colRef)
    .then((snapshot) => {
        let animais = []
        snapshot.docs.forEach((doc) => {
            animais.push({ ...doc.data(), id: doc.id })
        })
        console.log(animais)
    })
    .catch(err => {
        console.log(err.message)
    })