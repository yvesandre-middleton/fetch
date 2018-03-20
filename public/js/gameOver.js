let gameOver = function(game) {}
gameOver.prototype = {
  preload: function() {
      game.load.image('gameOver', 'assets/images/gameOverScreen.png')
    },

  create: function() {
      var style = {
          font: "32px Monospace",
          fill: "#00ff00",
          align: "center"
      }
      
      let ninja = game.add.sprite(0, 0, 'gameOver')
      
      game.input.onDown.add(this.restartGame, this)
      
    },

      restartGame: function() {
        score = 0
        game.state.start('Menu')
      }
}

  
  

