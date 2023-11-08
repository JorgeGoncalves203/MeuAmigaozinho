import { collection, getDocs, addDoc, onSnapshot, getDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"
import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js"
import { storage } from "./firebaseConfig.js"

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
buscarAnimal(id);


const colRef = collection(db, 'animais')

//Carregar Informações dos animais

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

//Informação de contato

const confirmarButton = document.getElementById('confirmarButton')

confirmarButton.addEventListener('click', (e) => {
    e.preventDefault()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const docRef = doc(db, 'animais', id)

            getDoc(docRef)
            .then((doc) => {
                const animal = doc.data()
                const uidUserAnimal = animal.uid
                pegarTelefone(uidUserAnimal)
            })
        } else {
            const div = document.createElement('div');
            div.classList.add('impedirAcesso');
            
            const div1 = document.createElement('div');
            div1.classList.add('modalImpedir');

            const buttonFechar = document.createElement('button')
            buttonFechar.classList.add('botaoFechar')

            const img = document.createElement('img')
            img.src = `../img/fechar.png`
    
            const h3 = document.createElement('h3');
            h3.innerHTML = "O usuario precisa estar logado para ter acesso!";

            const buttonDiv = document.createElement('div')
            buttonDiv.classList.add('buttonDiv')

            const aLogin = document.createElement('a')
            aLogin.href = `../pages/login.html`
            aLogin.classList.add('aLogin')

            const buttonLogin = document.createElement('button')
            buttonLogin.classList.add('buttonLogin')
            buttonLogin.textContent = 'Login'

            const aCadastro = document.createElement('a')
            aCadastro.href = `../pages/cadastro.html`
            aCadastro.classList.add('aCadastro')

            const buttonCadastro = document.createElement('button')
            buttonCadastro.classList.add('buttonCadastro')
            buttonCadastro.textContent = 'Cadastrar'


            
            
            div1.appendChild(h3)
            div.appendChild(div1)
            buttonFechar.appendChild(img)
            div1.appendChild(buttonFechar)
            aLogin.appendChild(buttonLogin)
            buttonDiv.appendChild(aLogin)
            aCadastro.appendChild(buttonCadastro)
            buttonDiv.appendChild(aCadastro)
            div1.appendChild(buttonDiv)
    
            document.body.appendChild(div);

            const fecharButton = document.querySelector('.botaoFechar')
            fecharButton.addEventListener('click', (e) => {
            e.preventDefault()

            const impedirAcesso = document.getElementsByClassName('impedirAcesso');
            if (impedirAcesso.length) {
                impedirAcesso[0].remove();
            }
            })
                }
      });
      function pegarTelefone(uidUserAnimal) {
        const userRef = collection(db, 'usuarios')
        const q = query(userRef, where('uid', '==', uidUserAnimal))
    
            getDocs(q)
            .then((doc) => {
                const usuario = doc.docs.map(doc => doc.data()); 
                criarModal(usuario)
            })
      }
    
      function criarModal(usuario) {
        usuario.forEach(usuario => {
            const telefone = usuario.telefone
            const email = usuario.email

            const div = document.createElement('div')
            div.classList.add('gerarContato')
            document.body.appendChild(div)

            const modalContato = document.createElement('div')
            modalContato.classList.add('modalContato')
            div.appendChild(modalContato)

            const buttonFechar = document.createElement('button')
            buttonFechar.classList.add('botaoFechar')
            modalContato.appendChild(buttonFechar)

            const img = document.createElement('img')
            img.src = `../img/fechar.png`
            buttonFechar.appendChild(img)

            const h2 = document.createElement('h2')
            h2.textContent = 'Quer adotar?'
            modalContato.appendChild(h2)

            const p = document.createElement('p')
            p.textContent = 'Para adotar entre em contato com o dono:'
            modalContato.appendChild(p)

            const aEmail = document.createElement('a')
            aEmail.href = `mailto:${email}`
            aEmail.target = '_black'
            aEmail.textContent = email
            aEmail.classList.add('aEmail')
            modalContato.appendChild(aEmail)

            const numerosApenas = telefone.replace(/\D/g, '');

            const aTelefone = document.createElement('a')
            aTelefone.href = `https://api.whatsapp.com/send?phone=55${numerosApenas}`
            aTelefone.target = '_black'
            aTelefone.textContent = telefone
            aTelefone.classList.add('aTelefone') 
            modalContato.appendChild(aTelefone)
            
            const fecharButton = document.querySelector('.botaoFechar')
            fecharButton.addEventListener('click', (e) => {
            e.preventDefault()

            const gerarContato = document.getElementsByClassName('gerarContato');
            if (gerarContato.length) {
                gerarContato[0].remove();
            }
            })


        })
      }
})


//Carregar outros animais

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