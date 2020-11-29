var dog,dogImg,dogImg1;
var database;
var foodS = 20;
var foodStock;
var milkIMG, milk;

var game = 1;
var num = 20;
function preload(){
   dogImg=loadImage("images/dogImg.png");
   dogImg1=loadImage("images/dogImg1.png");
   milkIMG = loadImage('milk.jpg');
  }


function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


}

function draw() {
  background(46,139,87);
  x1 = 15;

 if(game == 1 ){
 
  if(keyDown('space')){
    writeStock(foodS);
    dog.addImage(dogImg1);
    num -= 1
  }
  else{
    dog.addImage(dogImg);
  }
}
  else{
    dog.addImage(dogImg);
  }

  for (let i = 0; i < num;i++) {
    milk = createSprite(x1,100); 
    milk.addImage(milkIMG);
    milk.scale = 0.15;
    x1 += 25;
    // num -= 1;
  }


  drawSprites();
  textSize(25);
  fill(225);
  stroke("black");
  text("Food remaining : "+foodS,125,200);
  textSize(20);
  text("Note: Press Space Key To Feed Milk!",25,25);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x <= 0){
    x = 0;
    game = 0;
  }
  else{
    x -= 1;
    num -= 1;
  } 
  database.ref('/').update({
    Food:x
  })
}