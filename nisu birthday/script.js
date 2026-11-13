// CINEMATIC OPENING

const enterBtn = document.getElementById("enterBtn");
const intro = document.getElementById("intro");

enterBtn.addEventListener("click", () => {
    intro.classList.add("hide");
    launchFireworks(100);
});


// BIRTHDAY COUNTDOWN
// Nisath's birthday: 19 November 2006

function updateCountdown() {
    const now = new Date();

    // Find the next November 19
    let birthday = new Date(
        now.getFullYear(), 10, 19, 0, 0, 0
    );

    if (now >= birthday) {
        birthday = new Date(
            now.getFullYear() + 1, 10, 19, 0, 0, 0
        );
    }

    const difference = birthday - now;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

    document.getElementById("countdownMessage").textContent =
        "Until 19 November ❤️";
}

updateCountdown();
setInterval(updateCountdown, 1000);


// LOVE LETTER REVEAL

const letterBtn = document.getElementById("letterBtn");
const letter = document.getElementById("letter");

letterBtn.addEventListener("click", () => {

    letter.classList.toggle("hidden");

    if (letter.classList.contains("hidden")) {
        letterBtn.textContent = "OPEN MY LETTER ❤️";
    } else {
        letterBtn.textContent = "CLOSE MY LETTER";
        launchFireworks(35);
    }
});


// FIREWORKS ANIMATION

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


function createFirework(x, y) {

    const colors = [
        "#ff7eb6",
        "#ffd166",
        "#ffffff",
        "#c77dff",
        "#ff9f68"
    ];

    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    for (let i = 0; i < 65; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;

        particles.push({
            x: x,
            y: y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            alpha: 1,
            size: Math.random() * 3 + 1,
            color: color
        });
    }
}


function launchFireworks(number = 5) {

    for (let i = 0; i < number; i++) {

        setTimeout(() => {

            createFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.65
            );

        }, i * 120);
    }
}


function animateFireworks() {

    ctx.clearRect(
        0, 0,
        window.innerWidth,
        window.innerHeight
    );

    particles.forEach((particle) => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += 0.035;
        particle.vx *= 0.99;

        particle.alpha -= 0.012;

        ctx.globalAlpha = Math.max(0, particle.alpha);

        ctx.fillStyle = particle.color;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    });

    particles = particles.filter(
        particle => particle.alpha > 0
    );

    ctx.globalAlpha = 1;

    requestAnimationFrame(animateFireworks);
}

animateFireworks();


// FINAL BIRTHDAY CELEBRATION

document.getElementById("fireworkBtn")
    .addEventListener("click", () => {

        launchFireworks(120);

        const button = document.getElementById("fireworkBtn");

        button.textContent = "HAPPY BIRTHDAY NISATH ❤️";

        setTimeout(() => {
            button.textContent = "CELEBRATE AGAIN 🎆";
        }, 4000);
    });