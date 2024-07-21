document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const obstacle = document.getElementById("obstacle");
    const jumpButton = document.getElementById("jump-button");
    let isJumping = false;
    let isGameOver = false;
    const jumpHeight = 1000; // 최대 점프 높이
    const gravity = 0.4; // 중력 가속도
    const jumpSpeed = 20; // 점프 애니메이션 간격
    const jumpVelocity = 10; // 초기 점프 속도

    // 플레이어의 초기 위치를 설정
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
        if (isJumping) return; // 이미 점프 중이면 무시
        isJumping = true;
        let currentBottom = parseInt(player.style.bottom);
        let velocity = jumpVelocity;

        // 점프 애니메이션
        let interval = setInterval(() => {
            currentBottom += velocity;
            velocity -= gravity;

            if (currentBottom >= jumpHeight) {
                currentBottom = jumpHeight;
                velocity = -velocity; // 점프 정점에서 하강 시작
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
            alert("Game Over!");
            isGameOver = true;
            window.location.reload();
        }
    }

    setInterval(() => {
        if (!isGameOver) {
            checkCollision();
        }
    }, 10);
});
