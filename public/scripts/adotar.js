import { collection, getDocs, addDoc, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"
import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js"
import { storage } from "./firebaseConfig.js"

//function adicionarAnimais(local) {
//    setTimeout(() => {
//        adicionarElementos(local, fakeAnimal);
//    }), 1000
//}
const colRef = collection(db, 'animais')

onSnapshot(colRef, snapshot => {
    const animais = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    }); 
    adicionarAnimais(".animal-adotar", animais);
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

function adicionarRegiao(local, nomeDaRegiao) {
    const regiao = document.createElement("p");
    regiao.classList.add("regiao")
    regiao.textContent = nomeDaRegiao;
    local.appendChild(regiao);
}

function adicionarBotao(local) {
    const button = document.createElement("button");
    button.type = "button";
    const buttonText = document.createElement("p");
    buttonText.textContent = "Quero Adotar";
    button.appendChild(buttonText);
    local.appendChild(button);
}