// DOM objects 
const play = document.getElementById('play')
const background = document.getElementById('background')
const description = document.getElementById('description')
const pokeType1 = document.getElementById('pokeType1')
const pokeType2 = document.getElementById('pokeType2')
const type1Container = document.getElementById('type1-container')
const type2Container = document.getElementById('type2-container')
const choice1 = document.getElementById('choice1')
const choice2 = document.getElementById('choice2')
const choice3 = document.getElementById('choice3')
const choice4 = document.getElementById('choice4')

// variables and constants
const TYPES = [
    'unkown', 'bug', 'dark', 'dragon',
    'electric', 'fairy', 'fighting',
    'fire', 'flying', 'ghost', 'grass', 'ground',
    'ice', 'normal', 'poison', 'psychic',
    'rock', 'steel', 'water'
]
let choiceArray = new Array(4)
let correctAnswer



//functions
const loadGame = () => {
    getChoices()
    for (let i = 0; i < choiceArray.length; i++) {
        getPokemonName(choiceArray[i], i)
        .then( result => {
            choiceArray[i] = result
        })
    }

    setTimeout(function(){
        assignElements()
    }, 2000)
}

const assignElements = () => {
    // make background visible
    background.style.visibility = 'visible'

    // set the description
    let correctAnswer = choiceArray[0]
    console.log(`the correct answer is ${correctAnswer}`)
    getPokemonDescription(correctAnswer)

    //set the types

}

async function getPokemonName(number, i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then( resp => resp.json())
        .then( data => {
            return data.name
        })

    return response
}

const getPokemonDescription = (userInput) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${userInput}`)
    .then( resp => resp.json())
    .then( data => {
        for (let j = 0; j < data.flavor_text_entries.length; j++) {

            //make sure description is in english
            if (data.flavor_text_entries[j].language.name == 'en') {
                console.log(data.flavor_text_entries[j].flavor_text)
                let editedDescription = editString(data.flavor_text_entries[j].flavor_text, userInput.toUpperCase())
                console.log(editedDescription)
                description.innerHTML = editedDescription
                return
            }
        }
    })
}

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const getRandomPokemon = () => Math.floor(Math.random() * 386) + 1

const editString = (string, name) => {
    string = string.replace(name, 'It')
    return string
}

const getChoices = () => {
    choiceArray[0] = getRandomPokemon()
    for(let i = 1; i < choiceArray.length; i++) {
        fillArray(choiceArray, i)
    }
}

const fillArray = (array, i) => {
    let randomNumber = getRandomPokemon()
    if (array.includes(randomNumber)) {
        fillArray(array, i)
    }
    else {
        array[i] = randomNumber
    }
}


//event listeners
play.addEventListener('click', loadGame)
