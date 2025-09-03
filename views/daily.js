// views/daily.js
function injectStyles() {
  if (document.getElementById("daily-style")) return;
  const style = document.createElement("style");
  style.id = "daily-style";
  style.textContent = `
    .daily-goodness {
      text-align: center;
    }

    .daily-box {
      background: #fff8e1;
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem auto;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      max-width: 600px;
    }

    .daily-title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .daily-text {
      font-size: 1rem;
      margin: 0.5rem 0;
    }

    .daily-refresh {
      margin-top: 0.5rem;
      padding: 0.4rem 1rem;
      border: none;
      border-radius: 6px;
      background: #ffca28;
      cursor: pointer;
    }
    .daily-refresh:hover {
      background: #f4b400;
    }
  `;
  document.head.appendChild(style);
}

export function renderDaily(container) {
  injectStyles();

  const div = document.createElement("div");
  div.className = "daily-goodness";
  div.innerHTML = `
    <h2>☀️ Daily Goodness</h2>
    <p>Something uplifting, curious, or useful each time you visit.</p>
    <div class="daily-box">
      <div class="daily-title">Quote of the Day</div>
      <div class="daily-text" id="dailyQuote"></div>
    </div>
    <div class="daily-box">
      <div class="daily-title">Fun Fact</div>
      <div class="daily-text" id="dailyFact"></div>
    </div>
    <button class="daily-refresh">🔄 Refresh</button>
  `;
  container.appendChild(div);

  const quotes = [
    "You’re stronger than you think.",
    "Small steps still move you forward.",
    "Every day is a chance to start fresh.",
    "You’ve made it through 100% of your hardest days.",
    "Kindness is free — sprinkle it everywhere."
  ];

  const facts = [
    "Bananas are berries, but strawberries are not.",
    "Octopuses have three hearts.",
    "Sharks existed before trees.",
    "The Eiffel Tower grows taller in summer heat.",
    "Sloths can hold their breath longer than dolphins."
  ];

  const quoteEl = div.querySelector("#dailyQuote");
  const factEl = div.querySelector("#dailyFact");
  const refreshBtn = div.querySelector(".daily-refresh");

  function loadContent() {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    factEl.textContent = facts[Math.floor(Math.random() * facts.length)];
  }

  refreshBtn.addEventListener("click", loadContent);

  // Init content
  loadContent();
}
