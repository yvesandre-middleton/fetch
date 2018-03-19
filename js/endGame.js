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
      if (totalTime > 150) {
        timeBonus = 100
      } else if (totalTime > 90) {
        timeBonus = 500
      } else {
        timeBonus = 1000
      }
      let finalScore = (score + timeBonus + livesBonus)
      let endGameText = 'Congratulations ' + `${playerName} ` + '\nYou have completed your quest!'
        + '\nLife Bonus ' + `${livesBonus} ` + '\nTime Bonus ' + 
        `${timeBonus} ` + '\nTotal Score ' + `${finalScore} `
      egText = game.add.text(game.world.centerX, 400, endGameText, { fill: "#ffffff" });
      egText.fixedToCamera = true
      egText.font = 'Knewave'
      egText.fontSize = 40
      egText.anchor.set(0.5);
      console.log("score", `${score}`)
      console.log("Time", `${totalTime}`)
      console.log("time bonus", `${timeBonus}`)
      console.log("Lives bonus", `${livesBonus}`)
      console.log("final score", finalScore)
      
      game.add.text(30, 20 )

      function compare(a,b) {
        console.log("test compare")
        if (a.score > b.score)
          return -1;
        if (a.score < b.score)
          return 1;
        return 0;
      }
      scores.sort(compare)

      console.log("sorted scores", scores )
      
      scores.push({name: `${playerName}`, score: `${finalScore}`})
      // scoreEntry = {name: `${playerName}`, score: `${finalScore}`}
      //saveScore(scoreEntry)
      console.log("leaderboard", scores)

      
      leaderboard.push({name: `${playerName}`, score: `${finalScore}`})
      console.log("leaderboard", leaderboard)

      // $.ajax({
      //   url: '/scores',
      //   method: 'POST',
      //   data: leaderboard,
      //   success: function (data) {
      //     console.log('Success: ', data)
      //     console.log(data)
      //     }
      //   })

      egText.anchor.set(0.5);
      game.input.onDown.add(this.restartGame, this)
  },


      // restartGame: function() {
      //   game.state.start('Menu')
      // },

      // saveScore: function(newScore, callback) {
      //   db.collection("ninja").insertOne(newScore);
      //   callback(null, true);
      // },
      
      // getScores: function(callback) {
      //     // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      //   db.collection("ninja").find().sort( { score: -1 } ).toArray((err, tweets) => {
      //     if (err){
      //       return callback(err);
      //     }
      //     callback(null, scores);
      //   });      
      // }

}







