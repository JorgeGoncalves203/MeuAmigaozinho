import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { auth } from "./firebaseConfig.js"

const signupForm = document.querySelector('.cadastro-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const senha = signupForm.senha.value

    createUserWithEmailAndPassword(auth, email, senha)
    .then((cred) => {
        alert('Usuario criado com sucesso!!')
        window.location.href = "./login.html";
        signupForm.reset()
    })
    .catch((err) => {
        console.log(err.message)
    })
})