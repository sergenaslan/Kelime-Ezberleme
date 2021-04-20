let btnSmile = document.querySelector('.content .likeBtn');
let btnAngry = document.querySelector('.content .dontlikeBtn');
let btnThink = document.querySelector('.content .favBtn');
let btnNext = document.querySelector('.content .next');
let btnPrev = document.querySelector('.content .prev');
let wordImage = document.querySelector('.content .wordImage');
let word = document.querySelector('.content .word span');
let wordReading = document.querySelector('.content .wordReading');
let wordMeaning = document.querySelector('.content .wordMeaning');
let wordIsim = document.querySelector('.content .isim');
let wordSıfat = document.querySelector('.content .sıfat');
let wordZarf = document.querySelector('.content .zarf');
let wordFiil = document.querySelector('.content .fiil');
let hiddenShow = document.querySelector('.hiddenShow');
let title = document.querySelector('h1');
let content = document.querySelector('.content');
let allWord = document.querySelector('.menu .allWord');
let memorizedWord = document.querySelector('.menu .likeWord');
let reciterWord = document.querySelector('.menu .favWord');
let dontReciterWord = document.querySelector('.menu .dontLikeWord');
var availableWord = document.querySelector('.available');
var totalWord = document.querySelector('.total');
let data = [];
let memorizedWordArr = [];
let reciterWordArr = [];
let dontReciterWordArr = [];
let i = -1;
let categoryStatus = 'reciterWord';
var xhttp = new XMLHttpRequest();
xhttp.open("GET","./admin/aslan.json",true)
xhttp.send();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        data = JSON.parse(this.responseText);
        allWord.innerText =  data.length;
        statusNumbers();
    }
}
function statusNumbers(){
    memorizedWordArr = data.filter(s => s.btnSmile == 'true');
    memorizedWord.innerText = memorizedWordArr.length;
    dontReciterWordArr = data.filter(s => s.btnAngry == 'true');
    dontReciterWord.innerText = dontReciterWordArr.length;
    reciterWordArr = data.filter(s => s.btnThink == 'true');
    reciterWord.innerText = reciterWordArr.length;
}

function removeActive(activePlace){
    let menu = document.querySelector( activePlace +' .active');
    menu.classList.remove('active');
}
function nextWordChange(arrayName,i){
    availableWord.innerText = i+1;
    totalWord.innerText = arrayName.length;
    wordImage.setAttribute('src','./resim/'+arrayName[i].resimYol);
    word.innerText = arrayName[i].kelime;
    wordReading.innerText ="( "+arrayName[i].okunus+" )";


    if(arrayName[i].isim == ''){
        wordIsim.classList.add('hidden');
    }else{
        wordIsim.innerHTML = " İsim: <span>" +arrayName[i].isim+ "</span>";
        wordIsim.classList.remove('hidden');
    };
    if(arrayName[i].sifat == ''){
        wordSıfat.classList.add('hidden')
    }else{
        wordSıfat.innerHTML = " Sıfat: <span>"+ arrayName[i].sifat +"</span>";
        wordSıfat.classList.remove('hidden');
    };
    if(arrayName[i].zarf == ''){
        wordZarf.classList.add('hidden');

    }else{
        wordZarf.innerHTML = " Zarf: <span>"+ arrayName[i].zarf +"</span>";
        wordZarf.classList.remove('hidden');
    };
    if(arrayName[i].fiil == ''){
        wordFiil.classList.add('hidden');

    }else{
        wordFiil.innerHTML = " Fiil: <span>"+ arrayName[i].fiil +"</span>";
        wordFiil.classList.remove('hidden');
    };



    arrayName[i].btnSmile == 'true' ?  btnSmile.classList.add('active') : btnSmile.classList.remove('active');
    arrayName[i].btnAngry == 'true' ?  btnAngry.classList.add('active') : btnAngry.classList.remove('active');
    arrayName[i].btnThink == 'true' ? btnThink.classList.add('active') : btnThink.classList.remove('active');
}

