
let url = "https://pokeapi.co/api/v2/pokemon/";
let desc = document.getElementById('description');

let listNumber = 0;

let sprite;
let pokeNumber;
let pokeName;
let pokemonNumber;

for (let i = 1; i <= 10; i++){

    pokemonNumber = i + listNumber;
    fetch(url + pokemonNumber)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            sprite = document.getElementById('sprite' + pokemonNumber)
            pokeNumber = document.getElementById('pokeNumber' + pokemonNumber)
            pokeName = document.getElementById('pokeName' + pokemonNumber)


            pokeNumber.innerHTML = '# ' + pokemonNumber;
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
}