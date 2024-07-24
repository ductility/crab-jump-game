document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const obstacle = document.getElementById("obstacle");
    const jumpButton = document.getElementById("jump-button");
    const scoreElement = document.getElementById("score");

    // 배경 요소 추가
    const background1 = document.createElement('div');
    background1.classList.add('background');
    background1.id = 'background1';
    document.querySelector('.game-container').appendChild(background1);

    const background2 = document.createElement('div');
    background2.classList.add('background');
    background2.id = 'background2';
    document.querySelector('.game-container').appendChild(background2);

    let isJumping = false;
    let isGameOver = false;
    let score = 0;
    let jumpCount = 0; // 더블 점프를 위한 점프 카운트

    const jumpHeight = 500;
    const gravity = 0.7; // 중력 가속도를 적절히 조절
    const jumpVelocity = 12; // 초기 점프 속도
    const collisionBuff = 10;
    let obstacleSpeed = 5;
    let obstaclePosition = 800;
    let velocity = 0; // 플레이어의 속도를 추적

    player.style.bottom = '0px';
    obstacle.style.left = `${obstaclePosition}px`;

    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            jump();
        }
    });

    jumpButton.addEventListener("click", () => {
        jump();
    });

    function jump() {
        if (jumpCount >= 2) return; // 더블 점프를 위한 조건
        if (isGameOver) return;

        velocity = jumpVelocity; // 점프 시 속도 설정
        jumpCount++;
    }

    function applyGravity() {
        let currentBottom = parseInt(player.style.bottom);
        velocity -= gravity; // 중력을 속도에 적용
        currentBottom += velocity;

        if (currentBottom <= 0) { // 플레이어가 바닥에 닿으면
            currentBottom = 0;
            isJumping = false;
            jumpCount = 0; // 점프 카운트 리셋
            velocity = 0; // 속도 리셋
        }

        player.style.bottom = `${currentBottom}px`;

        if (!isGameOver) {
            requestAnimationFrame(applyGravity);
        }
    }

    function checkCollision() {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
        const width = playerRect.right - playerRect.left;
        if (
            playerRect.right - collisionBuff > obstacleRect.left &&
            (playerRect.left + width / 2) - collisionBuff < obstacleRect.right &&
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
        if (obstaclePosition <= -5 && !isJumping) {
            obstaclePosition = Math.random() * 501 + 300;;
        }
        obstacle.style.left = `${obstaclePosition}px`;
        checkCollision();
        requestAnimationFrame(moveObstacle);
    }

    function moveBackground() {
        const background1Position = parseInt(window.getComputedStyle(background1).left);
        const background2Position = parseInt(window.getComputedStyle(background2).left);

        background1.style.left = `${background1Position - obstacleSpeed}px`;
        background2.style.left = `${background2Position - obstacleSpeed}px`;

        if (background1Position <= -gameContainer.offsetWidth) {
            background1.style.left = `${background2Position + gameContainer.offsetWidth}px`;
        }

        if (background2Position <= -gameContainer.offsetWidth) {
            background2.style.left = `${background1Position + gameContainer.offsetWidth}px`;
        }
    }

    setInterval(() => {
        if (!isGameOver) {
            updateScore();
        }
    }, 1000);

    function gameLoop() {
        if (!isGameOver) {
            moveObstacle();
            moveBackground();
            requestAnimationFrame(gameLoop);
        }
    }

    applyGravity();
    gameLoop();
});
