
// vocal, drum, bass, and other are volumes ranging from 0 to 100



let wValue = 0.06;      //Changes width of visualizer bars
let wInfluence = 0.002; //Changes influence of i. Basically determines how thick each visualizer bar is

let boundaryTL = [10,200];
let boundaryTR = [100,200];
let boundaryBL = [10,800];
let boundaryBR = [100,800];

let boundaryHi = [640,204,1475,450] //in X1,Y1,X2,Y2. This defines the top half of the box. 1-numbered points determine the top left of the box, 2-numbered points determine top right
let boundaryLo = [660,820,1475,640] //in X3,Y3,X4,Y4. This defines the bottom half of the box. 3-numbered points determine bottom left, 4-numbered points determine bottom right

//X3 CANNOT BE LOWER THAN X1

let guardrailOffset = 0;

speedLinesLife = []

for (i=0;i<20;i++){
   speedLinesLife[i] = 0
}


//let boundaryHi = [100,200,1700,150] //oeiginal boundaries
//let boundaryLo = [100,800,1900,900] //original boundaries


//let raintempX;
let raintempY;

let ghostArrayBass = []
let ghostArrayDrum = []
let ghostArrayOther = []

let tSeconds;

let rainArray = []

let firstrun = true;

let shota;
let shotb;
let shotc;

//width and height are a thing

//RAIN BLUEPRINT

function rainBp(){
   this.x = random(0,1920)
   this.y = random(0,1080)

   this.show = function() {
      
      fill(0,0,255);
      ellipse(this.x,this.y,10,10);
   }

   this.update = function() {
      this.y = this.y + 5
      if (this.y > 1080){
         this.y = 0;
      }

      }
   
}

function speedLines(){
   
   strokeWeight(5);
   stroke(120);
   color(30)

   

   for (i=0;i<20;i++){
      
      //let location of speed line = speedLineLife[i]. so,
      line(speedLinesLife[i]*100,500+i*5,speedLinesLife[i]*100+250,500)
      speedLinesLife[i] = speedLinesLife[i] + 0.01
      console.log(speedLinesLife)
      if (speedLinesLife[i] > 1){
         speedLinesLife[i] = 0
      }
   }

   strokeWeight(0);

}



function guardrailAnim(){
   fill(255,255,255,255)
   rect(    //uses powers to give an illusion of perspective. aka when its "far away", it moves on the screen slower, but when its "closer", it moves on the screen faster.
      2200-((guardrailOffset*40)**2.2),
      380-(guardrailOffset*-105),
      30+(guardrailOffset*90),
      120+(guardrailOffset*130)
   ) 
   if (tSeconds == 0){
      guardrailOffset = 0;
   } else {
      guardrailOffset = guardrailOffset + 0.01
      if (guardrailOffset > 1 || guardrailOffset < 0)
         guardrailOffset = 0;
   }
   //console.log(guardrailOffset)
}

function drawEnv(){
   fill(10,10,255,50);beginShape();vertex(1920,450);vertex(1920,605);vertex(396,1080);vertex(0,1080);vertex(0,680);endShape(CLOSE); //draws the road

   beginShape();  //draws guardrail
   vertex(1920,381);
   vertex(1920,425);
   vertex(0,600);
   vertex(0,460);
   endShape(CLOSE); 

   beginShape();  //draws center lane
   vertex(1920,553);
   vertex(1920,566);
   vertex(0,1068);
   vertex(0,1029);
   endShape(CLOSE); 
   
   beginShape();  //draw shadow for car
   vertex(1125,605);
   vertex(1436,623);
   vertex(1466,630);
   vertex(1399,649);
   vertex(1054,725);
   vertex(754,771);
   vertex(705,773); //rear of car
   vertex(371,734);
   vertex(399,720);
   vertex(501,700);
   vertex(691,670);
   endShape(CLOSE);
}

   function shotadrawcar(){
   fill(255,0,0)
   color(255,0,0)
   beginShape();
      vertex(1000,800)
   endShape(CLOSE)
}



