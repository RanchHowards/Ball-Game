var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 10;
var ballRadius = 14;
var dx = Math.random() * 10 - 5;
var dy = -4;
var leftPressed = false;
var rightPressed = false;
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var brickRowCount = 3;
var brickColCount = 4;
var brickPadding = 10;
var brickHeight = 20;
var brickWidth = 75;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
var score = 0;
var lives = 3;

for (let c = 0; c < brickColCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) [
        bricks[c][r] = { x: 0, y: 0, status: 1 }
    ]
}

document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('mousemove', mouseEventHandler, false);

function keyDownHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (event.key == "Left" || event.key == "ArrowLeft") { //I believe "Left" & "Right" are for IE
        leftPressed = false;
    }
}
function mouseEventHandler(event) {
    relativeX = event.clientX - canvas.offsetLeft;
    if (relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
        paddleX = relativeX - (paddleWidth / 2);
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}
function drawCircle() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (let c = 0; c < brickColCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                var brickX = (c * (brickWidth + brickPadding) + brickOffsetLeft);
                var brickY = (r * (brickHeight + brickPadding) + brickOffsetTop);
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#991100";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickColCount * brickRowCount) {
                        alert("YOU FUCKING WON!!!!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#27c1af";
    ctx.fillText("Lives: " + lives, 330, 20);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawCircle();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < (paddleX + paddleWidth)) {
            dy = -dy * 1.1;
            dx = Math.random() * 8 - 4;

        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            dx = Math.random() * 5 - 2.5;
            dy = -dy - 3;
        }
    }
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}


draw();