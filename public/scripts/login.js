import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { auth } from "./firebaseConfig.js"

const loginForm = document.querySelector('.login-form')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const senha = loginForm.senha.value
    signInWithEmailAndPassword(auth, email, senha)
    .then((cred) => {
        alert('Usuario logado!!')
        window.location.href = "../index.html";
        loginForm.reset()
    })
    .catch((err) => {
        alert(getErrorMessage(err))
    })
})

function getErrorMessage(err) {
    if(err.code == 'auth/invalid-login-credentials') {
        return 'Usuário não encontrado';
    }
    return err.message;
}