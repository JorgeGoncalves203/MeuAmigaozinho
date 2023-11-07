import { createUserWithEmailAndPassword,  onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { auth } from "./firebaseConfig.js"
import { db } from "./firebaseConfig.js";

const colRef = collection(db, 'usuarios')

const signupForm = document.querySelector('.cadastro-form')
signupForm.addEventListener('submit', (e) => {
    showLoading()
    e.preventDefault()

    const email = signupForm.email.value
    const senha = signupForm.senha.value

    createUserWithEmailAndPassword(auth, email, senha)
    .then((cred) => {
        const user = cred.user
        const userId = user.uid
        addDoc(colRef, {
            uid: userId,
            email: signupForm.email.value,
            nome: signupForm.name.value,
            telefone: signupForm.tel.value
        })
        .then(() => {
            hideLoading()
            window.location.href = "../index.html";
        })
        signupForm.reset()
    })
    .catch((error) => {
        hideLoading()
        if(error.code == 'auth/email-already-in-use') {
            alert('Email já cadastrado')
        } else{
            console.log(error.message)
        }
    })
})

////Persistencia e Estado