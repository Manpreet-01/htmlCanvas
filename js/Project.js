'use strict';
class Project{
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.interval = setInterval(() => this.drawFrame(), 1000/5);
  }

  drawFrame(){
    this.drawDarkBackground();
  }
  
  drawDarkBackground(){
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
  }
}