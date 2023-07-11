const gameBoard = (() => {
  let markerArray = [, , , , , , , ,]
  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
      cell.append(gameState.getActivePlayer().getMarkerElement())
      gameBoard[cell.id.charAt(4)] = gameState.getActivePlayer().marker
      gameState.checkForWinner()
      gameState.incrementTurnCounter()
    })
  })
  return { markerArray }
})()

const gameState = (() => {
  let turnCounter = 0
  const incrementTurnCounter = () => {
    turnCounter++
  }
  let players = []
  const addPlayer = (player) => {
    players.push(player)
  }
  const getActivePlayer = () => {
    if (turnCounter % 2 === 0) return players[0]
    else return players[1]
  }
  const checkForWinner = () => { }
  return { turnCounter, checkForWinner, addPlayer, getActivePlayer, incrementTurnCounter }
})()

const playerFactory = (player, marker) => {
  const getMarkerElement = () => {
    let markerElement = document.createElement('p')
    markerElement.textContent = marker
    return markerElement
  }
  return { player, getMarkerElement, marker }
}

const player1 = playerFactory('player1', 'X')
gameState.addPlayer(player1)
const player2 = playerFactory('player2', 'O')
gameState.addPlayer(player2)