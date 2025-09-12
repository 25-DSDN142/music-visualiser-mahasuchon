
// vocal, drum, bass, and other are volumes ranging from 0 to 100

let boundaryTL = [10,200];
let boundaryTR = [100,200];
let boundaryBL = [10,800];
let boundaryBR = [100,800];

let boundaryHi = [];
let boundaryLo = [];

let transitionTransparency = 0;

//let boundaryHi = [640,204,1475,450] //in X1,Y1,X2,Y2. This defines the top half of the box. 1-numbered points determine the top left of the box, 2-numbered points determine top right
//let boundaryLo = [660,820,1475,640] //in X3,Y3,X4,Y4. This defines the bottom half of the box. 3-numbered points determine bottom left, 4-numbered points determine bottom right

//let boundaryHi = [100,200,1700,150] //oeiginal boundaries
//let boundaryLo = [100,800,1900,900] //original boundaries

//X3 CANNOT BE LOWER THAN X1

let guardrailOffset = 0;

let centerlineOffset = 0;

let speedLinesLife = []

let speedLinesLocation = []

let speedLinesCount = 20;

let backgroundCityData = []

let starCityData = []

let altVisBarShiftX;

let altVisBarShiftY;

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

function fadeOut(t){          //WHERE T IS THE TIME YOU WANT THE TRANSITION TO COME INTO FX
   let transitionTransparency = (tSeconds-t)*255
   fill(0,0,0,transitionTransparency)
   rect(0,0,2000,2000)
   //let transitionTransparency = (tSeconds-t)*255
}

function fadeIn(t){
   let transitionTransparency = ((tSeconds-t)*255)*-1
   fill(0,0,0,transitionTransparency)
   rect(0,0,2000,2000)
}

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
   fill(50,50,50,255)
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
      if (guardrailOffset > 1 || guardrailOffset < 0.3)
         guardrailOffset = 0.3;
   }
   //console.log(guardrailOffset)
}

function whitelineAnim(){
   fill(200,200,200,255)
   rect(
      2200-((centerlineOffset*40)**2.3),
      150-(centerlineOffset*-1000),
      500+(centerlineOffset*1500),
      30+(centerlineOffset*90)
   )
   if (tSeconds == 0){
      centerlineOffset = 0.1;
   } else {
      centerlineOffset = centerlineOffset + 0.02
      if (centerlineOffset > 1 || centerlineOffset < 0)
         centerlineOffset = 0;
   }
}

