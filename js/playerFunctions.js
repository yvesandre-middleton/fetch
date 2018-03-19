function initPlayerAnimations(player) {
  player.animations.add('left', [5, 6, 7, 8, 8], 10, true);
  player.animations.add('right', [0, 1, 2, 3, 4], 10, true);
  player.animations.add('down', [10, 11, 12, 13, 14], 10, true);
  player.animations.add('up', [15, 16, 17, 18, 19], 10, true);
  player.animations.play('walk', 15, true)
  walk = player.animations.add('walk', [0, 2, 4], 7, true);
}

function initWeapon(weapon) {
  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
  weapon.bulletSpeed = 200
  weapon.fireRate = 1200
  weapon.trackSprite(player, 30, 30, false)
}

function initEnemyWeapon(weapon) {
  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
  weapon.bulletSpeed = 200
  weapon.fireRate = 600
  weapon.autofire = false
}

function makeWeapon(quanitity, image) {
  return game.add.weapon(quanitity, image)
}

function fireOff(name) {
  return name.autofire = false
}

function initWorldBounds(x, y, w, h) {
  game.world.setBounds(x, y, w, h)
}

function startingVelocity(player) {
  player.body.velocity.x = 0
  player.body.velocity.y = 0
}

function gameControls() {
  cursors = game.input.keyboard.createCursorKeys()
  fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
}

function camera(player) {
  game.camera.follow(player)
}

function playerMovement(player, weapon) {
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
  } else {
    player.animations.play('down')
  }
}

function makeWorldSprite(x, y, w, h, image) {
  boundary = game.add.tileSprite(x, y, w, h, image)
  return boundary
}

function makeWaterSprite(x, y, w, h, image) {
  waterBoundary = game.add.tileSprite(x, y, w, h, image)
  return waterBoundary
}

function makeSprite(x, y, image) {
  boundary = game.add.sprite(x, y, image)
  return boundary
}

function alpha(name) {
  return name.alpha = 0
}

function makeSprite(x, y, image) {
  return game.add.sprite(x, y, image)
}

function collision(name) {
  return name.body.collideWorldBounds = true
}

function immovable(name) {
  return name.body.immovable = true
}

function collideImmovable(name) {
  return name.body.immovable = true
  return name.body.collideWorldBounds = true
}


function timeDelay(time, name, xaxis, yaxis) {
  return game.time.events.add(time, () => {
    return name.reset(name.body.velocity.x = xaxis, name.body.velocity.y = yaxis), this
  })
}

function collisionGroup(name) {
  return name.children.forEach(c => {
    c.body.collideWorldBounds = true
    c.body.immovable = true;
  })
}