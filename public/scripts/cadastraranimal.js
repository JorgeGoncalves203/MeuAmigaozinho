import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { ref } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"
import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js"
import { storage } from "./firebaseConfig.js"


const colRef = collection(db, 'animais')

onAuthStateChanged(auth, (user) => {
    if (user) {

    } else {
        const div = document.createElement('div');
        div.classList.add('impedirAcesso');
        
        const div1 = document.createElement('div');
        div1.classList.add('modalImpedir');

        const h2 = document.createElement('h2');
        h2.innerHTML = "O usuario precisa estar logado!";

        div1.appendChild(h2);
        div.appendChild(div1)

        document.body.appendChild(div);
    }
  });

const addAnimal = document.getElementById('animalForm')
addAnimal.addEventListener('submit', (e) => {
    e.preventDefault()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            addDoc(colRef, {
                nome: addAnimal.nome.value,
                especie: addAnimal.especie.value,
                sexo: addAnimal.sexo.value,
                idade: addAnimal.raca.value,
                vacinas: addAnimal.vacinas.value,
                tratamento: addAnimal.tratamento.value,
                castracao: addAnimal.castracao.value,
                temperamento: addAnimal.temperamento.value,
                observacoes: addAnimal.observacoes.value,
                uid: user.uid
        
            })
            .then(() => {
                addAnimal.reset()
                alert('Animal adicionado com sucesso!')
                console.log
            })

            const inputImagem = document.querySelector("input[type=file]");

            
        } 
      });
})

