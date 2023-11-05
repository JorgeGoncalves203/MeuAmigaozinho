import { collection, getDocs, addDoc, onSnapshot, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"
import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js"
import { storage } from "./firebaseConfig.js"

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
buscarAnimal(id);


const colRef = collection(db, 'animais')

function buscarAnimal(id) {
    const docRef = doc(db, 'animais', id)

    getDoc(docRef)
    .then((doc) => {
        const animal = doc.data()
        carregarAnimal(animal)
    })
}

function carregarAnimal(animal) {

    carregarNome(animal.nome);

    carregarImagem(animal.imagem);

    carregarCidade(animal.cidade);

    carregarEspecie(animal.especie);

    carregarPorte(animal.porte);

    carregarSexo(animal.sexo);

    carregarRaca(animal.raca);

    carregarIdade(animal.idade);

    carregarVacinas(animal.vacinas);

    carregarTratamentoPulgas(animal.tratamentoPulgas);

    carregarCastracao(animal.castrado);

    carregarTemperamento(animal.temperamento);

    carregarObservacoes(animal.descricao);

}

function carregarNome(nomeDoAnimal) {
    const nome = document.querySelector("#nome h1");
    nome.textContent = nomeDoAnimal;
}

function carregarImagem(nomeDaImagem) {
    const imagem = document.querySelector("#img img");
    imagem.src = nomeDaImagem
}

function carregarCidade(nomeDaCidade) {
    const cidade = document.querySelector("#regiao p");
    cidade.textContent = nomeDaCidade;
}

function carregarEspecie(nomeDaEspecie) {
    const especie = document.querySelector("#especie p");
    especie.textContent = nomeDaEspecie;
}

function carregarPorte(nomeDoPorte) {
    const porte = document.querySelector("#porte p");
    porte.textContent = nomeDoPorte;
}

function carregarSexo(nomeDoSexo) {
    const sexo = document.querySelector("#sexo p");
    sexo.textContent = nomeDoSexo;
}

function carregarRaca(nomeDaRaca) {
    const raca = document.querySelector("#raca p");
    raca.textContent = nomeDaRaca;
}

function carregarIdade(nomeDaIdade) {
    const idade = document.querySelector("#idade p");
    idade.textContent = nomeDaIdade;
}

function carregarVacinas(nomeDaVacina) {
    const vacinas = document.querySelector("#vacinas p");
    vacinas.textContent = nomeDaVacina;
}

function carregarTratamentoPulgas(nomeDoTratamentoPulgas) {
    const pulgas = document.querySelector("#pulgas p");
    pulgas.textContent = nomeDoTratamentoPulgas;
}

function carregarCastracao(nomeDoCastracao) {
    const castracao = document.querySelector("#castracao p");
    castracao.textContent = nomeDoCastracao;
}

function carregarTemperamento(nomeDoTemperamento) {
    const temperamento = document.querySelector("#temperamento p");
    temperamento.textContent = nomeDoTemperamento;
}

function carregarObservacoes(nomeDasObsevacaoes) {
    const observacoes = document.querySelector("#observacoes p");
    observacoes.textContent = nomeDasObsevacaoes;
}

onSnapshot(colRef, snapshot => {
    const animais = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    }); 
    adicionarAnimais("#mais-animais", animais);
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