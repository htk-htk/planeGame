import Player from './player.js'
import InputHandler from './input.js'
import { Background } from './background.js'
import { Fly } from './enemy.js'
import { UI } from './ui.js'
import { Dust } from './particle.js'
import { Explosion } from './explosion.js'
import { Weapon } from './weapon.js'
const canvas = document.getElementById('canvas1')

window.addEventListener('load', function () {

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.player = new Player(this)
            this.speed = 1
            this.background = new Background(this)
            this.input = new InputHandler(this)
            this.enemys = []
            this.ui = new UI(this)
            this.frameTime = 0
            this.frameInterval = 1000
            this.debug = false
            this.gameOver = false
            this.particles = []
            this.weapons = []
            this.gameTime = 0
            this.rangInput = rangInput
            this.span = span
            this.fps=0
            this.fpsTime=0
            this.fpsInterval=500
        }
        update(deltaTime) {
            if(hasClick){
                for(let i=0;i<game.enemys.length;i++){
                    if (
                        game.enemys[i].x < clickX &&
                        game.enemys[i].x + game.enemys[i].width > clickX&&
                        game.enemys[i].y<clickY&&
                        game.enemys[i].y+ game.enemys[i].height>clickY
                    ) {
                    
                        game.enemys[i].markedForDeletion=true
                        this.explosion=new Explosion(this, game.enemys[i].x, game.enemys[i].y)
                        this.ui.score++
                        break
                    }
                }

                hasClick=false
            }
            this.frameTime += deltaTime
            this.player.update(this.input.keys, deltaTime)
            this.ui.update(deltaTime)
            this.background.update()
            game.checkCollision()
            if (this.explosion) {

                this.explosion.update(deltaTime)
            }
            if (this.frameTime > this.frameInterval) {
                this.addEnemy()
                this.frameTime = 0

            }
            this.addParticle()
            this.enemys.forEach(enemy => {
                enemy.update(deltaTime)
                if (enemy.markedForDeletion) this.enemys.splice(this.enemys.indexOf(enemy), 1)
            })
            this.weapons.forEach((weapon, index) => {
                weapon.update()
                if (weapon.markedForDeletion) this.weapons.splice(index, 1)
            })
            this.particles.forEach((particle, index) => {
                particle.update()
                if (particle.markedForDeletion) this.particles.splice(index, 1)
            })
        }
        draw(context) {
            this.background.draw(context)

            if (this.debug) {
                context.strokeRect(this.player.x, this.player.y, this.player.width, this.player.height)
                this.enemys.forEach(enemy => {
                    context.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height)
                })
                this.weapons.forEach(weapon => {
                    context.strokeRect(weapon.x, weapon.y, weapon.width, weapon.height)
                })
            }
            this.enemys.forEach(enemy => {

                enemy.draw(context)
            })
            this.weapons.forEach(weapon => {
                weapon.draw(context)
            })
            this.player.draw(context)
            if (this.explosion) {

                this.explosion.draw(context)
            }
            this.particles.forEach(particle => {
                particle.draw(context)
            })
            this.ui.draw(context)
        }
        addEnemy() {
            this.enemys.push(new Fly(this))
        }
        addParticle() {
            this.particles.push(
                new Dust(
                    this, this.player.x - 15,
                    this.player.y + this.player.height * 0.5
                )
            )
        }
        addWeapon() {
            this.weapons.push(new Weapon(this))
        }
        checkCollision() {
            this.enemys.forEach(enemy => {

                if (
                    this.player.x < enemy.x + enemy.width &&
                    enemy.x < this.player.x + this.player.width &&
                    this.player.y < enemy.y + enemy.height &&
                    enemy.y < this.player.y + this.player.height
                ) {

                    this.ui.score++
                    this.explosion = new Explosion(this, enemy.x, enemy.y)
                    enemy.life = 0
                    if (enemy.life <= 0) {
                        enemy.markedForDeletion = true
                    }
                }
            });

            this.weapons.forEach(weapon => {
                this.enemys.forEach(enemy => {
                    if (
                        weapon.x < enemy.x + enemy.width &&
                        enemy.x < weapon.x + weapon.width &&
                        weapon.y < enemy.y + enemy.height &&
                        enemy.y < weapon.y + weapon.height
                    ) {
                        weapon.markedForDeletion = true
                        enemy.life--
                        if (enemy.life <= 0) {
                            enemy.markedForDeletion = true
                            this.ui.score++
                            this.explosion = new Explosion(this, enemy.x, enemy.y)
                        }

                    }
                })
            })

        }
    }
    let scale = 1
    const ctx = canvas.getContext('2d')
    canvas.style.width = this.innerWidth + "px"
    canvas.style.height = this.innerHeight * 0.7 + "px"

    canvas.width = this.innerWidth / scale
    canvas.height = this.innerHeight * 0.7 / scale



    const startButton = this.document.getElementById('start')
    const pauseButton = this.document.getElementById('pause')
    const restartButton = this.document.getElementById('restart')
    const rangInput = document.querySelector('input[type=range]')
    const span = document.querySelector('span')
    span.innerText = rangInput.value + "%"

    startButton.innerText = "开始游戏"
    pauseButton.innerText = "暂停游戏"
    restartButton.innerText = "重新游戏"
    let game, id = 0, lastTime = 0, deltaTime = 0, hasClick = false,clickX,clickY
    initGame()
    startGame()
    //取色器
    // this.window.addEventListener('click', function (e) {
    //     hasClick=true
    //     let colors = ctx.getImageData(
    //         (e.x) / scale,
    //         (e.y - (1 - 0.7) / 2 * this.innerHeight) / scale, 1, 1).data
    //     clickX = (e.x) / scale              //画布坐标
    //     clickY = (e.y - (1 - 0.7) / 2 * this.innerHeight) / scale       //画布坐标
    //     ctx.clearRect(150, 0, 50, 50)
    //     ctx.fillStyle = `rgba(${colors[0]},${colors[1]},${colors[2]},${colors[3] / 255})`
    //     ctx.fillRect(150, 0, 50, 50)

       

    // })
    rangInput.onclick = function (e) {
        span.innerText = e.target.value + "%"
    }
    startButton.onclick = function (e) {

        startGame()


    }
    pauseButton.onclick = function (e) {
        pauseGame()
    }
    restartButton.onclick = function (e) {
        restartGame()
    }

    function animate(timestamp) {
   
        deltaTime = timestamp - lastTime
        lastTime = timestamp
        game.fpsTime+=deltaTime
        if(game.fpsTime>game.fpsInterval){
            game.fps=Math.round(1000/deltaTime)
            game.fpsTime=0
        }
 
        ctx.fillStyle = 'rgba(255,0,0,1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        if (!game.gameOver) id = requestAnimationFrame(animate)

    }


    function initGame() {
        game = new Game(canvas.width, canvas.height)
    }

    function startGame() {

        if (!game.gameOver) {
            pauseGame()
            requestAnimationFrame(animate)
        }

    }

    function pauseGame() {
        cancelAnimationFrame(id)

    }
    function restartGame() {
        pauseGame()  //清理上一次动画的影响
        initGame()
        startGame()


    }


})
