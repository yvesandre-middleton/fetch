let gameOver = function(game) {}
gameOver.prototype = {
  preload: function() {
      game.load.image('endGame', 'assets/images/ninja.png')
    },

  create: function() {
      var style = {
          font: "32px Monospace",
          fill: "#00ff00",
          align: "center"
      }
      
      let ninja = game.add.sprite(0, 0, 'endGame')
      var text = game.add.text(
          game.width / 2, game.height / 2, "You were defeated!\n\n" + "\n\n Click to restart your quest", style
      );
      
      text.anchor.set(0.5);
      game.input.onDown.add(this.restartGame, this)
      
    },

      restartGame: function() {
        score = 0
        game.state.start('Menu')
      }
}

  
  

