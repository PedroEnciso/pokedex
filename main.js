
let front = document.getElementById('sprite1');
let url = "https://pokeapi.co/api/v2/pokemon/";
let desc = document.getElementById('description');

let pokemonNumber = 1;

fetch(url + pokemonNumber)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        front.src = data.sprites.front_default;
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemonNumber)
            .then(function(resp) {
                return resp.json();
            })
            .then(function(data2) {
                description.innerHTML = data2.flavor_text_entries[0].flavor_text
            })
    })