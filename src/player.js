export default class Player {
    
    constructor(game) {
        this.game = game
        // this.imageWidth = 828 / 3
        this.imageWidth = 817
        // this.imageHeight = 1270 / 5
        this.imageHeight = 413
        // this.sliceWidth = this.imageWidth - 30
        this.sliceWidth = this.imageWidth
        // this.sliceHeight = this.imageHeight - 40
        this.sliceHeight = this.imageHeight
        this.WHScale = this.sliceWidth / this.sliceHeight
        this.imgaeScale = 10
        this.width = this.sliceWidth / this.imgaeScale
        this.height = this.width / this.WHScale
        this.skewX = 0
        this.skewY = 0
        this.x = 0
        this.y = this.game.height - this.height
        this.image = document.getElementById('plane_yellow')
        this.speedx = 10
        this.speedy = 10
        this.weigh = 1
        this.up = true
        this.fps = 30   //控制游戏刷新速率，最大值为屏幕刷新速率
        this.intervalTime = 1000 / this.fps
        this.frameTime = 0
        this.frameX = 0
        this.frameY = 0
        this.frameMax = 1
        this.lastWeaponTime=0
        this.WeaponIntervalTime=200
        this.life=5
        this.hasClick=false
    }
    update(keys, deltaTime) {
        // horizontal movement
        if (keys.includes('ArrowRight')) {
            this.frameTime += deltaTime
            if (this.frameTime >= this.intervalTime) {
                this.frameTime = 0
                this.frameX++
                this.frameX = this.frameX % this.frameMax
                this.x += this.speedx
                if (this.x > this.game.width - this.width) this.x = this.game.width - this.width
            }
        }
        // vertical movement
        if (keys.includes('ArrowLeft')) {
            this.x -= this.speedx
            if (this.x < 0) this.x = 0
        }
         if (keys.includes('ArrowUp')) {
            // console.log(this.speedy);
            // if (this.up) {
            //     this.y -= this.speedy
            //     this.speedy -= this.weigh
            //     if (this.speedy <= 0) {
            //         this.speedy = 0
            //         this.up = false
            //     }

            // } else {
            //     this.speedy += this.weigh
            //     this.y += this.speedy
            //     if (this.y >= this.game.height - this.height) {
            //         this.y = this.game.height - this.height
            //         this.up = true
            //     }
            // }
            // this.x += this.speedx
            // if (this.x >= this.game.width - this.width) this.x = 0
            this.y -= this.speedy
            if (this.y < 0) this.y = 0

        }  if (keys.includes("ArrowDown")) {
            this.y += this.speedy
            if (this.y > this.game.height - this.height) this.y = this.game.height - this.height
        }  if(keys.includes("x")){
            let now = Date.now()
            
            if (now-this.lastWeaponTime >this.WeaponIntervalTime) {
                this.game.addWeapon()
                this.lastWeaponTime= now
            }
        }
    }
    draw(context) {
        // context.fillStyle = 'black'
        // context.fillRect(this.x, this.y, this.width, this.height)
        context.drawImage(
            this.image,
            this.frameX * this.imageWidth + this.skewX,
            this.frameY * this.imageHeight + this.skewY,
            this.sliceWidth, this.sliceHeight,
            this.x, this.y, this.width, this.height
        )
    }

  


}