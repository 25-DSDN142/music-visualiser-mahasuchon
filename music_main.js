
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


let ghostArray = []



//width and height are a thing

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(255)
  textFont('Verdana'); // please use CSS safe fonts
  //rectMode(CENTER)
  textSize(24);

   remapBass = map(bass,0,100,0,-500)
   remapVocal = map(vocal,0,100,0,-100)
   remapDrum = map(drum,0,100,0,-100)
   remapOther = map(other,0,100,0,-100)
   
   
   //rect(width/8, 700, 80, remapBass)

   for (i=1;i<12;i++){
      //rect((width/8)*i*0.5,700,80,(ghostArray[(ghostArray.length)-i*2])+(i*5));
      line(
      (width/8)*i*0.5,
      ghostArray[(ghostArray.length)-(i*2)]+500,
      (width/8)*(i/2)+width/16,
      ghostArray[(ghostArray.length)-(i*2)]+500
      )

      line()
      console.log(ghostArray[(ghostArray.length)-(i*2)]+500)
   }

   ghostArray.push(remapBass)
   //prev6 = temparrayghost[(temparrayghost.length)-2];

}        


  /*let sizeVal = map(bass,40,100,0,height/1.5)
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

