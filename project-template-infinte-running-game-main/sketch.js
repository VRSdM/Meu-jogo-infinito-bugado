var bruxa, bruxaImg, groundimg, chaoinvisivel, fogueira, fogueiraimg1, fogueiraimg2, fogueiragroup;

var score=0;
var play = 1;
var end = 0;
var gamestate = play;

function preload(){
bruxaImg = loadImage("bruxa.png");

groundimg = loadImage("ground.png");

obstaculoimg1 = loadImage("fogueira.jpg");
obstaculoimg2 = loadImage("fogueira1.jpeg");

}

function setup(){
  createCanvas(2000,300)
  
bruxa = createSprite(50,160,20,50);
bruxa.addImage(bruxaImg);
bruxa.scale=0.13;
bruxa.x=50

ground=createSprite(200,225,250,10);
ground.addImage("ground",groundimg);
ground.scale=0.5

chaoinvisivel = createSprite(200,190,400,10);
chaoinvisivel.visible=false;

fogueiragroup = createGroup();




}

function draw(){
  background("white");

  if (gamestate == play){
    score = score+Math.round(frameCount/150);
  if (ground.x<0){
   ground.x=ground.width/2;
  }
  ground.velocityX=-2;

  if (keyDown("space") && bruxa.y>=161){
   bruxa.velocityY = -10;
   
   }
   bruxa.velocityY = bruxa.velocityY+0.5;
   bruxa.collide(chaoinvisivel);
   spawnFogueiras();
      
  if (fogueiragroup.isTouching(bruxa)){
   gamestate = end;
   
   }

   if (score>0 && score%100 == 0){
  
   }
   }
 else if (gamestate == end){
  ground.velocityX = 0;
  fogueiragroup.setVelocityXEach(0);
  bruxa.velocityY = 0;
  fogueiragroup.setLifetimeEach(-1);
    }
 text("SCORE: "+score, 500,50);

 bruxa.collide(chaoinvisivel);
 
 

 drawSprites();
}


function spawnFogueiras(){
  if (frameCount%60 === 0){
  fogueira = createSprite(600,165,10,40);
  fogueira.velocityX = -(6 + score/100);
  fogueira.scale=0.5;
  var aleatorio = Math.round(random(1,6));
  switch(aleatorio){
    case 1:fogueira.addImage(obstaculoimg1);
    break;
    case 2:fogueira.addImage(obstaculoimg2);
    break;
    }
  fogueira.lifetime=200;
  fogueiragroup.add(fogueira);
  }

}

function reset(){
console.log("resetar");
 gamestate = play;
 fogueiragroup.destroyEach();
 score = 0;
}