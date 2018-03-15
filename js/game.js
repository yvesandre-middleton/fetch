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
let ninjaLives = 3
let score
let bossHealth = 100
let player
let bg
let rec
let cursors
let weapon = {}
let fireButton
let enemy
let enemies
let tween
let boundary
let walk
let bullets
let bulletTime = 0


WebFontConfig = {
  active: function() { 
      // game.time.events.add(Phaser.Timer.SECOND, createText, this);
  },
  google: {
      families: ["Knewave"]
  }
}
let boundaries
let teleport
let teleport2
let waterBoundary
let waterBoundary2
let log
let levelUnlock

let Game = {
  preload: function() {
    game.load.script("webfont", "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js")
    game.load.image('lvl1bg', 'assets/images/lvl1bg.png')
    game.load.image('bg', 'assets/images/bg.png')
    game.load.image('bg2', 'assets/images/bg2.png')
    game.load.image('log', 'assets/images/log1.png')
    game.load.image('treasure', 'assets/images/treasure.png')
    game.load.image('shuriken', 'assets/images/shuriken.png')
    game.load.image('enemy', 'assets/images/hilary2.png')
    game.load.image('boss','assets/images/head.png')
    game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45, 5) 
  },
  
  create: function() {
    // Set World Bounds
    game.world.setBounds(0, 0, 996, 1304)

    // Add Background
    bg = game.add.sprite(0, 0, 'lvl1bg')
    //Reset Score
    score = 0
    
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
    enemies = game.add.group()
    enemies.enableBody = true
    enemies.physicsBodyType = Phaser.Physics.ARCADE
    // Add Enemies function
    this.createEnemies()
    // Add boss
    this.bossHealthBar = new HealthBar(this.game, {x: 700, y: 50, width: 120});
    this.bossHealthBar.setPercent(bossHealth);
    healthText = game.add.text(this.bossHealthBar.x, this.bossHealthBar.y + 50, "Health ");
    healthText.fixedToCamera = true
    healthText.anchor.setTo(0.5)
    healthText.font = 'Knewave'
    healthText.fontSize = 40
    // Add Boss
    boss = game.add.sprite(800, 900, 'boss')
    timer.loop(4000, this.createBossActions, this)
    
    // Add Weapon
    weapon = game.add.weapon(30, 'shuriken')

    // Weapon Methods
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    weapon.bulletSpeed = 200
    weapon.fireRate = 1200
    
    // Add log, has to be called before player so that
    // player appears on top
    log = game.add.tileSprite(350, 280, 340, 50,'log')
    
    // Add Player
    // player = game.add.sprite(240, 1304, 'hamster')

    // Player locations for testing
    player = game.add.sprite(700, 700, 'hamster')
    // player = game.add.sprite(115, 460, 'hamster')
    // player = game.add.sprite(700, 0, 'hamster')
    walk = player.animations.add('walk')
    player.animations.play('walk', 15, true)

    // Add Enemy
    // enemy = game.add.sprite(400, 200, 'hilary2')
    // tween = game.add.tween(enemy)

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
    logCheck = game.add.tileSprite(350, 500, 340, 50,'log')
    logCheck.alpha = 0

    // Treasure
    treasure = game.add.sprite(840, 670, 'treasure')

    // Level Unlock
    levelUnlock = game.add.sprite(640, 800, 'log')

    // Moving enemy
    // tween.to({ x: 700 }, 1000, 'Linear', true, 0, 20, true).loop(true)
    
    // Enable physics   
    game.physics.enable([
      player, 
      weapon,
      boss, 
      // enemy, 
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

    // Makes sure weapon comes out of enemy
    weapon.trackSprite(player, 30, 30, true)

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
    game.physics.arcade.collide(player, enemies, this.killPlayer, null, this)
    game.physics.arcade.collide(player, log, this.moveRock, null, this)
    game.physics.arcade.collide(player, waterBoundary, this.killPlayer, null, this)
    game.physics.arcade.collide(player, waterBoundary2, this.killPlayer, null, this)
    game.physics.arcade.collide(player, boss, this.killPlayer, null, this)
    game.physics.arcade.overlap(weapon.bullets, enemies, this.killEnemy, null, this)
    game.physics.arcade.collide(weapon.bullets, boss, this.killBoss, null, this)
    game.physics.arcade.collide(player, teleport, this.teleportPlayer, null, this)
    game.physics.arcade.collide(player, teleport2, this.teleportPlayer2, null, this)
    game.physics.arcade.collide(player, boundaries)
    game.physics.arcade.collide(log, waterBoundary)
    game.physics.arcade.collide(player, treasure, this.spawnWeapon, null, this)
    game.physics.arcade.collide(player, logCheck, this.checkPlatfrom, null, this)

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown) {
      player.body.velocity.x = -300;
    }

    else if (cursors.right.isDown) {
      player.body.velocity.x = 300;
    }

    else if (cursors.up.isDown) {
      player.body.velocity.y = -300;
    }

    else if (cursors.down.isDown) {
      player.body.velocity.y = 300;
    }

    else if (fireButton.isDown) {
      if (this.enableWeapon) {
        weapon.fire()
      }
    }
  },

  killEnemy: function(weapon, enemy) {
    enemy.kill()
    weapon.kill()
    score += 100
    scoreDisplay.text = ('Score: ' + `${score}`)
    console.log('hey')
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

  createEnemies: function() {
    for(let y = 0; y < 3; y++){
      for(let x = 0; x < 1; x++) {
        let enemy = enemies.create(x*350, y*350, 'enemy')
        enemy.anchor.setTo(0.5, 0.5)
        enemy.body.velocity.x = 0;
        enemy.body.velocity.y = 0;    
      }
    }

    var tween = game.add.tween(enemies).to({x: 500}, 2000, Phaser.Easing.Linear.None,true,0,1000,)
    tween.yoyo(true)
  },

  // shootBullet: function() {
  //   if (this.time.now > bulletTime) {
  //     bullet = bullets.getFirstExists(false)
  //     if (bullet) {
  //       bullet.reset(this.enemy.x, this.enemy.y)

  //       bullet.body.velocity.y = -600

  //       bulletTime = this.time.now + 900
  //     }
  //   }
  // },

  killPlayer: function(player, enemy) {
    enemy.body.velocity.x = 0;
    enemy.body.velocity.y = 0;
    player.kill()
    ninjaLives--
    ninjaLivesDisplay.text = ('Lives: ' + `${ninjaLives}`)
    if (ninjaLives === 0) {
      score = 0
      ninjaLives = 3
      game.state.start('GameOver')
    } else {
      player.reset(player.body.velocity.x = 0, player.body.velocity.y = 0)
    }  
    console.log("ninja Lives", (ninjaLives))
    player.reset(player.body.velocity.x = 240, player.body.velocity.y = 1304)
    console.log('hey')
  },

  teleportPlayer: function(player, teleport) {
    player.reset(player.body.velocity.x = 140, player.body.velocity.y = 280)
  },

  teleportPlayer2: function(player, teleport) {
    player.reset(player.body.velocity.x = 140, player.body.velocity.y = 460)
  },

  // Move the log
  moveRock: function (player, log) {
    this.rockMoved = true
    logCheck.kill()
    log.reset(log.body.x = 350, log.body.y = 500)      
  },

  startLevelTwo: function(player, rec) {
    this.state.start('Two')
  },

  updateCounter: function() {
    totalTime++
    time.setText('Time: ' + totalTime)
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
  }


  // startLevelTwo: function(player, rec) {
  //   this.state.start('Two')
  // }
}