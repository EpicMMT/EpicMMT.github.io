/*dichiarazione flag */
let fStart=0;
let coins = [
    0,0,0
];
let coinXCoords = [
    0,0,0
];
let coinYCoords = [
    0,0,0
];
let fWin=0;
let keyPressed = 0;
/*dichiarazione audio */
let backgroundAudio = new Audio('main/audio/backgroundAudio.mp3');
backgroundAudio.loop = true;
backgroundAudio.volume = 0.1;
let coinPickAudio = new Audio('main/audio/coinPickup.mp3');
coinPickAudio.volume = 0.1;
let winAudio = new Audio('main/audio/winAudio.mp3');
winAudio.volume = 0.1;
/*dichiarazione globale posizione iniziale personaggio*/
let x=250;
let y=250;
/* dichiarazione/inizializzazione della tela*/
const tela = document.getElementById("tela");
const ctx = tela.getContext("2d");
let characterHeight = 65
let characterWidth = characterHeight/1.5
let characterSprite = document.createElement('img');
let coinHeight = 50
let coinWidth = coinHeight/1.5
let coinSprite1 = document.createElement('img');
let coinSprite2 = document.createElement('img');
let coinSprite3 = document.createElement('img');
do{
    coinXCoords[0] = randomX();
    coinYCoords[0] = randomY();
}while((coinXCoords[0]>=x-100 && coinXCoords[0]<=x+100) && (coinYCoords[0]>=y-100 && coinXCoords[0]<=x+100));
console.log("XCoin1:");
console.log(coinXCoords[0]);
console.log("YCoin1:");
console.log(coinYCoords[0]);
do{
    coinXCoords[1] = randomX();
    coinYCoords[1] = randomY();
}while(((coinXCoords[1]>=x-100 && coinXCoords[1]<=x+100) && (coinYCoords[1]>=y-100 && coinXCoords[1]<=x+100))||((coinXCoords[1]>=coinXCoords[0]-100 && coinXCoords[1]<=coinXCoords[0]+100)&&(coinYCoords[1]>=coinYCoords[0]-100 && coinYCoords[1]<=coinYCoords[0]+100)));
console.log("XCoin2:");
console.log(coinXCoords[1]);
console.log("YCoin2:");
console.log(coinYCoords[1]);
do{
    coinXCoords[2] = randomX();
    coinYCoords[2] = randomY();
}while(((coinXCoords[2]>=x-100 && coinXCoords[2]<=x+100) && (coinYCoords[2]>=y-100 && coinXCoords[2]<=x+100))||((coinXCoords[2]>=coinXCoords[0]-100 && coinXCoords[2]<=coinXCoords[0]+100)&&(coinYCoords[2]>=coinYCoords[0]-100 && coinYCoords[2]<=coinYCoords[0]+100))||((coinXCoords[2]>=coinXCoords[1]-100 && coinXCoords[2]<=coinXCoords[1]+100)&&(coinYCoords[2]>=coinYCoords[1]-100 && coinYCoords[2]<=coinYCoords[1]+100)));  
console.log("XCoin3:");
console.log(coinXCoords[2]);
console.log("YCoin3:");
console.log(coinYCoords[2]);
function start(){
    for(let i=0;i<coins.length;i++){
        coins[i]=0;
    }
    fStart=1;
    backgroundAudio.play();
    document.getElementById("scroll").style.visibility="hidden";
    document.getElementById("instructions").style.visibility="hidden";
    document.getElementById("inizio").style.visibility="hidden";
    x=250;
    y=250;
    ctx.clearRect(0,0,500,500);
    startCharacter();
    /*generazione coin1*/
    coinSprite1.src = 'main/img/Items/coin.png';
    coinSprite1.onload = function() {
    ctx.clip();
    ctx.drawImage(coinSprite1, coinXCoords[0], coinYCoords[0], coinWidth, coinHeight);
    }
    /*generazione coin2*/
    coinSprite2.src = 'main/img/Items/coin.png';
    coinSprite2.onload = function() {
    ctx.clip();
    ctx.drawImage(coinSprite2, coinXCoords[1], coinYCoords[1], coinWidth, coinHeight);
     /*generazione coin3*/
    coinSprite3.src = 'main/img/Items/coin.png';
    coinSprite3.onload = function() {
    ctx.clip();
    ctx.drawImage(coinSprite3, coinXCoords[2], coinYCoords[2], coinWidth, coinHeight);
    }
    }
}
function startCharacter()
{
    /* inserimento personaggio*/  
    characterSprite.src = 'main/img/characterAnimations/FrontStill.png';
    drawCharacter(characterSprite);
}
function drawCharacter(characterBody){
    characterBody.onload = function() {
        ctx.beginPath();
        zonaClip();
        ctx.drawImage(characterBody, x, y, characterWidth, characterHeight);   
    }
}
function moveDownCharacter(){
    setTimeout(function(){
        if(y!=440){
            y+=5;
        }
        ctx.clearRect(x,y,54,70);
        characterSprite.src = 'main/img/characterAnimations/FrontWalkingLeft.png';   //animazione 1 movimento verso il basso con piede sinistro
        drawCharacter(characterSprite);
        for(let i = 0; i<coins.length; i++){
            coinPick(coinXCoords[i],coinYCoords[i],i);
        }
        win();
        setTimeout(function(){
            if(y!=440){
                y+=5;
            }
            ctx.clearRect(x,y,54,70);
            characterSprite.src = 'main/img/characterAnimations/FrontWalkingRight.png';  //animazione 2 movimento verso il basso con piede destro
            drawCharacter(characterSprite);
            for(let i = 0; i<coins.length; i++){
                coinPick(coinXCoords[i],coinYCoords[i],i);
            }
            win();
            setTimeout(function(){
                if(y!=440){
                    y+=5;
                }
                ctx.clearRect(x,y,54,70);
                characterSprite.src = 'main/img/characterAnimations/FrontStill.png'; //animazione 3 movimento verso il basso fermarsi
                drawCharacter(characterSprite);
                for(let i = 0; i<coins.length; i++){
                    coinPick(coinXCoords[i],coinYCoords[i],i);
                }
                win();
            },200);
        },200);    
    },200);
}
function moveUpCharacter(){
    setTimeout(function(){
        if(y!=0){
            y-=5;
        }
        ctx.clearRect(x,y,54,70);
        characterSprite.src = 'main/img/characterAnimations/BackWalkingLeft.png';    //animazione 1 movimento verso l'alto con piede sinistro
        drawCharacter(characterSprite);
        for(let i = 0; i<coins.length; i++){
            coinPick(coinXCoords[i],coinYCoords[i],i);
        }
        win();
        setTimeout(function(){
            if(y!=0){
                y-=5;
            }
            ctx.clearRect(x,y,54,70);
            characterSprite.src = 'main/img/characterAnimations/BackWalkingRight.png';   //animazione 2 movimento verso l'alto con piede destro
            drawCharacter(characterSprite);
            ctx.drawImage(characterSprite, x, y, characterWidth, characterHeight);
            for(let i = 0; i<coins.length; i++){
                coinPick(coinXCoords[i],coinYCoords[i],i);
            }
            win();
            setTimeout(function(){
                if(y!=0){
                    y-=5;
                }
                ctx.clearRect(x,y,54,70);
                characterSprite.src = 'main/img/characterAnimations/BackStill.png';  //animazione 3 movimento verso l'alto fermarsi
                drawCharacter(characterSprite);
                for(let i = 0; i<coins.length; i++){
                    coinPick(coinXCoords[i],coinYCoords[i],i);
                }
                win();
            },200);
        },200);    
    },200);
}
function moveLeftCharacter(){
    setTimeout(function(){
        if(x!=0){
            x-=5;
        }
        ctx.clearRect(x,y,54,70);
        characterSprite.src = 'main/img/characterAnimations/LeftWalkingLeft.png';    //animazione 1 movimento verso sinistra con piede sinistro
        drawCharacter(characterSprite);
        for(let i = 0; i<coins.length; i++){
            coinPick(coinXCoords[i],coinYCoords[i],i);
        }
        win();
        setTimeout(function(){
            if(x!=0){
                x-=5;
            }
            ctx.clearRect(x,y,54,70);
            characterSprite.src = 'main/img/characterAnimations/LeftWalkingRight.png';   //animazione 2 movimento verso sinistra con piede destro
            drawCharacter(characterSprite);
            ctx.drawImage(characterSprite, x, y, characterWidth, characterHeight);
            for(let i = 0; i<coins.length; i++){
                coinPick(coinXCoords[i],coinYCoords[i],i);
            }
            win();
            setTimeout(function(){
                if(x!=0){
                    x-=5;
                }
                ctx.clearRect(x,y,54,70);
                characterSprite.src = 'main/img/characterAnimations/LeftStill.png';  //animazione 3 movimento verso sinistra fermarsi
                drawCharacter(characterSprite);
                for(let i = 0; i<coins.length; i++){
                    coinPick(coinXCoords[i],coinYCoords[i],i);
                }
                win();
            },200);
        },200);    
    },200);
}
function moveRightCharacter(){
    setTimeout(function(){
        if(x!=460){
            x+=5;
        }
        ctx.clearRect(x-15,y,54,70);
        characterSprite.src = 'main/img/characterAnimations/RightWalkingLeft.png';   //animazione 1 movimento verso destra con piede sinistro
        drawCharacter(characterSprite);
        ctx.drawImage(characterSprite, x, y, characterWidth, characterHeight);
        for(let i = 0; i<coins.length; i++){
            coinPick(coinXCoords[i],coinYCoords[i],i);
        }
        win();
        setTimeout(function(){
            if(x!=460){
                x+=5;
            }
            ctx.clearRect(x-15,y,54,70);
            characterSprite.src = 'main/img/characterAnimations/RightWalkingRight.png';  //animazione 2 movimento verso destro con piede destro
            drawCharacter(characterSprite);
            for(let i = 0; i<coins.length; i++){
                coinPick(coinXCoords[i],coinYCoords[i],i);
            }
            win();
            setTimeout(function(){
                if(x!=460){
                    x+=5;
                }
                ctx.clearRect(x-15,y,54,70);
                characterSprite.src = 'main/img/characterAnimations/RightStill.png'; //animazione 3 movimento verso destra fermarsi
                drawCharacter(characterSprite); 
                for(let i = 0; i<coins.length; i++){
                    coinPick(coinXCoords[i],coinYCoords[i],i);
                }
                win();
            },200);
        },200);    
    },200);
}