function prevWordChange(arrayName, i){
        availableWord.innerText = i+1;
        totalWord.innerText = arrayName.length;
        wordImage.setAttribute('src','./resim/'+arrayName[i].resimYol);
        word.innerText = arrayName[i].kelime;
        wordReading.innerText ="( "+arrayName[i].okunus+" )";

        if(arrayName[i].isim == ''){
            wordIsim.classList.add('hidden');
        }else{
            wordIsim.innerHTML = " İsim: <span>" +arrayName[i].isim+ "</span>";
            wordIsim.classList.remove('hidden');
        };
        if(arrayName[i].sifat == ''){
            wordSıfat.classList.add('hidden')
        }else{
            wordSıfat.innerHTML = " Sıfat: <span>"+ arrayName[i].sifat +"</span>";
            wordSıfat.classList.remove('hidden');
        };
        if(arrayName[i].zarf == ''){
            wordZarf.classList.add('hidden');
    
        }else{
            wordZarf.innerHTML = " Zarf: <span>"+ arrayName[i].zarf +"</span>";
            wordZarf.classList.remove('hidden');
        };
        if(arrayName[i].fiil == ''){
            wordFiil.classList.add('hidden');
    
        }else{
            wordFiil.innerHTML = " Fiil: <span>"+ arrayName[i].fiil +"</span>";
            wordFiil.classList.remove('hidden');
        };


        arrayName[i].btnSmile == 'true' ?  btnSmile.classList.add('active') : btnSmile.classList.remove('active');
        arrayName[i].btnAngry == 'true' ?  btnAngry.classList.add('active') : btnAngry.classList.remove('active');
        arrayName[i].btnThink == 'true' ? btnThink.classList.add('active') : btnThink.classList.remove('active');
}

/* ileri geri butonların */
btnNext.addEventListener('click',function(){
    if(categoryStatus == 'data'){
        i++;
        i < data.length ? nextWordChange(data, i) : i = 0; nextWordChange(data, i) ;
    }else if(categoryStatus == 'memorizedWord'){
        i++;
        i < memorizedWordArr.length ? nextWordChange(memorizedWordArr, i) : i = 0; nextWordChange(memorizedWordArr, i);
    }else if(categoryStatus == 'reciterWord'){
        i++;
        i < reciterWordArr.length ? nextWordChange(reciterWordArr, i) : i = 0; nextWordChange(reciterWordArr, i);
    }else if(categoryStatus == 'dontReciterWord'){
        i++;
        i < dontReciterWordArr.length ? nextWordChange(dontReciterWordArr, i) : i = 0; nextWordChange(dontReciterWordArr, i);
    }
});

btnPrev.addEventListener('click',function(){
    if(categoryStatus == 'data'){
        if(i == 0){
            i = data.length -1;
            prevWordChange(data, i);
        }else{
            i--;
            prevWordChange(data, i);
        }

    }else if(categoryStatus == 'memorizedWord'){
        if(i == 0){
            i = memorizedWordArr.length -1;
            prevWordChange(memorizedWordArr, i);
        }else{
            i--;
            prevWordChange(memorizedWordArr, i);
        }
    }else if(categoryStatus == 'reciterWord'){
        if(i == 0){
            i = reciterWordArr.length -1;
            prevWordChange(reciterWordArr, i);
        }else{
            i--;
            prevWordChange(reciterWordArr, i);
        }
    }else if(categoryStatus == 'dontReciterWord'){
        if(i == 0){
            i = dontReciterWordArr.length -1;
            prevWordChange(dontReciterWordArr, i);
        }else{
            i--;
            prevWordChange(dontReciterWordArr, i);
        }
    }
});
/* ileri geri butonların */



btnSmile.addEventListener('click',function(){
   let searchresult = data.findIndex(i => i.kelime == word.innerText);
    if(data[searchresult].btnSmile == 'false'){
        removeActive('.content');
        this.classList.add('active');
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST","./admin/function.php",true);
        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhttp.send("btnSmile="+true+"like="+true+"&id="+searchresult);
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200 ){
                    data[searchresult].btnSmile = 'true';
                    data[searchresult].btnThink = 'false';
                    data[searchresult].btnAngry = 'false';
                    statusNumbers();
                }
            }
    }else{
        this.classList.remove('active');
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST","./admin/likeUpdate.php",true);
        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhttp.send("btnSmile="+true+"like="+false+"&id="+searchresult);
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200 ){
                    data[searchresult].btnSmile = 'false';
                    memorizedWordArr = data.filter(s => s.btnSmile == 'true');
                    memorizedWord.innerText = memorizedWordArr.length;
                }
            }
    }
});



