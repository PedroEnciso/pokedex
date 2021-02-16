
let url = "https://pokeapi.co/api/v2/pokemon/";
let desc = document.getElementById('description');

let listNumber = 860;

let sprite;
let pokeNumber;
let pokeName;
let pokemonNumber;

for (let i = 1; i <= 10; i++) {
    pokemonNumber = i + listNumber;
    console.log(pokemonNumber + " and i = " + i);
    getPokemon(pokemonNumber, i);
}


function getPokemon(pokemonNumber, i) {
    fetch(url + pokemonNumber)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        sprite = document.getElementById('sprite' + i)
        pokeNumber = document.getElementById('pokeNumber' + i)
        pokeName = document.getElementById('pokeName' + i)


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

function getNextList() {
    if (listNumber == 890) {return}
    listNumber += 10;
    for (let i = 1; i <= 10; i++) {
        pokemonNumber = i + listNumber;
        if (pokemonNumber > 898) {
            getPokemon(1, i)
        }
        console.log(pokemonNumber + " and i = " + i);
        getPokemon(pokemonNumber, i);
    }
}


function getPrevList() {
    if (listNumber == 0) { return }
    listNumber -= 10;
    for (let i = 1; i <= 10; i++) {
        pokemonNumber = i + listNumber;
        console.log(pokemonNumber + " and i = " + i);
        getPokemon(pokemonNumber, i);
    }
}