//get array of every pokemon name
/*
fetch("https://pokeapi.co/api/v2/pokemon/?limit=898")
    .then( resp => resp.json())
    .then( data => {
        let pokemonNames = data.results;
        let pokemonNameArray = new Array();
        for (i=0; i < pokemonNames.length; i++) {
            pokemonNameArray[i] = pokemonNames[i].name
        }
    })
    */
let pokeImage = document.getElementById('pokeImage')
let pokeType1 = document.getElementById('pokeType1')
let pokeType2 = document.getElementById('pokeType2')
let type1;


fetch("https://pokeapi.co/api/v2/pokemon/87/")
    .then( resp => resp.json())
    .then( data => {
        document.getElementById('pokeName').innerHTML = data.name
        pokeImage.src = data.sprites.other.dream_world.front_default
        type1 = data.types[0].type.name
        pokeType1.innerHTML = type1
        document.getElementById('type1-container').classList.add(type1)
        document.getElementById('background').classList.add(`bg-${type1}`)
        if (data.types.length > 1) {
            pokeType2.innerHTML = data.types[1].type.name
            document.getElementById('type2-container').classList.add(data.types[1].type.name)
        }
    })

let pokeDescription = document.getElementById('pokeDescription')
 
fetch("https://pokeapi.co/api/v2/pokemon-species/87/")
    .then( resp => resp.json())
    .then( data => {
        pokeDescription.innerHTML = data.flavor_text_entries[0].flavor_text
    })