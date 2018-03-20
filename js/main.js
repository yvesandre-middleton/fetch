let game = new Phaser.Game(800, 600, 'game')

game.state.add('Menu', Menu)
game.state.add('Game', Game)
game.state.add('Two', Two)
game.state.add('Three', Three)
game.state.add('EndGame', endGame)
game.state.add('GameOver', gameOver)
game.state.start('Menu')

// game.state.start('Three')
// game.state.start('Menu')

game.state.start('Game')