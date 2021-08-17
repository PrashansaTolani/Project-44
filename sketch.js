const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;


var corona, coronaImg, coronaGroup;
var person;
var healthyPersonImg, sickPersonImg;
var fruit_img, steamInhaler_img, turmeric_milkImg, nuts_img, amla_img, healthyFoodGroup, healthyFoods;
var cocoCola_img, pizza_img, burgerImg, cake_img, marshmallow_img, unhealthyFoodGroup, unhealthyFoods;
var score=0;
var coronaCount = 15;


function preload(){
coronaImg= loadImage("Corona.png");
healthyPersonImg= loadImage("Healthy.png");
sickPersonImg= loadImage("Sick.png");

  fruit_img = loadImage("Fruit.png");
  steamInhaler_img = loadImage("Steam inhalation.png");
  turmeric_milkImg = loadImage("turmeric milk.png");
  nuts_img = loadImage("Nuts.png");
  amla_img = loadImage("Amla.png");

  cocoCola_img = loadImage("coco cola.png");
  pizza_img = loadImage("Pizza.png");
  burgerImg = loadImage("Burger.png");
  cake_img = loadImage("cake.png");
  marshmallow_img = loadImage("marshmallow.png");

  WonImg = loadImage("Won.png");
  loseImg = loadImage("Gameover.png");

  healthyFoodGroup = new Group();
  unhealthyFoodGroup = new Group();
}

function setup() {
  createCanvas(1000,600);
  engine = Engine.create();
world = engine.world;

person = createSprite(900,300);
person.addImage(healthyPersonImg)
person.scale = 0.5;

  // for (var i = 70; i < 750; i=i+150) {
corona = createSprite(620, 35, 20, 20);
corona.addImage(coronaImg);
corona.scale=0.4;
//}

//   for (var i = 70; i < 750; i=i+150) {
//corona = createSprite(i, 225, 20, 20);
//corona.addImage(coronaImg);
//corona.scale=0.4;
//}

//   for (var i = 70; i < 750; i=i+150) {
//corona = createSprite(i, 375, 20, 20);
//corona.addImage(coronaImg);
//corona.scale=0.4;
   // }
//   for (var i = 70; i < 750; i=i+150) {
//corona = createSprite(i, 525, 20, 20);
//corona.addImage(coronaImg);
//corona.scale=0.4;
     // }

Engine.run(engine);
}

function draw() {
  background("white");  

  textSize(30);
    fill("red");
    text("Score: "+score , width-650 , 45);

    text(": "+coronaCount , width-330 , 45);

  if (frameCount % 50 === 0) {
    healthyFoods = createSprite(random(50, 950), random(50, 550));
    healthyFoods.velocityX = (2.75 + 3*score/100);
    var rand = Math.round(random(1,5));
    switch(rand){
        case 1: healthyFoods.addImage(fruit_img);
        break;
        case 2: healthyFoods.addImage(steamInhaler_img);
        break;
        case 3: healthyFoods.addImage(turmeric_milkImg);
        break;
        case 4: healthyFoods.addImage(nuts_img);
        break;
        case 5: healthyFoods.addImage(amla_img);
        break;
    }
    healthyFoodGroup.add(healthyFoods);
    healthyFoods.scale=0.25;
}

if (frameCount % 50 === 0) {
  unhealthyFoods = createSprite(random(50, 700),random(120, 550));
  unhealthyFoods.velocityX = (2.75 + 3*score/100);
  var rand = Math.round(random(1,5));
  switch(rand){
      case 1: unhealthyFoods.addImage(cocoCola_img);
      break;
      case 2: unhealthyFoods.addImage(pizza_img);
      break;
      case 3: unhealthyFoods.addImage(burgerImg);
      break;
      case 4: unhealthyFoods.addImage(cake_img);
      break;
      case 5: unhealthyFoods.addImage(marshmallow_img);
      break;
  }
  unhealthyFoodGroup.add(unhealthyFoods);
  unhealthyFoods.scale=0.25;
}
//For the person to move up and down  
if(keyDown(UP_ARROW)){
  person.y-=10;
}

if(keyDown(DOWN_ARROW)){
  person.y+=10;
}


//Scoring(If the person is touching healthy foods, the score increase by 1 and one corona get killed. 
if(healthyFoodGroup.isTouching(person)){
  healthyFoodGroup.destroyEach();
  person.addImage(healthyPersonImg)
  score+=1;
 coronaCount-=1;
}

//Scoring(If the car touches the corona virus their score will get reduced
if(unhealthyFoodGroup.isTouching(person)){
  unhealthyFoodGroup.destroyEach();
  person.addImage(sickPersonImg);
  score-=1;
  coronaCount+=1;
  }
  
  if(healthyFoodGroup.x>600){
     healthyFoodGroup.destroyEach();
  }

  if(unhealthyFoodGroup.x>600){
     unhealthyFoodGroup.destroyEach();
  }
 //Scoring and messages
 textSize(25);
 fill("blue");
 if(score>4 && score<6){
   text("Good!",300,70);
 }
 if(score>9 && score<11){
   text("Amazing!",300,70);
 }
 if(score>14 && score<16){
  person.destroy();
  healthyFoodGroup.destroyEach();
  unhealthyFoodGroup.destroyEach();
  Won = createSprite(400, 300);
  Won.addImage(WonImg);
  Won.scale = 0.8;
  textSize(20)
  text("Wow! You destroyed corona! You win the game!", 200,530);
 }
 
if(score<0){
 person.destroy();
 healthyFoodGroup.destroyEach();
 unhealthyFoodGroup.destroyEach();
 Lose = createSprite(350, 250);
 Lose.addImage(loseImg);
 Lose.scale = 1.3;
}

  drawSprites();
}
