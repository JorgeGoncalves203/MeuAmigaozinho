import { signOut, onAuthStateChanged, deleteUser } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { collection, getDocs, doc, query, where, onSnapshot, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { auth } from "./firebaseConfig.js"
import { db } from "./firebaseConfig.js";

const colRef = collection(db, 'usuarios')

onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioLogado(user)
    } 
  });

function usuarioLogado(user) {
    const q = query(colRef, where("email", "==", user.email))
    
    onSnapshot(q, snapshot => {
        const usuario = snapshot.docs.map(doc => doc.data()); 
        informacoesUsuario(usuario)
        })
} 

function informacoesUsuario(usuario) {
    
    usuario.forEach(usuario => {
        const perfilEditarForm = document.querySelector('.perfil-form')
        
        perfilEditarForm.name.value = usuario.nome
        perfilEditarForm.email.value = usuario.email
        perfilEditarForm.tel.value = usuario.telefone
        perfilEditarForm.senha.value = "********"
    })
}

//Editar Nome

const editarNomeButton = document.getElementById('editarNome')
editarNomeButton.addEventListener('click', (e) => {
    e.preventDefault()

    const div = document.createElement('div')
    div.classList.add('fundoModal')
    
    const div1 = document.createElement('div')
    div1.classList.add('modalEditarNome')
    
    const h2 = document.createElement('h3')
    h2.textContent = 'Altere seu Nome:'

    const buttonFechar = document.createElement('button')
    buttonFechar.classList.add('botaoFechar')

    const img = document.createElement('img')
    img.src = `../img/fechar.png`

    const formNome = document.createElement('form')
    formNome.classList.add('formNome')

    const input = document.createElement('input')
    input.type = 'text'
    input.name = 'name'
    input.id = 'namen'

    const buttonSalvar = document.createElement('button')
    buttonSalvar.classList.add('botaoSalvar')
    buttonSalvar.textContent = 'Salvar alterações'
    
    div.appendChild(div1)
    div1.appendChild(h2)
    div1.appendChild(buttonFechar)
    buttonFechar.appendChild(img)
    div1.appendChild(formNome)
    formNome.appendChild(input)
    formNome.appendChild(buttonSalvar)
    document.body.appendChild(div);
    
    
    const fecharButton = document.querySelector('.botaoFechar')
    fecharButton.addEventListener('click', (e) => {
    e.preventDefault()

    const fundoModal = document.getElementsByClassName('fundoModal');
    if (fundoModal.length) {
        fundoModal[0].remove();
    }
    })

    onAuthStateChanged(auth, (user) => {
        if (user) {
        usuarioLogado(user)
        } 
    });

    function usuarioLogado(user) {
        const q = query(colRef, where("email", "==", user.email))
        
        onSnapshot(q, snapshot => {
            const usuario = snapshot.docs.map(doc => doc.data()); 
            informacoesUsuario(usuario)
            })
    } 

    function informacoesUsuario(usuario) {
        
        usuario.forEach(usuario => {
            const formNome = document.querySelector('.formNome')
            
            formNome.name.value = usuario.nome
        })
    }

    const colRef = collection(db, 'usuarios')

    const salvarButon = document.querySelector('.botaoSalvar')
    salvarButon.addEventListener('click', (e) => {
    e.preventDefault()

        onAuthStateChanged(auth, (user) => {
        if (user) {
        usuarioLog(user)
        } 
    });

    function usuarioLog(user) {
        const q = query(colRef, where("email", "==", user.email))
        
        onSnapshot(q, snapshot => {
            const usuario = snapshot.docs.map(doc => doc.id); 
            fazerUpdate(usuario)
            })
    }
    
    })

    function fazerUpdate(usuarioId) {

        usuarioId.forEach(usuarioId => {
        const docRef = doc(db, 'usuarios', usuarioId)

        const formNome = document.querySelector('.formNome')

        updateDoc(docRef, {
            nome: formNome.name.value
        })
        .then(() => {
            const fundoModal = document.getElementsByClassName('fundoModal');
    if (fundoModal.length) {
        fundoModal[0].remove();
    }
    })
    })
    }
})

//Editar Email

