import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { auth } from "./firebaseConfig.js"

const loginForm = document.querySelector('.login-form')

loginForm.addEventListener('submit', (e) => {
    showLoading();
    e.preventDefault()

    const email = loginForm.email.value
    const senha = loginForm.senha.value
    signInWithEmailAndPassword(auth, email, senha)
    .then((cred) => {
        hideLoading()
        alert('Usuario logado!!')
        window.location.href = "../index.html";
        loginForm.reset()
    })
    .catch((error) => {
        hideLoading()
        alert(getErrorMessage(error))
    })
})

function getErrorMessage(error) {
    if(error.code == 'auth/invalid-login-credentials') {
        return 'Usuário não encontrado';
    }
    if(error.code == 'auth/wrong-password') {
        return 'Senha Inválida'
    }
    return error.message;
}