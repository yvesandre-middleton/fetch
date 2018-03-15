let gameOver = function(game) {}
gameOver.prototype = {

  create: function() {
      var style = {
          font: "32px Monospace",
          fill: "#00ff00",
          align: "center"
      }
      
      var text = game.add.text(
          game.width / 2, game.height / 2, "Game Over\n\n" + "\n\n Click to restart", style
      );
      
      text.anchor.set(0.5);
      game.input.onDown.add(this.restartGame, this)
      // enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
      // if (enterKey.isDown) {
      //   game.state.start('Menu')
    },

      restartGame: function() {
        score = 0
        game.state.start('Menu')
      }
}

  
  

