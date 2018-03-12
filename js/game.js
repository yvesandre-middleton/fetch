let player
let bg
let rec
let cursors
let weapon
let fireButton
let enemy
let tween
let teleport
let walk

let Game = {
  preload: function() {
    game.load.image('lvl1bg', 'assets/images/lvl1bg.png')
    game.load.image('bg', 'assets/images/bg.png')
    game.load.image('rec', 'assets/images/rec.png')
    game.load.image('head', 'assets/images/head.png')
    game.load.image('hilary2', 'assets/images/hilary2.png')
    game.load.image('nugget', 'assets/images/nuggets.png')
    game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45, 5) 
  },
  
  create: function() {
    // Set World Bounds
    game.world.setBounds(0, 0, 996, 1304)

    // Add Background
    bg = game.add.sprite(0, 0, 'lvl1bg')

    // Add Weapon
    weapon = game.add.weapon(30, 'head')

    // Weapon Methods
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    weapon.bulletSpeed = 600
    weapon.fireRate = 100

    // Add Player
    player = game.add.sprite(240, 1304, 'hamster')
    walk = player.animations.add('walk')
    player.animations.play('walk', 15, true)

    // Add Enemy
    enemy = game.add.sprite(400, 200, 'hilary2')
    tween = game.add.tween(enemy)

    // Teleportation Test
    teleport = game.add.tileSprite(400, 100, 400, 100, 'bg')

    // Moving enemy
    tween.to({ x: 700 }, 1000, 'Linear', true, 0, 20, true).loop(true)
    
    // Add Boundary
    rec = game.add.tileSprite(300, 450, 400, 100, 'bg')

    // Enable physics   
    game.physics.enable([player, rec, weapon, enemy, teleport], Phaser.Physics.ARCADE)

    // Make sure player can't leave canvas view
    player.body.collideWorldBounds = true

    // Sprite Collisions
    rec.body.collideWorldBounds = true
    rec.body.immovable = true
    teleport.body.immovable = true

    // Have Camera follow
    game.camera.follow(player)

    // Makes sure weapon comes out of enemy
    weapon.trackSprite(player, 0, 0, true)

    // Keys for player movement/actions
    cursors = game.input.keyboard.createCursorKeys()
    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
  },
  
  update: function() {
    game.physics.arcade.collide(player, rec, this.startLevelTwo, null, this)
    game.physics.arcade.collide(player, enemy, this.killPlayer, null, this)
    game.physics.arcade.overlap(weapon.bullets, enemy, this.killEnemy, null, this)
    game.physics.arcade.collide(player, teleport, this.teleportPlayer, null, this)

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

    if (fireButton.isDown) {
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
    player.reset(player.body.velocity.x = 0, player.body.velocity.y = 0)
    console.log('hey')
  },

  teleportPlayer: function(player, teleport) {
    player.reset(player.body.velocity.x = 200, player.body.velocity.y = 400)
  },

  startLevelTwo: function(player, rec) {
    this.state.start('Two')
  }
}