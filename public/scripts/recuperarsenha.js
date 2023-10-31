import { sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { auth } from "./firebaseConfig.js"

const recuperarForm = document.querySelector('.recuperarsenha-form')

recuperarForm.addEventListener('submit', (e) => {
    showLoading()
    e.preventDefault()

    const email = recuperarForm.email.value

    sendPasswordResetEmail(auth, email)
    .then(() => {
        hideLoading()
        alert('Email enviado com sucesso')
        recuperarForm.reset()
    })
    .catch((error) => {
        hideLoading()
        alert(getErrorMessage(error))
    });
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