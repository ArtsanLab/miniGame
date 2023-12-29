let WonHistory=[0];
let bearPx=0;
let bearPy=0;
let bearPx_old,bearPy_old;
let bearSize=50;
let monSize=50;

let image1 = new Image();
let image2 = new Image();

let v;// initial move parameter
let GameEnd=false;


function drawLevel(){
  
  WonHistory.push(NumWon);

  let length=WonHistory.length;
  let tall=Math.max(...WonHistory)-Math.min(...WonHistory)+4;
  
  let canvas = document.getElementById('LevelTrack');

 
  let context = canvas.getContext('2d');
  let W=canvas.width;
  let H=canvas.height;
  
  let cy1= -0.4*W;
  let cy2= 100;
  let cx1= 0.5*W;
  let cx2= 0;

  context.clearRect(0, 0, canvas.width, canvas.height);
  
  for (i=1;i<length;i++){
      x=cx1*i/(length-1)+cx2;
      y=cy1*WonHistory[i]/tall+cy2;
      x0=cx1*(i-1)/(length-1)+cx2;
      y0=cy1*WonHistory[i-1]/tall+cy2;
      context.strokeStyle = 'rgb(172, 172, 172)';
      context.setLineDash([5, 5]);
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(x0,y0);
      context.lineTo(x,y);
      context.stroke();
      context.closePath();

      context.fillStyle = 'rgb(20, 203, 72)'; // Point color
      context.beginPath();
      context.arc(x, y, 2, 0, 2 * Math.PI); // Draw a small circle (radius 3)
      context.fill(); // Fill the circle with the specified color
      context.closePath();
  }
  
  bearPx_old=x0-bearSize/2;
  bearPy_old=y0-bearSize/1.5;

  

  bearPx=x-bearSize/2;
  bearPy=y-bearSize/1.5;

  image2.src = `botImg/bot${LEVEL}.png`;

  v=0; // initial move parameter
}


// draw bear

let imagesLoaded = 0;

let canvas = document.getElementById('bear');
let context = canvas.getContext('2d');

// Load the images
image1.src = 'player/player1.png';



image1.onload = function() {
    imagesLoaded++;
    if (imagesLoaded === 1) {
        // Start the animation loop
        animate();
      }
};

let frame = 0;

function animate() {
    frame = (frame+1)%2;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if(GameEnd){
      // Draw the current frame
      if (frame === 0) {
      
        // Draw image1 on even frames
        context.drawImage(image1, 80, 10,150,150);

      } else {
          
        // Draw image2 on odd frames
        context.drawImage(image1, 80, 10+0.05*150,150,150*.95);

      }
    }
    else{
      if (v<=1){
        v+=0.0625;
        position_x= bearPx_old+(bearPx-bearPx_old)*v;
        position_y= bearPy_old+(bearPy-bearPy_old)*v;
    
        // Draw the current frame
        if (frame === 0) {
            
          // Draw image1 on even frames
          context.drawImage(image1, position_x, position_y+0.02*bearSize,bearSize,bearSize*.98);
        } else {
            
          // Draw image2 on odd frames
          context.drawImage(image1, position_x, position_y,bearSize*.9,bearSize);
        }
      }

      else
      {
        // Draw the current frame
        if (frame === 0) {
      
          // Draw image1 on even frames
          context.drawImage(image1, position_x, position_y,bearSize,bearSize);

          context.drawImage(image2, position_x+monSize, position_y, monSize,monSize);

        } else {
            
          // Draw image2 on odd frames
          context.drawImage(image1, position_x, position_y+0.05*bearSize,bearSize,bearSize*.95);

          context.drawImage(image2, position_x+monSize, position_y+0.05*monSize,monSize,monSize*.95);
        }
      }
    }
    
    // Request the next animation frame
    setTimeout(function(){requestAnimationFrame(animate)},400);
  }


  let canvasEnd = document.getElementById('END');
  let contextEnd = canvasEnd.getContext('2d');
  contextEnd.fillStyle = 'white';
  contextEnd.font = '20px Arial';


  function drawEND(){
    animateEND();
    GameEnd=true;
  }

  let animateEND_i = 0;
  let frameEnd=0;
  let MonEndSize=100;
  let MonloopNum=0;
  let img1 = new Image()
  img1.src=`botImg/bot1.png`

  function animateEND(){
     
      contextEnd.clearRect(0, 0, canvasEnd.width, canvasEnd.height);
      // Draw the current frame
      frameEnd=(frameEnd+1)%50


      animateEND_i = (animateEND_i+1)%350;
      x= 250-animateEND_i;

      contextEnd.fillText(NAMEAREA[MonloopNum],x, 40 + MonEndSize);

      if(animateEND_i==0){
        MonloopNum=(MonloopNum+1)%5;
        img1.src=`botImg/bot${MonloopNum+1}.png`
      }
      if (frameEnd >= 0 && frameEnd < 20) {
        contextEnd.drawImage(img1, x, 20,MonEndSize,MonEndSize);
      }
      else if(frameEnd >= 20 && frameEnd < 30){
        contextEnd.drawImage(img1, x, 20+MonEndSize*.05,MonEndSize,MonEndSize*.95);
            }
      else if(frameEnd >= 30 && frameEnd < 50){         
        contextEnd.drawImage(img1, x, 20+MonEndSize*.05,MonEndSize*1.1,MonEndSize*.95);
      }

    setTimeout(function(){requestAnimationFrame(animateEND)},10);
    }