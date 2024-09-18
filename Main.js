// rock=0 paper=1 scissors=2 

const item=['rock','paper','scissors']
const imgURL=['item/rock.jpg','item/paper1.jpg','item/scissor.jpg','item/bag1.jpg']
const commandMassage=['start the round',
'Remember all possibility of item in item pool','Choose your MOVE']
let bot, user, result;
let STATE=0;
let point = 0;
let TIME=1500; //time to display 1 move
let numBlock=9;
let SERIES;
let boxPosition;
let mainMassage;
let sceneBattle;

document.addEventListener('DOMContentLoaded', function(){ mainMassage=document.getElementById('order');
boxPosition=document.getElementsByClassName('blackBox');
sceneBattle=document.getElementsByClassName('scene')[0];
createBlackBox();LEVEL=LEVELGEN();
reset();
});

function createBlackBox(){
    
    for(i=0;i<numBlock;i++){

        var newDiv = document.createElement('div');
        newDiv.classList.add('blackBox');

        var newImg = document.createElement('img');
        newImg.setAttribute('src',`item/boxes/image${i%3+1}x${Math.floor(i/3)+1}.jpeg`)
        
        newDiv.appendChild(newImg);
        
        
        document.getElementById('mainBox').appendChild(newDiv);
        
        }
}


function one_move(i) {
    disabledButton();
    var j=botMove();
    user=bagPackItem[userHand[i]];
    bot=bagPackItem[botHand[j]];
    revealBotHand();
    hideItemPicked(i,j);
    updateMove(); //number of move
    execute();
    setTimeout(displayResult, TIME/8);
    setTimeout(endphase,TIME);

}

function execute() {     
    if( user === bot ){
        resultTie();
    }
    else{
        if((user-bot) === 1 ){
            resultWon();
        }
        else if((user-bot) === -2 ){
            resultWon();
        }       
        else{
            resultLose();
        }
    }
}

function resultWon(){
    result = ' win ';
    setTimeout(revealImg,TIME*.8);
    setTimeout(revealImg,TIME*.85);
    setTimeout(revealImg,TIME*.9);
    setTimeout(function(){addhistoryDiv('rgba(0, 114, 51, 0.61)');
    temporaryColorScene('rgba(0, 114, 51, 0.61)')},TIME/3);   
    setTimeout(function(){document.getElementById("bearthought").innerText=' Won the round '},TIME/3);
    
}

function resultTie(){
    result = ' tie ';
    setTimeout(revealImg,TIME*.9);
    setTimeout(function(){addhistoryDiv('rgba(157, 158, 110, 0.612)');
    temporaryColorScene('rgba(157, 158, 110, 0.612)')},TIME/3);
    setTimeout(function(){document.getElementById("bearthought").innerText=' Tie !! '},TIME/3);
}


function resultLose(){
    result = ' lose ';
    setTimeout(sealImg,TIME*.9);
    setTimeout(sealImg,TIME*.9);

    setTimeout(function(){addhistoryDiv('rgba(66, 2, 2, 0.842)');
    temporaryColorScene('rgba(66, 2, 2, 0.842)','lemonchiffon')},TIME/3);
    setTimeout(function(){document.getElementById("bearthought").innerText=' Lose the round '},TIME/3);
}

function hideItemPicked(i,j){
    document.getElementById(`userHand${i}`).style.opacity=0;
    document.getElementById(`botHand${j}`).style.opacity=0;

}


function temporaryColorScene(color1,color2='black'){
    tem=sceneBattle.style.backgroundColor;
    tem2=sceneBattle.style.color;
    sceneBattle.style.backgroundColor=color1;
    sceneBattle.style.color=color2;
    setTimeout(function(){sceneBattle.style.backgroundColor=tem;
    sceneBattle.style.color=tem2;},1000)

}



function isWinTheGame(){
    return point>8
}

function islosetheGame(){
    return 3*moveNum < numBlock-point
}


function revealImg(){ 
    if(point<=8){
        boxPosition[SERIES[point]].style.opacity=0;
        point++;
    }
}


function sealImg(){
    if(point>0){
        point--;
        boxPosition[SERIES[point]].style.opacity=1;}     
}

function botMove(){
    // have to return the position of item on hand 0-2, and it map to which item by   botMove - return position of > bothand - return position of >  bagPackItem - position of > known items. We dont change bagPackItem in a pharse and it reverse 
    
return botFunctions[LEVEL-1]()
}

function displayResult() {
// Get the container element
    var imgUser = document.getElementById('imgUser')
    var imgBot = document.getElementById('imgBot')

    imgUser.src = imgURL[user];
    
    setTimeout(function (){imgBot.src = imgURL[bot]},TIME/4)
    // setTimeout(function (){mainMassage= result;},TIME/3)
    

    //clear disply results
    setTimeout(function (){imgUser.src = ''},TIME)
    setTimeout(function (){imgBot.src = ''},TIME)
    // setTimeout(function (){mainMassage = '';},TIME)
}

function updateMove(){
    var textContainer = document.getElementById('MoveNum');
    moveNum--;
    redValue = 12*(10-moveNum);
    textContainer.style.backgroundColor=`rgb(${redValue*2}, ${redValue}, ${redValue})`;
    textContainer.textContent = `${moveNum}`;
}

function endphase(){
    clearHand();

    if (document.getElementById('showGuess').checked){
        document.getElementById("bearthought").innerText= BOTBEHAVE[LEVEL-1];
    }

    if (isWinTheGame()){
        winLevel();
    }else if(islosetheGame()){
        loseLevel();
    }

    STATE=0;
}


function enableButton() {
  var buttons = document.getElementsByClassName('item_move');
  for (var i = 0; i < buttons.length; i++) {
   buttons[i].disabled = false;
   buttons[i].style.pointerEvents='auto';}
   
}


function disabledButton() {
    mainMassage.textContent = '';

    var buttons = document.getElementsByClassName('item_move');
    for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
    buttons[i].style.pointerEvents='none'}
}



function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function lineElement(num) {
    var array = [];
    for (var i = 0 ; i<num ;i++ ){
        array[i] = i;
    }
    return array
}

function revealBotHand(){

    for (i=0;i<3;i++){
        var itemBot = document.getElementById(`botHand${i}`);
        itemBot.style.opacity=0.3;
        itemBot.setAttribute('src',imgURL[bagPackItem[botHand[i]]]);
        document.getElementById(`userHand${i}`).style.opacity=0.3;
    }
}

function addhistoryDiv(colorBox) {
    // Create a new div element
    var newDiv = document.createElement('div');

    newDiv.classList.add('historyBox');

    // Set properties for the new div (you can customize this part)
    newDiv.style.backgroundColor = colorBox;

    

    var item1 = document.createElement('img');
    item1.classList.add('historyBoxImg');
    item1.setAttribute('src',imgURL[user])
    newDiv.appendChild(item1)

    var item2 = document.createElement('img');
    item2.classList.add('historyBoxImg');
    item2.setAttribute('src',imgURL[bot])
    newDiv.appendChild(item2)

    // Append the new div to the existing div
    document.getElementsByClassName('historyBOXES')[0].appendChild(newDiv);

    newDiv.style.opacity=0.8;
  }

document.getElementsByClassName('credit')[0].textContent= `1st JavaScript minigame project by Atoro`
