// Declear constant
const score = document.querySelector('.score');
const startscreen = document.querySelector('.startscreen');
const gamearea = document.querySelector('.gamearea');

// Button control

let player = {speed: 7, score : 0 };

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false}

startscreen.addEventListener('click',start);


document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown (e) { 
    e.preventDefault();
    keys[e.key] = true; 
    // console.log(e.key);
    // console.log(keys);
    
}
function keyUp (e) { 
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
}

function movelines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(value){

        if (value.y >= 800) {
            value.y -=750;
            
        }

        value.y += player.speed;
        value.style.top = value.y + "px";

    })
}


function movecar(car){
    let randcar = document.querySelectorAll('.randcar');

    randcar.forEach(function(value){
        if (isCollide(car,value)) {
            console.log("Boom")
            endgame(); 
        }

        if (value.y >= 800) {
            value.y = -150;
            value.style.left = Math.floor(Math.random() * 350) + "px";
            
        }

        value.y += player.speed;
        value.style.top = value.y + "px";

    })
}



function isCollide(a,b){
    aPosition = a.getBoundingClientRect();
    bPosition = b.getBoundingClientRect();

    return !((aPosition.bottom < bPosition.top) || (aPosition.top > bPosition.bottom) || (aPosition.right < bPosition.left) || (aPosition.left > bPosition.right))
}

function  endgame(){
    player.start = false; 
    startscreen.classList.remove('hide'); 
    startscreen.innerHTML = "Game Over <br> Press Any Key to Play Again <br> Your Final Score : " +player.score;
}

function playgame(){
    // console.log("i am click");

    let car = document.querySelector('.car');

    let road = gamearea.getBoundingClientRect();


    if (player.start) {

        movelines();
        movecar(car);

        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 70) ) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x <(road.width-50)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        

        window.requestAnimationFrame(playgame);
        console.log(player.score++);
        player.score++;
        let ps = player.score - 2;
        score.innerText = " Score is :" + ps;
    }

    
}

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}

function start(){
    // gamearea.classList.remove('hide');
    startscreen.classList.add('hide'); 
    gamearea.innerHTML = "";

    player.start = true; 
    player.score = 0; 
    window.requestAnimationFrame(playgame);

    for (i = 0; i < 5; i++) {
    let roadline = document.createElement('div');
    roadline.setAttribute('class','lines');
    roadline.y = (i*150);
    roadline.style.top = roadline.y + "px";
    gamearea.appendChild(roadline);
        
    }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    gamearea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (i = 0; i < 4; i++) {
        let randomcar = document.createElement('div');
        randomcar.setAttribute('class','randcar');
        randomcar.y = ((i+1) * 350) * - 1;
        randomcar.style.top = randomcar.y + "px";
        randomcar.style.backgroundColor = randomColor();
        randomcar.style.left = Math.floor(Math.random() * 350) + "px";
        gamearea.appendChild(randomcar);
            
        }

}