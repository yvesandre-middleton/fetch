let endGame = function(game) {}
endGame.prototype = {

  create: function() {
    
    // Get the modal
    var modal = document.getElementById('myModal');
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

      let playerScore = {name: `${playerName}`, score: `${finalScore}`};
      leaderboard.push(playerScore)
      console.log("leaderboard", leaderboard)

      $.ajax({
        url: '/leaderboard',
        method: 'POST',
        data: JSON.stringify(playerScore),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          console.log('Success: ', data)
          console.log(data)
          loadScores()
          },
          failure: function (data) {
            console.log('Failure: ', data)
            console.log(data)
          }
        })

      const loadScores = () => {
        $.ajax({
          url: '/leaderboard',
          method: 'GET',
          success: function (loadScores) {
            console.log('Success: ', loadScores)
            renderScores(loadScores)
            // location.reload()
          }
        })
      }
      loadScores()

      function renderScores(data) {
        for (key of data) {
          var $score = createScoreElement(key)
          $('.all-scores').prepend($score)
        }
      }

      function createScoreElement (score) {
        return `<article class="score"> 
                   <p> Name: ${score.name} Score:${score.score} </p>   
                  </article>`
      }
      
      console.log("leaderboard", leaderboard)
      game.input.onDown.add(this.restartGame, this)
    })     
  },

  restartGame: function() {
    game.state.start('Menu')
  }
}





