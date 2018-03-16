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
let player
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
let bossHealth = 100
let score = 0
let ninjaLives = 3
let totalTime = 0
let timer
let time
let text

let Game = {
  preload: function() {
    game.load.image('lvl1bg', 'assets/images/lvl1bg.png')
    game.load.image('bg', 'assets/images/bg.png')
    game.load.image('bg2', 'assets/images/bg2.png')
    game.load.image('log', 'assets/images/log1.png')
    game.load.image('treasure', 'assets/images/treasure.png')
    game.load.image('treasure2', 'assets/images/treasure2.png')
    game.load.image('shuriken', 'assets/images/shuriken.png')
    game.load.image('hilary2', 'assets/images/hilary2.png')
    game.load.image('autoEnemy', 'assets/images/head.png')
    game.load.image('boss', 'assets/images/head.png')
    game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45)
    game.load.image('weaponText', 'assets/images/weapon-text.png') 
  },
  
  create: function() {
    this.resetScore()
    // Set World Bounds
    initWorldBounds(0, 0, 996, 1304)
     // Add a Timer
    timer = game.time.create(false);
    timer.loop(1250, this.updateCounter, this)
    timer.start()
    // Add Background
    bg = makeSprite(0, 0, 'lvl1bg')

    // // Health Bar
    // let barConfig = {x: 200, y: 100};
    // bossHealthBar = new HealthBar(this.game, barConfig);

    //Add boss
    this.bossHealthBar = new HealthBar(this.game, {x: 700, y: 50, width: 120});
    this.bossHealthBar.setPercent(bossHealth);
    healthText = game.add.text(this.bossHealthBar.x, this.bossHealthBar.y + 50, "Health ");
    healthText.fixedToCamera = true
    healthText.anchor.setTo(0.5)
    healthText.font = 'Knewave'
    healthText.fontSize = 40
    boss = game.add.sprite(800, 900, 'boss')
    // boss.body.immovable = true
    timer.loop(4000, this.createBossActions, this)


    // Add log, has to be called before player so that
    // player appears on top
    
    // Add Player
    // player = game.add.sprite(240, 1304, 'hamster')
    
    // Player locations for testing
    // player = game.add.sprite(700, 700, 'hamster')
    // log = game.add.sprite(370, 200, 'log')

    log = makeSprite(370, 200, 'log')
    player = makeSprite(700, 460, 'hamster')
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

    bullets = game.add.group()
    bullets.enableBody = true
    bullets.physicsBodyType = Phaser.Physics.ARCADE
    bullets.createMultiple(30, 'bullet')
    bullets.setAll('anchor.x', 0.5)
    bullets.setAll('anchor.y', 1)
    bullets.setAll('outOfBoundsKill', true)
    bullets.setAll('checkWorldBounds', true)
    // Add Enemies
    autoEnemies = game.add.group()
    autoEnemies.enableBody = true
    autoEnemies.physicsBodyType = Phaser.Physics.ARCADE
    // Add Enemies function
    
    this.createAutoEnemies()
    
    // Enable physics   
    game.physics.enable([
      player, 
      weapon,
      enemyWeapon, 
      enemy, 
      boss,
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
    boss.body.immovable = true
      

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

    //player score
    scoreDisplay = game.add.text(100, 5, "Score: " + `${score}  `)
    scoreDisplay.fixedToCamera = true
    scoreDisplay.font = 'Knewave'
    scoreDisplay.fontSize = 40
    //player lives
    ninjaLivesDisplay = game.add.text(scoreDisplay.x, scoreDisplay.y + 45, "Lives: " + `${ninjaLives} `)
    ninjaLivesDisplay.fixedToCamera = true
    ninjaLivesDisplay.font = 'Knewave'
    ninjaLivesDisplay.fontSize = 40
    // timer display
    time = game.add.text(scoreDisplay.x, scoreDisplay.y + 90)
    time.fixedToCamera = true
    time.font = 'Knewave'
    time.fontSize = 40
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

    game.physics.arcade.overlap(enemyWeapon.bullets, player, this.killPlayer, null, this)
    game.physics.arcade.collide(player, boss, this.killPlayer, null, this)
    // game.physics.arcade.collide(player, enemy, this.killPlayer, null, this)
    game.physics.arcade.collide(player, autoEnemies, this.killPlayer, null, this)
    game.physics.arcade.collide(weapon.bullets, autoEnemies, this.killEnemy, null, this)
    game.physics.arcade.collide(weapon.bullets, boss, this.killBoss, null, this)
    game.physics.arcade.overlap(weapon.bullets, enemy, this.killEnemy, null, this)
    


    startingVelocity(player)
    player.body.velocity.x = 0
    player.body.velocity.y = 0

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown) {
      player.body.velocity.x = -300;
      player.animations.play('left')
      weapon.fireAngle = Phaser.ANGLE_LEFT
    }

    else if (cursors.right.isDown) {
      player.body.velocity.x = 300;
      player.animations.play('right')
      weapon.fireAngle = Phaser.ANGLE_RIGHT
    }

    else if (cursors.up.isDown) {
      player.body.velocity.y = -300;
      player.animations.play('up')
      weapon.fireAngle = Phaser.ANGLE_UP
    }

    else if (cursors.down.isDown) {
      player.body.velocity.y = 300;
      player.animations.play('down')
      weapon.fireAngle = Phaser.ANGLE_DOWN
    }
   
    else if (fireButton.isDown) {
      if (this.enableWeapon) {
        weapon.fire()
      }
    }



    // playerMovement(player, weapon)
   
    // if (fireButton.isDown && this.enableWeapon) {
    //   weapon.fire()
    // }
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
    console.log('score', score)
    scoreDisplay.setText('Score: ' + `${score}`)
    enemy.kill()
    weapon.kill()
    enemyWeapon.autofire = false
    console.log('killEnemy')
  },

  createBossActions: function() {         
    var tween = game.add.tween(boss).to({x: 500}, 2000, Phaser.Easing.Linear.None,true,0,1000,)
    var tween1 = game.add.tween(boss).to({angle: 180}, 3000, Phaser.Easing.Quadratic.In, true);
    var tween2 = game.add.tween(boss).to({angle: 360}, 2000, Phaser.Easing.Quadratic.Out, true);
    var tween3 = game.add.tween(boss).to({angle: 180}, 3000, Phaser.Easing.Quadratic.InOut, true);
    var tween4 = game.add.tween(boss).to({angle: 360}, 2000, Phaser.Easing.Quadratic.InOut, true);
    tween.yoyo(true)
    tween2.yoyo(true)
    tween3.yoyo(true)
    tween4.yoyo(true)
  },

  killBoss: function(weapon, boss) {
    score += 200
    console.log('score', score)
    scoreDisplay.text = ('Score: ' + `${score}`)
    bossHealth -= 40  
    boss.kill()
    this.bossHealthBar.setPercent(bossHealth)
    console.log('bossHealth', bossHealth)

    if (bossHealth < 0) {
      console.log('bossHealth', bossHealth)
      boss.kill()
      weapon.kill()
      score += 500
      bossHealth = 100
      game.state.start('EndGame')
    }
    
  },

  createAutoEnemies: function() { 
    for(let y = 0; y < 3; y++){
      for(let x = 0; x < 1; x++) {
        let autoEnemy = autoEnemies.create(x*900, y*800, 'autoEnemy')
        autoEnemy.anchor.setTo(0.5, 0.5)
        autoEnemy.body.velocity.x = 0
        autoEnemy.body.velocity.y = 0
        autoEnemy.body.immovable = true
      }
    }

    var tween = game.add.tween(autoEnemies).to({x: 500}, 4000, Phaser.Easing.Linear.None,true,0,1000,)
    tween.yoyo(true)

  },

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
    game.add.sprite(840, 670, 'treasure2')
    let weaponText = game.add.sprite(740, 530, 'weaponText')
    // weaponText.anchor.setTo(0.5, 0.5)
    weaponText.alpha = 1
    game.add.tween(weaponText).to( { alpha: 0 }, 7000, Phaser.Easing.Linear.None, true)
    

    // game.add.sprite(800,550,'weaponText')
  }

  // startLevelTwo: function(player, rec) {
  //   this.state.start('Two')
  // }
}