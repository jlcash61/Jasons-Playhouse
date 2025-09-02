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

  // Fidget Bubble: draggable + color shift
  const bubble = document.getElementById('fidgetBubble');
  let isDragging = false;
  let offsetX, offsetY;

  bubble.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    bubble.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      bubble.style.position = 'absolute';
      bubble.style.left = `${e.pageX - offsetX}px`;
      bubble.style.top = `${e.pageY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
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

  // Breathing Circle already handled with CSS animation
});