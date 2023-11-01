function OnChangeEmail() {
    toggleEmailErros();
    toggleButtonsDisable();
}



const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-required-error'),
    emailRequiredError: () => document.getElementById('email-invalid-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
}
