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
let timer
let totalTime = 0
let time
let text
let score = 100
let bossHealth = 100
let player
let ninjaLives = 3
let bg
let rec
let cursors
let weapon
let fireButton
let enemy
let tween
let boundary
let walk
let boundaries
let teleport
let teleport2
let waterBoundary
let waterBoundary2
let log
let levelUnlock
let facing
let enemyWeapon

let Game = {
  preload: function() {
    game.load.image('lvl1bg', 'assets/images/lvl1bg.png')
    game.load.image('bg', 'assets/images/bg.png')
    game.load.image('bg2', 'assets/images/bg2.png')
    game.load.image('log', 'assets/images/log1.png')
    game.load.image('treasure', 'assets/images/treasure.png')
    game.load.image('shuriken', 'assets/images/shuriken.png')
    game.load.image('enemy', 'assets/images/hilary2.png')
    game.load.image('boss','assets/images/head.png')
    game.load.image('hilary2', 'assets/images/hilary2.png')
    game.load.image('autoEnemy', 'assets/images/head.png')
    game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45) 
  },
  
  create: function() {
    // Set World Bounds
    game.world.setBounds(0, 0, 996, 1304)

    // Add Background
    bg = game.add.sprite(0, 0, 'lvl1bg')
    //Reset Score
    let score = 0
    let ninjaLives = 3
    
    // Add a Timer
    timer = game.time.create(false);
    timer.loop(1250, this.updateCounter, this)
    timer.start()

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

    // Add boss
    this.bossHealthBar = new HealthBar(this.game, {x: 700, y: 50, width: 120});
    this.bossHealthBar.setPercent(bossHealth);
    healthText = game.add.text(this.bossHealthBar.x, this.bossHealthBar.y + 50, "Health ");
    healthText.fixedToCamera = true
    healthText.anchor.setTo(0.5)
    healthText.font = 'Knewave'
    healthText.fontSize = 40
    boss = game.add.sprite(800, 900, 'boss')
    timer.loop(4000, this.createBossActions, this)

    // Add log, has to be called before player so that
    // player appears on top
    
    // Add Player
    // player = game.add.sprite(240, 1304, 'hamster')
    
    // Player locations for testing
    // player = game.add.sprite(700, 700, 'hamster')
    log = game.add.sprite(370, 200, 'log')
    player = game.add.sprite(1000, 500, 'hamster')
    enemy = game.add.sprite(150, 500, 'hilary2')
    
    // Animations
    player.animations.add('left', [5, 6, 7, 8, 8], 10, true);
    player.animations.add('right', [0, 1, 2, 3, 4], 10, true);
    player.animations.add('down', [10, 11, 12, 13, 14], 10, true);
    player.animations.add('up', [15, 16, 17, 18, 19], 10, true);
    player.animations.play('walk', 15, true)
    walk = player.animations.add('walk', [0, 2, 4], 7, true);
    
    // PLAYER WEAPON //

    // Add Weapon
    weapon = game.add.weapon(30, 'shuriken')

    // Weapon Methods
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    weapon.bulletSpeed = 200
    weapon.fireRate = 1200
    
    // Makes sure weapon comes out of enemy
    weapon.trackSprite(player, 30, 30, false)
    
    // ENEMY WEAPON //
    
    // Add  Enemy Weapon
    enemyWeapon = game.add.weapon(30, 'shuriken')

    // Player locations for testing
    // player = game.add.sprite(700, 700, 'hamster')
    // player = game.add.sprite(115, 460, 'hamster')
    // Weapon Methods
    enemyWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    enemyWeapon.bulletSpeed = 200
    enemyWeapon.fireRate = 1200
    enemyWeapon.autofire = true  
    enemyWeapon.trackSprite(enemy, 30, 30, true)
    
    // player = game.add.sprite(700, 0, 'hamster')
    walk = player.animations.add('walk')

    // Add Enemy
    // enemy = game.add.sprite(400, 200, 'hilary2')
    tween = game.add.tween(enemy)

    // Multiple Boundaries
    function makeTileSprite(x,y,w,h,image) {
      boundary = game.add.tileSprite(x,y,w,h,image)
      return boundary
    }
    
    boundaries = game.add.group()
    boundaries.add(makeTileSprite(0, 335, 670, 90, 'bg'))
    boundaries.add(makeTileSprite(0, 100, 75, 165, 'bg'))
    boundaries.add(makeTileSprite(700, 100, 320, 320, 'bg'))
    boundaries.add(makeTileSprite(0, 0, 996, 110, 'bg'))
    boundaries.add(makeTileSprite(0, 530, 134, 780, 'bg'))

    //Exit Boundary
    boundaries.add(makeTileSprite(685, 1090, 200, 220, 'bg'))
    boundaries.add(makeTileSprite(996, 425, 100, 880, 'bg'))

    // Makes images transparent
    boundaries.alpha = 0

    // Teleportation
    teleport = game.add.tileSprite(60, 450, 50, 60, 'bg')
    teleport2 = game.add.tileSprite(60, 270, 50, 60, 'bg')
    teleport.alpha = 0
    teleport2.alpha = 0
    
    // Water Boundary
    waterBoundary = game.add.tileSprite(385, 600, 300, 750, 'bg')
    waterBoundary2 = game.add.tileSprite(385, 420, 300, 70, 'bg')
    waterBoundary.alpha = 0
    waterBoundary2.alpha = 0

    // Rock
    logCheck = game.add.sprite(370, 450, 'log')
    // logCheck.alpha = 0

    // Treasure
    treasure = game.add.sprite(840, 670, 'treasure')

    // Level Unlock
    levelUnlock = game.add.sprite(640, 800, 'log')

    // Moving enemy
    tween.to({ x: 700 }, 4000, 'Linear', true, 0, 20, true).loop(true)
    
    // Enable physics   
    game.physics.enable([
      player, 
      weapon,
      boss, 
      enemy,
      teleport, 
      teleport2, 
      boundaries, 
      waterBoundary, 
      waterBoundary2, 
      log,
      logCheck,
      treasure,
      levelUnlock], 
      Phaser.Physics.ARCADE)

    // Make sure player can't leave canvas view
    player.body.collideWorldBounds = true

    // Teleport Up
    teleport.body.collideWorldBounds = true
    teleport.body.immovable = true
    
    // Teleport Down
    teleport2.body.collideWorldBounds = true
    teleport2.body.immovable = true
    
    // Water Death
    // REFACTOR LATER //
    waterBoundary.body.collideWorldBounds = true
    waterBoundary.body.immovable = true
    waterBoundary2.body.immovable = true

    // Log Check
    log.body.collideWorldBounds = true
    // log.body.immovable = true
    logCheck.body.collideWorldBounds = true
    logCheck.body.immovable = true

    boundaries.children.forEach(c => {
      c.body.collideWorldBounds = true
      c.body.immovable = true;
    })

    // Treasure Collision
    treasure.body.collideWorldBounds = true
    treasure.body.immovable = true
     // Boss Collision
     boss.body.collideWorldBounds = false
     boss.body.immovable = true

    // Level 2 Unlock
    levelUnlock.body.collideWorldBounds
    levelUnlock.body.immovable = true
    
    // Have Camera follow
    game.camera.follow(player)

    // Keys for player movement/actions
    cursors = game.input.keyboard.createCursorKeys()
    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)

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
    game.physics.arcade.overlap(enemyWeapon.bullets, player, this.killPlayer, null, this)
    game.physics.arcade.collide(player, log, this.moveRock, null, this)
    game.physics.arcade.collide(player, waterBoundary, this.killPlayer, null, this)
    game.physics.arcade.collide(player, waterBoundary2, this.killPlayer, null, this)
    game.physics.arcade.collide(player, boss, this.killPlayer, null, this)
    game.physics.arcade.collide(player, enemy, this.killPlayer, null, this)
    game.physics.arcade.collide(player, autoEnemies, this.killPlayer, null, this)
    game.physics.arcade.overlap(weapon.bullets, autoEnemies, this.killEnemy, null, this)
    game.physics.arcade.overlap(weapon.bullets, boss, this.killBoss, null, this)
    game.physics.arcade.overlap(weapon.bullets, enemy, this.killEnemy, null, this)
    game.physics.arcade.collide(player, teleport, this.teleportPlayer, null, this)
    game.physics.arcade.collide(player, teleport2, this.teleportPlayer2, null, this)
    game.physics.arcade.collide(player, boundaries)
    game.physics.arcade.collide(log, waterBoundary, this.testFunc, null, this)
    game.physics.arcade.collide(player, levelUnlock)
    game.physics.arcade.collide(player, treasure, this.spawnWeapon, null, this)
    game.physics.arcade.collide(player, logCheck, this.checkPlatfrom, null, this)

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
  },

  updateCounter: function() {
    totalTime++
    time.setText('Time: ' + totalTime);
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
      score += 1000
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

  teleportPlayer: function(player, teleport) {
    player.reset(player.body.velocity.x = 140, player.body.velocity.y = 280)
  },

  teleportPlayer2: function(player, teleport) {
    player.reset(player.body.velocity.x = 140, player.body.velocity.y = 460)
  },

  // Move the log
  moveRock: function (player, logs) {
    this.rockMoved = true
    logCheck.kill()
    logs.reset(logs.body.x = 370, logs.body.y = 450)
  },

  // Check if log has been moved
  checkPlatfrom: function(player, logCheck) {
    player.reset(player.body.velocity.x = 240, player.body.velocity.y = 1304)
  },

  // Spawn Weapon
  spawnWeapon: function(player, treasure) {
    this.enableWeapon = true
    treasure.kill()
    levelUnlock.kill()
  },

  killPlayer: function(player, enemy) {
    console.log("ninja lives", ninjaLives)
    player.kill()
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


  // startLevelTwo: function(player, rec) {
  //   this.state.start('Two')
  // }
}