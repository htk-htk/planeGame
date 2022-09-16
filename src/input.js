export default class InputHandler {
    constructor(game) {
        this.keys = []
        this.game = game
        window.addEventListener('keydown', e => {

            if (
                (
                    e.key === "ArrowRight" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "x"
                )
                && this.keys.indexOf(e.key) === -1
            ) {
                this.keys.push(e.key)
            } 
             if (e.key === 'd') {
                this.game.debug = !this.game.debug
                if (this.game.debug) {
                    console.log("open debug mode");
                } else {
                    console.log("close debug mode");
                }
            }

        }
        )
        window.addEventListener('keyup', e => {
            if (e.key === "ArrowRight" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowUp" ||
                e.key === "x"
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }


        })
    }

}