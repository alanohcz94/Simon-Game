// Definition
let sequence = [];
let playerSequence = [];
let level = 0;
let maxLevel = 20;

// Players Turn
// Select heading and container
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

// AI's Turn
// Select start button and info of start button
const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');

// Define functions

function resetGame(text)
{
    alert(text);
    sequence = [];
    playerSequence = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Simon Game';
    info.classList.add('hidden');
    tileContainer.classList.add('unclickable');
}

function handleClick(tile)
{
    const index = playerSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();

    const remainingClicks = sequence.length - playerSequence.length;

    if (playerSequence[index] !== sequence[index])
    {
        return resetGame("Game Over!, Seems like you press the wrong tile !");
    }

    if (playerSequence.length === sequence.length)
    {
        playerSequence = [];
        if(level === maxLevel)
        {
            return resetGame("EXCELLENT Job !! You completed all stages.");
        }
        else
        {
            info.textContent = "Great Job, Next Level!";
        }
        setTimeout(()=>{
            nextRound();
        }, 1000);

        return;
    }

    info.textContent = `Your Turn: ${remainingClicks} Click${remainingClicks > 1 ? 's' : ''}`;
}

function playerTurn(level)
{
    tileContainer.classList.remove('unclickable');
    info.textContent = `Your Turn: ${level} Click${level > 1 ? 's' : ''}`;
}

function activateTile(color)
{
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout(()=>{
        tile.classList.remove('activated');
    }, 300 );
}

function playRound(nextSequence)
{
    nextSequence.forEach((color, index) => {
        setTimeout(()=>{
            activateTile(color);
        }, (index+1)* 600);
    });
}

// Generate a random seqeunce of tiles order
function nextStep()
{
    const tiles = ['red','green','blue','yellow'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];
    return random;
}

// To start the next sequence of tile clicks
function nextRound()
{
    level += 1;

    tileContainer.classList.add('unclickable');
    info.textContent = "Wait for the computer's turn.....";
    heading.textContent = `Level ${level} of ${maxLevel}`;

    // copy all elements in the 'seqence' array to 'nextSequence'
    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    //Players Turn
    sequence = [...nextSequence];
    setTimeout( () => {
        playerTurn(level);
    }, level * 600 + 1000);
}

function startGame() 
{
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent = "Wait for the computer's turn.....";
    nextRound();
    //If possible let's add a loading circle here
}

// Define event listener
startButton.addEventListener('click', startGame);

tileContainer.addEventListener('click', event => {
    const { tile } = event.target.dataset; 
    console.log(tile);

    if (tile) handleClick(tile);
});
