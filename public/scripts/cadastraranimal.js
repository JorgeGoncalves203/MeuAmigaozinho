import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"
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

    
    
    const castSim = document.getElementById('castsim')
    const tratamentoPulgasSim = document.getElementById('tratamento_pulgassim')

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const docRef = addDoc(colRef, {
                nome: addAnimal.nomeAnimal.value,
                especie: addAnimal.especie.value,
                sexo: addAnimal.sexo.value,
                porte: addAnimal.porte.value,
                raca: addAnimal.raca.value,
                idade: addAnimal.idadeAnos.value,
                vacinas: addAnimal.vacinas.value,
                tratamentoPulgas: tratamentoPulgasSim.checked ? "Sim" : "Não",
                castrado: castSim.checked ? "Sim" : "Não",
                cidade: addAnimal.cidade.value,
                temperamento: addAnimal.temperamento.value,
                descricao: addAnimal.descricao.value,
                uid: user.uid
            })
            .then(() => {
                addAnimal.reset()
                alert('Animal adicionado com sucesso!')
            })
        } 
      });
      const file = e.target[0]?.files[0]
        
                const storageRef = ref(storage, `animais/${file.name}`)
                    uploadBytes(storageRef, file).then(() => {
                        console.log('Uploaded a blob or file!');
                      });
})

