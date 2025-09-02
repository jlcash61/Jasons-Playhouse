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

  // Fidget Square: spin on click
  const square = document.getElementById('fidgetSquare');
  square.addEventListener('click', () => {
    square.classList.add('spin');
    setTimeout(() => square.classList.remove('spin'), 500);
  });

  // Breathing Circle handled by CSS
});