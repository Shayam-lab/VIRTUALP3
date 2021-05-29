//Create variables here

var Dog;
var happyDog;
var database;
var foodS;
var foodStock;
var feedButton;
var addButton;
var feedTime, lastFed;
var foodObj;
var feedDog;
var addFood;
var food;
var changingGameState, readingGameState
var bedroom;
var washroom;
var garden;



function preload()
{

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data();
  });


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

	//load images here

Dog = loadImage(dog1,"Dog.png");
happyDog = loadImage(dogH,"happyDog.png");






}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  Dog = createSprite(250,250,100,100);
  Dog.addImage(dog1);
  
  happyDog = createSprite(250,250,100,100)
  happyDog.addImage(dogH);

  feedButton = createButton("Feed the dog");
  feedButton.position(700,95);
  feedButton.mousedPressed(feedDog)

  addButton = createButton("Add food");
  addButton.position(800,95);
  addButton.mousedPressed(addFood);

}


function draw() {  
background("yellow");

foodObj.display();
writeStocks(foodS);

if(foodS == 0) {
dog.addImage();
milkBottle2.visible=false;
}else{
dog.addImage();
milkBottle2.visible = true;
}

if(gameState===1){
dog.addImage();
dog.scale=0.175;
dog.y=250;
}

if(gameState===2){
  dog.addImage();
  dog.scale=0.175;
  milkBottle2.visible = false;
  dog.y=250;
  }


var Bath=createButton("I want to take a bath");
Bath.position(580,125);
if(Bath.mousedPressed(function(){
gameState=3;
database.ref('/').update({'gameState':gameState});
}));
if(gameState===6){
dog.y=175;
dog.addImage();
dog.scale=1;
milkBottle2.visible = false;
}

var button=createButton("Feed the dog");
button.position(400,125);

if(button.mousedPressed(function(){
foodS=foodS-1;
gameState=1;
database.ref('/').update({'gameState': gameState})
}));


var addFood=createButton("add food");
addFood.position(500,125);

if(addFood.mousedPressed(function(){
foodS=foodS+1;
gameState=2;
database.ref('/').update({'gameState':gameState})
}));




if(keyDown(UP_ARROW)){
writeStock(foodS)
dog.addImage(dogH);
}
  drawSprites();
  //add styles here

Text("Note: Press UP_Arrow Key to feed the dog milk!");
textSize(15);
fill(255,255,254);
if(lastFed>=12){
text("Last Feed :"+ lastFed%12 + " PM", 350, 30);
}else if(lastFed==0) {
text("Last feed : 12 AM",350,30);
}else{
 text("Last Feed :"+ lastFed + " AM", 350,30);

bedroom(){
background(bedroom,550,500);

}


washroom(){
  background(washroom,550,500);
  
  }
  
 garden(){
    background(garden,550,500);
    
    }


if(gameState!="Hungry"){
feedButton.hide();
addFood.hide();
dog.remove();
}else{

feed.show();
addFood.show();
dog.addImage();
}

}


}

function readStock(data){
foodS=data.val();
}

function writeStock(x){

database.ref('/').update({
food:x
})
}


function feedDog(){
dog.addImage(dogH);

foodObj.updatefoodStock(foodObj.getfoodStock()-1);
database.ref('/').update({
food:foodObj.getfoodStock(),
feedTime:hour()
})
}

function addFood(){

foodS++;
database.ref('/').update({
food:foodS
})

}

function update(state){
database.ref('/').update({
gameState:state
});
}


currentTime=hour();
if(currentTime==(lastFed+1)){
update("Playing");
foodObj.garden();
}else if(currentTime==(lastFed+2)){
update("sleeping");
foodObj.bedroom();
}else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
update("Bathing");
foodObj.washroom();
}else{
update("Hungry")
foodObj.display(); 
}



















