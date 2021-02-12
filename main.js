
let front = document.getElementById('pokeFront');
let url = "https://pokeapi.co/api/v2/pokemon/";

let pokemonNumber = 300;

fetch(url + pokemonNumber)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data.types);
        front.src = data.sprites.front_default;
    })