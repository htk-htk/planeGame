class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game
        this.width = width
        this.height = height
        this.speedModifier = speedModifier
        this.image = image
        this.x = 0
        this.y = 0
    }
    update() {
        if (this.x <= -this.width) this.x = 0
        else this.x -= this.game.speed * this.speedModifier
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x+this.width, this.y, this.width, this.height)
    }
}
export class Background {
    constructor(game) {
        this.game = game
        this.imageWidth=2826 
        this.imageHeight=1536
        this.WHScale=this.imageWidth/this.imageHeight
        this.height = this.game.height
        this.width=this.WHScale*this.height
        if(this.width<this.game.width){
            this.width=this.game.width
        }
        this.layerImage1 = document.getElementById('layer1')
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layerImage1)
        this.backgroundLayers = [this.layer1]
    }
    update(){
        this.backgroundLayers.forEach(layer=>{
    
            layer.update()
        })
    }
    draw(ctx){
        this.backgroundLayers.forEach(layer=>{
            layer.draw(ctx)
        })
    }
}