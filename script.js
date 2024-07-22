document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const obstacle = document.getElementById("obstacle");
    const jumpButton = document.getElementById("jump-button");
    const scoreElement = document.getElementById("score");

    let isJumping = false;
    let isGameOver = false;
    let score = 0;
    const jumpHeight = 1000;
    const gravity = 0.4;
    const jumpSpeed = 20;
    const jumpVelocity = 10;

    player.style.bottom = '0px';

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
            playerRect.right > obstacleRect.left &&
            playerRect.left < obstacleRect.right &&
            playerRect.bottom > obstacleRect.top &&
            playerRect.top < obstacleRect.bottom
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
        }
    }

    setInterval(() => {
        if (!isGameOver) {
            checkCollision();
        }
    }, 10);

    setInterval(() => {
        if (!isGameOver) {
            updateScore();
        }
    }, 1000);
});
