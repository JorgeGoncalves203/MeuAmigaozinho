import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { collection, getDocs, doc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { auth } from "./firebaseConfig.js"
import { db } from "./firebaseConfig.js";

const colRef = collection(db, 'usuarios')

const nomeDoUsuario = localStorage.getItem('nomeDoUsuario');

if (nomeDoUsuario) {
    const ul = document.getElementById('log')
    const liElements = ul.getElementsByTagName('li')
    const fhirtLi = liElements[0]
    const fhirtA = fhirtLi.querySelector('a')
    const imagem = document.createElement('img')
    imagem.src = `./img/usuario.png`
    fhirtA.textContent = ''
    fhirtA.href = `./pages/perfil.html`
    const secondLi = liElements[1]
    const secondA = secondLi.querySelector('a')
    secondA.href = `./pages/perfil.html`
    secondA.textContent = nomeDoUsuario
    fhirtA.appendChild(imagem)

    const divNavLoginMob = document.querySelector('.loginnavmob')
    const a = divNavLoginMob.querySelector('a')
    a.href = `./pages/perfil.html`
    const h2 = a.querySelector('h2')
    h2.textContent = nomeDoUsuario
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        if (nomeDoUsuario) {

        } else {
            usuarioLogado(user)

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
        const username = usuario.nome
        const nomeCompleto = username.split(' ')
        const primeiroNomeInteito = nomeCompleto[0]
        const tamanhoLimite = 12;
        const primeiroNome = primeiroNomeInteito.slice(0, tamanhoLimite)
        localStorage.setItem('nomeDoUsuario', primeiroNome);
        const nomeDoUsuario = localStorage.getItem('nomeDoUsuario');

        const ul = document.getElementById('log')

        if (ul) {
            const liElements = ul.getElementsByTagName('li')
            const fhirtLi = liElements[0]
            const fhirtA = fhirtLi.querySelector('a')
            const imagem = document.createElement('img')
            imagem.src = `./img/usuario.png`
            fhirtA.textContent = ''
            fhirtA.href = `./pages/perfil.html`
            const secondLi = liElements[1]
            const secondA = secondLi.querySelector('a')
            secondA.href = `./pages/perfil.html`
            secondA.textContent = nomeDoUsuario
            fhirtA.appendChild(imagem)
    }

        const divNavLoginMob = document.querySelector('.loginnavmob')
        const a = divNavLoginMob.querySelector('a')
        a.href = `./pages/perfil.html`
        const h2 = a.querySelector('h2')
        h2.textContent = nomeDoUsuario

    })
}

onSnapshot(collection(db, 'animais'), snapshot => {
    const animais = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    }); 
    adicionarAnimais(".animais-adotar", animais);
    })


function adicionarAnimais(local, animais) {
        animais.forEach((animal) => {
            adicionarElementos(local, animal);
        });
}

function adicionarElementos(local, animal) {
const elemento = document.querySelector(local);
const id = animal.id;
const link = document.createElement("a");
link.href = `../pages/animal.html?id=${id}`;
link.style["text-decoration"] = "none";
link.style["color"] = "inherit";
elemento.appendChild(link);

const novoAnimal = document.createElement("div");
novoAnimal.classList.add("animal");

adicionarImagem(novoAnimal, animal.imagem);

adicionarNome(novoAnimal, animal.nome);

adicionarRegiao(novoAnimal, animal.cidade);

adicionarBotao(novoAnimal);

link.appendChild(novoAnimal);
}

function adicionarImagem(local, nomeDaImagem) {
const imagem = document.createElement("img");
imagem.src = nomeDaImagem
local.appendChild(imagem);
}

function adicionarNome(local, nomeDoAnimal) {
const nome = document.createElement("p");
nome.classList.add("nome")
nome.textContent = nomeDoAnimal;
local.appendChild(nome);
}

function adicionarRegiao(local, nomeDaCidade) {
const cidade = document.createElement("p");
cidade.classList.add("regiao")
cidade.textContent = nomeDaCidade;
local.appendChild(cidade);
}

function adicionarBotao(local) {
const button = document.createElement("button");
button.type = "button";
const buttonText = document.createElement("p");
buttonText.textContent = "Quero Adotar";
button.appendChild(buttonText);
local.appendChild(button);
}