btnThink.addEventListener('click',function(){
    let searchresult = data.findIndex(i => i.kelime == word.innerText);
    if(data[searchresult].btnThink == 'false'){
        removeActive('.content');
        this.classList.add('active');
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST","./admin/function.php",true);
           xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhttp.send("btnThink="+true+"&like="+true+"&id="+searchresult);
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200 ){
                    console.log(this);
                    data[searchresult].btnThink = 'true';
                    data[searchresult].btnSmile = 'false';
                    data[searchresult].btnAngry = 'false';
                    statusNumbers();
                }
            }
    }else{
        this.classList.remove('active');
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST","./admin/function.php",true);
           xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhttp.send("btnThink="+true+"&like="+false+"&id="+searchresult);
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200 ){
                    data[searchresult].btnThink = 'false';
                    reciterWordArr = data.filter(s => s.btnThink == 'true');
                    reciterWord.innerText = reciterWordArr.length;
                }
            }
    }
});

btnAngry.addEventListener('click',function(){
    let searchresult = data.findIndex(i => i.kelime == word.innerText);
    if(data[searchresult].btnAngry == 'false'){
         removeActive('.content');
         this.classList.add('active');
         let xhttp = new XMLHttpRequest();
         xhttp.open("POST","./admin/function.php",true);
            xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
             xhttp.send("btnAngry="+true+"&like="+true+"&id="+searchresult);
             xhttp.onreadystatechange = function(){
                 if(this.readyState == 4 && this.status == 200 ){
                     data[searchresult].btnAngry = 'true';
                     data[searchresult].btnThink = 'false';
                     data[searchresult].btnSmile = 'false';
                     statusNumbers();
                 }
             }
     }else{
         this.classList.remove('active');
         let xhttp = new XMLHttpRequest();
         xhttp.open("POST","./admin/function.php",true);
            xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
             xhttp.send("btnAngry="+true+"&like="+false+"&id="+searchresult);
             xhttp.onreadystatechange = function(){
                 if(this.readyState == 4 && this.status == 200 ){
                     data[searchresult].btnAngry = 'false';
                     dontReciterWordArr = data.filter(s => s.btnAngry == 'true');
                     dontReciterWord.innerText = dontReciterWordArr.length;
                 }
             }
     }
 });

 


setTimeout(function(){
        content.classList.add('animation');
    setTimeout(function(){
        content.classList.remove('animation');
    },600);
},500);



/* Menü Kodlarının başladığı yer */


function contentAnimation(){
    setTimeout(function(){
        content.classList.add('animation');
        setTimeout(function(){
            content.classList.remove('animation');
        },600);
    },500);
}



allWord.addEventListener('click',function(){
    categoryStatus = 'data';
    removeActive('.menu');
    this.classList.add('active')
    title.innerText = 'Bütün Kelimeler';
    i = -1;
    btnNext.click();
    contentAnimation();
});
//memorized  ezberlenen 
memorizedWord.addEventListener('click',function(){
    categoryStatus = 'memorizedWord';
    title.innerText = 'Ezberlenen Kelimeler';
    removeActive('.menu');
    this.classList.add('active')
    memorizedWordArr = data.filter(s => s.btnSmile == 'true');
    i = -1;
    btnNext.click();
    contentAnimation();
});
//reciter ezberlenecek
reciterWord.addEventListener('click',function(){
    categoryStatus = 'reciterWord';
    title.innerText = 'Ezberlenecek Kelimeler';
    removeActive('.menu');
    this.classList.add('active')
    reciterWordArr = data.filter(s => s.btnThink == 'true');
    i = -1;
    btnNext.click();
    contentAnimation();
});
//Ezberlenemeyen Kelimeler
dontReciterWord.addEventListener('click',function(){
    categoryStatus = 'dontReciterWord';
    title.innerText = 'Ezberlenemeyen Kelimeler';
    removeActive('.menu');
    this.classList.add('active');
    dontReciterWordArr = data.filter(s => s.btnAngry == 'true');
    i = -1;
    btnNext.click();
    contentAnimation();
});

setTimeout(function(){
    reciterWord.click();
},400);


let show = 0;
hiddenShow.addEventListener('click',function(){
    if(show){
        show = 0;
        wordMeaning.classList.remove('hidden');
        wordImage.classList.remove('hidden');
    }else{
        wordMeaning.classList.add('hidden');
        wordImage.classList.add('hidden');
        show = 1

    }
    
});





