let player
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
    game.load.image('hilary2', 'assets/images/hilary2.png')
    game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45) 
  },
  
  create: function() {
    // Set World Bounds
    game.world.setBounds(0, 0, 996, 1304)

    // Add Background
    bg = game.add.sprite(0, 0, 'lvl1bg')

    // Add log, has to be called before player so that
    // player appears on top
    
    // Add Player
    // player = game.add.sprite(240, 1304, 'hamster')
    
    // Player locations for testing
    // player = game.add.sprite(700, 700, 'hamster')
    log = game.add.sprite(370, 200, 'log')
    player = game.add.sprite(115, 460, 'hamster')
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

    // Level 2 Unlock
    levelUnlock.body.collideWorldBounds
    levelUnlock.body.immovable = true
    
    // Have Camera follow
    game.camera.follow(player)

    // Keys for player movement/actions
    cursors = game.input.keyboard.createCursorKeys()
    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
  },
  
  update: function() {
    // game.physics.arcade.collide(player, rec, this.startLevelTwo, null, this)
    game.physics.arcade.collide(player, enemy, this.killPlayer, null, this)
    game.physics.arcade.collide(player, log, this.moveRock, null, this)
    game.physics.arcade.collide(player, waterBoundary, this.killPlayer, null, this)
    game.physics.arcade.collide(player, waterBoundary2, this.killPlayer, null, this)
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

  killEnemy: function(weapon, enemy) {
    enemy.kill()
    weapon.kill()
    console.log('hey')
  },

  killPlayer: function(player, enemy) {
    player.kill()
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
  }

  // startLevelTwo: function(player, rec) {
  //   this.state.start('Two')
  // }
}