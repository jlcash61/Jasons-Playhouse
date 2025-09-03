// views/ducks.js
function injectStyles() {
  if (document.getElementById("ducks-style")) return;
  const style = document.createElement("style");
  style.id = "ducks-style";
  style.textContent = `
    .duck-game { text-align: center; }
    #duckCanvas {
      background: #e0f7fa;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      margin: 1rem auto;
      display: block;
    }
    #duckScore {
      font-size: 1.2rem;
      margin: 0.5rem;
    }
    #resetDucks {
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background: #444;
      color: white;
      cursor: pointer;
    }
    #resetDucks:hover {
      background: #333;
    }
  `;
  document.head.appendChild(style);
}

export function renderDucks(container) {
  injectStyles();

  const div = document.createElement("div");
  div.className = "duck-game";
  div.innerHTML = `
    <h2>🦆 Duck Shoot</h2>
    <p>Tap the ducks as they fly!</p>
    <canvas id="duckCanvas" width="600" height="400"></canvas>
    <p id="duckScore">Score: 0</p>
    <button id="resetDucks">Reset Game</button>
  `;
  container.appendChild(div);

  const canvas = div.querySelector("#duckCanvas");
  const ctx = canvas.getContext("2d");
  let ducks = [];
  let score = 0;

  function spawnDuck() {
    const y = Math.random() * (canvas.height - 40) + 20;
    ducks.push({
      x: -50,
      y: y,
      size: 30,
      speed: 2 + Math.random() * 2,
    });
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
    drawDucks();
    requestAnimationFrame(gameLoop);
  }

  canvas.addEventListener("pointerdown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ducks.forEach((duck, index) => {
      if (
        x >= duck.x &&
        x <= duck.x + duck.size &&
        y >= duck.y - duck.size &&
        y <= duck.y
      ) {
        ducks.splice(index, 1);
        score++;
        div.querySelector("#duckScore").textContent = `Score: ${score}`;
      }
    });
  });

  div.querySelector("#resetDucks").addEventListener("click", () => {
    ducks = [];
    score = 0;
    div.querySelector("#duckScore").textContent = "Score: 0";
    for (let i = 0; i < 5; i++) spawnDuck();
  });

  // Init game
  for (let i = 0; i < 5; i++) spawnDuck();
  gameLoop();
}
