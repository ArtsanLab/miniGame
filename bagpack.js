
let bagPackItem=[];
let userHand=[];
let botHand=[];

function createPack() {
    for (i=0;i<bagPackNum;i++){
        var newItem = Math.floor(Math.random()*3);
        bagPackItem[i]=newItem;

        var itemReveal = document.getElementById(`pack${i}`);
        itemReveal.setAttribute('src',imgURL[newItem]);
        
        document.getElementById(`pack${i}`).style.opacity=1;
    }
  }

function drawItem(){

    var itemList = shuffleArray(lineElement(bagPackNum));
    userHand=itemList.slice(0,3)
    botHand=itemList.slice(3,6)

    for(i=0;i<3;i++){
        var itemUser =document.getElementById(`userHand${i}`);
        itemUser.setAttribute('src',imgURL[bagPackItem[userHand[i]]]);
        itemUser.style.opacity=1;
        var itemBot = document.getElementById(`botHand${i}`);
        itemBot.setAttribute('src',imgURL[3]);
        itemBot.style.opacity=1;
    }

    if (document.getElementById('showProb').checked){
        calProb_user()
    }

    mainMassage.textContent = commandMassage[2];
    remainIems()
}

function remainIems() {
    for (i=0;i<bagPackNum-6;i++){
    
        document.getElementById(`pack${i}`).setAttribute('src',imgURL[3]);
    }

    for (i=bagPackNum-6;i<bagPackNum;i++){
    
        document.getElementById(`pack${i}`).style.opacity=0;
    }
  }

function MainCommand(){
    if (STATE==0)
      {
       
        document.getElementById("bearthought").innerText= '';
    
        createPack();
        farming();
        STATE=1;
        mainMassage.textContent = commandMassage[1];
        mainMassage.style.pointerEvents='none';
      }
    else if(STATE==1){   
        drawItem()
        STATE=2;
        enableButton()
       }
}

function farming(){
   
    for (i=0;i<8;i++){
        setTimeout(function(){
            mainMassage.textContent +='.';
        },farmingTime*i/10)
    }

    setTimeout(function(){mainMassage.textContent = '!!!'},farmingTime*9/10)
    
    setTimeout(MainCommand,farmingTime)
}


function clearHand(){
    for(i=0;i<3;i++){
        
        document.getElementById(`userHand${i}`).style.opacity=0;

        document.getElementById(`botHand${i}`).style.opacity=0;
        
    }

    for(i=0;i<bagPackNum;i++){
        
        document.getElementById(`pack${i}`).style.opacity=0;
        
    }

    mainMassage.textContent = commandMassage[0];
    mainMassage.style.pointerEvents='auto';
}