function draw_one_frame(words, vocal, drum, bass, other, counter) {
background(5)
textFont('Verdana'); // please use CSS safe fonts
//rectMode(CENTER)
textSize(24);




   //for 2nd visualizer

   remapBass = map(bass,50,100,0,1)
   remapVocal = map(vocal,0,100,0,1)
   remapDrum = map(drum,50,100,0,1)
   remapOther = map(other,50,100,0,1)

   if(firstrun){
      shota = loadImage('assets/shota.png')
      shotb = loadImage('assets/shotb.png')
      shotc = loadImage('assets/shotc.jpg')
      for (i=0; i<200;i++){
         rainArray[i] = new rainBp(); //sets a rain blueprint
      }  
      firstrun = false;
   }



   //RAIN FUNCTION

   function updateRain(){
      for (i=0;i<200;i++){
         rainArray[i].show();
         rainArray[i].update();
      }
   }

   function rainfx(){

      rect(1+raintempX,1+raintempY,50,50)

      if (tSeconds > 0.00001){
         raintempX = raintempX + 1
         raintempY = raintempY + 3
         if (raintempX > 1920){
            raintempX = 1
         } 
         if (raintempY > 1080){
            raintempY = 1
         }
      }
   }

   tSeconds = round(counter/60,5)
   
   //scene switcher

   if (tSeconds > -1){
      console.log("drawing one frame!")
      speedLines();
      guardrailAnim();
      drawEnv()
      image(shota, 0, 0);
      fill(128)
      text("scene 1, shot a showroom lights off", 50, 100)
      fill(255,0,0)

      
   
      shotadrawcar()
      text(mouseX + ", " + mouseY, 50, 200)


      //updateRain  ()
      
   }/* else if (tSeconds >= 15 && tSeconds < 30){
      image(shota,0,0);
      text("scene 2, shot a showroom lights on", 50, 100)
      
   } else if (tSeconds >= 30 && tSeconds < 44.7){
      image(shota,0,0)
      text("scene 3, shot a overcast", 50, 100)

   } else if (tSeconds >= 44.7 && tSeconds < 59.5){
      image(shotb,0,0)
      text("scene 4, shot b raining", 50, 100)

   } else if (tSeconds >= 59.5 && tSeconds < 74.3){   
      image(shotb,0,0)
      text("scene 5, shot b snowing",50,100)

   } else if (tSeconds >= 74.3 && tSeconds < 89.1){
      image(shotc,0,0)
      text("scene 6, shot c snowing",50,100)

   } else if (tSeconds >= 89.1 && tSeconds < 118.5){
      image(shotc,0,0)
      text("scene 7, shot c raining",50,100)
   } else if (tSeconds >=118.5 && tSeconds < 125.9){
      image(shota,0,0)
      text("scene 8, shot a tunnel",50,100)
   } else if (tSeconds >= 125.9){
      image(shota,0,0)
      text("scene 9, shot a overcast",50,100)
   }*/

   text(tSeconds + " seconds elapsed", 50, 50)

for (i=1;i<13;i++){ //how many lines are there

   fill(0,255,0,5); //This fills in the boundaries. used for testing
   //beginShape();vertex(boundaryHi[0],boundaryHi[1]); vertex(boundaryHi[2],boundaryHi[3]);vertex(boundaryLo[2],boundaryLo[3]);vertex(boundaryLo[0],boundaryLo[1]);endShape(CLOSE);
   
   fill(200,0,0,0+(ghostArrayBass[(ghostArrayBass.length)-(i)])*170) // <- colour here!
   strokeWeight(0);

   //ghostArrayBass[(ghostArrayBass.length)-(i)] <- find volume values here

   p = (i-1)/10; //how far along the line you want to be, controlled by i. if you want to change how many lines FIT within the boundaries, change this value
   w = wValue-(i*wInfluence); // how wide you want each bar to be


   let vertBLX = boundaryLo[0]+(boundaryLo[2]-boundaryLo[0])*p //BL -> Bottom Left, X -> X axis
   let vertBLY = boundaryLo[1]+(boundaryLo[3]-boundaryLo[1])*p

   let vertBRX = boundaryLo[0]+(boundaryLo[2]-boundaryLo[0])*(p+w)
   let vertBRY = boundaryLo[1]+(boundaryLo[3]-boundaryLo[1])*(p+w)

   let vertTRX = boundaryHi[0]+(boundaryHi[2]-boundaryHi[0])*(p+w)
   let vertTRY = boundaryHi[1]+(boundaryHi[3]-boundaryHi[1])*(p+w)

   let vertTLX = boundaryHi[0]+(boundaryHi[2]-boundaryHi[0])*p
   let vertTLY = boundaryHi[1]+(boundaryHi[3]-boundaryHi[1])*p

   beginShape()
   vertex( //THIS IS THE TOP RIGHT CORNER
      Math.min(
         (
            (vertBRX) /*X1*/
            +((vertTRX) /*X2*/ 
            -(vertBRX) /*X1*/ ) * ghostArrayDrum[(ghostArrayDrum.length)-(i)]
         )
      ,vertBRX) //2nd argument in Math.min. Prevents it from going below minimum.
      ,
      Math.min(
         (
            (vertBRY) /*X*/
            +((vertTRY) /*Y2*/ 
            -(vertBRY) /*Y1*/ ) * ghostArrayDrum[(ghostArrayDrum.length)-(i)]
         )
         ,vertBRY //2nd arg in Math.min
      )
   ); //end of Math.min

   vertex(vertBRX,vertBRY); /*Bottom right vert*/
   vertex(vertBLX,vertBLY); /*Bottom left vert*/

   vertex( //THIS IS THE TOP LEFT CORNER. same code as the top right corner but any R in vert variables are changed to L
      Math.min(
         (
            (vertBLX) /*X1*/
            +((vertTLX) /*X2*/ 
            -(vertBLX) /*X1*/ ) * ghostArrayDrum[(ghostArrayDrum.length)-(i)]
         ),
         vertBLX //2nd arg in Math.min
      ), 

      Math.min(
         (
            (vertBLY) /*Y1*/
            +((vertTLY) /*Y2*/ 
            -(vertBLY) /*Y1*/ ) * ghostArrayDrum[(ghostArrayDrum.length)-(i)]
         )
         ,vertBLY //2nd arg in Math.min
      )
   );

   endShape(CLOSE)

   line()

}

ghostArrayBass.push(remapBass)
ghostArrayDrum.push(remapDrum)
ghostArrayOther.push(remapOther)



}        



