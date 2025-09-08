
// vocal, drum, bass, and other are volumes ranging from 0 to 100

let temp = 1;
let tempb = 2;
let sizeVal;
let colourVal;
let previousval = 1;
let previousval2 = 1;
let prev3 = 1;
let prev4 = 1;
let prev5 = 1;
let prev6 = 1;
let prev7 = 1;
let prev8 = 1;
let prev9 = 1;
let prev10 = 1;
let prev11 = 1;

let boundaryTL = [10,200];
let boundaryTR = [100,200];
let boundaryBL = [10,800];
let boundaryBR = [100,800];

let boundaryHi = [100,200,1700,150] //in X1,Y1,X2,Y2. This defines the top half of the box
let boundaryLo = [100,800,1900,900] //in X3,Y3,X4,Y4. This defines the bottom half of the box



//let raintempX;
let raintempY;


   let ghostArrayBass = []
   let ghostArrayDrum = []
   let ghostArrayOther = []

   let ghostArrayBass2 = []
   let ghostArrayDrum2 = []
   let ghostArrayOther2 = []

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



   function draw_one_frame(words, vocal, drum, bass, other, counter) {
   background(200)
   textFont('Verdana'); // please use CSS safe fonts
   //rectMode(CENTER)
   textSize(24);


   

      remapBass = map(bass,50,100,0,-500)
      remapVocal = map(vocal,0,100,0,-100)
      remapDrum = map(drum,50,100,0,-500)
      remapOther = map(other,50,100,0,-500)

      remapBass2 = map(bass,50,100,0,1)
      remapVocal2 = map(vocal,0,100,0,1)
      remapDrum2 = map(drum,50,100,0,1)
      remapOther2 = map(other,50,100,0,1)

      
      if(firstrun){
         shota = loadImage('assets/shota.jpg')
         shotb = loadImage('assets/shotb.jpg')
         shotc = loadImage('assets/shotc.jpg')
         for (i=0; i<200;i++){
            rainArray[i] = new rainBp(); //sets a rain blueprint
         }
         firstrun = false;
      }

      function shotadrawcar(){
         fill(255,0,0)
         color(255,0,0)
         beginShape();
            vertex(1000,800)
         endShape(CLOSE)
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

      //rect(width/8, 700, 80, remapBass)
      tSeconds = round(counter/60,5)
      
      //scene switcher

      if (tSeconds < 15){
         image(shota, 0, 0);
         fill(128)
         text("scene 1, shot a showroom lights off", 50, 100)
         fill(255,0,0)
         shotadrawcar()
         text(mouseX + ", " + mouseY, 50, 200)


         //updateRain  ()
         

         
      } else if (tSeconds >= 15 && tSeconds < 30){
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
      }

      /*
            beginShape();     //begins drawing top border (as a rectangle)           REFERENCE CODE
         vertex(0,0); //top left corner
         vertex(scaleVar,0);//top right corner
         vertex(scaleVar, scaleVar*(1-borderSize));//bottom right corner
         vertex(0,scaleVar*(1-borderSize)); //bottom left corner
         endShape(CLOSE); //end shape
         */

      text(tSeconds + " seconds elapsed", 50, 50)

   for (i=1;i<11;i++){ //how many lines are there

      rect(
      (width/8)*i*0.5,
      700,
      80,
      Math.min((ghostArrayDrum[(ghostArrayDrum.length)-i])+(i*5),
      0));

         //alternate way to draw the bar visualizer

      fill(0,255,0,5)
      beginShape();
      vertex(boundaryHi[0],boundaryHi[1]); 
      vertex(boundaryHi[2],boundaryHi[3]);
      vertex(boundaryLo[2],boundaryLo[3]);
      vertex(boundaryLo[0],boundaryLo[1]);
      endShape(CLOSE);

      fill(0,0,255,120)

      /*
      to find a point in a line made of two points, where the two points that make up the line consist of X1, Y1, X2, Y2

      Point = X1 + (X2-X1) * p, Y1 + (Y2-Y1) * p
      
      where P is the percentage of how  far you are across the line

      so, the bottom vertices need to be at 

      vertex(
      X1 + (X2-X1) * p , Y1 + (Y2-Y1) * p
      )

      where 
      X1 = boundaryLo[0]
      Y1 = boundaryLo[1]
      X2 = boundaryLo[2]
      Y2 = boundaryLo[3]

      so

      vertex(
      boundaryLo[0]+(boundaryLo[2]-boundaryLo[0])*p,
      boundaryLo[1]+(boundaryLo[3]-boundarylo[1])*p
      )

      except, thats only one point. if i want a bar, it will need to look like this?

      
      */

      p = (i-1)/10; //how far along the line you want to be, controlled by i
      w = 0.08; // how wide you want each bar to be


      let vertBLX = boundaryLo[0]+(boundaryLo[2]-boundaryLo[0])*p //BL -> Bottom Left, X -> X axis
      let vertBLY = boundaryLo[1]+(boundaryLo[3]-boundaryLo[1])*p

      let vertBRX = boundaryLo[0]+(boundaryLo[2]-boundaryLo[0])*(p+w)
      let vertBRY = boundaryLo[1]+(boundaryLo[3]-boundaryLo[1])*(p+w)

      let vertTRX = boundaryHi[0]+(boundaryHi[2]-boundaryHi[0])*(p+w)
      let vertTRY = boundaryHi[1]+(boundaryHi[3]-boundaryHi[1])*(p+w)

      let vertTLX = boundaryHi[0]+(boundaryHi[2]-boundaryHi[0])*p
      let vertTLY = boundaryHi[1]+(boundaryHi[3]-boundaryHi[1])*p


      beginShape();
      vertex( //bottom left
      vertBLX,
      vertBLY
      );

      vertex( //bottom right
      vertBRX,
      vertBRY
      );

      vertex( //top right
      vertTRX,
      vertTRY
      );

      vertex( //top left
      vertTLX,
      vertTLY
      );

      endShape(CLOSE);

      /*ok, so now we need to have it react to music.

      how to do this?

      find the top right and bottom right points, and draw a line between them.

      from before,
      Point = X1 + (X2-X1) * p, Y1 + (Y2-Y1) * p

      where X1,Y1 is the bottom right point and X2,Y2 is the top right point.

      so, from the above code, this is what we are working with.

      vertex( //bottom right
      boundaryLo[0]+(boundaryLo[2]-boundaryLo[0])*(p+w),    //THIS IS X1
      boundaryLo[1]+(boundaryLo[3]-boundaryLo[1])*(p+w)     //THIS IS Y1
      );

      vertex( //top right
      boundaryHi[0]+(boundaryHi[2]-boundaryHi[0])*(p+w),    //THIS IS X2
      boundaryHi[1]+(boundaryHi[3]-boundaryHi[1])*(p+w)     //THIS IS Y2
      );
   
      so, filling it in
      it will look messy, but not sure if theres a better way to do it

      */
      p2 = 0.5


      beginShape()
      vertex( //THIS IS THE TOP RIGHT CORNER
      Math.min(
      (
      (vertBRX) /*THIS IS X1. X1 = BRX*/
      +
      ((vertTRX) /*THIS IS X2. X2 = TRX */ 
      -
      (vertBRX) /*THIS IS X1. X1 = BRX*/ ) * ghostArrayBass2[(ghostArrayBass2.length)-(i)])
      ,vertBRX) //this ensures it cant go under the limit
      ,


      Math.min(
      (
      (vertBRY) /*THIS IS Y1. Y1 = BRY*/
      + 
      ((vertTRY) /*THIS IS Y2. Y2 = TRY*/ 
      - 
      (vertBRY) /*THIS IS Y1. Y1 = BRY*/ ) * ghostArrayBass2[(ghostArrayBass2.length)-(i)])
      ,vertBRY)); //this ensures it cant go under the limit

      vertex( //bottom right
      vertBRX,    //THIS IS X1
      vertBRY     //THIS IS Y1
      );

      vertex( //bottom left
         vertBLX,
         vertBLY
      )

      vertex( //THIS IS THE TOP LEFT CORNER. same code as the top right corner but any R in vert variables are changed to L
      Math.min(
      (
      
      (vertBLX) 
      +
      ((vertTLX) /*THIS IS X2. X2 = TRX */ 
      -
      (vertBLX) /*THIS IS X1. X1 = BRX*/ ) * ghostArrayBass2[(ghostArrayBass2.length)-(i)]),
      vertBLX), //ensures it cant go under the limit

      Math.min(

      (

      (vertBLY) /*THIS IS Y1. Y1 = BRY*/
      + 
      ((vertTLY) /*THIS IS Y2. Y2 = TRY*/ 
      - 
      (vertBLY) /*THIS IS Y1. Y1 = BRY*/ ) * ghostArrayBass2[(ghostArrayBass2.length)-(i)])
      ,vertBLY)
      );



      //vertex(0,0);
      endShape(CLOSE)

      /*where p2 is the percentage along the line that I want it to be


      
      */
      
      
      
      
      /*beginShape();                                          //OLD VERSION OF VERTEX BASED BAR VISUALIZER
      vertex(         //bottom left
         (boundaryBL[0])+(boundaryBR[0]-boundaryBL[0])*i,
         (boundaryBL[1])+(boundaryBR[1]-boundaryBL[1])*i
      );
      vertex(        //bottom right
         (boundaryBL[0])+(boundaryBR[0]-boundaryBL[0])*i+1,
         (boundaryBL[1])+(boundaryBR[1]-boundaryBL[1])*i+1
      );
      vertex(        //top right
         (boundaryTL[0])+(boundaryTR[0]-boundaryTL[0])*i,
         //(boundaryBL[0])+(boundaryBR[0]-boundaryBL[0])*i+1,
         //(boundaryTL[1])+(boundaryTR[1]-boundaryTL[1])*i
         300
      );

      endShape(CLOSE)*/





      /*

      plan is to:

      define two points as a base for where the lines will go
      AKA
      50,100 and 300,100
      
      lets say we will have 8 lines

      take the differencce in distance between those points

      300-50 = 250
      100-100 = 0 -> we will not work with Y in this example

      250/8 = 31.25

      1st line will be at 50
      2nd line will be at 50+(31.25*1)
      3rd line will be at 50+(31.25*2)
      4th line will be at 50+(31.25*3)

      until

      nth line IS at 50+(31.25*8) = 300

      same logic with Y

      */


      

      //original version of visualizer


      line(
      (width/8)*i*0.5,
      ghostArrayBass[(ghostArrayBass.length)-(i)]+500,
      (width/8)*(i/2)+width/16,
      ghostArrayBass[(ghostArrayBass.length)-(i)-1]+500);

      //line((width/8)*i*0.5,ghostArrayOther[(ghostArrayOther.length)-(i)]+500,(width/8)*(i/2)+width/16,ghostArrayOther[(ghostArrayOther.length)-(i)-1]+500)


      line()
      //console.log(ghostArrayBass[(ghostArrayBass.length)-(i)]+500)
   }

   ghostArrayBass.push(remapBass)
   ghostArrayDrum.push(remapDrum)
   ghostArrayOther.push(remapOther)

   ghostArrayBass2.push(remapBass2)
   ghostArrayDrum2.push(remapDrum2)
   ghostArrayOther2.push(remapOther2)




}        


  /*let sizeVal = map(bass,40,100,0,height/1.5) //ALL DEPRECATED CODE
  let sizeValB = map(bass,40,100,0,height/1.5)
  let sizeValC = map(prev6,40,100,0,height/1.5)
  let sizeValD = map(prev7,40,100,0,height/1.5)
  let sizeValE = map(prev8,40,100,0,height/1.5)
  let sizeValF = map(prev9,40,100,0,height/1.5)
  let sizeValG = map(prev10,40,100,0,height/1.5)
  let sizeValH = map(prev11,40,100,0,height/1.5)

  if (temp > sizeVal) {
   temp = temp - 5;
  } else {
   temp = sizeVal;
  }

  if (tempb > sizeValB) {
   tempb = tempb - 5;
  } else {
   tempb = sizeValB;
  }
  


  //normal loudness bars
  strokeWeight(0)

  fill(10)
  //rect(width/8,700,80,(-1*sizeVal))
  rect(width/8*2,700,80,(-1*sizeValB))
  rect(width/8*2.5,700,80,(-1*sizeValC)*0.9) //ghost bar bass 1
  rect(width/8*3,700,80,(-1*sizeValD)*0.8) //ghost bar bass 2
  rect(width/8*3.5,700,80,(-1*sizeValE)*0.7) //ghost bar bass 3
  rect(width/8*4,700,80,(-1*sizeValF)*0.6) //ghost bar bass 4
  rect(width/8*4.5,700,80,(-1*sizeValG)*0.5) //ghost bar bass 5
  rect(width/8*5,700,80,(-1*sizeValH)*0.4) //ghost bar bass 6

  strokeWeight(10)
  color(255,0,0)

  line(width/8*2,(-1.1*sizeValB)+700,width/8*2.5,(-1*sizeValC)+700)

  line(width/8*2.5,(-1*sizeValC)+700,width/8*3,(-.9*sizeValD)+700)

  line(width/8*3,(-.9*sizeValD)+700,width/8*3.5,(-.8*sizeValE)+700)

  line(width/8*4,(-.7*sizeValF)+700,width/8*3.5,(-.8*sizeValE)+700)
  line(width/8*4.5,(-.6*sizeValG)+700,width/8*4,(-.7*sizeValF)+700)
  line(width/8*4.5,(-.6*sizeValG)+700,width/8*5,(-.5*sizeValH)+700)


  
  fill(255,0,0) //"peak" value

  //rect(width/8,(-1*temp)+700,80,50);
  //rect(width/8*2,(-1*tempb)+700,80,50);


  temparrayghost.push(bass);
  prev6 = temparrayghost[(temparrayghost.length)-2];
  prev7 = temparrayghost[(temparrayghost.length)-4];
  prev8 = temparrayghost[(temparrayghost.length)-6];
  prev9 = temparrayghost[(temparrayghost.length)-8];
  prev10 = temparrayghost[(temparrayghost.length)-10];
  prev11 = temparrayghost[(temparrayghost.length)-12];

  
}














*/

  //temp = temp + 2
  //if (temp > height){
  // temp = 0
  //}


  /*   let bar_spacing = height / 10;
   let bar_height = width / 12;
   let bar_pos_x = width / 2;
 
// changes 
   // vocal bar is red
   fill(200, 0, 0);
   rect(bar_pos_x, height / 2 + 1 * bar_spacing, 4 * vocal, bar_height);
   fill(0);
   text("vocals", bar_pos_x, height / 2 + 1 * bar_spacing + 8);
 
   // drum bar is green
   fill(0, 200, 0);
   rect(bar_pos_x, height / 2 + 2 * bar_spacing, 4 * drum, bar_height);
   fill(0);
   text("drums", bar_pos_x, height / 2 + 2 * bar_spacing + 8);
 
   // bass bar is blue
   fill(50, 50, 240);
   rect(bar_pos_x, height / 2 + 3 * bar_spacing, 4 * bass, bar_height);
   fill(0);
   text("bass", bar_pos_x, height / 2 + 3 * bar_spacing + 8);
 
   // other bar is white
   fill(200, 200, 200);
   rect(bar_pos_x, height / 2 + 4 * bar_spacing, 4 * other, bar_height);
   fill(0);
   text("other", bar_pos_x, height / 2 + 4 * bar_spacing + 8);
   fill(255, 255, 0);
 
   // display "words"
   textAlign(CENTER);
   textSize(vocal);
   text(words, width/2, height/3);
}
   */