const editarEmailButton = document.getElementById('editarEmail')
editarEmailButton.addEventListener('click', (e) => {
    e.preventDefault()

    const div = document.createElement('div')
    div.classList.add('fundoModal')
    
    const div1 = document.createElement('div')
    div1.classList.add('modalEditarNome')
    
    const h2 = document.createElement('h3')
    h2.textContent = 'Altere seu Email:'

    const buttonFechar = document.createElement('button')
    buttonFechar.classList.add('botaoFechar')

    const img = document.createElement('img')
    img.src = `../img/fechar.png`

    const formEmail = document.createElement('form')
    formEmail.classList.add('formEmail')

    const input = document.createElement('input')
    input.type = 'email'
    input.name = 'email'
    input.id = 'emailn'

    const buttonSalvar = document.createElement('button')
    buttonSalvar.classList.add('botaoSalvar')
    buttonSalvar.textContent = 'Salvar alterações'
    
    div.appendChild(div1)
    div1.appendChild(h2)
    div1.appendChild(buttonFechar)
    buttonFechar.appendChild(img)
    div1.appendChild(formEmail)
    formEmail.appendChild(input)
    formEmail.appendChild(buttonSalvar)
    document.body.appendChild(div);
    
    
    const fecharButton = document.querySelector('.botaoFechar')
    fecharButton.addEventListener('click', (e) => {
    e.preventDefault()

    const fundoModal = document.getElementsByClassName('fundoModal');
    if (fundoModal.length) {
        fundoModal[0].remove();
    }
    })

    onAuthStateChanged(auth, (user) => {
        if (user) {
        usuarioLogado(user)
        } 
    });

    function usuarioLogado(user) {
        const q = query(colRef, where("email", "==", user.email))
        
        onSnapshot(q, snapshot => {
            const usuario = snapshot.docs.map(doc => doc.data()); 
            informacoesUsuario(usuario)
            })
    } 

    function informacoesUsuario(usuario) {
        
        usuario.forEach(usuario => {
            const formEmail = document.querySelector('.formEmail')
            
            formEmail.email.value = usuario.email
        })
    }

    const colRef = collection(db, 'usuarios')

    const salvarButon = document.querySelector('.botaoSalvar')
    salvarButon.addEventListener('click', (e) => {
    e.preventDefault()

        onAuthStateChanged(auth, (user) => {
        if (user) {
        usuarioLog(user)
        } 
    });

    function usuarioLog(user) {
        const q = query(colRef, where("email", "==", user.email))
        
        onSnapshot(q, snapshot => {
            const usuario = snapshot.docs.map(doc => doc.id); 
            fazerUpdate(usuario)
            })
    }
    
    })

    function fazerUpdate(usuarioId) {

        usuarioId.forEach(usuarioId => {
        const docRef = doc(db, 'usuarios', usuarioId)

        const formEmail = document.querySelector('.formEmail')

        updateDoc(docRef, {
            email: formEmail.email.value
        })
        .then(() => {
            const fundoModal = document.getElementsByClassName('fundoModal');
    if (fundoModal.length) {
        fundoModal[0].remove();
    }
    })
    })
    }



})

//Editar Telefone

