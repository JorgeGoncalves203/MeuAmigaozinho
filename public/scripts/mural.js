import { collection, getDocs, addDoc, doc, setDoc, query, where } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"
import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js"
import { storage } from "./firebaseConfig.js"


const colRef = collection(db, 'publicacoes')

const querySnapshot = await getDocs(collection(db, 'publicacoes'));
    const publicacoes = querySnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    }); 
    adicionarPublicacoes(".cards", publicacoes);


function adicionarPublicacoes(local, publicacoes) {
    publicacoes.forEach(publicacao => {
        adicionarElementos(local, publicacao);
    });
}

function adicionarElementos(local, publicacao) {
const elemento = document.querySelector(local);

const novaPublicacao = document.createElement("div");
novaPublicacao.classList.add("cardPubli");

const infoUser = document.createElement("div");
infoUser.classList.add('container')
novaPublicacao.appendChild(infoUser);

adicionarImagemUser(infoUser)

adicionarNome(infoUser, publicacao.nome);

adicionarImagem(novaPublicacao, publicacao.imagem);

adicionarTexto(novaPublicacao, publicacao.text);

elemento.appendChild(novaPublicacao);
}

function adicionarImagemUser(local) {
    const imagem = document.createElement("img")
    imagem.src = `../img/usuario.png`
    imagem.classList.add('ftuser')
    local.appendChild(imagem);
}

function adicionarNome(local, nomeDoUsuario) {
    const nome = document.createElement("h3");
    nome.id = 'user'
    nome.textContent = nomeDoUsuario;
    local.appendChild(nome);
}

function adicionarImagem(local, nomeDaImagem) {
const imagem = document.createElement("img");
imagem.src = nomeDaImagem
imagem.classList.add('imagemPubli')
local.appendChild(imagem);
}

function adicionarTexto(local, textPublicacao) {
const text = document.createElement("p");
text.textContent = textPublicacao;
local.appendChild(text);
}






onAuthStateChanged(auth, (user) => {
    if(user) {

        const botaoAdicionar = document.createElement('button')
        botaoAdicionar.classList.add('botaoAdicionar')
        document.body.appendChild(botaoAdicionar)

        const imgAdicionar = document.createElement('img')
        imgAdicionar.src = `../img/botao-adicionar.png`
        botaoAdicionar.appendChild(imgAdicionar)

        botaoAdicionar.addEventListener('click', (e) => {
            const fundoModal = document.createElement('div')
            fundoModal.classList.add('fundoModal')
            document.body.appendChild(fundoModal)

            const modalCriarPostagem = document.createElement('div')
            modalCriarPostagem.classList.add('modalCriarPostagem')
            fundoModal.appendChild(modalCriarPostagem)

            const title = document.createElement('h2')
            title.textContent = 'Criar publicação'
            modalCriarPostagem.appendChild(title)

            const buttonFechar = document.createElement('button')
            buttonFechar.classList.add('botaoFechar')
            modalCriarPostagem.appendChild(buttonFechar)

            const imgFechar = document.createElement('img')
            imgFechar.src = `../img/fechar.png`
            buttonFechar.appendChild(imgFechar)

            const hr = document.createElement('hr')
            modalCriarPostagem.appendChild(hr)

            const formPublicacao = document.createElement('form')
            formPublicacao.classList.add('formPublicacao')
            modalCriarPostagem.appendChild(formPublicacao)

            const textoPublicacao = document.createElement('textarea')
            textoPublicacao.name = 'textoPublicacao'
            textoPublicacao.id = 'textoPublicacao'
            textoPublicacao.rows = '7'
            textoPublicacao.cols = '50'
            textoPublicacao.placeholder = 'Conte sua aventura...'
            textoPublicacao.maxLength = '500'
            textoPublicacao.required = true
            formPublicacao.appendChild(textoPublicacao)

            //const labelImagem = document.createElement('label')
            //labelImagem.for = 'adicionarImagemPubli'
            //labelImagem.id = 'labelImagem'
            //labelImagem.textContent = 'Adicionar Imagem'
            //formPublicacao.appendChild(labelImagem)

            const divAddImg = document.createElement('div')
            divAddImg.classList.add('divAddImg')
            formPublicacao.appendChild(divAddImg)

            const prevImg = document.createElement('img')
            prevImg.id = 'prevImg'
            divAddImg.appendChild(prevImg)

            const adicionarImagemPubli = document.createElement('input')
            adicionarImagemPubli.type = 'file'
            adicionarImagemPubli.name = 'adicionarImagemPubli'
            adicionarImagemPubli.id = 'adicionarImagemPubli'
            adicionarImagemPubli.accept = 'image/png, image/jpeg'
            adicionarImagemPubli.required = true
            divAddImg.appendChild(adicionarImagemPubli)

            const publicarButton = document.createElement('button')
            publicarButton.textContent = 'Publicar'
            publicarButton.classList.add('publicarButton')
            formPublicacao.appendChild(publicarButton)

            
            adicionarImagemPubli.addEventListener('change', function() {
                document.getElementById('prevImg').src = window.URL.createObjectURL(this.files[0]);
              });

              const fecharButton = document.querySelector('.botaoFechar')
                fecharButton.addEventListener('click', (e) => {
                e.preventDefault()

                const fundoModal = document.getElementsByClassName('fundoModal');
                if (fundoModal.length) {
                    fundoModal[0].remove();
                }
            })

            formPublicacao.addEventListener('submit', (e) => {
            e.preventDefault()
            showLoading()
            const userRef = collection(db, 'usuarios')
            const q = query(userRef, where('uid', '==', user.uid))

            getDocs(q)
            .then((doc) => {
                const usuario = doc.docs.map(doc => doc.data());
                pegarNome(usuario)
            })

            function pegarNome(usuario) {
                usuario.forEach(usuario => {
                const userName = usuario.nome
                criarPubli(userName)
            })
            }

            
            function criarPubli(userName) {
                const nomeCompleto = userName.split(' ')
                const primeiroNomeInteito = nomeCompleto[0]
                const tamanhoLimite = 12;
                const primeiroNome = primeiroNomeInteito.slice(0, tamanhoLimite)

                addDoc(collection(db, 'publicacoes'), {
                    nome: primeiroNome,
                    text: textoPublicacao.value,
                    uid: user.uid
                })
                .then((doc) => {
                    const idDoc = doc.id
                    adicionarImagem(idDoc, adicionarImagemPubli.files[0])
                    formPublicacao.reset()
                })
            }
            })
        })
    }


    function adicionarImagem(idDoc, e) {
        const file = e
        const fileName = file.name;
        const fileNameParts = fileName.split('.');
        const fileExtension = fileNameParts[fileNameParts.length - 1];
          
                  const storageRef = ref(storage, `publicacoes/${idDoc}.${fileExtension}`)
                      uploadBytes(storageRef, file).then(() => {
                          getDownloadURL(storageRef).then((url) => {
  
                              const publicacaoDocRef = doc(db, "publicacoes", idDoc);
  
                              setDoc(publicacaoDocRef, {
                                  imagem: url, 
                                }, { merge: true })
                                  .then(() => {
                                    hideLoading()
                                    const fundoModal = document.getElementsByClassName('fundoModal');
                                    if (fundoModal.length) {
                                        fundoModal[0].remove();
                                    }
                                    alert('Publicação feita!')
                                  })
                                  .catch((error) => {
                                    console.error('Erro ao adicionar a URL da imagem ao documento:', error);
                                  });
                            });
                          
                        });
                      }
})