let game = new Phaser.Game(800, 600, '')


game.state.add('Menu', Menu)
game.state.add('Game', Game)
game.state.add('Two', Two)
game.state.add('EndGame', endGame)
game.state.add('GameOver', gameOver)
// game.state.start('Menu')

game.state.start('Game')
// game.state.start('Menu')
