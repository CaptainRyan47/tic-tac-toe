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

console.log(gameBoard)