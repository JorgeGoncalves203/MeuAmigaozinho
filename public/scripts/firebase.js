    const firebaseConfig = {
    apiKey: "AIzaSyCNgXdY_zQBFLfyrmQ3OhKD-HKfZHu6VXc",
    authDomain: "meu-amigaozinho.firebaseapp.com",
    databaseURL: "https://meu-amigaozinho-default-rtdb.firebaseio.com",
    projectId: "meu-amigaozinho",
    storageBucket: "meu-amigaozinho.appspot.com",
    messagingSenderId: "907656799680",
    appId: "1:907656799680:web:7748c79a0c6c58276a1425",
    measurementId: "G-6RSJRY89HX"
  };
  firebase.initializeApp(firebaseConfig);   

  console.log('antes');
  firebase.auth().signInWithEmailAndPassword("mg4426231@gmail.com", "123456").then( response => {
    console.log('sucess', response)
  }).catch(error => {
    console.log('error'.error)
  });
    console.log('depois')