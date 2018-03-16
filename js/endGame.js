let endGame = function(game) {}
endGame.prototype = {
  // preload: function() {
  //   game.load.image('endGame', 'assets/images/bg2.png')
  // },

  create: function() {
      let placeholder = 'Player1'
      let playerName = prompt("Please enter name", placeholder)
      if (playerName === '' || playerName === null) {
        playerName = 'player'
      }
      let timeBonus = 0
      let livesBonus = ninjaLives * 100
      if (totalTime > 50) {
        timeBonus = 10
      } else if (totalTime > 31) {
        timeBonus = 50
      } else {
        timeBonus = 100
      }
      let finalScore = (score + timeBonus + livesBonus)
      let endGameText = 'Congratulations ' + `${playerName} ` + '\nYou have completed your quest!'
        + '\nLife Bonus ' + `${livesBonus} ` + '\nTime Bonus ' + 
        `${timeBonus} ` + '\nTotal Score ' + `${finalScore} `
      egText = game.add.text(game.world.centerX, 400, endGameText, { fill: "#ffffff" });
      egText.fixedToCamera = true
      egText.font = 'Knewave'
      egText.fontSize = 40
      console.log("GAME OVER!")
      
    
      console.log("score", `${score}`)
      console.log("Time", `${totalTime}`)
      console.log("time bonus", `${timeBonus}`)
      console.log("Lives bonus", `${livesBonus}`)
      
      console.log("final score", finalScore)
      
      game.add.text(30, 20 )
      
      
      leaderboard.push({name: `${playerName}`, score: `${finalScore}`})
      console.log("leaderboard", leaderboard)
  
      egText.anchor.set(0.5);
      game.input.onDown.add(this.restartGame, this)
    },


      restartGame: function() {
        game.state.start('Menu')
      }
}



