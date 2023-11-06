var radio = document.querySelector('.manual-btn');
var cont = 1;

document.getElementById('radio1').checked = true;

var myTimer = setInterval(() => {
    proximaImg(1)
},5000)

function proximaImg(x){
    clearInterval(myTimer);
    myTimer = setInterval(() => {
        proximaImg(1)
    },5000)
    if(x === 1) {
    cont++
    } else {
        if(cont != 1) {
            cont--
        } else if (cont = 1) {
            cont = 3
        }
    }
    if(cont > 3){
        cont = 1
    }

    document.getElementById('radio'+cont).checked = true;
}

function nextSlide() {proximaImg(1)}

function prevSlide() {proximaImg(0)}