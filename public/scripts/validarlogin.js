function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}


function OnChangeEmail() {
    toggleEmailErros();
    toggleButtonsDisable();
}

function OnChangePassword() {
    toggleButtonsDisable();
    togglePasswordErros();
}

function isEmailValid() {
    const email = form.email().value;
    if(!email) {
        return false;
    }
    return validateEmail(email);
}


function toggleEmailErros() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

}

function togglePasswordErros() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;


    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
}

function register() {
    window.location.href = "../pages/cadastro.html"
}


const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-required-error'),
    emailRequiredError: () => document.getElementById('email-invalid-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
}
