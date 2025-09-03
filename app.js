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

// Showed Up tracker
const showedUpBtn = document.getElementById("showedUpBtn");
const showedUpMsg = document.getElementById("showedUpMsg");

function updateShowedUpMessage() {
  const data = JSON.parse(localStorage.getItem("showedUp") || "{}");
  if (data.date) {
    showedUpMsg.textContent = `Last checked in: ${data.date} | Streak: ${data.streak} days`;
  }
}

showedUpBtn.addEventListener("click", () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  let data = JSON.parse(localStorage.getItem("showedUp") || "{}");

  if (data.date === today) {
    // Already clicked today
    showedUpMsg.textContent = `Already checked in today (${today}) | Streak: ${data.streak} days`;
  } else {
    // New day → increment streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split("T")[0];

    if (data.date === yStr) {
      data.streak = (data.streak || 0) + 1; // continue streak
    } else {
      data.streak = 1; // reset streak
    }

    data.date = today;
    localStorage.setItem("showedUp", JSON.stringify(data));
    updateShowedUpMessage();
  }
});

// Init
updateShowedUpMessage();