function coinPick(randomXCoin, randomYCoin,nCoin){
    if(((x<=randomXCoin && randomXCoin<=x+characterWidth)&&(y<=randomYCoin && randomYCoin<=y+characterHeight))||((x<=randomXCoin+coinWidth && randomXCoin+coinWidth<=x+characterWidth)&&(y<=randomYCoin && randomYCoin<=y+characterHeight))||((x<=randomXCoin && randomXCoin<=x+characterWidth)&&(y<=randomYCoin+coinHeight && randomYCoin+coinHeight<=y+characterHeight))||((x<=randomXCoin+coinWidth && randomXCoin+coinWidth<=x+characterWidth)&&(y<=randomYCoin+coinHeight && randomYCoin+coinHeight<=y+characterHeight))){
        if(coins[nCoin]==0){
            coinPickAudio.play();
            console.log("Hai preso una moneta");
            console.log("fCoin",nCoin,": ",coins[nCoin]);
        }
        ctx.beginPath();
        ctx.clearRect(randomXCoin,randomYCoin,coinWidth,coinHeight);
        ctx.stroke();
        ctx.closePath();
        coins[nCoin]=1;
        
    }
}
function zonaClip(){
    ctx.rect(0, 0, 500, 500);
    ctx.clip();
}
function win(){
    if(coins[0]==1 && coins[1]==1 && coins[2]==1){
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        winAudio.play();
        fWin=1;
        document.getElementById("scroll").style.visibility = ("visible");
        document.getElementById("winText").style.visibility = ("visible");
        document.getElementById("playAgainButton").style.visibility = ("visible");
    }
}
function playAgain(){
    fWin=0;
    document.getElementById("scroll").style.visibility = ("hidden");
    document.getElementById("winText").style.visibility = ("hidden");
    document.getElementById("playAgainButton").style.visibility = ("hidden");
    do{
        coinXCoords[0] = randomX();
        coinYCoords[0] = randomY();
    }while((coinXCoords[0]>=x-100 && coinXCoords[0]<=x+100) && (coinYCoords[0]>=y-100 && coinXCoords[0]<=x+100));
    console.log("XCoin1:");
    console.log(coinXCoords[0]);
    console.log("YCoin1:");
    console.log(coinYCoords[0]);
    do{
        coinXCoords[1] = randomX();
        coinYCoords[1] = randomY();
    }while(((coinXCoords[1]>=x-100 && coinXCoords[1]<=x+100) && (coinYCoords[1]>=y-100 && coinXCoords[1]<=x+100))||((coinXCoords[1]>=coinXCoords[0]-100 && coinXCoords[1]<=coinXCoords[0]+100)&&(coinYCoords[1]>=coinYCoords[0]-100 && coinYCoords[1]<=coinYCoords[0]+100)));
    console.log("XCoin2:");
    console.log(coinXCoords[1]);
    console.log("YCoin2:");
    console.log(coinYCoords[1]);
    do{
        coinXCoords[2] = randomX();
        coinYCoords[2] = randomY();
    }while(((coinXCoords[2]>=x-100 && coinXCoords[2]<=x+100) && (coinYCoords[2]>=y-100 && coinXCoords[2]<=x+100))||((coinXCoords[2]>=coinXCoords[0]-100 && coinXCoords[2]<=coinXCoords[0]+100)&&(coinYCoords[2]>=coinYCoords[0]-100 && coinYCoords[2]<=coinYCoords[0]+100))||((coinXCoords[2]>=coinXCoords[1]-100 && coinXCoords[2]<=coinXCoords[1]+100)&&(coinYCoords[2]>=coinYCoords[1]-100 && coinYCoords[2]<=coinYCoords[1]+100)));  
    console.log("XCoin3:");
    console.log(coinXCoords[2]);
    console.log("YCoin3:");
    console.log(coinYCoords[2]);
    start();
}
window.addEventListener("keydown",function(event) {
	if(event.keyCode == 39 && keyPressed == 0) {
        keyPressed = 1;
		right();

        //Imposta timeout per reset di keyPressed dopo un delay
        setTimeout(() => {
            keyPressed = 0;
        }, 500);
	}
});
window.addEventListener("keydown",function(event) {
    if(event.keyCode == 32 && fWin==0) {
        start();
    }
});
window.addEventListener("keydown",function(event) {
    if(event.keyCode == 37 && keyPressed == 0) {
        keyPressed = 1;
        left();

        //Imposta timeout per reset di keyPressed dopo un delay
        setTimeout(() => {
            keyPressed = 0;
        }, 500);
    }
});
window.addEventListener("keydown",function(event) {
    if(event.keyCode == 38 && keyPressed == 0) {
        keyPressed = 1;
        up();

        //Imposta timeout per reset di keyPressed dopo un delay
        setTimeout(() => {
            keyPressed = 0;
        }, 500);
    }
});
window.addEventListener("keydown",function(event) {
    if(event.keyCode == 40 && keyPressed == 0) {
        keyPressed = 1;
        down();
        //Imposta timeout per reset di keyPressed dopo un delay
        setTimeout(() => {
            keyPressed = 0;
        }, 500);
    }
});
    /*Disattivazione slide per la pagina con le frecce e utilizzo della spacebar*/
