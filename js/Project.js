'use strict';
class Project{
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.addEventListeners();
    drawDarkBackground(this.ctx);
    // this.drawFrame();
  }

  drawFrame(){
    drawDarkBackground(this.ctx);
  }
    
  addEventListeners(){
    this.canvas.addEventListener('mouseover', ()=>{
      if(!this.interval){
        this.drawFrame();
        this.interval = setInterval(() => this.drawFrame(), 1000/15);
      }
    }, false);
    
    this.canvas.addEventListener('mouseout', ()=>{
      if(this.interval){
        clearInterval(this.interval);
        this.interval = null;
        this.showDisabled();
      }
    }, false);
    
    
    this.canvas.addEventListener('click', (evt)=>{
      const mousePos = getMousePos(this.canvas, evt);
      console.log(mousePos)
    }, false);
  }
  
  showDisabled(){
    this.ctx.fillStyle = "rgba(150, 150, 150, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = "orange";
    this.ctx.font = "10vh Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this.constructor.name, this.canvas.width/2, this.canvas.height/2);
  }
}



function drawDarkBackground(ctx){
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
}

function getMousePos(canvas, evt){
  const rect = canvas.getBoundingClientRect();
  
  return [
    Math.round(
      CANVAS_SIZE * (evt.clientX - rect.left) / rect.width // normalizing (b/w 0 & 1) by dividing width and get actual by multiply with canvas size
    ),
    Math.round(
      CANVAS_SIZE * (evt.clientY - rect.top) / rect.height,
    ),
  ];
}
