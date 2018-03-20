let endGame = function(game) {}
endGame.prototype = {
  // preload: function() {
  //   game.load.image('endGame', 'assets/images/bg2.png')
  // },

  create: function() {
    // Get the modal
    var modal = document.getElementById('myModal');


      // let placeholder = 'Player1'
      modal.style.display = "block";

      let button = document.getElementById("testButton")
      button.addEventListener("click", () => {
          let playerName = document.querySelector("input").value
          console.log("input", playerName)
          modal.style.display = "none"
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
        egText.font = 'Press Start 2P'
        egText.fontSize = 20
        egText.anchor.set(0.5)
        
        game.add.text(30, 20 )

        leaderboard.push({name: `${playerName}`, score: `${finalScore}`})

        leaderboard.sort(function (a, b) {
          return b.score - a.score
        })

        game.input.onDown.add(this.restartGame, this)
      })
      
      // let playerName = prompt("Please enter name", placeholder)
      // if (playerName === '') {
      //   playerName = 'player'
      // }
      

      // for(let score in leaderboard){
      //   console.log("scoreboard", score["name"])
      // }

      // console.log("score", `${score}`)
      // console.log("Time", `${totalTime}`)
      // console.log("time bonus", `${timeBonus}`)
      // console.log("Lives bonus", `${livesBonus}`)
      // console.log("final score", finalScore)
      
      

      // scores.push({name: `${playerName}`, score: `${finalScore}`})
      // scoreEntry = {name: `${playerName}`, score: `${finalScore}`}
      //saveScore(scoreEntry)
    
      
      console.log("leaderboard", leaderboard)

      // leaderboardText.text = 'Leaderboard: ' + 

      // $.ajax({
      //   url: '/scores',
      //   method: 'POST',
      //   data: leaderboard,
      //   success: function (data) {
      //     console.log('Success: ', data)
      //     console.log(data)
      //     }
      //   })

      
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

      restartGame: function() {
        game.state.start('Menu')
      }

}







