
// vocal, drum, bass, and other are volumes ranging from 0 to 100

let wValue = 0.06;      //Changes width of visualizer bars
let wInfluence = 0.002; //Changes influence of i. Basically determines how thick each visualizer bar is

let boundaryTL = [10,200];
let boundaryTR = [100,200];
let boundaryBL = [10,800];
let boundaryBR = [100,800];

let boundaryHi = [640,204,1475,450] //in X1,Y1,X2,Y2. This defines the top half of the box. 1-numbered points determine the top left of the box, 2-numbered points determine top right
let boundaryLo = [660,820,1475,640] //in X3,Y3,X4,Y4. This defines the bottom half of the box. 3-numbered points determine bottom left, 4-numbered points determine bottom right

//let boundaryHi = [100,200,1700,150] //oeiginal boundaries
//let boundaryLo = [100,800,1900,900] //original boundaries

//X3 CANNOT BE LOWER THAN X1

let guardrailOffset = 0;

let centerlineOffset = 0;

let speedLinesLife = []

let speedLinesLocation = []

let speedLinesCount = 20;

let backgroundCityData = []

for (i=0;i<speedLinesCount;i++){
   speedLinesLife[i] = Math.random()*2
   //i*1/speedLinesCount
   
}

for (i=0;i<speedLinesLocation;i++){
   speedLinesLocation[i] = //Math.random()
   i*1/speedLinesCount
}

let ghostArrayBass = []
let ghostArrayDrum = []
let ghostArrayOther = []

let tSeconds;

let rainArray = []

let firstrun = true;

let shota;
let shotb;
let shotc;

function speedLines(){
   
   if (tSeconds > 1){
      strokeWeight(3);
      stroke(120);
      color(30)
      for (i=0;i<speedLinesCount;i++){
      
      //let location of speed line = speedLineLife[i]. so,

      stroke(60,60,60,speedLinesLife[i]*255)

      //speedlineslife determines the life of that speedline
      //speedlineslocation determines how spread out it is

      line( 
         (1920+(speedLinesLife[i]*-1000))-speedLinesLocation[i]*1000, 
         600-(speedLinesLife[i]*-(250-(speedLinesLocation[i])*150)), 
         (1970+(speedLinesLife[i]*-1000))-speedLinesLocation[i]*1000,
         590-(speedLinesLife[i]*-(250-(speedLinesLocation[i])*150))
      )
      
      speedLinesLife[i] = speedLinesLife[i] + 0.03

      if (speedLinesLife[i] > 1.8){
         speedLinesLife[i] = 0
         speedLinesLocation[i] = Math.random()
      }
   }

   strokeWeight(0);
   }


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

function yellowlineAnim(){
   fill(255,255,255,255)
   rect(
      2200-((centerlineOffset*40)**2.3),
      150-(centerlineOffset*-1000),
      500+(centerlineOffset*1500),
      30+(centerlineOffset*90)
   )
   if (tSeconds == 0){
      centerlineOffset = 0.1;
   } else {
      centerlineOffset = centerlineOffset + 0.011
      if (centerlineOffset > 1 || centerlineOffset < 0)
         centerlineOffset = 0;
   }
}

function whitelineAnim(){

   if (tSeconds == 0){
      centerlineOffset = 0.1;
      fill(255,0,255,255)
      beginShape();
      vertex(1920,381)
      vertex(1920,566)
      vertex((2200-((centerlineOffset*40)**2.3)),(150-(centerlineOffset*-1000)))
      vertex((2200-((centerlineOffset*40)**2.3))+(centerlineOffset*50)**2,(150-(centerlineOffset*-1000)))
      endShape(CLOSE);
   } else {
      if (centerlineOffset < 1){
         centerlineOffset = centerlineOffset + 0.011
         fill(255,255,255,255)
         beginShape();
         vertex(1920,600)
         vertex(1920,500)

         vertex((2200-((centerlineOffset*40)**2.3)),(150-(centerlineOffset*-1000)))
         vertex((2200-((centerlineOffset*40)**2.3))+(centerlineOffset*50)**2,(150-(centerlineOffset*-1000)))
         endShape(CLOSE);
      } else {
         beginShape();  //draws center lane
         vertex(1920,553);
         vertex(1920,566);
         vertex(0,1068);
         vertex(0,1029);
         endShape(CLOSE); 
      }

      //if (centerlineOffset > 1 || centerlineOffset < 0)
         //centerlineOffset = 0;
   }
}

function centerlineFill(){ 
   fill(20)
   beginShape();  //draws center lane
   vertex(1920,551);
   vertex(1920,568);
   vertex(0,1070);
   vertex(0,1027);
   endShape(CLOSE);
}

function drawCarShadow(){
   fill(0,0,0,120);
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

function drawEnv(){
   fill(10,10,255,50);//fallback fill colour

   fill(20);
   
   /*beginShape();
   vertex(1920,450);
   vertex(1920,605);
   vertex(396,1080); 
   vertex(0,1080);
   vertex(0,680);endShape(CLOSE); //draws the road without gap for center line
   */

   beginShape();     //draws the road with gap for center line
   vertex(1920,450);
   vertex(1920,553);
   vertex(0,1029);
   vertex(0,680);
   endShape(CLOSE);
   beginShape();
   vertex(1920,566);
   vertex(1920,605);
   vertex(396,1080); 
   vertex(0,1080);
   vertex(0,1068)
   endShape(CLOSE);

   fill(50);

   beginShape();  //draws guardrail
   vertex(1920,381);
   vertex(1920,425);
   vertex(0,600);
   vertex(0,460);
   endShape(CLOSE); 
   fill(45);
   beginShape();
   vertex(1920,391);
   vertex(1920,415);
   vertex(0,580);
   vertex(0,480);
   endShape(CLOSE); 
   fill(50);
   
   /*beginShape();  //draws center lane
   vertex(1920,553);
   vertex(1920,566);
   vertex(0,1068);
   vertex(0,1029);
   endShape(CLOSE); */
}

function drawBackgroundCity(){
   fill(255)
   for (i=1;i<100;i++){
      rect((100*i)+(tSeconds*-500),backgroundCityData[i+100],backgroundCityData[i],200)
   }
   rect(50,50,100,100)

}

function shotadrawcar(){
   fill(255,0,0)
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
      console.log(speedLinesLife)
      firstrun = false;

      for (i=1;i<1000;i++){                                 //generates a thousand lines of random numbers that can be used for making a city
         backgroundCityData.push(50+(Math.random()*50))
         console.log(backgroundCityData)
      }
   }

   tSeconds = round(counter/60,5)
   
   //scene switcher

   if (tSeconds > -1){
      console.log("drawing one frame!")

      /*the layering should be in this order!

      lineFill ON BOTTOM LAYER 
      guardrailAnim, yellowlineAnim, whitelineAnim 
      drawEnv
      speedLines
      drawCarShadow
      drawCar ON TOP

      */
      drawBackgroundCity();
      centerlineFill();
      guardrailAnim();
      //yellowlineAnim();
      whitelineAnim();
      drawEnv()
      speedLines();

      drawCarShadow();

      image(shota, 0, 0);
      fill(128)
      text("scene 1, shot a showroom lights off", 50, 100)
      fill(255,0,0)
      


      
   
      shotadrawcar()
      text(mouseX + ", " + mouseY, 50, 200)



      
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



