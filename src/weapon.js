export class Weapon{
    constructor(game){
        this.game=game
        this.img=document.getElementById('fire_ball_1')
        this.player=this.game.player
        this.x=this.player.x+this.player.width
        this.y=this.player.y
        this.width=100
        this.height=50
        this.markedForDeletion=false
      
    }
    update(){
        this.x+=5
        if(this.x>this.game.width){
            this.markedForDeletion=true
        }
    }
    draw(ctx){
        
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
}