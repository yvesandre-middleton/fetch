let max = 0
let front_emitter
let mid_emitter
let back_emitter
let update_interval = 4 * 60
let i = 0

let Menu = {
  preload: function() {

    // Menu Sound


    game.load.image('titleScreen', 'assets/images/titlescreen.png')

    game.load.spritesheet('snowflakes', 'assets/images/snowflakes.png', 17, 17)
    game.load.spritesheet('snowflakes_large', 'assets/images/snowflakes_large.png', 64, 64)

    game.load.audio('menuSound', 'assets/audio/music/sakura-sakura-title-screen.mp3')
    game.load.audio('clickSound', 'assets/audio/SFX/start-click.mp3')
  },

  create: function() {
    menuSound = game.add.audio('menuSound')
    clickSound = game.add.audio('clickSound')

    // menuSound.loop = true
    menuSound.play()

    game.add.image(0, 0, 'titleScreen')

    back_emitter = game.add.emitter(game.world.centerX, -32, 600)
    back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5])
    back_emitter.maxParticleScale = 0.6
    back_emitter.minParticleScale = 0.2
    back_emitter.setYSpeed(20, 100)
    back_emitter.gravity = 0
    back_emitter.width = game.world.width * 1.5
    back_emitter.minRotation = 0
    back_emitter.maxRotation = 40

    mid_emitter = game.add.emitter(game.world.centerX, -32, 250)
    mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5])
    mid_emitter.maxParticleScale = 1.2
    mid_emitter.minParticleScale = 0.8
    mid_emitter.setYSpeed(50, 150)
    mid_emitter.gravity = 0
    mid_emitter.width = game.world.width * 1.5
    mid_emitter.minRotation = 0
    mid_emitter.maxRotation = 40

    front_emitter = game.add.emitter(game.world.centerX, -32, 50)
    front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5])
    front_emitter.maxParticleScale = 1
    front_emitter.minParticleScale = 0.5
    front_emitter.setYSpeed(100, 200)
    front_emitter.gravity = 0
    front_emitter.width = game.world.width * 1.5
    front_emitter.minRotation = 0
    front_emitter.maxRotation = 40

    this.changeWindDirection()

    back_emitter.start(false, 14000, 20)
    mid_emitter.start(false, 12000, 40)
    front_emitter.start(false, 6000, 1000)

    game.input.onDown.add(this.restartGame, this)
  },

  update: function() {
    i++

    if (i === update_interval) {
      this.changeWindDirection()

      update_interval = Math.floor(Math.random() * 20) * 60 // 0 - 20sec @ 60fps
      i = 0
    }
  },

  changeWindDirection: function() {
    var multi = Math.floor((max + 200) / 4),
        frag = (Math.floor(Math.random() * 100) - multi)
    max = max + frag

    if (max > 200) max = 150
    if (max < -200) max = -150

    this.setXSpeed(back_emitter, max)
    this.setXSpeed(mid_emitter, max)
    this.setXSpeed(front_emitter, max)
  },

  setXSpeed: function(emitter, max) {
    emitter.setXSpeed(max - 20, max)
    emitter.forEachAlive(this.setParticleXSpeed, this, max)
  },

  setParticleXSpeed: function(particle, max) {
    particle.body.velocity.x = max - Math.floor(Math.random() * 30)
  },

restartGame: function() {
    clickSound.play()
    game.sound.remove(menuSound)
    game.state.start('Game')
  }
}
