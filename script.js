const gameBoard = (() => {
  let markerArray = [, , , , , , , , ,]
  const cells = document.querySelectorAll('.cell')
  const makeMarkerElement = (marker) => {
    let markerElement = document.createElement('p')
    markerElement.textContent = marker
    return markerElement
  }
  const resetBoard = () => {
    markerArray.fill(null)
    cells.forEach(cell => {
      if (cell.querySelector('p')) cell.querySelector('p').remove()
    })
  }
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (cell.querySelector('p') != null || gameState.gameOverCheck()) return
      cell.append(makeMarkerElement(gameState.getActivePlayer().marker))
      markerArray[cell.id.charAt(4)] = gameState.getActivePlayer().marker
      gameState.turnController(markerArray)
    })
  })
  return { resetBoard }
})()

const gameState = (() => {
  let gameOver = false
  const gameOverCheck = () => {
    return gameOver
  }
  let turnCounter = 0
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
    if (gameOver) resetGame()
    else turnCounter++
  }

  const resetGame = () => {
    gameOver = false
    turnCounter = 0
    gameBoard.resetBoard()
    players.forEach(player => player.winner = false)
  }
  return { addPlayer, getActivePlayer, turnController, gameOverCheck }
})()

const playerFactory = (player, marker) => {
  let winner = false
  return { player, marker, winner }
}

const player1 = playerFactory('player1', 'X')
gameState.addPlayer(player1)
const player2 = playerFactory('player2', 'O')
gameState.addPlayer(player2)