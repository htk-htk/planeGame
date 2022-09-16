export class UI{
    constructor(game){
        this.game=game
        this.score=0
        this.fontSize=30
        this.socreColor='black'
        this.lifeColor='red'
        this.textAlign='left'
        this.textBaseline="top"
        this.timeFrame=0
        this.hours=0
        this.minus=0
        this.second=0
        this.gameTime=0
    }
    update(deltaTime){
        
        this.timeFrame+=deltaTime
        if(this.timeFrame>1000){
            this.gameTime++
            this.timeFrame=0
   
        }
    }
    draw(ctx){
        ctx.font = this.fontSize+"px"+ " serif";
        ctx.textAlign=this.textAlign
        ctx.textBaseline=this.textBaseline
        ctx.fillStyle=this.socreColor
        ctx.save()
        ctx.fillText('score:'+this.score,0,0)
        ctx.fillStyle=this.lifeColor
        ctx.fillText('life:'+this.game.player.life,0,40)
        this.drawGameTime(ctx)
        ctx.textAlign='right'
        ctx.textBaseline="top"
        ctx.fillStyle='yellow'
        ctx.fillText("fps:"+this.game.fps,this.game.width,0)
        if(this.game.gameOver){
            ctx.font = "50px serif";
        
            ctx.textAlign='center'
            ctx.textBaseline="middle"
            ctx.fillStyle='red'   
            ctx.fillText('GAME OVER!',this.game.width/2,this.game.height/2)
        }
     
       
    }
    drawGameTime(ctx){
        ctx.textAlign="center"
        ctx.textBaseline = "top"
        this.hours = parseInt(this.gameTime / 3600)
        if (this.hours < 1) {
            this.minus = parseInt(this.gameTime / 60)
            this.second = this.gameTime % 60
            if (this.minus < 10) {
                this.minus = "0" + this.minus
            }
            if (this.second < 10) {
                this.second = "0" + this.second
            }
            ctx.fillText("Time:"+this.minus + ":" + this.second,this.game.width/2,0)

        
        } else {
            let minus = parseInt((this.gameTime - this.hours * 3600) / 60)
            let second = this.gameTime % 60
            if (minus < 10) {
                minus = "0" + minus
            }
            if (second < 10) {
                second = "0" + second
            }
            
            ctx.fillText("Time:"+this.hours + ":" + minus + ":" + second,this.second,this.game.width/2,120)
        
        }
  
    }
}
