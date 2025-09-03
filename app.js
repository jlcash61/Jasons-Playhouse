// app.js

// Import view modules
import { renderFidgets } from './views/fidgets.js';
import { renderDucks } from './views/ducks.js';
import { renderCalm } from './views/calm.js';
import { renderDaily } from './views/daily.js';

const app = document.getElementById('app');
const navButtons = document.querySelectorAll('nav button');

// Map view names to render functions
const routes = {
  fidgets: renderFidgets,
  ducks: renderDucks,
  calm: renderCalm,
  daily: renderDaily,
};

// Helper: set active nav button
function setActive(view) {
  navButtons.forEach(btn => {
    if (btn.dataset.view === view) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Default view (load Fidgets first)
routes.fidgets(app);
setActive('fidgets');

// Listen for nav clicks
document.querySelector('nav').addEventListener('click', (e) => {
  if (e.target.dataset.view) {
    const view = e.target.dataset.view;

    // Update nav active state
    setActive(view);

    // Clear old view & render new
    app.innerHTML = '';
    routes[view](app);
  }
});
