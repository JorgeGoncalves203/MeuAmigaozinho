import { createUserWithEmailAndPassword,  onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { auth } from "./firebaseConfig.js"
import { db } from "./firebaseConfig.js";

const colRef = collection(db, 'usuarios')

const signupForm = document.querySelector('.cadastro-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const senha = signupForm.senha.value

    createUserWithEmailAndPassword(auth, email, senha)
    .then((cred) => {
        alert('Usuario criado com sucesso!!')
        window.location.href = "./login.html";
        signupForm.reset()
    })
    .catch((error) => {
        console.log(error.message)
    })

    addDoc(colRef, {
        email: signupForm.email.value,
        nome: signupForm.name.value,
        telefone: signupForm.tel.value
    })
    
})

////Persistencia e Estado

onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "../index.html";
      const uid = user.uid;
    } 
  });