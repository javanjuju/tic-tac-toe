const playerOneBtn = document.querySelectorAll('.player-one');
const playerTwoBtn = document.querySelectorAll('.player-two');
const startGameBtn = document.querySelector('#start-game');
const gameBoard = document.querySelector('#game-board');
const cells = document.getElementsByClassName('cell');
const winnerDisplay = document.querySelector('.display-winner');
const newGameBtn = document.querySelector('#new-game');

const game = (() => {
	const gameCells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	return {gameCells};
})();
let turn = 1;
let winner = null;
let playerOneType = null;
let playerTwoType = null;

playerOneBtn.forEach(button => {
	button.addEventListener('click', () => {
		playerOneType = button.value;
		console.log(`playerOne: ${playerOneType}`);
	});
});

playerTwoBtn.forEach(button => {
	button.addEventListener('click', () => {
		playerTwoType = button.value;
		console.log(`playerTwo: ${playerTwoType}`);
	});
});

const playerOne = (() => ({
	playerOneType,
	playerMark: 'X',
	point: 1,
	game,
}))();

const playerTwo = (() => ({
	playerTwoType,
	playerMark: 'O',
	point: -1,
	game,
}))();

const winningBoard = (() => {
	const rowOne = game.gameCells[0] + game.gameCells[1] + game.gameCells[2];
	const rowTwo = game.gameCells[3] + game.gameCells[4] + game.gameCells[5];
	const rowThree = game.gameCells[6] + game.gameCells[7] + game.gameCells[8];
	const columnOne = game.gameCells[0] + game.gameCells[3] + game.gameCells[6];
	const columnTwo = game.gameCells[1] + game.gameCells[4] + game.gameCells[7];
	const columnThree = game.gameCells[2] + game.gameCells[5] + game.gameCells[8];
	const diagonalOne = game.gameCells[0] + game.gameCells[4] + game.gameCells[8];
	const diagonalTwo = game.gameCells[2] + game.gameCells[4] + game.gameCells[6];

	return [
		rowOne,
		rowTwo,
		rowThree,
		columnOne,
		columnTwo,
		columnThree,
		diagonalOne,
		diagonalTwo,
	];
});

const updateGameBoard = number => {
	if (cells[number].textContent === playerOne.playerMark) {
		game.gameCells[number] = playerOne.point;
	} else {
		game.gameCells[number] = playerTwo.point;
	}
};

const checkWinner = array => {
	let i;
	if (winner === null) {
		for (i = 0; i < array.length; i++) {
			if (array[i] === 3) {
				winner = `Winner: Player One, Mark:${playerOne.playerMark}`;
				const display = document.createElement('div');
				display.textContent = winner;
				winnerDisplay.appendChild(display);
			} else if (array[i] === -3) {
				winner = `Winner: Player Two, Mark: ${playerTwo.playerMark}`;
				const display = document.createElement('div');
				display.textContent = winner;
				winnerDisplay.appendChild(display);
			}
		}
	}
};

startGameBtn.addEventListener('click', () => {
	if (playerOneType && playerTwoType !== null && gameBoard.children.length !== 9) {
		let i;
		for (i = 0; i < 9; i++) {
			const cell = document.createElement('div');
			cell.setAttribute('class', 'cell');
			cell.setAttribute('id', i);
			cell.textContent = '';

			cell.addEventListener('click', () => {
				if ((turn === 1) && (cell.textContent === '') && (winner === null)) {
					cell.textContent = playerOne.playerMark;
					updateGameBoard(cell.getAttribute('id'));
					const decider = winningBoard();
					checkWinner(decider);
					turn++;
				} else if ((turn === 2) && (cell.textContent === '') && (winner === null)) {
					cell.textContent = playerTwo.playerMark;
					updateGameBoard(cell.getAttribute('id'));
					const decider = winningBoard();
					checkWinner(decider);
					turn--;
				}
			});
			gameBoard.append(cell);
		}
	}
});

newGameBtn.addEventListener('click', () => {
	window.location.reload();
});
