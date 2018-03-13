let EndGame = {
    preload: function() {
      game.load.image('endGame', 'assets/images/bg2.png')
    },

    create: function() {
        let endGameText = "You have won!"
        egText = game.add.text(game.world.centerX, game.world.centerY, winnerText, { fill: "#ffffff" });
        egText.fixedToCamera = true
        egText.font = 'Knewave'
        egText.fontSize = 40
        console.log("GAME OVER!")
        let timeBonus = 0
        let livesBonus = ninjaLives * 100
        if (totalTime > 50) {
          timeBonus = 10
        } else if (totalTime > 31) {
          timeBonus = 50
        } else {
          timeBonus = 100
        }
        console.log("score", `${randomScore}`)
        console.log("Time", `${totalTime}`)
        console.log("time bonus", `${timeBonus}`)
        console.log("Lives bonus", `${livesBonus}`)
        let finalScore = randomScore + timeBonus + livesBonus
        console.log("total score", finalScore)
        
        game.add.text(30, 20 )
        
        let playerName = prompt("Please enter username")
        leaderboard.push({name: `${playerName}`, score: `${finalScore}`})
        console.log("leaderboard", leaderboard)
    
      },

  }