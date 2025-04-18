const container = document.querySelector(".container")
const keyboardContainer = document.querySelector(".keyBoardContainer")

console.log(keyboardContainer);


const letterKeyBoard = [["A","Z","E","R","T","Y","U","I","O","P"],["Q","S","D","F","G","H","J","K","L","M"],[".","W","X","C","V","B","N","⌫","↲"]]

let entry 
let lastEntry = []
let trys 
let letter
let find 

let wordList

var modal = document.getElementById("myModal");
var modalContent = document.querySelector(".modal-content");

async function startGame (){
    let wordLength = getRandom(4, 9)

    container.innerHTML = ""
    keyboardContainer.innerHTML = ""

    entry = []
    lastEntry = []
    word = ""
    find = false
    trys = 1

    wordList = []

    modalContent.innerHTML = "<p></p>"

    await getJson(wordLength)
    await getword(wordLength)
    

  
}


async function getJson(wordLenght) {
    const url = `https://nofinu.github.io/wordle/words/word${wordLenght}.json`
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            wordList = data;
        })
        .catch(error => {
            console.error('Error fetching the JSON data:', error);
        });
    // wordList = await response.json();


}

async function getword(wordLenght) {
    const url = `https://random-word-api.herokuapp.com/word?number=1&lang=fr&length=${wordLenght}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }


        const json = await response.json();
        // console.log(json);

        word = json[0]

        word = word.replace(new RegExp(/\s/g), "");
        word = word.replace(new RegExp(/[àáâãäå]/g), "a");
        word = word.replace(new RegExp(/æ/g), "ae");
        word = word.replace(new RegExp(/ç/g), "c");
        word = word.replace(new RegExp(/[èéêë]/g), "e");
        word = word.replace(new RegExp(/[ìíîï]/g), "i");
        word = word.replace(new RegExp(/ñ/g), "n");
        word = word.replace(new RegExp(/[òóôõö]/g), "o");
        word = word.replace(new RegExp(/œ/g), "oe");
        word = word.replace(new RegExp(/[ùúûü]/g), "u");
        word = word.replace(new RegExp(/[ýÿ]/g), "y");
        word = word.replace(new RegExp(/\W/g), "");
        console.log(word);


        //initialisation de la page
        init()
        initKeyBoard()
        //reecuperation des div letter
        selectLetter()

    } catch (error) {
        console.error(error.message);
        console.log(error);
        
    }
}

function init() {
    console.log(wordList);
    for (let i = 1; i <= 5; i++) {
        let divWord = document.createElement("div");
        divWord.setAttribute("class", `word${i}`)

        for (let j = 0; j < word.length; j++) {

            let divletter = document.createElement("div");
            divletter.setAttribute("class", "letter")
            let span = document.createElement("span")
            divletter.appendChild(span)

            divWord.appendChild(divletter)
        }
        container.appendChild(divWord)
    }
}

function initKeyBoard(){
    for(let i =0; i<letterKeyBoard.length;i++){
        let divKeyRow = document.createElement("div")
        divKeyRow.setAttribute("class","keyRow")

        for(let j = 0; j<letterKeyBoard[i].length;j++){
            let buttonLetter = document.createElement("button")
            if(isLetter(letterKeyBoard[i][j])){
                buttonLetter.setAttribute("id",`btn${letterKeyBoard[i][j]}`)
            }else{
                buttonLetter.setAttribute("class","btnSpecial")
            }

            buttonLetter.innerText = letterKeyBoard[i][j]
            divKeyRow.appendChild(buttonLetter)
        }

        keyboardContainer.appendChild(divKeyRow)
    }
}

function selectLetter() {
    if (trys < 6) {
        letter = document.querySelectorAll(`.word${trys}>div`)
        letter[0].children[0].textContent = word[0].toUpperCase()
        entry = [word[0]]
    }

}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function putLetter() {
    for (let i = 0; i < letter.length; i++) {
        letter[i].children[0].textContent = entry[i] ? entry[i].toUpperCase() : ""
    }
}


function affichageFin() {
    var divWord = document.createElement("div");
    divWord.setAttribute("class", "wordFinal")

    for (let i = 0; i < word.length; i++) {

        let divletter = document.createElement("div");
        divletter.setAttribute("class", "letter")
        let span = document.createElement("span")
        span.innerText = word[i]
        divletter.appendChild(span)

        divWord.appendChild(divletter)
    }
    container.appendChild(divWord)
}


function wordFullGood() {
    for (let i = 0; i < word.length; i++) {
        if (word[i] != entry[i]) {
            return false
        }
    }
    return true
}

function resetEntry(wordValid) {
    if(wordValid){
        lastEntry.push(entry)
        selectLetter()
    }
    entry = [word[0]]
    putLetter()
}

function wordValidation() {
    let entryword = ""
    entry.forEach(c => {
        entryword += c
    })
    console.log(entryword);

    if (wordList.includes(entryword)) {
        if (wordFullGood()) {
            trys = 6
            find = true
            for (let i = 0; i < letter.length; i++) {
                letter[i].setAttribute("class", "letter good")
            }
            resetEntry(true)
            showResume()
        } else {
            for (let i = 0; i < letter.length; i++) {
                console.log("entry :" + entry[i] + " word :" + word[i])
                if (entry[i] === word[i]) {
                    letter[i].setAttribute("class", "letter good")

                    let letterWord = entry[i].toLocaleUpperCase()
                    let btn = document.querySelector(`#btn${letterWord}`)
                    btn.setAttribute("class", "good")
                }
                else if (word.includes(entry[i])) {
                    letter[i].setAttribute("class", "letter misplaced")

                    let letterWord = entry[i].toLocaleUpperCase()
                    let btn = document.querySelector(`#btn${letterWord}`)
                    btn.setAttribute("class", "misplaced")
                } else if (!word.includes(entry[i])) {
                    let letterWord = entry[i].toLocaleUpperCase()
                    let btn = document.querySelector(`#btn${letterWord}`)
                    btn.setAttribute("class", "disabled")
                    btn.disabled = true
                }
            }
        }
        trys++
        resetEntry(true)
        if (trys === 6 && !find) {
            showResume()
        }

    }else{
        console.log("not a word");
        
        let divword = document.querySelector(`.word${trys}`)
        console.log(divword);
        
        classDivWord = divword.getAttribute("class")
        divword.setAttribute("class",classDivWord+" shake") 
        setTimeout(function () {
            divword.setAttribute("class",classDivWord)    
        }, 600);
        resetEntry(false)
    }

}

