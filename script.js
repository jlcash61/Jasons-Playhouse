document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('surpriseBtn');
  const box = document.getElementById('surpriseBox');

  btn.addEventListener('click', () => {
    if (box.classList.contains('hidden')) {
      box.classList.remove('hidden');
      btn.textContent = 'Hide the Magic';
    } else {
      box.classList.add('hidden');
      btn.textContent = 'Click Me for a Surprise!';
    }
  });

  // Fidget Bubble: draggable + color shift (cross-platform)
  const bubble = document.getElementById('fidgetBubble');
  const area = document.querySelector('.fidget-area');
  if (bubble && area) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    bubble.addEventListener('pointerdown', (e) => {
      isDragging = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      bubble.setPointerCapture(e.pointerId);
      bubble.style.cursor = 'grabbing';
    });

    bubble.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const rect = area.getBoundingClientRect();
      let x = e.clientX - rect.left - offsetX;
      let y = e.clientY - rect.top - offsetY;

      // Constrain inside the fidget-area
      x = Math.max(0, Math.min(rect.width - bubble.offsetWidth, x));
      y = Math.max(0, Math.min(rect.height - bubble.offsetHeight, y));

      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
    });

    bubble.addEventListener('pointerup', (e) => {
      isDragging = false;
      bubble.releasePointerCapture(e.pointerId);
      bubble.style.cursor = 'grab';
      // Random color when dropped
      const colors = ["#ff9a9e", "#fad0c4", "#fbc2eb", "#a1c4fd", "#c2e9fb"];
      const random = colors[Math.floor(Math.random() * colors.length)];
      bubble.style.background = random;
    });
  }

  // Fidget Square: spin on click
  const square = document.getElementById('fidgetSquare');
  if (square) {
    square.addEventListener('click', () => {
      square.classList.add('spin');
      setTimeout(() => square.classList.remove('spin'), 500);
    });
  }

  // --- Duck Shoot Game ---
  const canvas = document.getElementById('duckGame');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let ducks = [];
  let score = 0;
  const scoreDisplay = document.getElementById('score');
  const resetBtn = document.getElementById('resetGame');

  function spawnDuck() {
    const y = Math.random() * (canvas.height - 40) + 20;
    ducks.push({ x: -50, y: y, size: 30, speed: 2 + Math.random() * 2 });
  }

  function drawDucks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "28px sans-serif";

    ducks.forEach((duck) => {
      ctx.fillText("🦆", duck.x, duck.y);
      duck.x += duck.speed;
    });

    ducks = ducks.filter((duck) => duck.x < canvas.width + 50);
  }

  function gameLoop() {
    if (!ctx) return;
    drawDucks();
    requestAnimationFrame(gameLoop);
  }

  canvas?.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ducks.forEach((duck, index) => {
      if (x >= duck.x && x <= duck.x + duck.size && y >= duck.y - duck.size && y <= duck.y) {
        ducks.splice(index, 1);
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
      }
    });
  });

  resetBtn?.addEventListener('click', () => {
    ducks = [];
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    for (let i = 0; i < 5; i++) spawnDuck();
  });

  if (canvas && ctx) {
    for (let i = 0; i < 5; i++) spawnDuck();
    gameLoop();
  }
});