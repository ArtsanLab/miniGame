
let bagPackNum;
let farmingTime;
let moveNum;
let LEVEL=1;
let NumWon=0;
let BagDropItem=[0,0,0,0,0];

NAMEAREA=['Enchanto Hopwizard','Rabbito Pinkpuff','Fleeceleto Cupcake', 'Wizkito Ann', 'Blondara Hornara']

document.addEventListener('DOMContentLoaded', function(){updateLevel();imgLevelChange();drawLevel();});


function LevelChange(){
    updateLevel();
    reset();
    setTimeout(imgLevelChange,1000);
}

function FARMLAVEL(){
    let time = 500+Math.random()*4500;
    time = Math.round(time/100)*100;
    return time
}

function MOVELEVEL(){
    return Math.round(8+5*(2*Math.random()-1)**3)
}

function BAGLEVEL(){
    return Math.round(6+(6*Math.random()**2))
}

function LEVELGEN(){
    return Math.floor(5*Math.random())+1
}

function updateItemDrop(){
    for (i=0;i<BagDropItem.length;i++){
        if (BagDropItem[i]>0){
            document.getElementById(`Drop${i}`).style.opacity=1;
            document.getElementById(`dropCount${i}`).textContent=BagDropItem[i];
        }
        else{
            document.getElementById(`Drop${i}`).style.opacity=0;}
    }
}

function updateLevel(){

    moveNum=MOVELEVEL();
    bagPackNum=BAGLEVEL();
    farmingTime=FARMLAVEL();

    updateItemDrop();
    
    document.getElementById('levelID').textContent=`Area ${NAMEAREA[LEVEL-1]}`;

    document.getElementById('levelInfo').textContent=`Move: ${moveNum} | Times: ${farmingTime/1000}sec | Item pool: ${bagPackNum} `;
}

function reset(){


    for(i=0;i<boxPosition.length;i++){
        boxPosition[i].style.opacity=1;
    }

    document.getElementById('mimg').style.opacity=1;

    let hisBoxes=document.getElementsByClassName('historyBox');
    
    for(;hisBoxes.length>0;){
        hisBoxes[0].remove();
    }

    mainMassage.textContent=commandMassage[0];
    mainMassage.style.pointerEvents='auto';
    STATE=0;
    point=0;
    SERIES = shuffleArray(lineElement(9));
    document.getElementById('MoveNum').textContent=moveNum;

    document.getElementById('MoveNum').style.backgroundColor=`black`;
    welcomeLevel();
    

    document.getElementById('showGuess').checked = false;
    document.getElementById('showProb').checked = false;
    document.getElementById("bearthought").innerText='';

}

function imgLevelChange(){
    document.getElementById('mimg').setAttribute('src',`drop/Drop${LEVEL}.png`);
    document.getElementById('mimg').style.opacity=1;

}

function welcomeLevel(){
    mainMassage.style.pointerEvents='none';
    mainMassage.textContent =  `~ welcome to area ${NAMEAREA[LEVEL-1]} ~ `;
    setTimeout(function(){mainMassage.style.pointerEvents='auto';
    mainMassage.textContent = commandMassage[0];},2000)
}

function winLevel(){
    mainMassage.style.pointerEvents='none';

    mainMassage.textContent = '----- YOU WON THE AREA -----';
    
    BagDropItem[LEVEL-1]++;
    
    NumWon++;

    drawLevel();
    
    if (BagDropItem.reduce((accum,x)=> {return accum&&x})){
        updateItemDrop();
        setTimeout(function(){mainMassage.textContent = 'you had collect all items'},1000);
        setTimeout(drawEND,2000);
       
     }
    else{
        for(i=0;i<3;i++){
            setTimeout(function(){mainMassage.textContent = `Going to the next Area in ${i} `;i--},(i+2)*1000);
        }
    
        setTimeout(function(){LEVEL=LEVELGEN();LevelChange();},5000)
     }


}

function loseLevel(){
    mainMassage.style.pointerEvents='none';

    mainMassage.textContent = '----- YOU LOSE THE AREA -----';
    
    
    BagDropItem[Math.floor(5*Math.random())]&&BagDropItem[Math.floor(5*Math.random())]--;

    NumWon--;
    
    drawLevel();

    for(i=0;i<3;i++){
        setTimeout(function(){mainMassage.textContent = `Going to the next Area in ${i} `;i--},(i+2)*1000);
    }

    setTimeout(function(){LEVEL=LEVELGEN();LevelChange();},5000)

}
