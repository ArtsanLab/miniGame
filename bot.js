how2Won=[1,2,0];
how2Lose=[2,0,1];


const bot0Perfer= shuffleArray(lineElement(3));
const bot1Perfer= shuffleArray(lineElement(3));
const BOTBEHAVE=['The opponet have perference items to pick','The opponet have perference items to pick',
`The opponet pick items randomly`, 
'The opponet always pick the highest possibility to won', 'The opponent often picks the item with the highest likelihood of winning'];



function bot0(){
    // havePerference
    let hand=hand2item(botHand);
    let idx = hand.indexOf(bot0Perfer[0])+1||hand.indexOf(bot0Perfer[1])+1||hand.indexOf(bot0Perfer[2])+1;
    return idx-1
}

function bot1(){
    // havePerference
    let hand=hand2item(botHand);
    let idx = hand.indexOf(bot0Perfer[0])+1||hand.indexOf(bot0Perfer[1])+1||hand.indexOf(bot0Perfer[2])+1;
    return idx-1
}

function bot2(){
      //random
      return Math.floor(Math.random()*3);
}

function bot3(){    
    // TRY TO WIN LOOK AT POP
    const score = calProb(2,-1,-3); // win-tie-lose- score

    scoreList=score.slice().sort(function(a,b){
        return b - a});

    return score.indexOf(scoreList[0])
}

function bot4(){
    const paramete=0.3; 
    let score = calProb(+2,-1,-3); // win-tie-lose- score

    

    scoreList=score.slice().sort(function(a,b){
        return b - a});

    if(Math.random>paramete){
        idx=score.indexOf(scoreList[0]);
    }
    else{
        idx=score.indexOf(scoreList[1]);
    }

    let y = (score.indexOf(2)+1)||(idx+1);

    return  y-1
}





const botFunctions = [bot0, bot1, bot2, bot3, bot4];


function countValue(arr) {


    let countMap=[0,0,0];
    for (i=0;i<arr.length;i++){
        countMap[arr[i]]++;
    }

return countMap
}

function calMode(){
    // this find the mode  
    const totalItem = countValue(bagPackItem);  //bot see items on the tabel
    const botItem = countValue(hand2item(botHand)); //bot see items on his hand
    const userItemPosible = totalItem.map((x,idx) => x-botItem[idx]);
   
    return indexOfMaxDescending(userItemPosible);
}


function calProb(CWin,CTie,CLose){
    const totalItem = countValue(bagPackItem);  //bot see items on the tabel
    const botItem = countValue(hand2item(botHand)); //bot see items on his hand
    const userItemPosible = totalItem.map((x,idx) => x-botItem[idx]);
    const totalNumevent=bagPackItem.length-botHand.length;
    const botITEM = hand2item(botHand);
    let winpercent=[];
    let tiepercent=[];
    let losepercent=[];
    let score =[];
    for (i=0;i<botHand.length;i++) {
        winpercent[i] = userItemPosible[how2Lose[botITEM[i]]]/totalNumevent;
        tiepercent[i] = userItemPosible[botITEM[i]]/totalNumevent;
        losepercent[i] = userItemPosible[how2Won[botITEM[i]]]/totalNumevent;
        score[i]=CWin*winpercent[i]+CTie*tiepercent[i]+CLose*losepercent[i];
    }
    
    return score
}

function calProb_user(){
    const totalItem = countValue(bagPackItem);  //bot see items on the tabel
    const userItem = countValue(hand2item(userHand)); //bot see items on his hand
    const botItemPosible = totalItem.map((x,idx) => x-userItem[idx]);
    const totalNumevent=bagPackItem.length-userHand.length;

    let winpercent;
    let tiepercent;
    let losepercent;
    let message='';
    for (i=0;i<botHand.length;i++) {
        if(userItem[i]>0){
            winpercent = botItemPosible[how2Lose[i]]/totalNumevent;
            tiepercent = botItemPosible[i]/totalNumevent;
            losepercent = botItemPosible[how2Won[i]]/totalNumevent;
            message+=(`${item[i]},prob. ${Math.floor(winpercent*10)/10}W ${Math.floor(tiepercent*10)/10}T ${Math.floor(losepercent*10)/10}L.\n`); 
        }
    }
   document.getElementById("bearthought").innerText=message;
} 



function hand2item(arr){
    return  arr.map(x => bagPackItem[x])
}


function indexOfMaxDescending(arr) {
    if (!arr || arr.length === 0) {
      return -1; // Return -1 for empty or undefined arrays
    }

    const indexedValues = arr.map((value, index) => ({ value, index }));
  
    // Sort the array of objects based on values in descending order
    indexedValues.sort((a, b) => b.value - a.value);
    
    let indexDes=[]
    // Return the index of the highest value in the sorted array
    for (i=0;i<arr.length;i++){
        indexDes[i]=indexedValues[i].index;
    }
        
    return indexDes
  }
  
