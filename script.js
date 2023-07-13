const pageController = (() => {
  let gameBoard = [, , , , , , , , ,]
  const cells = document.querySelectorAll('.cell')
  const makeMarkerElement = (marker) => {
    let markerElement = document.createElement('p')
    markerElement.textContent = marker
    return markerElement
  }
  const showGameOver = () => {
    const gameOver = document.createElement('div')
    gameOver.id = 'game-over'
    const makeResults = () => {
      let result = document.createElement('h1')
      gameState.getActivePlayer().winner ?
        result.textContent = `${gameState.getActivePlayer().name} is the Winner!` :
        result.textContent = "It's a tie!"
      return result
    }
    const makeResetButton = () => {
      const button = document.createElement('button')
      button.id = 'reset'      
      button.textContent = 'Play again'
      button.addEventListener('click', ()=>{
        resetPage()
      })
      return button
    }
    gameOver.append(makeResults(), makeResetButton())
    document.querySelector('body').append(gameOver)
  }
  const resetPage = () => {
    gameBoard.fill(null)
    cells.forEach(cell => {
      if (cell.querySelector('p')) cell.querySelector('p').remove()
    })
    document.querySelector('#game-over').remove()
    gameState.resetGame()
  }
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (cell.querySelector('p') != null || gameState.gameOverCheck()) return
      cell.append(makeMarkerElement(gameState.getActivePlayer().marker))
      gameBoard[cell.id.charAt(4)] = gameState.getActivePlayer().marker
      gameState.turnController(gameBoard)
    })
  })
  return { resetPage, showGameOver }
})()

const gameState = (() => {
  let gameOver = false
  const gameOverCheck = () => {
    return gameOver
  }
  let turnCounter = 2
  let players = []
  const addPlayer = (player) => {
    players.push(player)
  }
  const getActivePlayer = () => {
    if (turnCounter % 2 === 0) return players[0]
    else return players[1]
  }
  const checkForWinner = (array) => {
    if (array[0] && array[0] === array[1] && array[0] === array[2]) getActivePlayer().winner = true
    if (array[0] && array[0] === array[4] && array[0] === array[8]) getActivePlayer().winner = true
    if (array[0] && array[0] === array[3] && array[0] === array[6]) getActivePlayer().winner = true
    if (array[1] && array[1] === array[4] && array[1] === array[7]) getActivePlayer().winner = true
    if (array[2] && array[2] === array[5] && array[2] === array[8]) getActivePlayer().winner = true
    if (array[3] && array[3] === array[4] && array[3] === array[5]) getActivePlayer().winner = true
    if (array[6] && array[6] === array[7] && array[6] === array[8]) getActivePlayer().winner = true
    if (array[6] && array[6] === array[4] && array[6] === array[2]) getActivePlayer().winner = true
    return (getActivePlayer().winner)
  }

  const checkForTie = (array) => {
    let nullCount = 0
    for (let i = 0; i < array.length; i++) {
      if (!array[i]) nullCount++
    }
    return (nullCount === 0)
  }

  const turnController = (array) => {
    if (checkForWinner(array)) gameOver = true
    if (checkForTie(array)) gameOver = true
    if (gameOver) pageController.showGameOver()
    else turnCounter++
  }

  const resetGame = () => {
    players.forEach(player => player.winner = false)
    turnCounter = 0
    gameOver = false
  }
  return { addPlayer, getActivePlayer, turnController, gameOverCheck, resetGame }
})()

const playerFactory = (name, marker) => {
  let winner = false
  return { name, marker, winner }
}

const player1 = playerFactory('Player 1', 'X')
gameState.addPlayer(player1)
const player2 = playerFactory('Player 2', 'O')
gameState.addPlayer(player2)