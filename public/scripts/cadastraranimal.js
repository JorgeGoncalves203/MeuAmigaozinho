import { collection, getDocs, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"
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
            .then((doc) => {
                const idDoc = doc.id
                adicionarImagem(idDoc)
                addAnimal.reset()
                alert('Animal adicionado com sucesso!')
            })
        } 
      });

      function adicionarImagem(idDoc) {
      const file = e.target[0]?.files[0]
      const fileName = file.name;
      const fileNameParts = fileName.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1];
        
                const storageRef = ref(storage, `animais/${idDoc}.${fileExtension}`)
                    uploadBytes(storageRef, file).then(() => {
                        console.log('Uploaded a blob or file!');
                        getDownloadURL(storageRef).then((url) => {
                            console.log('URL da imagem:', url);

                            const animalDocRef = doc(db, "animais", idDoc);

                            setDoc(animalDocRef, {
                                imagem: url, 
                              }, { merge: true })
                                .then(() => {
                                  console.log('URL da imagem adicionada ao documento no Firestore.');
                                })
                                .catch((error) => {
                                  console.error('Erro ao adicionar a URL da imagem ao documento:', error);
                                });
                          });
                        
                      });
                    }
})