function showResume() {
    console.log(modal);
    modalContent.children[0].innerHTML = "Le mot était : <b>" + word + "</b>"
    lastEntry.forEach((ent) => {
        let divrow = document.createElement("div")
        divrow.setAttribute("class", "rowResume")
        for (let i = 0; i < ent.length; i++) {
            let divSquare = document.createElement("div")
            if (ent[i] === word[i]) {
                divSquare.setAttribute("class", "squareResume good")
            }
            else if (word.includes(ent[i])) {
                divSquare.setAttribute("class", "squareResume misplaced")
            } else {
                divSquare.setAttribute("class", "squareResume wrong")
            }

            divrow.appendChild(divSquare)
        }
        modalContent.appendChild(divrow)


    })

    let spanClose = document.createElement("span")
    spanClose.setAttribute("class","close")
    spanClose.innerText = "✕"
    // When the user clicks on <span> (x), close the modal
    spanClose.onclick = function () {
        modal.style.display = "none";
        startGame()
    }
    
    modalContent.appendChild(spanClose)

    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        startGame()
    }
}



document.addEventListener("keydown", (event) => {
    
    let key = event.key
    if (trys <= 5) {
        
        if (isLetter(key) && entry.length < word.length) {
            entry.push(key.toLocaleLowerCase())
            putLetter()
        }
        if (key === 'Delete' || key === 'Backspace') {
            entry.pop()
            putLetter()
        }
        if (key === 'Enter') {
            if (entry.length == word.length) {
                wordValidation()
            }
        }
    }
})

document.addEventListener("click", e => {
    
    let key = e.target.innerText

    if (trys <= 5) {
        if (isLetter(key) && entry.length < word.length) {
            entry.push(key)
            putLetter()
        }
        if (key === '⌫') {
            entry.pop()
            putLetter()
        }
        if (key === '↲') {
            if (entry.length == word.length) {
                wordValidation()
            }
        }
    }
})


startGame()


