let game = new Phaser.Game(800, 800, '')
game.state.add('Menu', Menu)
game.state.add('Game', Game)
game.state.add('Two', Two)
// game.state.add('EndGame', EndGame)
game.state.start('Menu')

game.state.start('Game')
