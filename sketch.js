var backgroundImg,backGround;
var monkey,monkey_running;
var bananaImg,stoneImg;
var BananaGroup,StoneGroup;
var score =0;
var PLAY = 1;
var END = 2;
var gameState = 1;
  

function preload(){

    backgroundImg = loadImage("SPRITES/jungle.jpg");
    monkey_running = loadAnimation("SPRITES/Monkey_01.png","SPRITES/Monkey_02.png","SPRITES/Monkey_03.png",
    "SPRITES/Monkey_04.png","SPRITES/Monkey_05.png","SPRITES/Monkey_06.png","SPRITES/Monkey_07.png",
    "SPRITES/Monkey_08.png","SPRITES/Monkey_09.png","SPRITES/Monkey_10.png")

    backgroundImg2 = loadImage("SPRITES/game over.jpg")
    bananaImg = loadImage("SPRITES/banana.png");
    stoneImg = loadImage("SPRITES/stone.png");

}

function setup(){
    createCanvas(displayWidth/2+300,displayHeight/2+150);

    backGround = createSprite(displayWidth/2,displayHeight/2-250,20,20);
    backGround.addImage(backgroundImg);
    backGround.scale = 1.5;

    monkey = createSprite(100,415,40,40);
    monkey.addAnimation("running",monkey_running);
    monkey.scale = 0.1;
    
     BananaGroup=createGroup();
     StoneGroup=createGroup();
    
}

function draw(){
  background(0);

  if(gameState === PLAY){
    backGround.velocityX = -3;
      
    monkey.velocityY = monkey.velocityY + 0.4;

    //making background come again
    if  (backGround.x < 230){
      backGround.x = backGround.width/2;
    }

      // making monkey jump
      if(keyWentDown("space")){
        monkey.velocityY = -10;
      }
        //making monkey position 
        if(monkey.y > 417){
          monkey.y = 415;
        }
          //destroying bananas
          if(BananaGroup.isTouching(monkey)){
            BananaGroup.destroyEach();
            score = score + 1;
          }
            //decreasing size of monkey
            if(StoneGroup.isTouching(monkey)){
              gameState = END;
            }
  }

  if(gameState === END){
    BananaGroup.destroyEach();
    StoneGroup.destroyEach();
    backGround.velocityX = 0;
    fill("white")
    textSize(20)
    text("GAME OVER",200,250);
    backGround.addImage(backgroundImg2)
    backGround.x = displayWidth/2-200;
    backGround.scale = 0.3;
  }
    size();
    stone();
    energy();
    drawSprites();
    textSize(30);
    stroke("white")
    fill("white")
    text("Score:"+score,200,200);
    console.log(BananaGroup.x)
}

function stone(){
    if(World.frameCount%200===0){
      var obstacle=createSprite(displayWidth/2+300,displayHeight/2+50,20,20);
      obstacle.addImage(stoneImg);
      obstacle.velocityX= -(9+score/1);
      obstacle.scale=0.15;
      StoneGroup.add(obstacle);
    }
  }

  function energy(){
    if(World.frameCount%130===0){
      var banana=createSprite(displayWidth/2+300,random(300,350),20,20);
      banana.addImage(bananaImg);
      banana.velocityX= -7;
      banana.scale=0.05;
      BananaGroup.lifetime = 100;
      BananaGroup.add(banana);
    }
  }
  
  function size(){

    switch(score){
      case 10 : monkey.scale = 0.12;
      break;
      case 20 : monkey.scale = 0.14;
      break;
      case 30 : monkey.scale = 0.16;
      break;
      case 40 : monkey.scale = 0.18;
      break;
      default : break;
    }

  }