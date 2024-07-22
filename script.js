document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const obstacle = document.getElementById("obstacle");
    const jumpButton = document.getElementById("jump-button");
    const scoreElement = document.getElementById("score");

    let isJumping = false;
    let isGameOver = false;
    let score = 0;
    const jumpHeight = 150;
    const gravity = 0.4;
    const jumpSpeed = 20;
    const jumpVelocity = 10;
    const collisionBuff = 10;
    let obstacleSpeed = 5;
    let obstaclePosition = 800;

    player.style.bottom = '0px';
    obstacle.style.left = `${obstaclePosition}px`;

    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" && !isJumping) {
            jump();
        }
    });

    jumpButton.addEventListener("click", () => {
        jump();
    });

    function jump() {
        if (isJumping) return;
        isJumping = true;
        let currentBottom = parseInt(player.style.bottom);
        let velocity = jumpVelocity;

        let interval = setInterval(() => {
            currentBottom += velocity;
            velocity -= gravity;

            if (currentBottom >= jumpHeight) {
                currentBottom = jumpHeight;
                velocity = -velocity;
            }

            if (currentBottom <= 0) {
                currentBottom = 0;
                clearInterval(interval);
                isJumping = false;
            }

            player.style.bottom = `${currentBottom}px`;
        }, jumpSpeed);
    }

    function checkCollision() {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
        if (
            playerRect.right - collisionBuff > obstacleRect.left &&
            playerRect.left - collisionBuff < obstacleRect.right &&
            playerRect.bottom - collisionBuff > obstacleRect.top &&
            playerRect.top - collisionBuff < obstacleRect.bottom
        ) {
            alert("Game Over! Your score: " + score);
            isGameOver = true;
            window.location.reload();
        }
    }

    function updateScore() {
        if (!isGameOver) {
            score++;
            scoreElement.textContent = score;
            updateObstacleSpeed();
        }
    }

    function updateObstacleSpeed() {
        obstacleSpeed = 5 + score * 0.1;
    }

    function moveObstacle() {
        if (isGameOver) return;
        obstaclePosition -= obstacleSpeed;
        if (obstaclePosition <= -50) {
            obstaclePosition = 800;
        }
        obstacle.style.left = `${obstaclePosition}px`;
        checkCollision();
        requestAnimationFrame(moveObstacle);
    }

    setInterval(() => {
        if (!isGameOver) {
            updateScore();
        }
    }, 1000);

    moveObstacle();
});
