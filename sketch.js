//const Engine = Matter.Engine;
//const World = Matter.World;
//const Bodies = Matter.Bodies;
//const Body = Matter.Body;
var foodS,foodStock,database,happyDog,dog,dogImg;
var feed,addFood;
var fedTime, LastFed;
var foodObj;
var updateFoodStock,getFoodStock,getFedTime,deductFoodStock;

function preload()
{
  dogImg = loadImage("images/dog.png")
  happyDog = loadImage("images/happyDog.png")
}

function setup() {
  createCanvas(500, 500);
  foodObj = new Food();
  database = firebase.database();
  dog = createSprite(250,250,50,50)
  dog.addImage(dogImg)
  dog.scale = 0.2
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

  feed=createButton("feed the dog")
  feed.position(650,95)
  feed.mousePressed(feedDog);s

  addFood=createButton('Add Food');
  addFood.position(750,95)
  addFood.mousePressed(addFoods)

 

  
}

function draw() {  
  background(46,139,87)


  fill(255,255,254)
  textSize(15)
  if(LastFed>=12) {
    text("Last Feed :"+LastFed%12 + "PM", 350,30);
  } else if(LastFed==0){
    text("Last Feed : 12 AM", 350,30);
  } else{
    text("Last Feed :"+ LastFed + "AM", 350,30)
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    LastFed=data.val();
  });

 

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : " +foodS,170,150);
  textSize(13);



  foodObj.display();

}


function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {
 if(x<=0){
   x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour
  })
}


