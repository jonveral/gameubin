const puzzleBoard = document.getElementById('puzzle-board');
const shuffleButton = document.getElementById('shuffle');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status');
const congratulationsText = document.getElementById('congratulations');

let tiles = [];
let emptyTileIndex = 8;

// Generate the puzzle grid
function generatePuzzle() {
    puzzleBoard.innerHTML = '';
    tiles = [];
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.classList.add('puzzle-tile');
        tile.textContent = i + 1;
        tile.setAttribute('data-index', i);
        tile.setAttribute('data-position', i);
        tile.onclick = handleTileClick;
        tiles.push(tile);
        puzzleBoard.appendChild(tile);
    }
    tiles[8].style.visibility = 'hidden';  // Hide the empty tile
    statusText.textContent = 'Susun ubin untuk menyelesaikan teka-teki!';
    congratulationsText.style.display = 'none';  // Ensure congratulations is hidden initially
}

// Handle tile click events
function handleTileClick(event) {
    const clickedTile = event.target;
    const clickedIndex = parseInt(clickedTile.getAttribute('data-index'));
    const emptyTile = tiles[emptyTileIndex];

    if (isAdjacent(clickedIndex, emptyTileIndex)) {
        swapTiles(clickedTile, emptyTile);
        emptyTileIndex = clickedIndex;
        if (isPuzzleSolved()) {
            statusText.textContent = '';
            congratulationsText.style.display = 'block';
        }
    }
}

// Check if two tiles are adjacent
function isAdjacent(index1, index2) {
    const adjacentIndexes = [
        [-1, 1],  // Left, Right
        [-3, 3]   // Up, Down
    ];
    
    for (let i = 0; i < adjacentIndexes.length; i++) {
        if (adjacentIndexes[i].includes(index1 - index2)) {
            return true;
        }
    }
    return false;
}

// Swap two tiles
function swapTiles(tile1, tile2) {
    const tempPosition = tile1.getAttribute('data-position');
    tile1.setAttribute('data-position', tile2.getAttribute('data-position'));
    tile2.setAttribute('data-position', tempPosition);
    
    const tempText = tile1.textContent;
    tile1.textContent = tile2.textContent;
    tile2.textContent = tempText;

    const tempStyle = tile1.style.visibility;
    tile1.style.visibility = tile2.style.visibility;
    tile2.style.visibility = tempStyle;
}

// Shuffle the puzzle
shuffleButton.onclick = function() {
    // Hide the congratulation message when shuffle button is pressed
    congratulationsText.style.display = 'none';
    statusText.textContent = 'Susun ubin untuk menyelesaikan teka-teki!';
    
    for (let i = 0; i < 100; i++) {
        const randomTileIndex = Math.floor(Math.random() * 9);
        const randomTile = tiles[randomTileIndex];
        if (isAdjacent(randomTileIndex, emptyTileIndex)) {
            swapTiles(randomTile, tiles[emptyTileIndex]);
            emptyTileIndex = randomTileIndex;
        }
    }
};

// Reset the puzzle
resetButton.onclick = generatePuzzle;

// Check if the puzzle is solved
function isPuzzleSolved() {
    for (let i = 0; i < 8; i++) {
        if (tiles[i].getAttribute('data-position') != i) {
            return false;
        }
    }
    return true;
}

// Start the game
generatePuzzle();
