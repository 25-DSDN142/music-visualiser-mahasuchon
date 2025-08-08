
// vocal, drum, bass, and other are volumes ranging from 0 to 100

let temp = 1;
let tempb = 2;
let sizeVal;
let colourVal;


//width and height are a thing

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(0)
  textFont('Verdana'); // please use CSS safe fonts
  //rectMode(CENTER)
  textSize(24);

  let sizeVal = map(drum,40,100,0,height/1.5)
  let sizeValB = map(bass,40,100,0,height/1.5)

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
  
  fill(10,10,10)
  rect(width/8,700,80,(-1*sizeVal))
  rect(width/8*2,700,80,(-1*sizeValB))
  fill(255,0,0)

  rect(width/8,(-1*temp)+700,80,50)
  rect(width/8*2,(-1*tempb)+700,80,50)
}



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

