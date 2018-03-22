let leaderboard = []

let score = 0
let ninjaLives = 3
let totalTime = 0

let Game = {
  preload: function() {

    // Level Sounds
    // game.load.audio('lvl2', 'assets/audio/music/lvl2.wav')


    game.load.image('lvl1bg', 'assets/images/lvl1bg.png')
    game.load.image('bg', 'assets/images/bg.png')
    // game.load.image('bg2', 'assets/images/bg2.png')
    game.load.image('log', 'assets/images/movable-log-lvl1-376x297.png')
    game.load.image('exit-log', 'assets/images/exit-barrier-log-lvl1.png')
    game.load.image('treasure', 'assets/images/treasure.png')
    game.load.image('treasure2', 'assets/images/treasure2.png')
    game.load.image('shuriken', 'assets/images/shuriken.png')
    game.load.image('key', 'assets/images/key.png')
    // game.load.image('boss', 'assets/images/head.png')
    game.load.image('weaponText', 'assets/images/weapon-text.png')

    game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45)

    // REFACTOR
    // game.load.audio('lvl1', 'assets/audio/music/lvl1.mp3')
    game.load.audio('treasure', 'assets/audio/SFX/chest-open-sfx.mp3')
    game.load.audio('exit', 'assets/audio/SFX/exit-sfx.mp3')
    game.load.audio('push-log', 'assets/audio/SFX/push-sfx.mp3')
    game.load.audio('stairs', 'assets/audio/SFX/stairs-sfx.mp3')
    game.load.audio('death', 'assets/audio/SFX/player-dies-sfx.mp3')
    game.load.audio('shuriken', 'assets/audio/SFX/shuriken.mp3')
  },

  create: function() {
    this.resetScore()

    // Sounds
    // REFACTOR
    stairSound = game.add.audio('stairs')
    treasureSound = game.add.audio('treasure')
    exitSound = game.add.audio('exit')
    logSound = game.add.audio('push-log')
    deathSound = game.add.audio('death')
    // lvl2Sound = game.add.audio('lvl2')
    // lvl1Sound = game.add.audio('lvl1')
    shootingSound = game.add.audio('shuriken')

    // lvl1Sound.loop = true
    // lvl1Sound.play()

    // Set World Bounds
    initWorldBounds(0, 0, 996, 1304)

    // Add Timer
    timer = game.time.create(false);
    timer.loop(1250, this.updateCounter, this)
    timer.start()

    // Add Background
    bg = makeSprite(0, 0, 'lvl1bg')

    // Add Treasure Chest
    treasure = makeSprite(840, 670, 'treasure')

    // Add Key
    key = makeSprite(580, 110, 'key')

    // Add Sprites
    log = makeSprite(376, 297, 'log')
    player = makeSprite(240, 1304, 'hamster')

    // Animations
    initPlayerAnimations(player)

    // PLAYER WEAPON //

    // Add Weapon
    weapon = makeWeapon(30, 'shuriken')

    // Weapon Methods
    initWeapon(weapon)

    boundaries = game.add.group()
    boundaries.add(makeWorldSprite(0, 335, 670, 90, 'bg'))
    boundaries.add(makeWorldSprite(0, 100, 75, 165, 'bg'))
    boundaries.add(makeWorldSprite(700, 100, 320, 320, 'bg'))
    boundaries.add(makeWorldSprite(0, 0, 996, 110, 'bg'))
    boundaries.add(makeWorldSprite(0, 530, 134, 780, 'bg'))
    boundaries.add(makeWorldSprite(270, 280, 100, 50, 'bg'))

    //Exit Boundary
    levelOneExit = boundaries.add(makeWorldSprite(685, 1090, 200, 220, 'bg'))
    boundaries.add(makeWorldSprite(996, 425, 100, 880, 'bg'))

    // Makes images transparent
    alpha(boundaries)

    // Teleportation
    teleport = game.add.tileSprite(60, 450, 50, 60, 'bg')
    teleport2 = game.add.tileSprite(60, 270, 50, 60, 'bg')
    alpha(teleport)
    alpha(teleport2)

    // Water Boundary
    waterBoundaries = game.add.group()
    waterBoundaries.add(makeWaterSprite(385, 600, 300, 750, 'bg'))
    waterBoundaries.add(makeWaterSprite(385, 420, 300, 50, 'bg'))
    alpha(waterBoundaries)

    // Log
    logCheck = makeSprite(376, 490, 'log')
    alpha(logCheck)

    someLog = makeSprite(376, 490, 'log')
    alpha(someLog)

    // Level Unlock
    levelUnlock = makeSprite(690, 800, 'exit-log')

    // Enable physics
    game.physics.enable([
      player,
      weapon,
      teleport,
      teleport2,
      boundaries,
      waterBoundaries,
      log,
      logCheck,
      treasure,
      key,
      levelUnlock],
      Phaser.Physics.ARCADE)

    // Make sure player can't leave canvas view
    collision(player)

    // Teleport Up
    collideImmovable(teleport)

    // Teleport Down
    collideImmovable(teleport2)

    // Log Check
    immovable(logCheck)

    // Water Death
    collisionGroup(waterBoundaries)

    // World Boundaries
    collisionGroup(boundaries)

    // Treasure Collision
    collideImmovable(treasure)

    // Key Collision
    collideImmovable(key)

    // Level 2 Unlock
    collideImmovable(levelUnlock)

    // Have Camera follow
    camera(player)

    // Keys for player movement/actions
    gameControls()

    // Player score
    scoreDisplay = game.add.text(25, 5, "Score: " + `${score}  `, { fill: 'white'})
    scoreDisplay.fixedToCamera = true
    scoreDisplay.font = 'Press Start 2P'
    scoreDisplay.fontSize = 16

    //Player lives
    ninjaLivesDisplay = game.add.text(scoreDisplay.x, scoreDisplay.y + 20, "Lives: " + `${ninjaLives} `, { fill: 'white'})
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
    game.physics.arcade.collide(player, levelOneExit, this.startLevelTwo, null, this)
    game.physics.arcade.collide(player, log, this.moveLog, null, this)
    game.physics.arcade.collide(player, waterBoundaries, this.killPlayer, null, this)
    game.physics.arcade.collide(player, someLog, this.killPlayer, null, this)
    game.physics.arcade.collide(player, teleport, this.teleportPlayer, null, this)
    game.physics.arcade.collide(player, teleport2, this.teleportPlayer2, null, this)
    game.physics.arcade.collide(player, boundaries)
    game.physics.arcade.collide(log, waterBoundary, this.testFunc, null, this)
    game.physics.arcade.collide(player, levelUnlock)
    game.physics.arcade.collide(player, treasure, this.spawnWeapon, null, this)
    game.physics.arcade.overlap(player, key, this.ninjaKey, null, this)
    game.physics.arcade.collide(player, logCheck, this.checkPlatfrom, null, this)

    startingVelocity(player)
    playerMovement(player, weapon)

    if (fireButton.isDown && this.enableWeapon) {
      weapon.fire()
      shootingSound.play()
    }
  },

  updateCounter: function() {
    totalTime++
    time.setText('Time: ' + totalTime)
  },

  resetScore: function() {
    score = 0
    ninjaLives = 5
    totalTime = 0
    bossHealth = 100
  },

  killEnemy: function(weapon, enemy) {
    score += 200
    scoreDisplay.setText('Score: ' + `${score}`)
    enemy.kill()
    weapon.kill()
    enemyWeapon.autofire = false
  },

  killPlayer: function(player, enemy) {
    deathSound.play()
    ninjaLives -= 1
    console.log("ninja lives", ninjaLives)
    player.kill()
    timeDelay(500, player, 240, 1304)

    ninjaLivesDisplay.text = ('Lives: ' + `${ninjaLives}`)

    if (ninjaLives == 0) {
      game.state.start('GameOver')
    }

    player.reset(player.body.velocity.x = 240, player.body.velocity.y = 1304)
  },

  teleportPlayer: function(player, teleport) {
    stairSound.play()
    player.kill()
    timeDelay(1000, player, 140, 280)
  },

  teleportPlayer2: function(player, teleport) {
    stairSound.play()
    player.kill()
    timeDelay(1000, player, 140, 460)
  },

  fadeOutLog: function() {
    game.time.events.add(1000, function() {
      game.add.tween(levelUnlock).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true)
    }, this)
  },

  moveLog: function (player, logs) {
    logSound.play()

    game.world.bringToTop(player)

    this.logMoved = true

    if (this.logMoved) {
      game.time.events.add(500, () => {
        logs.reset(logs.body.x = 376, logs.body.y = 490)
        logs.kill()
      })

      game.time.events.add(500, () => {
        someLog.alpha = true
      })
    }
  },

  checkPlatfrom: function(player, logCheck) {
    if (!this.logMoved) {
      deathSound.play()
      player.kill()
      ninjaLives -= 1
      ninjaLivesDisplay.text = ('Lives: ' + `${ninjaLives}`)

      timeDelay(500, player, 240, 1304)
    } else {
      logCheck.kill()
    }
  },

  ninjaKey: function(player, key) {
    this.hasKey = true
    key.kill()
  },

  spawnWeapon: function(player, treasure) {
    if (this.hasKey) {
      this.enableWeapon = true

      treasure.kill()
      this.fadeOutLog()

      levelUnlock.body.immovable = false
      levelUnlock.body.collideWorldBounds = false

      game.add.sprite(840, 670, 'treasure2')

      let weaponText = game.add.sprite(740, 530, 'weaponText')
      weaponText.alpha = 1

      game.add.tween(weaponText).to( { alpha: 0 }, 7000, Phaser.Easing.Linear.None, true)

      treasureSound.play()
    }

    else {
      let lockedText = game.add.text(800, 620, 'Hmm....it\'s locked', { fill: "#000000" })
      lockedText.fixedToCamera = false
      lockedText.font = 'Press Start 2P'
      lockedText.fontSize = 13
      lockedText.anchor.set(0.5)
      lockedText.alpha = 1
      game.add.tween(lockedText).to( { alpha: 0 }, 7000, Phaser.Easing.Linear.None, true)
    }
  },

  startLevelTwo: function(player, levelTwoExit) {
    // game.sound.remove( lvl1Sound)
    exitSound.play()

    this.state.start('Two')
  }
}