window.addEventListener("keydown", function(e){
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1){
        e.preventDefault();
    }
},false);
function up(){
    let up = document.getElementById("up");
    document.getElementById("up").style.backgroundColor = "#257956";
    setTimeout(function(){
        document.getElementById("up").style.backgroundColor = "#36AE7C";
    },150); 
    if(fStart==1 && fWin==0){
        moveUpCharacter();
    }
    }
function right(){
    let right = document.getElementById("right");
    document.getElementById("right").style.backgroundColor = "#257956";
    setTimeout(function(){
        document.getElementById("right").style.backgroundColor = "#36AE7C";
    },150);
    if(fStart==1 && fWin==0){
        moveRightCharacter();
    }
}
function left(){
    let left = document.getElementById("left");
    document.getElementById("left").style.backgroundColor = "#257956";
    setTimeout(function(){
        document.getElementById("left").style.backgroundColor = "#36AE7C";
    },150);
    if(fStart==1 && fWin==0){
        moveLeftCharacter();
    }
}
function down(){
    let down = document.getElementById("down");
    document.getElementById("down").style.backgroundColor = "#257956";
    setTimeout(function(){
        document.getElementById("down").style.backgroundColor = "#36AE7C";
    },150);
    if(fStart==1 && fWin==0){
        moveDownCharacter();
    }
}
function randomX() {
    var randomX;
        randomX = parseInt(Math.random() * (450 - 1) + 1);
    return randomX;
}
function randomY() {
    var randomY;
    randomY = parseInt(Math.random() * (450 - 1) + 1);
    return randomY;
}