let Three = {
  preload: function() {
      // game.load.image('bg', 'assets/900x2000.png')
      game.load.image('shuriken', 'assets/images/shuriken.png')
      game.load.image('boss', 'assets/images/head.png')

      game.load.image('lvl3bg', 'assets/images/lvl3bg-900x2000.png')

      // Boundaries
      game.load.image('wall1', 'assets/images/lvl3-wall1-201x823.png')
      game.load.image('wall2', 'assets/images/lvl3-wall2-589x823.png')
      game.load.image('wall3', 'assets/images/lvl3-wall3-589x713.png')
      game.load.image('wall4', 'assets/images/lvl3-wall4-0x713.png')
      game.load.image('wall5', 'assets/images/lvl3-wall5-0x0.png')
      game.load.image('wall6', 'assets/images/lvl3-wall6-0x111.png')
      game.load.image('wall7', 'assets/images/lvl3-wall7-789x111.png')

      game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45) 
      game.load.spritesheet('red-hamster-left', 'assets/images/hamster-left-red-animation-sheet.png', 37, 45) 
      game.load.spritesheet('red-hamster-front', 'assets/images/hamster-front-red-animation-sheet.png', 37, 45) 
      game.load.spritesheet('red-hamster-back', 'assets/images/hamster-back-red-animation-sheet.png', 37, 45)
  
      // REFACTOR
      game.load.audio('shootingSound', 'assets/audio/SFX/shuriken.mp3')
    },

    create: function() {

      shootingSound = game.add.audio('shootingSound')

      initWorldBounds(0, 0, 900, 2000, 'lvl3bg')
      game.add.image(0, 0, 'lvl3bg')

      player = makeSprite(325, 800, 'hamster')
      // player = makeSprite(1200, 0, 'hamster')
      initPlayerAnimations(player)

      weapon = makeWeapon(30, 'shuriken')
      initWeapon(weapon)

      //Add boss
      // this.bossHealthBar = new HealthBar(this.game, {x: 700, y: 50, width: 120});
      // this.bossHealthBar.setPercent(bossHealth);
      // healthText = game.add.text(this.bossHealthBar.x, this.bossHealthBar.y + 50, "Health ");
      // healthText.fixedToCamera = true
      // healthText.anchor.setTo(0.5)
      // healthText.font = 'Knewave'
      // healthText.fontSize = 40
      // boss = game.add.sprite(800, 900, 'boss')
      // timer.loop(4000, this.createBossActions, this)

      // Add a Timer
      timer = game.time.create(false);
      timer.loop(1250, this.updateCounter, this)
      timer.start()

      boundaries = game.add.group()
      boundaries.add(makeSprite(201, 823, 'wall1'))
      boundaries.add(makeSprite(589, 823, 'wall2'))
      boundaries.add(makeSprite(589, 713, 'wall3'))
      boundaries.add(makeSprite(0, 713, 'wall4'))
      boundaries.add(makeSprite(0, 0, 'wall5'))
      boundaries.add(makeSprite(0, 111, 'wall6'))
      boundaries.add(makeSprite(789, 111, 'wall7'))

      alpha(boundaries)

      game.physics.enable([
        player,
      //   boss,
        boundaries
        ],
        Phaser.Physics.ARCADE)

      // boss.body.immovable = true

      // Player World Bounds
      collision(player)
    
      // World Boundaries
      collisionGroup(boundaries)

      // Main Character Controls / View
      camera(player)
      gameControls()

      // Player score
      scoreDisplay = game.add.text(25, 5, "Score: " + `${score}  `, { fill: 'white'})
      scoreDisplay.fixedToCamera = true
      scoreDisplay.font = 'Press Start 2P'
      scoreDisplay.fontSize = 16
      
      // Player lives
      ninjaLivesDisplay = game.add.text(scoreDisplay.x, scoreDisplay.y +20, "Lives: " + `${ninjaLives} `, { fill: 'white'})
      ninjaLivesDisplay.fixedToCamera = true
      ninjaLivesDisplay.font = 'Press Start 2P'
      ninjaLivesDisplay.fontSize = scoreDisplay.fontSize
      
      // Timer display
      time = game.add.text(scoreDisplay.x, scoreDisplay.y + 40)
      time.fixedToCamera = true
      time.font = 'Press Start 2P'
      time.fontSize = scoreDisplay.fontSize
      time.addColor('white', 0);
  },
    
  update: function() {
    game.physics.arcade.collide(player, boundaries)
    
    startingVelocity(player)
    playerMovement(player, weapon)

    if (fireButton.isDown) {
      weapon.fire()
      shootingSound.play()
    }
  },

  killPlayer: function(player, enemyWeapon) {
    player.reset(player.body.velocity.x = 220, player.body.velocity.y = 1350)
    enemyWeapon.kill()
    ninjaLives-= 1
    console.log("ninja lives", ninjaLives)
    ninjaLivesDisplay.text = ('Lives: ' + `${ninjaLives}`)
    if (ninjaLives == 0) {
      ninjaLives = 3
      score = 0
      game.state.start('GameOver')
    }
  },

  killPlayerCollide: function(player, enemy) {
    player.reset(player.body.velocity.x = 220, player.body.velocity.y = 1350)
    ninjaLives-= 1
    console.log("ninja lives", ninjaLives)
    ninjaLivesDisplay.text = ('Lives: ' + `${ninjaLives}`)
    if (ninjaLives == 0) {
      ninjaLives = 3
      score = 0
      game.state.start('GameOver')
    }
  },

  updateCounter: function() {
    totalTime++
    time.setText('Time: ' + totalTime);
  },

  // startLevelThree: function(player, levelTwoExit) {
  //   console.log("test")
  //   this.state.start('Three')
  // }
}