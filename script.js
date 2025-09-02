document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('surpriseBtn');
  const box = document.getElementById('surpriseBox');

  btn.addEventListener('click', () => {
    if (box.classList.contains('hidden')) {
      box.classList.remove('hidden');
      btn.textContent = 'Hide the Magic';
      box.classList.add('animate');
    } else {
      box.classList.add('hidden');
      btn.textContent = 'Click Me for a Surprise!';
    }
  });
});