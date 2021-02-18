//get array of every pokemon name
fetch("https://pokeapi.co/api/v2/pokemon/?limit=898")
    .then( resp => resp.json())
    .then( data => {
        let pokemonNames = data.results;
        let pokemonNameArray = new Array();
        for (i=0; i < pokemonNames.length; i++) {
            pokemonNameArray[i] = pokemonNames[i].name
        }
    })

let pokeImage = document.getElementById('pokeImage')
let pokeType1 = document.getElementById('pokeType1')
let pokeType2 = document.getElementById('pokeType2')


fetch("https://pokeapi.co/api/v2/pokemon/steelix/")
    .then( resp => resp.json())
    .then( data => {
        pokeImage.src = data.sprites.other.dream_world.front_default
        console.log(data.types[0])
        pokeType1.innerHTML = data.types[0].type.name
    })

let pokeDescription = document.getElementById('pokeDescription')
 
fetch("https://pokeapi.co/api/v2/pokemon-species/blaziken/")
    .then( resp => resp.json())
    .then( data => {
        pokeDescription.innerHTML = data.flavor_text_entries[0].flavor_text
    })