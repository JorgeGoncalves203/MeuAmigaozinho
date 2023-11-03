import { signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { auth } from "./firebaseConfig.js"

const logoutButton = document.querySelector('.sair')
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        window.location.href = "../index.html";
        localStorage.removeItem('nomeDoUsuario');
        alert('O usuário foi deslogado!')
    })
    .catch((error) => {
        console.log(error.message)
    })
})