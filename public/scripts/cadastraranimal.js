import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { db } from "./firebaseConfig.js";


const colRef = collection(db, 'animais')

getDocs(colRef)
    .then((snapshot) => {
        let animais = []
        snapshot.docs.forEach((doc) => {
            animais.push({ ...doc.data(), id: doc.id })
        })
        console.log(animais)
    })
    .catch(error => {
        console.log(error.message)
    })