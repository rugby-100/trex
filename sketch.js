var PLAY = 1
var END = 0
var highScore = 0
var gameState = PLAY
var obstacleGroup
var trex, trex_running
var ground, groundImage
var cloud, cloudImg, cloudGroup
var score = 0

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  trex_collided = loadAnimation("trex_collided.png")
  cloudImg = loadImage("cloud.png")
  ob1Img = loadImage("obstacle1.png")
  ob2Img = loadImage("obstacle2.png")
  ob3Img = loadImage("obstacle3.png")
  ob4Img = loadImage("obstacle4.png")
  ob5Img = loadImage("obstacle5.png")
  ob6Img = loadImage("obstacle6.png")
  overImg = loadImage("gameOver.png")
  RSImg = loadImage("restart.png")
  crowImg = loadAnimation("crow1.png", "crow2.png")
  checkPointSound = loadSound("checkPoint.mp3")
  dieSound = loadSound("die.mp3")
  jumpSound = loadSound("jump.mp3")
}


function setup() {
  createCanvas(600,200);
  trex = createSprite(110,150,5,5);
  trex.scale = 0.5;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  //trex.debug = true
  trex.setCollider("circle", 0, 0, 40)
  ground = createSprite(300,175,600,1)
  ground.addImage("ground1", groundImage);
  ground.shapeColor = "white";
  gOver = createSprite(300,80)
  gOver.addImage(overImg)
  restart = createSprite(300,120)
  restart.addImage(RSImg)
  restart.scale = 0.7
  console.log(ground.width)
  
  //cloud group
  cloudGroup = new Group()
  obstacleGroup = new Group()
}

function draw() {
  background(rgb(128,180,197))
  
  
  if (gameState === PLAY) {
    score = score+Math.round(getFrameRate()/60)
    //console.log(getFrameRate())
    
    if (score%100 === 0) {
      checkPointSound.play()
    }
    
    if (keyDown("space") && trex.y > 140) {
      jumpSound.play()
      trex.velocityY = -8;
    }
    //gravity
    trex.velocityY = trex.velocityY + 0.40;

    if (ground.x < 0) {
      ground.x = ground.width/2;
    }
    ground.velocityX = -6-3*score/200;
    

    gOver.visible = false
    restart.visible = false
    spawnClouds();
    spawnObstacles();
    
    if (score > 500) {
      spawnCrows()
    }
    
    if (trex.isTouching(obstacleGroup)) {
      dieSound.play()
      gameState = END
    }
  }
  
  else if (gameState === END) {
    gOver.visible = true
    restart.visible = true
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    trex.setVelocity(0,0)
    ground.setVelocity(0,0)
    trex.changeAnimation("collided", trex_collided)
    obstacleGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    if (mousePressedOver(restart)) {
      reset()
    }
    if (score > highScore) {
      highScore = score
    }
  }
  
  
  
  trex.collide(ground);
  
  textSize(15)
  textFont("Times New Roman")
  fill(75,75,75)
  text(score, 550, 20)
  text("highscore: " + highScore, 425, 20)
  
  
/*  for (var i = 0; i < cloudGroup.length; i += 1) {
    if (cloudGroup.get(i).x < 0) {
      cloudGroup.get(i).destroy()
    }
  } */
  

  drawSprites();
}

function reset() {
  gameState = PLAY
  score = 0
  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()
  trex.changeAnimation("running", trex_running)
  /*gOver.destroy()
  restart.destroy()*/
}

function spawnObstacles() {
  if (frameCount % 125 == 0) {
    obstacles = createSprite(600,152,5,10)
    obstacles.scale = 0.55
    var num = Math.round(random(1,6))
    obstacles.velocityX = -6-3*score/200
    switch(num) {
      case 1: obstacles.addImage(ob1Img)
      break;
      case 2: obstacles.addImage(ob2Img)
      break;
      case 3: obstacles.addImage(ob3Img)
      break;
      case 4: obstacles.addImage(ob4Img)
      break;
      case 5: obstacles.addImage(ob5Img)
      break;
      case 6: obstacles.addImage(ob6Img)
      break;
      default: break;
    }
    obstacles.lifetime = 100
    obstacleGroup.add(obstacles)
  }
}

function spawnClouds() {
  if (frameCount % 150 === 0) {
    cloud = createSprite(600,30,5,10)
    cloud.y = random(15,110)
    cloud.velocityX = -2-3*score/200
    cloud.addImage(cloudImg)
 
   cloudGroup.add(cloud)
   cloud.lifetime = 300
    
//if (trex.depth < cloud.depth) {
      trex.depth = cloud.depth + 1
    //}
    //console.log(World.frameCount)
    //console.log(trex.depth)
    //console.log(cloud.depth)
  }
}

function spawnCrows() {
  if (frameCount % 175 === 0) {
    crow = createSprite()
  }
}
