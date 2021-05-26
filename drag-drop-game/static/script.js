const wordContent = document.querySelector('.wordContent');
const meaningContent = document.querySelector('.meaningContent');
let remaingWord = document.querySelector('.remaingWord span');
let wasKnown = document.querySelector('.wasKnown span');
let move = null;
let moved = false;
let remainWord = 0;



let data = [];
function dataLoad(callback){
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET","../admin/aslan.json",true)
        xhttp.send();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                for( const word of JSON.parse(this.responseText)){
                    if(word.btnSmile == 'true'){
                        data.push(word);
                    }
                }
                callback()
            }
        };
}

dataLoad(gameStart)

let tahminNumber = 10;
function gameStart(){
    remaingWord.innerText = data.length - tahminNumber;
    console.log(data);
    console.log(data.length);
    for(let i = 0; i < tahminNumber ;i++){
        let number = Math.floor(Math.random() * data.length)
        let meaning = document.createElement('div');
        meaning.className = "meaning";
        meaning.dataset.meaning = data[number].kelime;
        meaning.addEventListener('dragstart',dragStart);
        meaning.addEventListener('dragend',dragEnd);
        meaning.setAttribute("draggable", "true")
        let meaningSpan = document.createElement('span');
        meaningSpan.innerText = data[number].isim + " "+ data[number].fiil +" "+
        data[number].sifat +" "+ data[number].zarf;
        meaning.appendChild(meaningSpan);
        meaningContent.appendChild(meaning);

        let wordOrder = Math.floor(Math.random() * 10)
        let word = document.createElement('div');
        word.className = "word";
        word.style.order = wordOrder;
        word.dataset.word = data[number].kelime;
        word.addEventListener('dragover',dragOver);
        word.addEventListener('dragenter',dragEnter);
        word.addEventListener('dragleave',dragLeave);
        word.addEventListener('drop',dragDrop);
        let wordSpan = document.createElement('span');
        wordSpan.innerText = data[number].kelime;
        word.appendChild(wordSpan);
        wordContent.appendChild(word);
        data.splice(number, 1)
    }

    
}


function dragStart(){
    move = this;
    moved = false;
    setTimeout(() => (move.className += ' hidden'),0);
}

function dragEnd(){
    if(!moved){
        move.className = 'meaning';
    }
}


function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
    this.className += ' hovered';
    
}
function dragLeave(){
    this.className = 'word';
}
function dragDrop(){
    if( this.dataset.word == move.dataset.meaning ){
        let cloneMove = (move.cloneNode(true));
        cloneMove.className = 'meaning';
        this.className = 'word';
        this.children[0].className += 'deneme'
        this.appendChild(cloneMove);
        moved = true;
        move.className += ' meaningRemove';
        setTimeout(function(){
            move.remove();
        },500);
        remainWord++
        if(remainWord == tahminNumber ){
            setTimeout(() => {
                wordContent.innerHTML = "";
                meaningContent.innerHTML = "";
                console.log(data.length)
                gameStart();
                remainWord = 0;
                wasKnown.innerText = Number(wasKnown.innerText) + tahminNumber;
            },500);
        }
    }else{
        this.className = 'word';
        move.className = 'meaning';
        alert('yanlış');
    }
}