'use strict';
class SnowFall extends Project{
  constructor(canvas){
    super(canvas);
    
    this.snow = this.generateSnowParticles(200);

    this.drawFrame();
    this.showDisabled();
  }
  
  generateSnowParticles(N){
    let arr = [];
    
    for(let i=0; i<N; i++){
      arr.push(
        new SnowFlake([
          Math.random()*CANVAS_SIZE,
          Math.random()*CANVAS_SIZE
        ])
      );
    }
    
    return arr;
  }
  
  drawFrame(){
    super.drawFrame();

    for(let i=0; i<this.snow.length; i++){
      this.snow[i].update();
      this.snow[i].draw(this.ctx);
    }
  }
}

class SnowFlake{
  constructor(location){
    this.location = location;
    this.radius = Math.random() * 2 + 2; // b/w 2 and 4
    this.speed = Math.random() * 5 +10;
  }
  
  draw(ctx){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.location[0], this.location[1], this.radius, 0, Math.PI*2);
    ctx.fill();
  }
  
  update(){
    this.location[1] += this.speed;
    
    if(this.radius > 3){                      //foreground wind
      this.location[0] += Math.random() * 5;
    }else{                                    // background wind
      this.location[0] -= Math.random() * 5;
    }
    
    
    if(this.location[1] > CANVAS_SIZE){
      this.location[1] = 0;
    }
    
    if(this.location[0] > CANVAS_SIZE){
      this.location[0] = 0;
    }
    
    if(this.location[0] < 0){
      this.location[0] = CANVAS_SIZE;
    }
  }
}