// Accessing HTML elements

const board = document.querySelector('.game-board');
const scoreText = document.querySelector('.score');
const highScoreText = document.querySelector('.highScore');
const instructionText = document.querySelector('.instruction-text');
const logo = document.querySelector('.logo')


const generateSnakeFood = () =>{

    

    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20)

    return {x,y}
    
}


// Game Variables

const gridSize = 20;
let snake =[{x:10,y:10}];
let snakeFood = generateSnakeFood();
let gameStarted = false;
let highScore = 0;
let direction = 'right'
let gameInterval;      //it is the variable used to manage the timing and execution of the game loop,ensuring that the game logic and rendering are processed at regular intervals to create smooth game play
let gameSpeedDelay = 200;






// Draw method

const draw = () =>{
    
    board.innerHTML = '';
    drawSnake();
    drawSnakeFood();
    updateScore();
}



// Function to draw snake

const drawSnake = ()=>{
    snake.forEach((segment)=>{
        const snakeElement = createGameElement('div','snake')
        setPosition(snakeElement,segment)
        board.appendChild(snakeElement);
    })
}

// Function to draw snakeFood

    const drawSnakeFood = ()=>{

        if(gameStarted){

            const snakeFoodElement = createGameElement('div','food')
            setPosition(snakeFoodElement,snakeFood);
            board.appendChild(snakeFoodElement);
        }
    }



// This function creates the html elements like snake and food in the grid

const createGameElement = (tag,className)=>{
    const element = document.createElement(tag);
    element.className =className
    return element;
}


// Function to set position of snake and food

const setPosition = (element,position)=>{
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}



// Function responsible for the movement of the snake;

const move = () =>{
    const head = {...snake[0]}
    switch (direction) {
        case 'up':
            head.y--;
            break;

        case 'down':
            head.y++;
            break;
            
        case 'right':
            head.x++;
            break;
            
        case 'left':
            head.x--;
            break    
    
        default:
            break;
    }

    snake.unshift(head);  //this is responsible for creating new head with new positions{x,y}

    if(head.x === snakeFood.x && head.y === snakeFood.y){
        snakeFood = generateSnakeFood();
        increaseSnakeSpeed();
        clearInterval(gameInterval);

        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);

    }
    else{
        snake.pop();
    }
}


// Function that responsible for the initialization of the game

const initializeGame = () =>{
    gameStarted = true;
    instructionText.style.display = 'none';
    logo.style.display = 'none';

    gameInterval =setInterval(() => {
        
        move();
        checkCollision();
        draw();

    }, gameSpeedDelay);


}


// Function that listens the spacebar key event

const handleKeyPress = (event)=>{
    if((!gameStarted && event.code === 'Space') || (!gameStarted && event.code === ' ') ){
    //    console.log("game-started")
        initializeGame();
    }

    else{
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;

            case 'ArrowLeft':
                direction = 'left';
                break;
                
            case 'ArrowRight':
                direction = 'right'; 
                break;
                   
            default:
                break;
        }
    }
}


// Function to increase the speed of the snake

const increaseSnakeSpeed = () =>{
    if(gameSpeedDelay > 150){
        gameSpeedDelay -= 5
    }
    else if(gameSpeedDelay > 100){
        gameSpeedDelay -=3
    }
    else if(gameSpeedDelay > 50){
        gameSpeedDelay -= 2;
    }
}



// Event listener responsible for the keydown (key to sraer the game)

document.addEventListener('keydown',(event)=>{
    // console.log(event)
    handleKeyPress(event)
})

// function responsible for checking collision

const checkCollision = () =>{
    const head = snake[0];

    // This condition checks the collision with borders

    if(head.x > gridSize || head.x < 1 || head.y > gridSize || head.y < 1){
        console.log("border-colided ")
        gameOver();
    }

    // This code block check the collision with snake body

    for(let i = 1 ; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            console.log("snake-collided")
            gameOver();
        }
    }
}

const gameOver = () =>{
    // console.log('game-over')
    updateHighScore();
    stopGame();
    snake = [{x:10,y:10}];
    snakeFood = generateSnakeFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateHighScore();
}


// function which updates the high score

const updateHighScore = () =>{

    const currentScore = snake.length -1;
    if(currentScore > highScore){
        highScore =currentScore;
        highScoreText.textContent = highScore.toString().padStart(3,'0');
    }

    highScoreText.style.display = 'block'
}


// Function responsible for stopping the game

const stopGame = () =>{
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}


// function responsible for upadting the current score

const updateScore = () =>{
    const currentScore = snake.length -1;
    scoreText.textContent = currentScore.toString().padStart(3,'0')

}

// draw();