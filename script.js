const container = document.querySelector(".container")

let entry = []
let lastEntry = []
let word = ""
let trys = 1
let letter 
let find = false 

var modal = document.getElementById("myModal");
var modalContent = document.querySelector(".modal-content");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




getword(getRandom(4,9))


async function getword(wordLenght) {
    const url = `https://random-word-api.herokuapp.com/word?number=1&lang=fr&length=${wordLenght}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }


        const json = await response.json();
        console.log(json);
        
        word = json[0]

        word = word.replace(new RegExp(/\s/g),"");
        word = word.replace(new RegExp(/[àáâãäå]/g),"a");
        word = word.replace(new RegExp(/æ/g),"ae");
        word = word.replace(new RegExp(/ç/g),"c");
        word = word.replace(new RegExp(/[èéêë]/g),"e");
        word = word.replace(new RegExp(/[ìíîï]/g),"i");
        word = word.replace(new RegExp(/ñ/g),"n");                
        word = word.replace(new RegExp(/[òóôõö]/g),"o");
        word = word.replace(new RegExp(/œ/g),"oe");
        word = word.replace(new RegExp(/[ùúûü]/g),"u");
        word = word.replace(new RegExp(/[ýÿ]/g),"y");
        word = word.replace(new RegExp(/\W/g),"");
        console.log(word);
        

        //initialisation de la page
        init()
        //reecuperation des div letter
        selectLetter()

    } catch (error) {
        console.error(error.message);
    }
}

// async function verifWord() {
//     let entrystr =""
//     for(let i = 0; i<entry.length;i++){
//         entrystr+= entry[i]
//     }
//     const url = "https://fr.wiktionary.org/wiki/"+entrystr
//     console.log(url);
    
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//         }

//         const json = await response.json();
//         console.log(json);
//     } catch (error) {
//         console.error(error.message);
//     }

// }

function init (){
    for(let i = 1;i<=5;i++){
        var divWord = document.createElement("div");
        divWord.setAttribute("class",`word${i}`)
        
        for(let j = 0; j<word.length;j++){

            let divletter =  document.createElement("div");
            divletter.setAttribute("class","letter")
            let span =  document.createElement("span")
            divletter.appendChild(span)

            divWord.appendChild(divletter)
        }
        container.appendChild(divWord)
    } 
}

function selectLetter (){
    if(trys<6){
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

function putLetter (){
    for(let i = 0; i<letter.length;i++){
        letter[i].children[0].textContent = entry[i] ? entry[i].toUpperCase() : ""
    }
}


function affichageFin (){
    var divWord = document.createElement("div");
    divWord.setAttribute("class","wordFinal")
    
    for(let i = 0; i<word.length;i++){

        let divletter =  document.createElement("div");
        divletter.setAttribute("class","letter")
        let span =  document.createElement("span")
        span.innerText = word[i]
        divletter.appendChild(span)

        divWord.appendChild(divletter)
    }
    container.appendChild(divWord)
}


function wordFullGood(){
    for(let i = 0; i<word.length;i++){
        if(word[i] != entry[i]){
            return false
        }
    }
    return true
}

function resetEntry(){
    lastEntry.push(entry)
    entry=[word[0]]
}

function wordValidation(){
    if(wordFullGood()){
    trys = 6
    find = true
        for(let i= 0; i<letter.length;i++){
            letter[i].setAttribute("class","letter good")
        }
    resetEntry()
        showResume()
    }else{
        for(let i = 0; i<letter.length;i++){
            if(entry[i] === word[i]){
                letter[i].setAttribute("class","letter good")
            }
            else if(word.includes(entry[i])){
                letter[i].setAttribute("class","letter misplaced")
            }
        }
    }
 

    
    trys ++
    resetEntry()
    if(trys === 6 && !find){
        showResume()
    }

    selectLetter()

}

function showResume(){
console.log(modal);
    modalContent.children[1].innerHTML = "Le mot était : <b>"+word+"</b>"
    lastEntry.forEach((ent)=>{
        let divrow = document.createElement("div")
        divrow.setAttribute("class","rowResume")
        for(let i = 0; i<ent.length;i++){
            let divSquare = document.createElement("div") 
            if(ent[i] === word[i]){
                divSquare.setAttribute("class","square good")
            }
            else if(word.includes(ent[i])){
                divSquare.setAttribute("class","square misplaced")
            }else{
                divSquare.setAttribute("class","square wrong")
            }

            divrow.appendChild(divSquare)
        }
        modalContent.appendChild(divrow)
    })

    modal.style.display = "block";
}



document.addEventListener("keydown",(event)=>{
    let key = event.key
    if(trys<=5){
        if(isLetter(key) && entry.length < word.length){
            entry.push(key)
            putLetter()
        }
        if (key === 'Delete' || key === 'Backspace') {
            entry.pop()
            putLetter()
        }
        if(key === 'Enter'){
            if(entry.length == word.length){
                wordValidation()
            }
        }
    }
})



