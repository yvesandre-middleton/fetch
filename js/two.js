// let player
let background

let Two = {
  preload: function() {
    game.load.image('mario', 'assets/images/mario.png')
    game.load.image('bg', 'assets/images/lvl2bg.png')
    game.load.image('wall1', 'assets/images/wall1-0x0.png')
    game.load.image('wall2', 'assets/images/wall2-326x414.png')
    game.load.image('river1', 'assets/images/river1-139x1226.png')
    game.load.image('river2', 'assets/images/river2-202x1074.png')
    game.load.image('cliff2', 'assets/images/cliff2-201x264.png')
    game.load.image('cliff1', 'assets/images/cliff1-0x325.png')
    game.load.image('hamster', 'assets/images/hilary2.png')
  },

  create: function() {
    game.world.setBounds(0,0,2750,1500, 'bg')
    game.add.sprite(0,0,'bg')
    game.add.sprite(0,0,'wall1')
    game.add.sprite(326,414,'wall2')
    game.add.sprite(139,1226,'river1')
    game.add.sprite(202,1074,'river2')
    game.add.sprite(0,325,'cliff1')
    game.add.sprite(264,325,'cliff2')
    player = game.add.sprite(115, 460, 'hamster')   
    
    
    game.physics.enable([
      player],
      Phaser.Physics.ARCADE)

    game.camera.follow(player)

    cursors = game.input.keyboard.createCursorKeys()
    
  },

  update: function() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown) {
      player.body.velocity.x = -300;
      // player.animations.play('left')
      // weapon.fireAngle = Phaser.ANGLE_LEFT
    }

    else if (cursors.right.isDown) {
      player.body.velocity.x = 300;
      // player.animations.play('right')
      // weapon.fireAngle = Phaser.ANGLE_RIGHT
    }

    else if (cursors.up.isDown) {
      player.body.velocity.y = -300;
      // player.animations.play('up')
      // weapon.fireAngle = Phaser.ANGLE_UP
    }

    else if (cursors.down.isDown) {
      player.body.velocity.y = 300;
      // player.animations.play('down')
      // weapon.fireAngle = Phaser.ANGLE_DOWN
    }
  }
}