// views/fidgets.js
function injectStyles() {
  if (document.getElementById("fidgets-style")) return;
  const style = document.createElement("style");
  style.id = "fidgets-style";
  style.textContent = `
    .fidget-area {
      border: 2px dashed #ccc;
      border-radius: 8px;
      width: 300px;
      height: 200px;
      margin: 1rem auto;
      position: relative;
      overflow: hidden;
    }

    .fidget-bubble {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #4db6ff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: grab;
      transition: background 0.3s ease;
    }

    .fidget-square {
      width: 50px;
      height: 50px;
      background: #ff7f7f;
      position: absolute;
      bottom: 10px;
      right: 10px;
      transition: transform 0.5s ease;
      cursor: pointer;
    }

    .fidget-square.spin {
      transform: rotate(360deg);
    }
  `;
  document.head.appendChild(style);
}

export function renderFidgets(container) {
  injectStyles();

  const div = document.createElement("div");
  div.innerHTML = `
    <h2>🌀 Fidget Corner</h2>
    <p>Drag the bubble, click the square!</p>
    <div class="fidget-area">
      <div class="fidget-bubble" title="Drag me!"></div>
      <div class="fidget-square" title="Click me!"></div>
    </div>
  `;
  container.appendChild(div);

  const area = div.querySelector(".fidget-area");
  const bubble = div.querySelector(".fidget-bubble");
  const square = div.querySelector(".fidget-square");

  // Bubble drag
  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  bubble.addEventListener("pointerdown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    bubble.setPointerCapture(e.pointerId);
  });

  bubble.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const rect = area.getBoundingClientRect();
    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;
    // constrain inside area
    x = Math.max(0, Math.min(rect.width - bubble.offsetWidth, x));
    y = Math.max(0, Math.min(rect.height - bubble.offsetHeight, y));
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
  });

  bubble.addEventListener("pointerup", (e) => {
    isDragging = false;
    bubble.releasePointerCapture(e.pointerId);
    // Random background color on release
    const colors = ["#4db6ff", "#ff7f7f", "#ffd54f", "#81c784", "#ba68c8"];
    bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
  });

  // Square spin
  square.addEventListener("click", () => {
    square.classList.add("spin");
    setTimeout(() => square.classList.remove("spin"), 500);
  });
}
