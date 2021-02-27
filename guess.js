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
const button1 = document.getElementById('button1')
const button2 = document.getElementById('button2')
const button3 = document.getElementById('button3')
const button4 = document.getElementById('button4')
const result = document.getElementById('result')
const points = document.getElementById('points')
const pokeImage = document.getElementById('pokeImage')
const playAgain = document.getElementById('playAgain')
const correctCount = document.getElementById('correctCount')
const incorrectCount = document.getElementById('incorrectCount')

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
let pressedButtons = 0
let correct = 0
let wrong = 0


//functions
const loadGame = () => {
    reset()
    getChoices()
    for (let i = 0; i < choiceArray.length; i++) {
        getPokemonName(choiceArray[i])
        .then( result => {
            choiceArray[i] = result
        })
    }

    //waiting 2 seconds to give the API a chance to respond
    setTimeout(function(){
        assignElements()
    }, 2000)
}

const assignElements = () => {
    // make background visible
    background.style.visibility = 'visible'

    // set the description
    correctAnswer = choiceArray[0]
    setPokemonDescription(correctAnswer)

    // set the types
    setPokemonTypes(correctAnswer)

    // randomize choiceArray
    choiceArray = randomizeArray(choiceArray)

    // print choices onto screen
    pressedButtons = 0
    printChoices(choiceArray)
}

const handleAnswer = (id) => {
    pressedButtons++
    // disable pressing multiple buttons
    if (pressedButtons > 1) { return }
    setPokemonImage()
    button = document.getElementById(id)
    let childNode = button.childNodes[1]
    let answer = document.getElementById(childNode.id)
    
    if (answer.innerHTML === correctAnswer) { success() }
    else { failure() }
    correctCount.innerHTML = `Correct Answers: ${correct}`
    incorrectCount.innerHTML = `Wrong Answers: ${wrong}`
    playAgain.style.visibility = 'visible'
}

const setPokemonDescription = (userInput) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${userInput}`)
    .then( resp => resp.json())
    .then( data => {
        for (let j = 0; j < data.flavor_text_entries.length; j++) {

            //make sure description is in english
            if (data.flavor_text_entries[j].language.name == 'en') {
                let editedDescription = editString(data.flavor_text_entries[j].flavor_text, userInput.toUpperCase())
                description.innerHTML = editedDescription
                return
            }
        }
    })
}

const setPokemonTypes = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then( resp => resp.json())
    .then( data => {
        let type1 = data.types[0].type.name
        pokeType1.innerHTML = type1
        type1Container.classList.add(type1)

        //add second type if it exists
        if(data.types.length > 1) {
            let type2 = data.types[1].type.name
            pokeType2.innerHTML = type2
            type2Container.classList.add(type2)
        }
    })
}

const setPokemonImage = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${correctAnswer}`)
    .then( resp => resp.json())
    .then( data => {
        pokeImage.src = data.sprites.other['official-artwork'].front_default
    })
}

const success = () => {
    correct++
    result.classList.add("bg-green-300")
    result.innerHTML = `Correct! It's ${correctAnswer}.`
}

const failure = () => {
    wrong++
    result.classList.add("bg-red-300")
    result.innerHTML = `Sorry, the correct answer is ${correctAnswer}.`

}

const printChoices = (array) => {
    let choiceNumber
    for (let i = 0; i < array.length; i++) {
        choiceNumber = i + 1
        document.getElementById(`choice${choiceNumber}`).innerHTML = array[i]
    }
}

const reset = () => {
    //reset description
    description.innerHTML = ''

    // reset types
    pokeType1.innerHTML = ''
    pokeType2.innerHTML = ''
    for (const type of TYPES) {
        type2Container.classList.remove(type)
        type1Container.classList.remove(type)
    }

    // reset choices as well
    choice1.innerHTML = ''
    choice2.innerHTML = ''
    choice3.innerHTML = ''
    choice4.innerHTML = ''

    // reset results
    pokeImage.src = ''
    result.innerHTML = ''
    result.classList.remove("bg-red-300")
    result.classList.remove("bg-green-300")
    playAgain.style.visibility = 'hidden'
}

async function getPokemonName(number) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then( resp => resp.json())
        .then( data => {
            return data.name
        })
    return response
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

//copied this function from Google, its long but I think it shuffles better than using sort()
const randomizeArray = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

const editString = (string, name) => {
    // edit a description with a misspelled name
    if (string === 'MAWILE') {
        string = 'MAWHILE'
    }
    string = string.replace(name, 'THIS POKEMON')
    return string
}

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const getRandomPokemon = () => Math.floor(Math.random() * 494) + 1


//event listeners
play.addEventListener('click', loadGame)
playAgain.addEventListener('click', loadGame)
