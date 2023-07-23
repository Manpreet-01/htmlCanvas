'use strict';
class ShootingStars extends Project{
  constructor(canvas){
    super(canvas);

    this.stars = this.getRandomStars(100);
    this.shootingStars = [];
    
    this.drawFrame();
    this.showDisabled();
  }
  
  getRandomStars(N){
    let arr = [];
    
    for(let i=0; i<N; i++){
      arr.push(
        new Star([
          Math.random()*CANVAS_SIZE,
          Math.random()*CANVAS_SIZE
        ])
      );
    }
    
    return arr;
  }
  
  drawFrame(){
    super.drawFrame();
    
    if(Math.random() < 0.03){
      this.shootingStars.push(
        new ShootingStar()
      );
    }

    for(let i=0; i<this.stars.length; i++){
      this.stars[i].update();
      this.stars[i].draw(this.ctx);
    }
    
    for(let i=0; i<this.shootingStars.length; i++){
      this.shootingStars[i].update();
      this.shootingStars[i].draw(this.ctx);
    }
    
  }
}


class ShootingStar{
  constructor(){
    this.location = [
      CANVAS_SIZE*0.5 + Math.random()*CANVAS_SIZE,
      Math.random()*CANVAS_SIZE,
    ],
    
    this.oldLocation  = this.location;      // copy the reference , both points to same reference now
    
    this.radius = 0;
    this.step = 0;
    this.speed = Math.random()*1 + 50;
  }
  
  draw(ctx){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = this.radius;
    ctx.moveTo(...this.oldLocation);
    ctx.lineTo(...this.location);
    ctx.stroke();
  }
  
  update(){
    this.step += 0.1;
    
    if(this.step > Math.PI){
      this.radius = 0;
    }else{
      this.radius = Math.sin(this.step)*5;
    }
    
    this.oldLocation = [...this.location];   // create a another copy of values only , not copy the reference of this.location here
    this.location[0] -= this.speed;
  }
}