// let player
// let bg
// let rec
// let cursors
// let weapon
// let fireButton
// let enemy
// let tween
// let boundary
// let walk
// let boundaries
// let teleport
// let teleport2
// let log
// let levelUnlock
// let facing
// let enemyWeapon
// let waterBoundary

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

    // Add log, has to be called before player so that
    // player appears on top
    
    // Add Player
    // player = game.add.sprite(240, 1304, 'hamster')
    
    // Player locations for testing
    // player = game.add.sprite(700, 700, 'hamster')
    // log = game.add.sprite(370, 200, 'log')

    log = makeSprite(370, 200, 'log')
    player = makeSprite(115, 460, 'hamster')
    enemy = makeSprite(150, 500, 'hilary2')

    // Create
    // enemies = game.add.group()
    // // enemies.create(150,500,'hilary2')
    // enemies.create(150,700,'hilary2')
    
    // Animations  
    initPlayerAnimations(player)

    // PLAYER WEAPON //

    // Add Weapon
    weapon = makeWeapon(30, 'shuriken')

    // Weapon Methods   
    initWeapon(weapon)
    
    // ENEMY WEAPON //
    
    // Add  Enemy Weapon
    enemyWeapon = game.add.weapon(30, 'shuriken')
    
    // Weapon Methods
    initEnemyWeapon(enemyWeapon)
    enemyWeapon.fireAngle = Phaser.ANGLE_DOWN
    enemyWeapon.trackSprite(enemy, 100, 100, false)
    
    // Add Enemy
    // enemy = game.add.sprite(400, 200, 'hilary2')
    tween = game.add.tween(enemy)
    
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

    // Treasure
    treasure = makeSprite(840, 670, 'treasure')

    // Level Unlock
    levelUnlock = makeSprite(640, 800, 'log')

    // Moving enemy
    tween.to({ x: 700 }, 4000, 'Linear', true, 0, 20, true).loop(true)
    
    // Enable physics   
    game.physics.enable([
      player, 
      weapon,
      enemyWeapon, 
      // enemy, 
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

    // Log Check
    collideImmovable(log)
    collideImmovable(logCheck)

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
    // game.physics.arcade.collide(player, enemy, this.killPlayer, null, this)
    game.physics.arcade.collide(player, log, this.moveLog, null, this)
    game.physics.arcade.collide(player, waterBoundaries, this.killPlayer, null, this)
    // game.physics.arcade.overlap(weapon.bullets, enemy, this.killEnemy, null, this)
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
    this.logMoved = true
    
    if (this.logMoved) {
      logCheck.kill()
      timeDelay(1000, logs, 370, 450)
    }
  },

  // Check if log has been moved
  checkPlatfrom: function(player, logCheck) {
    player.kill()
    timeDelay(500, player, 240, 1304)
  },

  // Spawn Weapon
  spawnWeapon: function(player, treasure) {
    this.enableWeapon = true
    treasure.kill()
    levelUnlock.kill()
  }

  // startLevelTwo: function(player, rec) {
  //   this.state.start('Two')
  // }
}