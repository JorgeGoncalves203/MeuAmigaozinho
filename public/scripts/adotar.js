import { collection, getDocs, addDoc, onSnapshot, doc, query, where } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"
import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js"
import { storage } from "./firebaseConfig.js"


const colRef = collection(db, 'animais')

const filtrosSelect = [
    document.getElementById('filtroEspecie'),
    document.getElementById('filtroPorte'),
    document.getElementById('filtroSexo'),
    document.getElementById('filtroCidade'),
  ];
  
  const filtroForm = document.querySelector('#filtro-form')
  
  function atualizarResultados() {
    const container = document.querySelector(".animal-adotar");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

    const filtros = {};
  
    filtrosSelect.forEach((select) => {
      const valor = select.value;
      if (valor !== 'todas') {
        const filtro = select.id.replace('filtro', '');
        filtros[filtro] = valor;
      }
    });
  
    let q = query(colRef);
  
    for (const filtro in filtros) {
        const valor = filtros[filtro];
        const campoFirestore = filtro.charAt(0).toLowerCase() + filtro.slice(1);
        q = query(q, where(campoFirestore, '==', valor));
      }
  
    onSnapshot(q, snapshot => {
        const animais = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }); 
        adicionarAnimais(".animal-adotar", animais);
        })
  }

  filtroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    atualizarResultados();
  });

  atualizarResultados();


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