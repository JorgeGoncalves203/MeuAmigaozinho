function mostrarOcultarSenha() {
    var senhaInput = document.getElementById("senha");
    var olhoIcon = document.getElementById("olho");
    
    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        olhoIcon.classList.remove("fa-eye");
        olhoIcon.classList.add("fa-eye-slash");
    } else {
        senhaInput.type = "password";
        olhoIcon.classList.remove("fa-eye-slash");
        olhoIcon.classList.add("fa-eye");
    }
}