function yellowlineAnim(){

   if (tSeconds == 0){
      centerlineOffset = 0.1;
      fill(155,155,0,255)
      beginShape();
      vertex(1920,381)
      vertex(1920,566)
      vertex((2200-((centerlineOffset*40)**2.3)),(150-(centerlineOffset*-1000)))
      vertex((2200-((centerlineOffset*40)**2.3))+(centerlineOffset*50)**2,(150-(centerlineOffset*-1000)))
      endShape(CLOSE);
   } else {
      if (centerlineOffset < 1){
         centerlineOffset = centerlineOffset + 0.01
         fill(155,155,0,255)
         beginShape();
         vertex(1920,600)
         vertex(1920,500)

         vertex((2200-((centerlineOffset*40)**2.3)),(150-(centerlineOffset*-1000)))
         vertex((2200-((centerlineOffset*40)**2.3))+(centerlineOffset*50)**2,(150-(centerlineOffset*-1000)))
         endShape(CLOSE);
      } else {
         fill(155,155,0,255);
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
   //vertex(396,1080); 
   vertex(1920,1080)
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

   
   for (i=1;i<1000;i++){
      fill(30)
      rect((i*50)+(backgroundCityData[i+100])+(tSeconds*-100),          //x
      (600+(i*-4.7))+(tSeconds*8.5),                                       //y
      backgroundCityData[i],                                         //w
      -backgroundCityData[i+300]*3)                                      //h
      

   }
   for (i=1;i<1000;i++){
      fill(40)
      rect((i*50)+(backgroundCityData[i+100])+(tSeconds*-200),           //x
      (600+(i*-4.4))+(tSeconds*17),                                       //y
      backgroundCityData[i],                                           //w
      -backgroundCityData[i+300]*2)                                      //h
   }




}

function drawStars(n){ //N IS THE NUM OF STARS
   fill(150)

   for (i=1;i<n;i++){
      circle(
      starCityData[i]*1920,
      starCityData[i+100]*300,
      //starCityData[i]*10)
      starCityData[i+200]*10)
   }  

}

function drawAircon(){
      fill(35)

      circle(500,170,250)  // a/c control panel
      circle(1420,170,250)
      rect(500,45,920,250) 



      fill(20,10,10)
      circle(500,170,210) //left knob
      circle(1420,170,210) //right knob


      strokeWeight(0)

      fill(40)
      circle(500,170,180) //left knob
      circle(1420,170,180) //right knob

      fill(70,20,20)
      
      textAlign(CENTER)
      textSize(40)
      text("AUTO",500,170)       
      text("OFF",1420,170)       

      rectMode(CENTER)
      stroke(0)

      fill(50)
      rect(960,210,620,120,20)         // AC CONTROL BUTTONS 
      strokeWeight(3)
      strokeCap(SQUARE)
      //line(710,202,1210,202)
      for (i=1;i<5;i++) {
         strokeWeight(3)
         line(650+124*i,200,650+124*i,270)
      }
      
      strokeWeight(0)   // AC CONTROL LIGHTS
      fill(0)
      fill("orange")
      rect(650+62,215,40,7,10)
      fill(0)
      rect(650+62*3,215,40,7,10)
      rect(650+62*5,215,40,7,10)

      fill(120,10,10)                  //recirc button
      rect(650+62,242,70,35,5)

      fill(50)
      circle(730,242,20)
      rect(710,242,40,20)

      fill(120,10,10)
      rect(710,242,40,15)
      circle(730,242,15)
      rect(695,235,20,15)
      strokeCap(ROUND)
      strokeWeight(3)   
      stroke(50)
      line(715,228,705,233)
      line(715,238,705,233)

      fill(255,255,255,0)  //recirc off
      strokeWeight(3)
      stroke(120,10,10)
      rect(650+62*3,242,70,30,5)

      stroke(50)
      strokeWeight(10)
      line(790,230,825,245)
      stroke(120,10,10)
      strokeWeight(3)
      line(790,230,825,245)
      line(825,245,850,245)
      line(850,245,840,240)
      line(850,245,840,250)*
      
      fill(255,255,255,0)  //heated windshield
      strokeWeight(3)
      stroke(120,10,10)
      ellipse(650+62*5,242,60,30)
      fill(50)
      strokeWeight(0)
      rect(650+62*5,250,75,25)

      strokeWeight(3)
      line(932,238,940,260)
      line(940,260,981,260)
      line(981,260,989,238)

      line(950,265,950,240)
      line(960,265,960,240)
      line(970,265,970,240)


      strokeWeight(0) //mode and ac button
      fill(120,10,10)
      textSize(25)
      textAlign(CENTER)
      text("MODE",650+62*7,250)
      text("A/C",650+62*9,250)

      fill(0)
      strokeWeight(0)
      rect(960,140,650,120,20) // a/c control screen
      fill(150,0,0)
      textSize(30)
      text("AUTO",650+62*2,150)     //auto text

      text("TEMP",650+62*4,120)     //temp section
      stroke(150,0,0)
      segDisplay(625+62*4,140,.8,.6,2)
      segDisplay(655+62*4,140,.8,.6,4)
      
      text("MODE",650+62*6,120)     //mode section
      strokeWeight(10)
      line(1030,180,1038,160)
      line(1038,160,1055,168)
      line(1055,168,1063,149)
      circle(1066,136,5)
      strokeWeight(3)
      line(1026,140  ,1045,140)
      line(1045,140,1040,145)
      line(1045,140,1040,135)

      strokeWeight(0)

      text("A/C",650+62*8,120)   //ac section
      text("ON",650+62*8,150)

}

function drawRadioBg(){
      ellipse(-100,1000,1000,3000)
      ellipse(2020,1000,1000,3000)
      fill(13)
      ellipse(-120,1000,1000,3000)
      ellipse(2040,1000,1000,3000)
      fill(9)
      ellipse(-140,1000,1000,3000)
      ellipse(2060,1000,1000,3000)
}

function visBar(boundaryHi, boundaryLo, ghostArrayDrum, wValue, wInfluence) {
   for (i=1;i<13;i++){ //how many lines are there

      fill(0,255,0,5); //This fills in the boundaries. used for testing
      //beginShape();vertex(boundaryHi[0],boundaryHi[1]); vertex(boundaryHi[2],boundaryHi[3]);vertex(boundaryLo[2],boundaryLo[3]);vertex(boundaryLo[0],boundaryLo[1]);endShape(CLOSE);
      
      fill(200,0,0,0+50+30+((ghostArrayDrum[(ghostArrayDrum.length)-(i)])*170)) // <- colour here!
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
}

function altVisBar(x,y,z,o,p){ //X and Y are respective offsets. Z is var that it is taking the value from (like remapOther, remapVocals). O and P moves the X and Y of top end of the bar

   if (x === undefined){
      x = 0 
   }
   if (y === undefined){
      y = 0
   }
   if (z === undefined){
      z === remapOther
   }
   if (o === undefined){
      o = 0
   }
   if (p === undefined){
      p = 0
   }

   fill(255,0,0,100+(z-0.5)*155)

   beginShape();
   vertex(894 + x,885 + y); //bottom left 894 885
   vertex(974 + x,904 + y); //bottom right 974 904
   vertex(
      ((974 + ((1743+p) - 974) * z) + x+0 - 0),
      ((904 + ((663 + o)-904) * z) + y+0 - 0)
   )
   vertex(
      ((894 + ((1690+p) - 894)*z) + x+0 - 0),
      ((885 + ((649 + o)-885)*z) + y+0 - 0)
   )
   //vertex(1743,663); //top right
   //vertex(1690,649); //top left
   endShape(CLOSE);
   
}

function segDisplay(x,y,a,b,n) { //X and Y are offsets, A and B are x/y scaling, N is the number you call (0 to 9)

   if (x === undefined){
      x = 0 
   }

   if (y === undefined){
      y = 0 
   }

   if (n === undefined){
      n = 0
   }

   if (a === undefined){
      a = 1
   }

   if (b === undefined){
      b = 1
   }



   push();
   translate(x-10,y-10);
   scale(a,b)
   strokeWeight(4);



   /*
   line(10,10,10,35); //TL vert
   line(15,5,35,5);  //top horizontal
   line(40,10,40,35); //TR vert
   line(15,40,35,40);  //middle horizontal
   line(10,45,10,70); //BL vert
   line(15,75,35,75);  //bottom horizontal
   line(40,45,40,70); //BR vert
   */

   if (n == 0) {
      line(10,10,10,35); //TL vert
      line(15,5,35,5);  //top horizontal
      line(40,10,40,35); //TR vert
      line(10,45,10,70); //BL vert
      line(15,75,35,75);  //bottom horizontal
      line(40,45,40,70); //BR vert
   }

   if (n == 1) {
      line(40,10,40,35); //TR vert
      line(40,45,40,70); //BR vert
   }
   
   if (n == 2) {
      line(15,5,35,5);  //top horizontal
      line(40,10,40,35); //TR vert
      line(15,40,35,40);  //middle horizontal
      line(10,45,10,70); //BL vert
      line(15,75,35,75);  //bottom horizontal
   }

   if (n == 3) {
      line(15,5,35,5);  //top horizontal
      line(40,10,40,35); //TR vert
      line(15,40,35,40);  //middle horizontal
      line(40,45,40,70); //BR vert
      line(15,75,35,75);  //bottom horizontal
   }

   if (n == 4) {
      line(10,10,10,35); //TL vert

      line(40,10,40,35); //TR vert
      line(15,40,35,40);  //middle horizontal


      line(40,45,40,70); //BR vert
   }

   if (n == 5) {
      line(10,10,10,35); //TL vert
      line(15,5,35,5);  //top horizontal

      line(15,40,35,40);  //middle horizontal

      line(15,75,35,75);  //bottom horizontal
      line(40,45,40,70); //BR vert
   }

   if (n == 6) {
      line(10,10,10,35); //TL vert
      line(15,5,35,5);  //top horizontal

      line(15,40,35,40);  //middle horizontal
      line(10,45,10,70); //BL vert
      line(15,75,35,75);  //bottom horizontal
      line(40,45,40,70); //BR vert
   }

   if (n == 7) {

      line(15,5,35,5);  //top horizontal
      line(40,10,40,35); //TR vert


      line(40,45,40,70); //BR vert  
   }

   if (n == 8) {
      line(10,10,10,35); //TL vert
      line(15,5,35,5);  //top horizontal
      line(40,10,40,35); //TR vert
      line(15,40,35,40);  //middle horizontal
      line(10,45,10,70); //BL vert
      line(15,75,35,75);  //bottom horizontal
      line(40,45,40,70); //BR vert
   }

   if (n == 9) {
      line(10,10,10,35); //TL vert
      line(15,5,35,5);  //top horizontal
      line(40,10,40,35); //TR vert
      line(15,40,35,40);  //middle horizontal

      line(15,75,35,75);  //bottom horizontal
      line(40,45,40,70); //BR vert
   }

   pop();
}

function draw_one_frame(words, vocal, drum, bass, other, counter) {
background(5)
textFont("Courier New"); // please use CSS safe fonts
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

         starCityData.push(Math.random())

      }
   }

   tSeconds = round(counter/60,5)
   
   //scene switcher

   if (tSeconds > 30 && tSeconds < 120 || tSeconds > 180){
      console.log("drawing one frame!")

      let boundaryHi = [640,204,1475,450] 
      let boundaryLo = [660,820,1475,640]

      let wValue = 0.08;      //Changes width of visualizer bars
      let wInfluence = 0.003; //Changes influence of i. Basically determines how thick each visualizer bar is

      /*the layering should be in this order!

      lineFill ON BOTTOM LAYER 
      guardrailAnim, yellowlineAnim, whitelineAnim 
      drawEnv
      speedLines
      drawCarShadow
      drawCar ON TOP
      */

      drawStars(10);

      if (tSeconds < 180) {
         drawBackgroundCity();
      } else {
         drawStars(30);

         fill(200)
         circle(436,210,40)
         fill(50)
         circle(430,390,40)
         fill(5)
         circle(456,210,40)
         circle(450,390,40)


         rectMode(CORNER);
         fill(0,0,50,50)
         rect(0,350  ,1920,1080)
         rect(0,400,1920,1080)
         rect(0,450,1920,1080)

      }
      
      centerlineFill();
      guardrailAnim();

      if (tSeconds < 120){
         yellowlineAnim();
      }  else {
         whitelineAnim();
      }
      
      //
      drawEnv()
      altVisBar(0,0,remapOther)
      altVisBar(200,50,remapVocal,-10,-50)
      altVisBar(100,25,remapBass, -5, -25)
      speedLines();
      drawCarShadow();
      image(shota, 0, 0);
      fill(128)
      text("scene 1, shot a showroom lights off", 50, 100)
      fill(200)


      text(mouseX + ", " + mouseY, 50, 200)
      
      visBar(boundaryHi,boundaryLo,ghostArrayDrum, wValue, wInfluence)

      if (tSeconds < 40){
         fadeIn(31)
      }

      if (tSeconds < 123){
         fadeOut(119)
      }
      
      if (tSeconds > 180){
         fadeIn(181)         
      }

   } else 
      
      
      
      
      
      
      
      
      
      
      
      
      












































































      









      
      
      
      
      if (tSeconds >= -1 && tSeconds < 30 || tSeconds > 120 && tSeconds < 180){
      

      fill(20)
      rect(0,0,1920,1080)


      let wValue = 0.08;      //Changes width of visualizer bars
      let wInfluence = 0.000; //Changes influence of i. Basically determines how thick each visualizer bar is

      let boundaryHi = [500,600,1280,920]
      let boundaryLo = [500,1000,1280,1000]

      fill(255)
      
      //image(shota,0,0);
      text("scene 2, shot a showroom lights on", 50, 100)
      text(mouseX + ", " + mouseY, 50, 200)
      rectMode(CENTER)

      fill(30)
      rect(960,700,1000,700) //draws screen background
      fill(15)
      rect(960,700,980,660)
      rectMode(CORNER)
      
      fill(10);
      
      beginShape();vertex(boundaryHi[0]-20,boundaryHi[1]-20); vertex(1440,975);vertex(1440,boundaryLo[1]+10);vertex(boundaryLo[0]-20,boundaryLo[1]+10);endShape(CLOSE);
      
      rect(1440,380,-540,100) //draw mini visualizer bar
      rect(480,380,400,100)

      fill(10);
      rect(490,390,380,80)

      fill(255,0,0,Math.max((remapDrum+remapBass),0.5)*150)
      rect(1420,400, -500*Math.max(remapOther,0), 20)
      rect(1420,440, -500*remapVocal, 20)

      //beginShape();vertex(boundaryHi[0]-20,boundaryHi[1]-20); vertex(1440,975);vertex(1440,boundaryLo[1]+10);vertex(boundaryLo[0]-20,boundaryLo[1]+10);endShape(CLOSE);

      visBar(boundaryHi,boundaryLo,ghostArrayDrum, wValue, wInfluence)

      //segDisplay(300,408,1,0.8,Math.floor(tSeconds*10)%10);
      textSize(20)
      textAlign(RIGHT)
      textFont("Courier New")
      fill(150,0,0)
      text("AUX/BT", 860,415)

      fill(20,0,0)
      text("AM/FM", 860,438)

      if (tSeconds > 120 && tSeconds < 180){
         fill(150,0,0)
      }
      text("CLOCK", 860,460)


      //timer

      


      stroke(150,0,0)



      drawAircon()


      strokeWeight (0)
      fill(5)
      rectMode(CENTER)

      rect(1320,620,220,220,20)

      fill(150,0,0)
      
      circle(1320,620,200)
      fill(20)
      circle(1320,620,190)
      fill(150,0,0)
      text("PAUSE",1320,600)
      text("NEXT",1320,630)
      text("PREV",1320,660)
      for (i=1;i<5;i++){
         fill(150,0,0)
         rect(700 + 110*i,620,100,40)
         fill(20)
         rect(700 + 110*i,620,95,35)
      }
      fill(150,0,0)
      textSize(20)   
      text("EJECT",700+110,625)
      text("POWER",700+110*2,625)
      text("MUTE",700+110*3,625)
      text("MODE",700+110*4,625)
      rect(850,550,680,30)
      fill(20)
      rect(850,550,675,25)

      //710, 1210

      fill(17)

      drawRadioBg()

   
      rectMode(CORNER)

      textAlign(LEFT)


      fill(0,0,0,((tSeconds*-10)*10)+1000)
      rect(0,0,10000,10000)

      fill(255,0,0,Math.max((remapDrum+remapBass),0.5)*150)
      rect(1420,400, -500*Math.max(remapOther,0), 20)
      rect(1420,440, -500*remapVocal, 20)


      if (tSeconds > 120) {

         stroke(150,0,0)
         segDisplay(650,408,1,0.8,5);
         segDisplay(610,408,1,0.8,0);
         segDisplay(550,408,1,0.8,3);
         segDisplay(510,408,1,0.8,2);  
      } else {
         stroke(150,0,0)
         segDisplay(650,408,1,0.8,Math.floor(tSeconds%60)%10);
         segDisplay(610,408,1,0.8,Math.floor((tSeconds%60)/10));
         segDisplay(550,408,1,0.8,Math.floor((tSeconds/60)%10));
         segDisplay(510,408,1,0.8,0);  

      }



      fill(150,0,0,(((Math.floor(tSeconds*10)%10)/10)*-255)+255); //the logic to have the flashing second thing

      circle(595,440,7)
      circle(595,420,7)

      fill(0,0,0,((tSeconds*-10)*10)+250)
      rect(0,0,10000,10000)

      if (tSeconds <  30){
         fadeOut(29)         
      }


      if (tSeconds > 120){
         fadeIn(121)
         
      }

      if (tSeconds < 180){
         fadeOut(179)
      }
      



   }









   /*} else if (tSeconds >= 30 && tSeconds < 44.7){
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


   ghostArrayBass.push(remapBass)
   ghostArrayDrum.push(remapDrum)
   ghostArrayOther.push(remapOther)



}        



