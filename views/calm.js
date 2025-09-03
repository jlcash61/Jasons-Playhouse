// views/calm.js
function injectStyles() {
  if (document.getElementById("calm-style")) return;
  const style = document.createElement("style");
  style.id = "calm-style";
  style.textContent = `
    .calm-zone {
      text-align: center;
    }

    .breathing-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #81c784;
      margin: 2rem auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      color: white;
      animation: breathe 8s infinite;
    }

    @keyframes breathe {
      0% { transform: scale(1); background: #81c784; }
      25% { transform: scale(1.5); background: #66bb6a; }
      50% { transform: scale(1.5); background: #4caf50; }
      75% { transform: scale(1); background: #66bb6a; }
      100% { transform: scale(1); background: #81c784; }
    }

    .calm-text {
      margin-top: 1rem;
      font-size: 1.2rem;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);
}

export function renderCalm(container) {
  injectStyles();

  const div = document.createElement("div");
  div.className = "calm-zone";
  div.innerHTML = `
    <h2>🌱 Calm Zone</h2>
    <p>Follow the circle, match your breath.</p>
    <div class="breathing-circle"></div>
    <div class="calm-text">Breathe In</div>
  `;
  container.appendChild(div);

  const circle = div.querySelector(".breathing-circle");
  const text = div.querySelector(".calm-text");

  // Text cycle sync with animation timing (8s total)
  let phase = 0;
  setInterval(() => {
    phase = (phase + 1) % 4;
    if (phase === 0) text.textContent = "Breathe In";
    if (phase === 1) text.textContent = "Hold";
    if (phase === 2) text.textContent = "Breathe Out";
    if (phase === 3) text.textContent = "Hold";
  }, 2000);
}
