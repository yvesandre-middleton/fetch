let Game = {
  preload: function() {
    game.load.image('lvl1bg', 'assets/images/lvl1bg.png')
    game.load.image('bg', 'assets/images/bg.png')
    game.load.image('bg2', 'assets/images/bg2.png')
    game.load.image('log', 'assets/images/log1.png')
    game.load.image('treasure', 'assets/images/treasure.png')
    game.load.image('shuriken', 'assets/images/shuriken.png')
    game.load.image('hilary2', 'assets/images/hilary2.png')
    game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45) 
  },
  
  create: function() {
    
    // Set World Bounds
    initWorldBounds(0, 0, 996, 1304)

    // Add Background
    bg = makeSprite(0, 0, 'lvl1bg')

    // Add Sprites
    log = makeSprite(370, 200, 'log')
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

    //Exit Boundary
    boundaries.add(makeWorldSprite(685, 1090, 200, 220, 'bg'))
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
    waterBoundaries.add(makeWaterSprite(385, 420, 300, 70, 'bg'))
    alpha(waterBoundaries)

    // Log
    logCheck = makeSprite(370, 450, 'log')
    alpha(logCheck)

    someLog = makeSprite(370, 450, 'log')
    alpha(someLog)

    // Treasure
    treasure = makeSprite(840, 670, 'treasure')

    // Level Unlock
    levelUnlock = makeSprite(640, 800, 'log')

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
      levelUnlock], 
      Phaser.Physics.ARCADE)

    // Make sure player can't leave canvas view
    collision(player)

    // Teleport Up
    collideImmovable(teleport)
    
    // Teleport Down
    collideImmovable(teleport2)
    
    // Water Death
    collisionGroup(waterBoundaries)

    // World Boundaries
    collisionGroup(boundaries)

    // Treasure Collision
    collideImmovable(treasure)

    // Level 2 Unlock
    collideImmovable(levelUnlock)
    
    // Have Camera follow
    camera(player)

    // Keys for player movement/actions
    gameControls()
  },
  
  update: function() {
    // game.physics.arcade.collide(player, rec, this.startLevelTwo, null, this)
    game.physics.arcade.collide(player, log, this.moveLog, null, this)
    game.physics.arcade.collide(player, waterBoundaries, this.killPlayer, null, this)
    game.physics.arcade.collide(player, teleport, this.teleportPlayer, null, this)
    game.physics.arcade.collide(player, teleport2, this.teleportPlayer2, null, this)
    game.physics.arcade.collide(player, boundaries)
    game.physics.arcade.collide(log, waterBoundary, this.testFunc, null, this)
    game.physics.arcade.collide(player, levelUnlock)
    game.physics.arcade.collide(player, treasure, this.spawnWeapon, null, this)
    game.physics.arcade.collide(player, logCheck, this.checkPlatfrom, null, this)

    startingVelocity(player)

    playerMovement(player, weapon)
   
    if (fireButton.isDown && this.enableWeapon) {
      weapon.fire()
    }
  },

  killEnemy: function(weapon, enemy) {
    enemy.kill()
    weapon.kill()
    console.log('hey')
  },

  killPlayer: function(player, enemy) {
    player.kill()
    timeDelay(500, player, 240, 1304)
    console.log('hey')
  },

  teleportPlayer: function(player, teleport) {
    player.kill()
    timeDelay(1000, player, 140, 280)
  },

  teleportPlayer2: function(player, teleport) {
    player.kill()
    timeDelay(1000, player, 140, 460)
  },

  // Move the log
  moveLog: function (player, logs) {
    game.world.bringToTop(player)
    
    this.logMoved = true
    
    if (this.logMoved) {
      game.time.events.add(500, () => {
        logs.reset(logs.body.x = 370, logs.body.y = 450)
        logs.kill()
      })

      game.time.events.add(500, () => {
        someLog.alpha = true
      })
    }
  },

  checkPlatfrom: function(player, logCheck) {
    if (!this.logMoved) {
      player.kill()
      timeDelay(500, player, 240, 1304)
    }
  },

  spawnWeapon: function(player, treasure) {
    this.enableWeapon = true
    treasure.kill()
    levelUnlock.kill()
  }

  // startLevelTwo: function(player, rec) {
  //   this.state.start('Two')
  // }
}