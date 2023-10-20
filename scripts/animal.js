const url = new URL(window.location.href);
const id = +url.searchParams.get("id");
buscarAnimal(id);

function buscarAnimal(id) {
    fetch("../scripts/animais.json")
        .then((json) => json.json())
        .then((animais) => {
            for (let i = 0; i < animais.length; i++) {
                if (animais[i]["id"] == id) {
                    carregarAnimal(animais[i]);
                }
            };
        });
}

function carregarAnimal(animal) {
    carregarNome(animal["nome"]);

    carregarImagem(animal["imagem"]);

    carregarRegiao(animal["regiao"]);

    carregarEspecie(animal["especie"]);

    carregarPorte(animal["porte"]);

    carregarSexo(animal["sexo"]);

    carregarRaca(animal["raca"]);

    carregarIdade(animal["idade"]);

    carregarVacinas(animal["vacinas"]);

    carregarTratamentoPulgas(animal["tratamento-pulgas"]);

    carregarCastracao(animal["castracao"]);

    carregarTemperamento(animal["temperamento"]);

    carregarObservacoes(animal["observacoes"]);

}

function carregarNome(nomeDoAnimal) {
    const nome = document.querySelector("#nome h1");
    nome.textContent = nomeDoAnimal;
}

function carregarImagem(nomeDaImagem) {
    imagem = document.querySelector("#img img");
    imagem.src = `../img/${nomeDaImagem}`
}

function carregarRegiao(nomeDaRegiao) {
    const regiao = document.querySelector("#regiao p");
    regiao.textContent = nomeDaRegiao;
}

function carregarEspecie(nomeDaEspecie) {
    const especie = document.querySelector("#especie p");
    especie.textContent = nomeDaEspecie;
}

function carregarPorte(nomeDoPorte) {
    const porte = document.querySelector("#porte p");
    porte.textContent = nomeDoPorte;
}

function carregarSexo(nomeDoSexo) {
    const sexo = document.querySelector("#sexo p");
    sexo.textContent = nomeDoSexo;
}

function carregarRaca(nomeDaRaca) {
    const raca = document.querySelector("#raca p");
    raca.textContent = nomeDaRaca;
}

function carregarIdade(nomeDaIdade) {
    const idade = document.querySelector("#idade p");
    idade.textContent = nomeDaIdade;
}

function carregarVacinas(nomeDaVacina) {
    const vacinas = document.querySelector("#vacinas p");
    vacinas.textContent = nomeDaVacina;
}

function carregarTratamentoPulgas(nomeDoTratamentoPulgas) {
    const pulgas = document.querySelector("#pulgas p");
    pulgas.textContent = nomeDoTratamentoPulgas;
}

function carregarCastracao(nomeDoCastracao) {
    const castracao = document.querySelector("#castracao p");
    castracao.textContent = nomeDoCastracao;
}

function carregarTemperamento(nomeDoTemperamento) {
    const temperamento = document.querySelector("#temperamento p");
    temperamento.textContent = nomeDoTemperamento;
}

function carregarObservacoes(nomeDasObsevacaoes) {
    const observacoes = document.querySelector("#observacoes p");
    observacoes.textContent = nomeDasObsevacaoes;
}