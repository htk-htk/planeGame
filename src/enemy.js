class Enemy {
    constructor() {
        this.fps = 10
        this.timeInterval = 1000 / this.fps
        this.frameX = 0
        this.frameY = 0
        this.timeFrame = 0
        this.markedForDeletion=false
    }
    update(deltaTime) {
        this.x-=this.speedX
        // this.y+=this.speedY
 
        this.timeFrame+=deltaTime
        if(this.x<-this.width){
            this.markedForDeletion=true
            this.game.player.life--
            if(this.game.player.life<=0){
                this.game.gameOver=true
            }
        }
        if(this.timeFrame>this.timeInterval){
            this.timeFrame=0
            this.frameX++
            if(this.frameX>this.frameMax-1) this.frameX=0
     
        }
    }
    draw(ctx) {
     
        ctx.drawImage(this.image,
            this.frameX*this.imageWidth+this.skewX,
            this.frameY*this.imageHeight+this.skewY,
            this.sliceHeight,this.sliceHeight,
            this.x,this.y,this.width,this.height)
    }
}

export class Fly extends Enemy{
    constructor(game){
        super()
        this.game=game
        this.imageWidth = 828 / 3
        this.imageHeight = 1270 / 5
        this.sliceWidth = this.imageWidth - 30
        this.sliceHeight = this.imageHeight - 40
        this.WHScale = this.sliceWidth / this.sliceHeight
        this.imgaeScale = 3
        this.width = this.sliceWidth / this.imgaeScale
        this.height = this.width / this.WHScale
        this.skewX=20
        this.skewY=20
        this.x=this.game.width+this.game.width*Math.random()*0.5
        this.y=Math.random()*this.game.height*0.5
        this.frameMax=3
        this.speedX=Math.random()*2+2
        this.speedY=0
        this.image=document.getElementById('enemy1')
        this.life=4
     
    }
    update(deltaTime){
      
        super.update(deltaTime)
    }
    draw(ctx){
        super.draw(ctx)
    }
}