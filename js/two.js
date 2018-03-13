let mario
let background

let Two = {
  preload: function() {
    game.load.image('mario', 'assets/images/mario.png')
    game.load.image('bg2', 'assets/images/bg.png')
  },

  create: function() {
    game.add.sprite(0,0,'bg2')
    game.add.sprite(0,0,'mario')
  }
}