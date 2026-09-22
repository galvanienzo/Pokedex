let idAtual = 1;

const nomePokemon = document.getElementById('nomePokemon');
const idPokemon = document.getElementById('idPokemon');
const imagemPokemon = document.getElementById('imagemPokemon');
const tipoPokemon = document.getElementById('tipoPokemon');
const alturaPokemon = document.getElementById('alturaPokemon');
const pesoPokemon = document.getElementById('pesoPokemon');

const campoBusca = document.getElementById('campoBusca');
const btnBuscar = document.getElementById('btnBuscar');
const btnAnterior = document.getElementById('btnAnterior');
const btnProximo = document.getElementById('btnProximo');

function carregarPokemon(busca) {
    nomePokemon.innerText = "Buscando...";

    fetch('https://pokeapi.co/api/v2/pokemon/' + busca)
        .then(function(resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Não encontrado");
            }
        })
        .then(function(dados) {
            idAtual = dados.id;

            nomePokemon.innerText = dados.name.toUpperCase();
            idPokemon.innerText = dados.id;
            imagemPokemon.src = dados.sprites.front_default;

            let listaTipos = [];
            for (let i = 0; i < dados.types.length; i++) {
                listaTipos.push(dados.types[i].type.name);
            }
            tipoPokemon.innerText = listaTipos.join(', ');

            alturaPokemon.innerText = dados.height / 10;
            pesoPokemon.innerText = dados.weight / 10;
        })
        .catch(function(erro) {
            nomePokemon.innerText = "Não encontrado!";
            idPokemon.innerText = "-";
            imagemPokemon.src = "";
            tipoPokemon.innerText = "-";
            alturaPokemon.innerText = "-";
            pesoPokemon.innerText = "-";
        });
}

btnBuscar.addEventListener('click', function() {
    let valor = campoBusca.value.toLowerCase().trim();
    if (valor !== "") {
        carregarPokemon(valor);
    }
});

btnAnterior.addEventListener('click', function() {
    if (idAtual > 1) {
        idAtual = idAtual - 1;
        carregarPokemon(idAtual);
    }
});

btnProximo.addEventListener('click', function() {
    idAtual = idAtual + 1;
    carregarPokemon(idAtual);
});

carregarPokemon(idAtual);