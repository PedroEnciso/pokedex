
let url = "https://pokeapi.co/api/v2/pokemon/";
let desc = document.getElementById('description');

let pokemonNumber = 10;

let sprite;
let pokeNumber;
let pokeName;

for (let i = 1; i <= pokemonNumber; i++)
fetch(url + i)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        sprite = document.getElementById('sprite' + i)
        pokeNumber = document.getElementById('pokeNumber' + i)
        pokeName = document.getElementById('pokeName' + i)


        pokeNumber.innerHTML = '# ' + i;
        sprite.src = data.sprites.front_default;
        pokeName.innerHTML = data.name;
        /*
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + i)
            .then(function(resp) {
                return resp.json();
            })
            .then(function(data2) {
                description.innerHTML = data2.flavor_text_entries[0].flavor_text
            })*/
    })