const editarTelefoneButton = document.getElementById('editarTelefone')
editarTelefoneButton.addEventListener('click', (e) => {
    e.preventDefault()

    const div = document.createElement('div')
    div.classList.add('fundoModal')
    
    const div1 = document.createElement('div')
    div1.classList.add('modalEditarNome')
    
    const h2 = document.createElement('h3')
    h2.textContent = 'Altere seu Telefone:'

    const buttonFechar = document.createElement('button')
    buttonFechar.classList.add('botaoFechar')

    const img = document.createElement('img')
    img.src = `../img/fechar.png`

    const formTel = document.createElement('form')
    formTel.classList.add('formTel')

    const input = document.createElement('input')
    input.type = 'tel'
    input.name = 'tel'
    input.id = 'phonen'

    const buttonSalvar = document.createElement('button')
    buttonSalvar.classList.add('botaoSalvar')
    buttonSalvar.textContent = 'Salvar alterações'
    
    div.appendChild(div1)
    div1.appendChild(h2)
    div1.appendChild(buttonFechar)
    buttonFechar.appendChild(img)
    div1.appendChild(formTel)
    formTel.appendChild(input)
    formTel.appendChild(buttonSalvar)
    document.body.appendChild(div);
    
    
    const fecharButton = document.querySelector('.botaoFechar')
    fecharButton.addEventListener('click', (e) => {
    e.preventDefault()

    const fundoModal = document.getElementsByClassName('fundoModal');
    if (fundoModal.length) {
        fundoModal[0].remove();
    }
    })

    onAuthStateChanged(auth, (user) => {
        if (user) {
        usuarioLogado(user)
        } 
    });

    function usuarioLogado(user) {
        const q = query(colRef, where("email", "==", user.email))
        
        onSnapshot(q, snapshot => {
            const usuario = snapshot.docs.map(doc => doc.data()); 
            informacoesUsuario(usuario)
            })
    } 

    function informacoesUsuario(usuario) {
        
        usuario.forEach(usuario => {
            const formTel = document.querySelector('.formTel')
            
            formTel.tel.value = usuario.telefone
        })
    }

    const colRef = collection(db, 'usuarios')

    const salvarButon = document.querySelector('.botaoSalvar')
    salvarButon.addEventListener('click', (e) => {
    e.preventDefault()

        onAuthStateChanged(auth, (user) => {
        if (user) {
        usuarioLog(user)
        } 
    });

    function usuarioLog(user) {
        const q = query(colRef, where("email", "==", user.email))
        
        onSnapshot(q, snapshot => {
            const usuario = snapshot.docs.map(doc => doc.id); 
            fazerUpdate(usuario)
            })
    }
    
    })

    function fazerUpdate(usuarioId) {

        usuarioId.forEach(usuarioId => {
        const docRef = doc(db, 'usuarios', usuarioId)

        const formNome = document.querySelector('.formTel')

        updateDoc(docRef, {
            telefone: formNome.tel.value
        })
        .then(() => {
            const fundoModal = document.getElementsByClassName('fundoModal');
    if (fundoModal.length) {
        fundoModal[0].remove();
    }
    })
    })
    }



})

//Sair

const logoutButton = document.querySelector('.sair')
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        window.location.href = "../index.html";
        localStorage.removeItem('nomeDoUsuario');
        alert('O usuário foi deslogado!')
    })
    .catch((error) => {
        console.log(error.message)
    })
})

//Excluir Conta 

const excluirContaButton = document.querySelector('.excluir')
excluirContaButton.addEventListener('click', (e) => {
    e.preventDefault()

    const div = document.createElement('div')
    div.classList.add('fundoModal')
    document.body.appendChild(div);
    
    const div1 = document.createElement('div')
    div1.classList.add('modalConfirmarExclusao')
    div.appendChild(div1)
    
    const h2 = document.createElement('h3')
    h2.textContent = 'Tem certeza de que deseja excluir a conta?'
    div1.appendChild(h2)

    const buttonFechar = document.createElement('button')
    buttonFechar.classList.add('botaoFecharExcluir')
    div1.appendChild(buttonFechar)

    const img = document.createElement('img')
    img.src = `../img/fechar.png`
    buttonFechar.appendChild(img)

    const buttonConfirmar = document.createElement('button')
    buttonConfirmar.classList.add('buttonConfirmar')
    buttonConfirmar.textContent = 'Confirmar'
    div1.appendChild(buttonConfirmar)

    const fecharButton = document.querySelector('.botaoFecharExcluir')
    fecharButton.addEventListener('click', (e) => {
    e.preventDefault()

    const fundoModal = document.getElementsByClassName('fundoModal');
    if (fundoModal.length) {
        fundoModal[0].remove();
    }
    })

    const confirmarButton = document.querySelector('.buttonConfirmar')
    confirmarButton.addEventListener('click', (e) => {
    e.preventDefault()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const q = query(collection(db, 'usuarios'), where('uid', '==', user.uid))
            const qAnimais = query(collection(db, 'animais'), where('uid', '==', user.uid))

            getDocs(q)
            .then((doc) => {
                const usuario = doc.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                }); 
                usuario.forEach(usuario => {
                    const usuarioId = usuario.id
                    console.log(usuarioId)
                    deletarDocRef(usuarioId)
                })
            })

            getDocs(qAnimais)
            .then((doc) => {
                const animais = doc.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                }); 
                animais.forEach(animal => {
                    const animalId = animal.id
                    console.log(animalId)
                    deletarAnimaisRef(animalId)
                })
            })
            
            function deletarAnimaisRef(animalId) {
                deleteDoc(doc(db, "animais", animalId));
            }


            function deletarDocRef(usuarioId) {
                deleteDoc(doc(db, "usuarios", usuarioId));

                deleteUser(user).then(() => {
                    window.location.href = "../index.html";
                    localStorage.removeItem('nomeDoUsuario');
                }).catch((error) => {
                });
            }
        } 
      });
    
    })
})