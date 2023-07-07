const gameBoard = (() => {
  let gameBoard = []
  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
      console.log(cell)
    })
    gameBoard.push(cell)
  })
  return { gameBoard }
})()

const gameState = (() => {
  let turnCounter = 0
  let players = []
  const addPlayer = (player) => {
    players.push(player)
  }
  const getActivePlayer = () => {
    if (turnCounter % 2 === 0) return players[0]
    else return players[1]
  }
  const checkForWinner = () => { }
  return { turnCounter, checkForWinner, addPlayer, getActivePlayer }
})()

const playerFactory = (player, marker) => {
  const placeMarker = () => { console.log(`${player} plays ${marker}`) }
  return { player, marker, placeMarker }
}

const player1 = playerFactory('player1', 'X')
gameState.addPlayer(player1)
const player2 = playerFactory('player2', 'O')
gameState.addPlayer(player2)