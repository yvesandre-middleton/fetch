var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', {
  preload: preload,
  create: create,
  update: update
});

let player
let bg
let rec
let cursors
let weapon
let fireButton
let enemy
let tween
let teleport 

function preload() {
  game.load.image('mario', 'assets/mario.png')
  game.load.image('bg2', 'assets/bg2.png')
  game.load.image('bg', 'assets/bg.png')
  game.load.image('rec', 'assets/rec.png')
  game.load.image('head', 'assets/head.png')
  game.load.image('hilary2', 'assets/hilary2.png')
  game.load.image('nugget', 'assets/nuggets.png')  
}

function create() {

  // Set World Bounds
  game.world.setBounds(0, 0, 1920, 1080)

  // Add Background
  bg = game.add.sprite(0, 0, 'bg2')

  // Add Weapon
  weapon = game.add.weapon(30, 'head')

  // Weapon Methods
  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
  weapon.bulletSpeed = 600
  weapon.fireRate = 100

  // Add Player
  player = game.add.sprite(50, 50, 'mario')

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

  // Position of Character
  player.anchor.setTo(0.5)

  weapon.trackSprite(player, 0, 0, true)

  // Keys for player movement/actions
  cursors = game.input.keyboard.createCursorKeys()
  fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
}

function update() {
  game.physics.arcade.collide(player, rec)
  game.physics.arcade.collide(player, enemy, killPlayer, null, this)  
  game.physics.arcade.overlap(weapon.bullets, enemy, killEnemy, null, this)
  game.physics.arcade.collide(player, teleport, teleportPlayer, null, this)
    
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if (cursors.left.isDown) {
    player.body.velocity.x = -500;
  } 
  
  else if (cursors.right.isDown) {
    player.body.velocity.x = 500;
  } 
  
  else if (cursors.up.isDown) {
    player.body.velocity.y = -500;
  } 
  
  else if (cursors.down.isDown) {
    player.body.velocity.y = 500;
  }

  if (fireButton.isDown) {
    weapon.fire()
  }
}

// Kill enemy
function killEnemy(weapon, enemy) {
  enemy.kill()
  weapon.kill()
  console.log('hey')
}

function killPlayer(player, enemy) {
  player.kill()
  player.reset(player.body.velocity.x = 0, player.body.velocity.y = 0)
  console.log('hey')
}

function teleportPlayer(player, teleport) {
  player.reset(player.body.velocity.x = 200, player.body.velocity.y = 400)  
}