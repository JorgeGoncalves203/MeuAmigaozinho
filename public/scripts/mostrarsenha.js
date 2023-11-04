function mostrarOcultarSenha(inputId, olhoId) {
    var passwordInput = document.getElementById(inputId);
    var olhoIcon = document.getElementById(olhoId);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        olhoIcon.classList.remove("fa-eye");
        olhoIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        olhoIcon.classList.remove("fa-eye-slash");
        olhoIcon.classList.add("fa-eye");
    }
}