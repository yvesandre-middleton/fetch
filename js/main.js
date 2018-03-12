var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', {
  preload: preload,
  create: create,
  update: update
});

WebFontConfig = {
 
  //  'active' means all requested fonts have finished loading
  //  We set a 1 second delay before calling 'createText'.
  //  For some reason if we don't the browser cannot render the text the first time it's created.
  active: function() { 
      game.time.events.add(Phaser.Timer.SECOND, createText, this);
  },

  //  The Google Fonts we want to load (specify as many as you like in the array)
  google: {
      families: ["Knewave"]
  }

}


let healthBar
let timer
let totalTime = 0
let player
let bg
let rec
let cursors
let weapon
let fireButton

function preload() {
  game.load.script("webfont", "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js")
  game.load.image('healthBar', 'assets/healthBar.png')
  game.load.image('mario', 'assets/mario.png')
  game.load.image('bg2', 'assets/bg2.png')
  game.load.image('bg', 'assets/bg.png')
  game.load.image('rec', 'assets/rec.png')
  game.load.image('trump', 'assets/trump.png')
}

function create() {
  // Set World Bounds
  game.world.setBounds(0, 0, 1920, 1080)

  // Add Background
  bg = game.add.sprite(0, 0, 'bg2')

  // Add Health Bar
  

  // Adding a timer
  timer = game.time.create(false);

  timer.loop(1250, updateCounter, this)

  timer.start()

  // Add Weapon
  weapon = game.add.weapon(30, 'trump')

  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS

  weapon.bulletSpeed = 600

  weapon.fireRate = 100

  // Add Player
  player = game.add.sprite(300, 300, 'mario')

  rec = game.add.tileSprite(300, 450, 400, 100, 'bg')
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

  weapon.trackSprite(player, 0, 0, true)

  cursors = game.input.keyboard.createCursorKeys()
  fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
}

function createText() {
  time = game.add.text(10, 50)
  time.fixedToCamera = true
  time.font = 'Knewave'
  time.fontSize = 40
  score = game.add.text(10, 5, "Score: ")
  score.fixedToCamera = true
  score.font = 'Knewave'
  score.fontSize = 40
  healthBar = game.add.sprite(-20, -115, 'healthBar')
  healthBar.width = 200
  healthBar.fixedToCamera = true
  
}

function updateCounter() {
  totalTime++
  time.setText('Time: ' + totalTime)
}

function update() {

  game.physics.arcade.collide(player, rec)

  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if (cursors.left.isDown) {
    player.body.velocity.x = -500;
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 500;
  } else if (cursors.up.isDown) {
    player.body.velocity.y = -500;
  } else if (cursors.down.isDown) {
    player.body.velocity.y = 500;
  }

  if (fireButton.isDown) {
    weapon.fire()
  }
  
}



