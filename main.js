// DOM Objects
const pokeName = document.getElementById('pokeName')
const pokeNumber = document.getElementById('pokeNumber')
const pokeImage = document.getElementById('pokeImage')
const pokeType1 = document.getElementById('pokeType1')
const pokeType2 = document.getElementById('pokeType2')
const type1Container = document.getElementById('type1-container')
const type2Container = document.getElementById('type2-container')
const backgroundColor = document.getElementById('background')
const pokeDescription = document.getElementById('pokeDescription')
const errorMessage = document.getElementById('errorMessage')
const submit = document.getElementById('submit')
const input = document.getElementById('inputBox')
const form = document.getElementById('form')
const suggestionPanel = document.getElementById('suggestions')
const prev = document.getElementById('prev')
const next = document.getElementById('next')

// constants and variables
let type1, type2
let userInput
let pokemonNameArray = new Array()
const AUTOCOMPLETE_OPTIONS = 4

const TYPES = [
    'unkown', 'bug', 'dark', 'dragon',
    'electric', 'fairy', 'fighting',
    'fire', 'flying', 'ghost', 'grass', 'ground',
    'ice', 'normal', 'poison', 'psychic',
    'rock', 'steel', 'water'
]


//get array of every pokemon name when the page loads
fetch("https://pokeapi.co/api/v2/pokemon/?limit=898")
    .then( resp => resp.json())
    .then( data => {
        let pokemonNames = data.results;
        for (i=0; i < pokemonNames.length; i++) {
            pokemonNameArray[i] = pokemonNames[i].name
        }
    })

// functions
const getPokemon = (userInput) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
    .then( resp => resp.json())
    .then( data => {
        pokeName.innerHTML = data.name
        pokeNumber.innerHTML = getPokemonNumber(data)
        getPokemonSprite(data)
        type1 = data.types[0].type.name
        pokeType1.innerHTML = type1
        type1Container.classList.add(type1)
        backgroundColor.classList.add(`bkg-${type1}`)
        if (data.types.length > 1) {
            type2 = data.types[1].type.name
            pokeType2.innerHTML = type2
            type2Container.classList.add(type2)
        }
    })
}

const getPokemonDescription = (userInput) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${userInput}`)
    .then( resp => resp.json())
    .then( data => {
        for (let j = 0; j < data.flavor_text_entries.length; j++) {

            //make sure description is in english
            if (data.flavor_text_entries[j].language.name == 'en') {
                pokeDescription.innerHTML = data.flavor_text_entries[j].flavor_text
                return
            }
        }
    })
}

const getPokemonNumber = (data) => {
    switch(data.id.toString().length) {
        case 1: 
            return '#00' + data.id
            break;
        case 2: 
            return '#0' + data.id
            break;
        case 3: 
            return '#' + data.id
            break;
    }
}

const getPokemonSprite = (data) => {
    pokeImage.src = data.sprites.other['official-artwork'].front_default
}

const resetClasses = () => {
    pokeType2.innerHTML = ''
    errorMessage.innerHTML = ""
    input.value = ''


    for(const type of TYPES) {
        type2Container.classList.remove(type)
        type1Container.classList.remove(type)
        backgroundColor.classList.remove(`bkg-${type}`)
    }
}

const setButtons = (pokemon) => {
    let pokeIndex
    if(pokemonNameArray.includes(pokemon)) {
        pokeIndex = pokemonNameArray.indexOf(pokemon)
    }
    else {
        pokeIndex = pokemon - 1
    }
    let prevIndex = pokeIndex - 1
    let nextIndex = pokeIndex + 1

    // set up prev button
    if(prevIndex > -1) {
        prev.getElementsByTagName('p')[1].innerHTML = pokemonNameArray[prevIndex]
        prev.style.visibility = 'visible'
    }
    else {
        prev.style.visibility = 'hidden'
    }

    // set up next button
    if(nextIndex < 898) {
        next.getElementsByTagName('p')[0].innerHTML = pokemonNameArray[nextIndex]
        next.style.visibility = 'visible'
    }
    else {
        next.style.visibility = 'hidden'
    }

}

const loadPokemonData = () => {
    userInput = input.value.toLowerCase()
    //handle typed names
    if(pokemonNameArray.includes(userInput)) {
        resetClasses()
        getPokemon(userInput)
        getPokemonDescription(userInput)
        setButtons(userInput)
        return
    }
    //handle typed numbers
    else if (parseInt(userInput)) {
        let pokeNumber = parseInt(userInput)
        if (pokeNumber <= 898) {
            resetClasses()
            getPokemon(pokeNumber)
            getPokemonDescription(pokeNumber)
            setButtons(userInput)
        }
        else {
            document.getElementById('errorMessage').innerHTML = 'Please choose a number between 1 and 898.'
        }
        return
    }
    document.getElementById('errorMessage').innerHTML = 'Sorry! That Pokemon does not exist.'
}

// event listeners
submit.addEventListener('click', loadPokemonData)

inputBox.addEventListener("keydown", (e) => {
    if(e.keyCode === 13) {
        loadPokemonData()
    }
})

// I copied this from google. It keeps the form from submitting when users search with enter
form.addEventListener("submit", (event) => {
    event.preventDefault();
})

prev.addEventListener('click', () => {
    input.value = prev.getElementsByTagName('p')[1].innerHTML
    loadPokemonData()
})

next.addEventListener('click', () => {
    input.value = next.getElementsByTagName('p')[0].innerHTML
    loadPokemonData()
})

// autocomplete functionality
input.addEventListener("keyup", () => {
    const search = input.value.toLowerCase();
    suggestionPanel.innerHTML = ''
    const suggestions = pokemonNameArray.filter((pokemon) => { 
        return pokemon.startsWith(search)
    })

    if(suggestions.length < AUTOCOMPLETE_OPTIONS) {
        for(let i = 0; i < suggestions.length; i++) {
            addSuggestion(suggestions[i])
        }
    }
    else {
        for(let i = 0; i < AUTOCOMPLETE_OPTIONS; i++) {
            addSuggestion(suggestions[i])
        }
    }
})

const addSuggestion = (name) => {
    const div = document.createElement('div')
    const p = document.createElement('p')
    p.innerHTML = name;
    div.appendChild(p)
    suggestionPanel.appendChild(div)
    if(input.value === '') {
        suggestionPanel.innerHTML = ''
    }

    // search for suggestion
    div.addEventListener('click', () => {
        input.value = div.getElementsByTagName('p')[0].innerHTML
        loadPokemonData()
        suggestionPanel.innerHTML = ''
    })
}
