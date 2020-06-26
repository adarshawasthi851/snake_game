function init()
{
  canvas=document.getElementById('mycanvas');
  W=canvas.width=800;
  H=canvas.height=800;
  pen=canvas.getContext('2d');
  cs=50;
  score=5;
  game_over=false;
  food_img=new Image();
  food_img.src="image2.jpg";
  food=getRandomFood();
  snake={
   init_len:5,
   color:"blue",
   direction:"right",
   cells:[],



  createSnake:function()
  {
    for(var i=this.init_len;i>0;i--)
    {
      this.cells.push({x:i,y:0});
    }
  },
  drawSnake:function()
  {

    for(var i=0;i<this.cells.length;i++)
    {
      pen.fillStyle=this.color;
      pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
    }
  },
  updateSnake:function()
  {

    var headX=this.cells[0].x;
    var headY=this.cells[0].y;

if(headX==food.x && headY==food.y)
{
  food=getRandomFood();
  score++;
}
else {


    this.cells.pop();
  }

    var nextx;
    var nexty;
    if(this.direction=="right")
    {
      nextx=headX+1;
      nexty=headY;
    }
    else if(this.direction=="left")
    {
      nextx=headX-1;
      nexty=headY;
    }
    else if(this.direction=="down")
    {
      nextx=headX;
      nexty=headY+1;
    }
    else //if(this.direction=="down")
    {
      nextx=headX;
      nexty=headY-1;
    }

    this.cells.unshift({x:nextx,y:nexty});
    var last_x=Math.round(W/cs);
    var last_y=Math.round(W/cs);

    if(this.cells[0].y<0 || this.cells[0].y>last_y||this.cells[0].x>last_x ||this.cells[0].x<0)
    {
      game_over=true;
    }

  }

};
snake.createSnake();
function keyPressed(e)
{
  console.log("key pressed",e.key);
  if(e.key=="ArrowLeft")
  {
    snake.direction = "left";
  }
  else if(e.key=="ArrowRight")
  {
    snake.direction = "right";
  }
  else if(e.key=="ArrowDown")
  {
    snake.direction = "down";
  }
  else //if(e.key=="ArrowUp")
  {
    snake.direction = "up";
  }
}
document.addEventListener('keydown',keyPressed);
}
function update()
{
  snake.updateSnake();

//  pen.fillRect(headX,headY,cs-3,cs-3);
}
function getRandomFood()
{
  var foodX=Math.round(Math.random()*(W-cs)/cs);
  var foodY=Math.round(Math.random()*(H-cs)/cs);
  var food={
    x:foodX,
    y:foodY,
    color:"yellow",
  }
  return food;
}
function draw()
{
  pen.clearRect(0,0,W,H);
  snake.drawSnake();
  pen.fillStyle=food.color;
  pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
  pen.font="50px Roboto";
  pen.fillText("score: ",30,40);
  pen.font="40px Roboto";
  pen.fillText(score,150,40);
}
function gameloop()
{
  if(game_over==true)
  {
    clearInterval(f);
    alert("Game_over");
  }
  draw();
  update();
}
init();
var f=setInterval(gameloop,100);
