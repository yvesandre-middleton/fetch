var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });

let player
let bg
let rec
let cursors

function preload() {
  game.load.image('mario', 'assets/mario.png')
  game.load.image('bg2', 'assets/bg2.png')
  game.load.image('bg', 'assets/bg.png')  
  game.load.image('rec', 'assets/rec.png')    
}

function create() {
  // Set World Bounds
  game.world.setBounds(0,0,1920,1080)
  
  // Add Background
  bg = game.add.sprite(0,0,'bg2')
  
  // Add Player
  player = game.add.sprite(50,50, 'mario')

  rec = game.add.tileSprite(300,450,400,100, 'bg')
  // rec.body.immovable = true
  
  // Enable physics
  game.physics.enable([player, rec], Phaser.Physics.ARCADE)
  
  // Make sure player can't leave canvas view
  player.body.collideWorldBounds = true
  
  // Sprite Collisions
  rec.body.collideWorldBounds = true
  rec.body.immovable = true
  
  // Have Camera follow
  game.camera.follow(player)
  
  // Position of Character
  player.anchor.setTo(0.5)

  cursors = game.input.keyboard.createCursorKeys()
}

function update() {
  game.physics.arcade.collide(player, rec)

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
}
