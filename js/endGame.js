let endGame = function(game) {}
endGame.prototype = {
  // preload: function() {
  //   game.load.image('endGame', 'assets/images/bg2.png')
  // },

  create: function() {
      let playerName = prompt("Please enter username")
      if (playerName == '') {
        playerName == 'Player'
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

  
      // create: function() {
      //     var style = {
      //         font: "32px Monospace",
      //         fill: "#00ff00",
      //         align: "center"
      //     }
          
      //     var text = game.add.text(
      //         game.width / 2, game.height / 2, "You Won!!\n\n" + scoreDisplay.text + "\n\n Click to restart", style
      //     );
      
      // text.anchor.set(0.5);
      // game.input.onDown.add(this.restartGame, this)
      // enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
      // if (enterKey.isDown) {
      //   game.state.start('Menu')
    // },

      restartGame: function() {
        game.state.start('Menu')
      }
}




// let EndGame = {
//     preload: function() {
//       game.load.image('endGame', 'assets/images/bg2.png')
//     },

//     create: function() {
//         let endGameText = "You have won!"
//         egText = game.add.text(game.world.centerX, game.world.centerY, winnerText, { fill: "#ffffff" });
//         egText.fixedToCamera = true
//         egText.font = 'Knewave'
//         egText.fontSize = 40
//         console.log("GAME OVER!")
//         let timeBonus = 0
//         let livesBonus = ninjaLives * 100
//         if (totalTime > 50) {
//           timeBonus = 10
//         } else if (totalTime > 31) {
//           timeBonus = 50
//         } else {
//           timeBonus = 100
//         }
//         console.log("score", `${randomScore}`)
//         console.log("Time", `${totalTime}`)
//         console.log("time bonus", `${timeBonus}`)
//         console.log("Lives bonus", `${livesBonus}`)
//         let finalScore = randomScore + timeBonus + livesBonus
//         console.log("total score", finalScore)
        
//         game.add.text(30, 20 )
        
//         let playerName = prompt("Please enter username")
//         leaderboard.push({name: `${playerName}`, score: `${finalScore}`})
//         console.log("leaderboard", leaderboard)
    
//       },

//   }