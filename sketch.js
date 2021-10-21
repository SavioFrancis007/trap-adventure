const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var lasercount = 100;
var engine, world;
var man, manr;
var manImg, manrImg;
var backgroundImg;
var ground, groundImg
var x=100;
var y=0;
var line;
var laserGroup;
var monster, monsterImg;
//var balloon, balloonImg


function preload() {
    manMove = loadAnimation("man standing.png","man running.png");
    manImg = loadAnimation("man standing.png");
    manrImg = loadImage("man running.png");
    groundImg = loadImage("ground.png");
    monsterImg = loadImage("monster.png");
    backgroundImg = loadImage("background.png");
    //balloonImg = loadImage("balloon.png");
}
function setup(){
     var canvas = createCanvas(1000,600);
    engine = Engine.create();
    world = engine.world;
    background("backgroundImg");
    ground = createSprite(500,575,1100,50);
    
    
    man = createSprite(200,510,10,10);
    man.scale=0.25;
    line = createSprite(300,800,50,20);
    line.shapeColor="red"

    monster=createSprite(800, 500)

   // balloon = createSprite(850, 360);
    //balloon.scale=0.11
    //badGuy.scale=0.5;
    

    

    laserGroup = new Group();
    man.addAnimation("move" , manImg);
    man.addAnimation("stand",manMove);

   

    
    
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    man.display();
    ground.display();
    man.addAnimation("stand",manMove);
    line.display(); 
    monster.display()
    
    monster.addAnimation("bad",monsterImg)
    //balloon.addAnimation("ball",balloonImg)


    
    if(laserGroup.isTouching(monster)){
        monster.visible = false;
        laserGroup.setVisibleEach(false);

        
     }


    if(keyDown(RIGHT_ARROW)){
            man.x+=5
            man.addAnimation("move" , manMove);

    }

    if(keyDown(LEFT_ARROW)){
            
            man.x-=5
            man.addAnimation("move" , manMove);

    }

    if(keyDown("space") && man.y >=494){
        man.velocityY -= 12;
    }

    if(keyDown(UP_ARROW) && lasercount>1)
    {
        laser();
        lasercount-=2;


    }

    if(lasercount <=0)
    {
        background("red");
        stroke("black");
        fill("black");
        textSize(30);
        text("GAME OVER!!!", 400,300);
    }
    

    man.velocityY += 0.5;
    man.collide(ground);
       
    
    
    drawSprites();
    monster.setCollider("rectangle", 25,0,100,100)
    //monster.debug=true;
   
}


function laser()
{
    laserbeam1 = createSprite(man.x, man.y-4,200,3);
    laserbeam2 = createSprite(man.x,man.y+4,200,3);
    laserbeam1.shapeColor = "red";
    laserbeam2.shapeColor = "red";
    laserbeam1.velocityX = 5;
    laserbeam2.velocityX = 5;



    console.log("clicked");
    console.log(laserbeam1.x);
    console.log(laserbeam1.y);
    console.log(laserbeam2.x);
    console.log(laserbeam2.y);


    laserGroup.add(laserbeam1);
    laserGroup.add(laserbeam2);

}