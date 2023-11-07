function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}


function OnChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

function OnChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();

}

function OnChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoenstMatchError().style.display = 
    password == confirmPassword ? "none" : "block";

}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}


function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }
    return true;

}












const form = {
    
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoenstMatchError: () => document.getElementById('password-doenst-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-required-error'),
    emailRequiredError: () => document.getElementById('email-invalid-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
}
