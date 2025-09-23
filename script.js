const cursor = document.querySelector(".cursor");
const holes = [...document.querySelectorAll(".hole")];
const scoreE1 = document.querySelector(".score-container .score-value");
const timerE1 = document = document.querySelector(".timer-container .timer-value");
const sound = new Audio("assets/pukul.mp3");
const bgm = new Audio("assets/bgSound.mp3");

const startScreen = document.querySelector(".start-screen");
const startButton = document.getElementById("startButton");
const resultModal = document.getElementById("result-modal");
const finalScoreText = document.getElementById("final-score-text");
const playAgainBtn = document.getElementById("play-again-btn");
const finalResultTitle = document.getElementById("final-result-title");

bgm.loop = true;
bgm.volume = 0.5;

let score = 0;
let time = 30;
let timerId;
let gameInterval;
let isGameRunning = false;

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const gameSpeed = isMobile ? 400 : 1000;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function run() {
    holes.forEach(hole => {
        const existingTikus = hole.querySelector(".tikus");
        if (existingTikus) {
            hole.removeChild(existingTikus);
        }
    });

    const i = randomInt(0, holes.length - 1);
    const hole = holes[i];
    
    const img = document.createElement("img");
    img.classList.add("tikus");
    img.src = "assets/tikus.png";

    img.addEventListener("click", () => {
        if (!isGameRunning) return;
        score += 5;
        sound.play();
        scoreE1.textContent = score;
        img.src = "assets/efek.png";
        setTimeout(() => {
            if (hole.contains(img)) {
                hole.removeChild(img);
            }
        }, 500);
    });

    hole.appendChild(img);

    setTimeout(() => {
        if (hole.contains(img)) {
            hole.removeChild(img);
        }
    }, 1500);
}

function getScoreCategory(finalScore) {
    if (finalScore >= 250) {
        return "Kelas Kakap! 🦈";
    } else if (finalScore >= 150) {
        return "Kelas Menengah! 💼";
    } else if (finalScore >= 75) {
        return "Kelas Teri! 🐟";
    } else if (finalScore >= 25) {
        return "Masih Kurang Jago! 🧐";
    } else {
        return "Belum Mampu Gebuk! 🙈";
    }
}

function getFinalResultTitle(finalScore) {
    if (finalScore >= 100) {
        return "OPERASI TANGKAP TANGAN (OTT) BERHASIL!";
    } else {
        return "TIM OPERASI GAGAL TOTAL!";
    }
}

function startGame() {
    if (isGameRunning) return;
    
    startScreen.style.display = "none";
    bgm.play();
    
    score = 0;
    time = 30;
    scoreE1.textContent = score;
    timerE1.textContent = time;

    isGameRunning = true;
    
    gameInterval = setInterval(run, gameSpeed);
    
    timerId = setInterval(() => {
        time--;
        timerE1.textContent = time;
        
        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    isGameRunning = false;
    clearInterval(timerId);
    clearInterval(gameInterval);
    bgm.pause();
    bgm.currentTime = 0;

    holes.forEach(hole => {
        const img = hole.querySelector(".tikus");
        if (img) {
            hole.removeChild(img);
        }
    });

    const category = getScoreCategory(score);
    finalResultTitle.textContent = getFinalResultTitle(score);
    finalScoreText.textContent = `Skor akhir Anda: ${score} (${category})`;
    resultModal.style.display = "flex";
}

startButton.addEventListener("click", () => {
    startGame();
});

playAgainBtn.addEventListener("click", () => {
    resultModal.style.display = "none";
    startScreen.style.display = "flex";
});

window.addEventListener("mousemove", (e) => {
    if (!isMobile) {
        cursor.style.top = e.pageY + "px";
        cursor.style.left = e.pageX + "px";
    }
});
window.addEventListener("mousedown", () => {
    if (!isMobile) {
        cursor.classList.add("active");
    }
});
window.addEventListener("mouseup", () => {
    if (!isMobile) {
        cursor.classList.remove("active");
    }
});