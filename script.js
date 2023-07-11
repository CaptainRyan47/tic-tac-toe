const gameBoard = (() => {
  let markerArray = [, , , , , , , ,]
  const makeMarkerElement = (marker) => {
    let markerElement = document.createElement('p')
    markerElement.textContent = marker
    return markerElement
  }
  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
      if (cell.querySelector('p') != null) return
      cell.append(makeMarkerElement(gameState.getActivePlayer().marker))
      markerArray[cell.id.charAt(4)] = gameState.getActivePlayer().marker
      gameState.checkForWinner(markerArray)
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
  const checkForWinner = (array) => {
    if (array[0] && array[0] === array[1] && array[0] === array[2]) getActivePlayer().winner = true
    if (array[0] && array[0] === array[4] && array[0] === array[8]) getActivePlayer().winner = true
    if (array[0] && array[0] === array[3] && array[0] === array[6]) getActivePlayer().winner = true
    if (array[1] && array[1] === array[4] && array[1] === array[7]) getActivePlayer().winner = true
    if (array[2] && array[2] === array[5] && array[2] === array[8]) getActivePlayer().winner = true
    if (array[3] && array[3] === array[4] && array[3] === array[5]) getActivePlayer().winner = true
    if (array[6] && array[6] === array[7] && array[6] === array[8]) getActivePlayer().winner = true
    if (array[6] && array[6] === array[4] && array[6] === array[2]) getActivePlayer().winner = true
  }
  return { turnCounter, checkForWinner, addPlayer, getActivePlayer, incrementTurnCounter }
})()

const playerFactory = (player, marker) => {
  let winner = false
  return { player, marker, winner }
}

const player1 = playerFactory('player1', 'X')
gameState.addPlayer(player1)
const player2 = playerFactory('player2', 'O')
gameState.addPlayer(player2)