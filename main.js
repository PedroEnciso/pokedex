//get array of every pokemon name
let pokemonNameArray = new Array();
fetch("https://pokeapi.co/api/v2/pokemon/?limit=898")
    .then( resp => resp.json())
    .then( data => {
        let pokemonNames = data.results;
        for (i=0; i < pokemonNames.length; i++) {
            pokemonNameArray[i] = pokemonNames[i].name
        }
    })

let pokeImage = document.getElementById('pokeImage')
let pokeType1 = document.getElementById('pokeType1')
let pokeType2 = document.getElementById('pokeType2')
let type1;

const getPokemon = (userInput) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
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
}


let pokeDescription = document.getElementById('pokeDescription')
 
const getPokemonDescription = (userInput) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${userInput}`)
    .then( resp => resp.json())
    .then( data => {
        for (let j = 0; j < data.flavor_text_entries.length; j++) {

            //make sure description is in english
            if (data.flavor_text_entries[j].language.name == 'en') {
                pokeDescription.innerHTML = data.flavor_text_entries[j].flavor_text
            }
        }
    })
}

const setToNull = () => {
    pokeImage.innerHTML = ''
    pokeType1.innerHTML = ''
    pokeType2.innerHTML = ''
    pokeType2.classList.remove()
    pokeDescription.innerHTML = ''
    document.getElementById('errorMessage').innerHTML = ""
}


let submit = document.getElementById('submit')
let input = document.getElementById('inputBox')

submit.addEventListener('click', () => {
    let userInput = input.value
    setToNull()
    //handle typed names
    if(pokemonNameArray.includes(userInput)) {
        getPokemon(userInput)
        getPokemonDescription(userInput)
        return
    }

    //handle typed number
    else if (parseInt(userInput)) {
        let pokeNumber = parseInt(userInput)
        if (pokeNumber <= 898) {
            getPokemon(pokeNumber)
            getPokemonDescription(pokeNumber)
        }
        else {
            document.getElementById('errorMessage').innerHTML = 'Please choose a number between 1 and 898.'
        }
        return
    }
    document.getElementById('errorMessage').innerHTML = 'Sorry! That Pokemon does not exist.'
})