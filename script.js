document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const gameContainer = document.querySelector('.game-container');

    const players = {
        X: { symbol: '🌍', color: '#3498db' },
        O: { symbol: '🚀', color: '#e74c3c' }
    };

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = players[currentPlayer].symbol;
        clickedCell.style.color = players[currentPlayer].color;
        clickedCell.classList.add('occupied');
        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                highlightWinningCells([a, b, c]);
                break;
            }
        }

        if (roundWon) {
            status.textContent = `${players[currentPlayer].symbol} wins!`;
            status.style.color = players[currentPlayer].color;
            gameActive = false;
            gameContainer.classList.add('win');
            showConfetti();
            return;
        }

        if (!gameState.includes('')) {
            status.textContent = "It's a draw!";
            status.style.color = '#fff';
            gameActive = false;
            gameContainer.classList.add('draw');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }

    function updateStatus() {
        status.textContent = `${players[currentPlayer].symbol}'s turn`;
        status.style.color = players[currentPlayer].color;
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        updateStatus();
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = '';
            cell.classList.remove('occupied', 'winner');
            cell.style.backgroundColor = '';
        });
        gameContainer.classList.remove('win', 'draw');
    }

    function highlightWinningCells(winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add('winner');
            cells[index].style.backgroundColor = players[currentPlayer].color;
            cells[index].style.color = '#fff';
        });
    }

    function showConfetti() {
        const confettiCount = 150;
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-10px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.opacity = Math.random();
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    function createStars() {
        const starsContainer = document.querySelector('.stars');
        const starCount = 100;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = '2px';
            star.style.height = '2px';
            star.style.backgroundColor = '#fff';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animation = `twinkle ${Math.random() * 4 + 2}s infinite`;
            starsContainer.appendChild(star);
        }
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    updateStatus();
    createStars();
});
