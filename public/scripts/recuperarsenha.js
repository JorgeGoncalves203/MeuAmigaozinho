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
    .catch((err) => {
        hideLoading()
        alert(getErrorMessage(err))
    });
})

function getErrorMessage(err) {
    if(err.code == 'auth/invalid-login-credentials') {
        return 'Usuário não encontrado';
    }
    if(err.code == 'auth/wrong-password') {
        return 'Senha Inválida'
    }
    return err.message;
}