export class Explosion{
    constructor(game,x,y) {
        this.game=game
        this.image=document.getElementById('boom')
        this.imageWidth=1786
        this.imageHeight=1536
        this.sliceWidth=this.imageWidth/3
        this.sliceHeight=this.imageHeight/3
        this.WHScale=this.imageWidth/this.imageHeight
        this.width=100
        this.height=this.width/this.WHScale
        this.x=x
        this.y=y
        this.frameX=0
        this.frameY=0
        this.frameXMax=3
        this.frameYMax=3
        this.fps=20
        this.timeInterval=1000/this.fps
        this.frameTime=0
        this.done=false
        this.sound=new Audio()
        this.sound.src='..\\assets\\audio\\boom.wav'
    }
    update(deltaTime){
      
        this.frameTime+=deltaTime
        if(!this.done)  {
            this.sound.volume=this.game.rangInput.value/1000
            this.sound.play()
        }
        if(this.frameTime>this.timeInterval){
            this.frameTime=0
            this.frameX++
        
            if(this.frameX>this.frameXMax-1) {
                this.frameX=0 
                this.frameY++
                if(this.frameY>this.frameYMax-1){
                    this.frameY=0
                    this.done=true
                }
            }
        }
    }
    draw(ctx){
        if(!this.done){
            ctx.drawImage(
                this.image,
                this.frameX*this.sliceWidth,
                this.frameY*this.sliceHeight,
                this.sliceWidth,this.sliceHeight,
                this.x,this.y,this.width,this.height
                )
        }
      
    }
}