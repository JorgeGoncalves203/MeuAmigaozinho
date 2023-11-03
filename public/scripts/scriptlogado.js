const nomeDoUsuario = localStorage.getItem('nomeDoUsuario');

if (nomeDoUsuario) {
    const ul = document.getElementById('log')
    const liElements = ul.getElementsByTagName('li')
    const fhirtLi = liElements[0]
    const fhirtA = fhirtLi.querySelector('a')
    const imagem = document.createElement('img')
    imagem.src = `../img/usuario.png`
    fhirtA.textContent = ''
    fhirtA.href = `./perfil.html`
    const secondLi = liElements[1]
    const secondA = secondLi.querySelector('a')
    secondA.href = `./perfil.html`
    secondA.textContent = nomeDoUsuario
    fhirtA.appendChild(imagem)

    const divNavLoginMob = document.querySelector('.loginnavmob')
    const a = divNavLoginMob.querySelector('a')
    a.href = `./perfil.html`
    const h2 = a.querySelector('h2')
    h2.textContent = nomeDoUsuario
}