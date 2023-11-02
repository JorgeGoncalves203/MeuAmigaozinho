import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { collection, getDocs, doc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { auth } from "./firebaseConfig.js"
import { db } from "./firebaseConfig.js";

const colRef = collection(db, 'usuarios')

onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioLogado(user)
    } else {
        const ul = document.getElementById('log')

        if (ul) {
            const liElements = ul.getElementsByTagName('li')
            const fhirtLi = liElements[0]
            const fhirtA = fhirtLi.querySelector('a')
            fhirtA.textContent = 'Login'
            const secondLi = liElements[1]
            const secondA = secondLi.querySelector('a')
            secondA.textContent = 'Cadastrar'
        }
    }
  });

function usuarioLogado(user) {
    const q = query(colRef, where("email", "==", user.email))
    
    onSnapshot(q, snapshot => {
        const usuario = snapshot.docs.map(doc => doc.data()); 
        nomeUsuario(usuario)
        })
} 

function nomeUsuario(usuario) {
    
    usuario.forEach(usuario => {
        const ul = document.getElementById('log')
        const username = usuario.nome
        const nomeCompleto = username.split(' ')
        const primeiroNomeInteito = nomeCompleto[0]
        const tamanhoLimite = 12;
        const primeiroNome = primeiroNomeInteito.slice(0, tamanhoLimite)

        if (ul) {
            const liElements = ul.getElementsByTagName('li')
            const fhirtLi = liElements[0]
            const fhirtA = fhirtLi.querySelector('a')
            const imagem = document.createElement('img')
            imagem.src = `../img/usuario.png`
            fhirtA.textContent = ''
            fhirtA.href = `../pages/perfil.html`
            const secondLi = liElements[1]
            const secondA = secondLi.querySelector('a')
            secondA.href = `../pages/perfil.html`
            secondA.textContent = primeiroNome
            fhirtA.appendChild(imagem)
            
    }
        const divNavLoginMob = document.querySelector('.loginnavmob')
        const a = divNavLoginMob.querySelector('a')
        a.href = `../pages/perfil.html`
        const h2 = a.querySelector('h2')
        h2.textContent = usuario.nome
    })
}

