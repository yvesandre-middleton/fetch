let leaderboard = [
  {
    name: 'bob',
    score: '105'
  },
  {
    name: 'ted',
    score: '144'
  }
]

let bossHealth = 100
let score = 0
let ninjaLives = 3
let totalTime = 0

let Game = {
  preload: function() {
    game.load.image('lvl1bg', 'assets/images/lvl1bg.png')
    game.load.image('bg', 'assets/images/bg.png')
    game.load.image('bg2', 'assets/images/bg2.png')
    game.load.image('log', 'assets/images/movable-log-lvl1-376x297.png')
    game.load.image('treasure', 'assets/images/treasure.png')
    game.load.image('treasure2', 'assets/images/treasure2.png')
    game.load.image('shuriken', 'assets/images/shuriken.png')
    // game.load.image('hilary2', 'assets/images/hilary2.png')
    game.load.image('autoEnemy', 'assets/images/head.png')
    game.load.image('boss', 'assets/images/head.png')
    game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45)
    game.load.image('weaponText', 'assets/images/weapon-text.png') 
  },
  
  create: function() {
    this.resetScore()
    
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

    // Add Sprites
    log = makeSprite(376, 297, 'log')
    player = makeSprite(200, 0, 'hamster')
    enemy = makeSprite(150, 500, 'hilary2')
    
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
    levelTwoExit = boundaries.add(makeWorldSprite(685, 1090, 200, 220, 'bg'))
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
    waterBoundaries.add(makeWaterSprite(385, 420, 300, 60, 'bg'))
    alpha(waterBoundaries)

    // Log
    logCheck = makeSprite(370, 450, 'log')
    alpha(logCheck)

    someLog = makeSprite(376, 500, 'log')
    alpha(someLog)

    // Level Unlock
    levelUnlock = makeSprite(640, 800, 'log')

    bullets = game.add.group()
    bullets.enableBody = true
    bullets.physicsBodyType = Phaser.Physics.ARCADE
    bullets.createMultiple(30, 'bullet')
    bullets.setAll('anchor.x', 0.5)
    bullets.setAll('anchor.y', 1)
    bullets.setAll('outOfBoundsKill', true)
    bullets.setAll('checkWorldBounds', true)
    
    // // Add Enemies
    // autoEnemies = game.add.group()
    // autoEnemies.enableBody = true
    // autoEnemies.physicsBodyType = Phaser.Physics.ARCADE

    // Add Enemies function
    // this.createAutoEnemies()
    
    // Enable physics   
    game.physics.enable([
      player, 
      weapon,
      // enemyWeapon, 
      // enemy, 
      // boss,
      teleport, 
      teleport2, 
      boundaries, 
      waterBoundaries, 
      log,
      logCheck,
      treasure,
      levelUnlock], 
      Phaser.Physics.ARCADE)


      //REFACTOR
    // boss.body.immovable = true
      
    // Make sure player can't leave canvas view
    collision(player)

    // Make sure boss doesn't move on hit
    // immovable(boss)

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

    //player score
    scoreDisplay = game.add.text(25, 5, "Score: " + `${score}  `, { fill: 'white'})
    scoreDisplay.fixedToCamera = true
    scoreDisplay.font = 'Knewave'
    scoreDisplay.fontSize = 40
    //player lives
    ninjaLivesDisplay = game.add.text(scoreDisplay.x, scoreDisplay.y + 45, "Lives: " + `${ninjaLives} `, { fill: 'white'})
    ninjaLivesDisplay.fixedToCamera = true
    ninjaLivesDisplay.font = 'Knewave'
    ninjaLivesDisplay.fontSize = 40
    
    // Timer display
    time = game.add.text(scoreDisplay.x, scoreDisplay.y + 90)
    time.fixedToCamera = true
    time.font = 'Knewave'
    time.fontSize = 40
    time.addColor('white', 0);
  },
  
  update: function() {
    game.physics.arcade.collide(player, levelTwoExit, this.startLevelTwo, null, this)
    // game.physics.arcade.collide(player, enemy, this.killPlayer, null, this)
    game.physics.arcade.collide(player, log, this.moveLog, null, this)
    game.physics.arcade.collide(player, waterBoundaries, this.killPlayer, null, this)
    game.physics.arcade.collide(player, teleport, this.teleportPlayer, null, this)
    game.physics.arcade.collide(player, teleport2, this.teleportPlayer2, null, this)
    game.physics.arcade.collide(player, boundaries)
    game.physics.arcade.collide(log, waterBoundary, this.testFunc, null, this)
    game.physics.arcade.collide(player, levelUnlock)
    game.physics.arcade.collide(player, treasure, this.spawnWeapon, null, this)
    game.physics.arcade.collide(player, logCheck, this.checkPlatfrom, null, this)

    // game.physics.arcade.overlap(enemyWeapon.bullets, player, this.killPlayer, null, this)
    // game.physics.arcade.collide(player, boss, this.killPlayer, null, this)
    // game.physics.arcade.collide(player, enemy, this.killPlayer, null, this)
    // game.physics.arcade.collide(player, autoEnemies, this.killPlayer, null, this)
    // game.physics.arcade.collide(weapon.bullets, autoEnemies, this.killEnemy, null, this)
    // game.physics.arcade.collide(weapon.bullets, boss, this.killBoss, null, this)
    // game.physics.arcade.collide(player, boss, this.killPlayer, null, this)
    // game.physics.arcade.overlap(weapon.bullets, enemy, this.killEnemy, null, this)
    
    startingVelocity(player)
    playerMovement(player, weapon)
 
    if (fireButton.isDown && this.enableWeapon) {
      weapon.fire()
    }
  },

  updateCounter: function() {
    totalTime++
    time.setText('Time: ' + totalTime);
  },
  
  resetScore: function() {
    score = 0
    ninjaLives = 3
    totalTime = 0
    bossHealth = 100
  },

  killEnemy: function(weapon, enemy) {
    score += 200
    scoreDisplay.setText('Score: ' + `${score}`)
    enemy.kill()
    weapon.kill()
    enemyWeapon.autofire = false
    console.log('killEnemy')
  },

  // createBossActions: function() {         
  //   var tween = game.add.tween(boss).to({x: 500}, 2000, Phaser.Easing.Linear.None,true,0,1000,)
  //   var tween1 = game.add.tween(boss).to({angle: 180}, 3000, Phaser.Easing.Quadratic.In, true);
  //   var tween2 = game.add.tween(boss).to({angle: 360}, 2000, Phaser.Easing.Quadratic.Out, true);
  //   var tween3 = game.add.tween(boss).to({angle: 180}, 3000, Phaser.Easing.Quadratic.InOut, true);
  //   var tween4 = game.add.tween(boss).to({angle: 360}, 2000, Phaser.Easing.Quadratic.InOut, true);
  //   tween.yoyo(true)
  //   tween2.yoyo(true)
  //   tween3.yoyo(true)
  //   tween4.yoyo(true)
  // },

  // killBoss: function(weapon, boss) {
  //   score += 200
  //   console.log('score', score)
  //   scoreDisplay.text = ('Score: ' + `${score}`)
  //   bossHealth -= 40  
  //   boss.kill()
  //   this.bossHealthBar.setPercent(bossHealth)
  //   console.log('bossHealth', bossHealth)

  //   if (bossHealth < 0) {
  //     console.log('bossHealth', bossHealth)
  //     boss.kill()
  //     weapon.kill()
  //     score += 500
  //     bossHealth = 100
  //     game.state.start('EndGame')
  //   }
    
  // },

  // createAutoEnemies: function() { 
  //   for(let y = 0; y < 3; y++){
  //     for(let x = 0; x < 1; x++) {
  //       let autoEnemy = autoEnemies.create(x*900, y*800, 'autoEnemy')
  //       autoEnemy.anchor.setTo(0.5, 0.5)
  //       autoEnemy.body.velocity.x = 0
  //       autoEnemy.body.velocity.y = 0
  //       autoEnemy.body.immovable = true
  //     }
  //   }

  //   var tween = game.add.tween(autoEnemies).to({x: 500}, 4000, Phaser.Easing.Linear.None,true,0,1000,)
  //   tween.yoyo(true)

  // },

  killPlayer: function(player, enemy) {
    console.log("ninja lives", ninjaLives)
    player.kill()
    timeDelay(500, player, 240, 1304)
    ninjaLives-= 1
    
    console.log("ninja lives", ninjaLives)
    ninjaLivesDisplay.text = ('Lives: ' + `${ninjaLives}`)
    
    if (ninjaLives == 0) {
      ninjaLives = 3
      score = 0
      game.state.start('GameOver')
    }

    player.reset(player.body.velocity.x = 240, player.body.velocity.y = 1304)
    console.log('killplayer')
  },

  teleportPlayer: function(player, teleport) {
    player.kill()
    timeDelay(500, player, 140, 280)
  },

  teleportPlayer2: function(player, teleport) {
    player.kill()
    timeDelay(500, player, 140, 460)
  },

  fadeOutLog: function() {
    game.time.events.add(1000, function() {
      game.add.tween(levelUnlock).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true)
    }, this)
      console.log('test')
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
    this.fadeOutLog()
    levelUnlock.body.immovable = false
    levelUnlock.body.collideWorldBounds = false
    game.add.sprite(840, 670, 'treasure2')
    let weaponText = game.add.sprite(740, 530, 'weaponText')
    weaponText.alpha = 1
    game.add.tween(weaponText).to( { alpha: 0 }, 7000, Phaser.Easing.Linear.None, true)
    // game.add.sprite(800,550,'weaponText')
  },
  //   game.add.tween(weaponText).to({ alpha: 0 }, 7000, Phaser.Easing.Linear.None, true)
  // }

  startLevelTwo: function(player, levelTwoExit) {
    this.state.start('Two')
  }
}