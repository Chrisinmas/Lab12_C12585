const template = document.createElement("template");
template.setHTMLUnsafe(/* html */`
  <style>
    :host {
      display: block;
      font-family: inherit;
    }

    .card {
      background: var(--wt-bg, #1e293b);
      border: 1px solid var(--wt-border, #334155);
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      min-width: 160px;
    }

    .city {
      font-size: 1rem;
      font-weight: 600;
      color: var(--wt-city-color, #94a3b8);
      text-transform: capitalize;
    }

    .temp {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--wt-temp-color, #f1f5f9);
      line-height: 1;
    }

    .description {
      font-size: 0.9rem;
      color: var(--wt-desc-color, #94a3b8);
      text-align: center;
    }

    .loading {
      --size: 12px;
      display: flex;
      gap: 6px;
    }

    .dot {
      width: var(--size);
      height: var(--size);
      background: #6366f1;
      border-radius: 50%;
      animation: bounce 0.8s infinite alternate;
    }

    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes bounce {
      0%   { translate: 0 -6px; }
      100% { translate: 0 0; }
    }
  </style>
  <div class="card" part="card">
    <div class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
`);

class WeatherTime extends HTMLElement {
  #data = null;

  static get observedAttributes() {
    return ["location"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const location = this.getAttribute("location") ?? "liberia+guanacaste";
    this.#fetchWeather(location);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "location" && oldVal !== null) {
      this.#fetchWeather(newVal);
    }
  }

  async #fetchWeather(location) {
    const URL = `https://goweather.xyz/v2/weather/${location}`;
    try {
      const response = await fetch(URL);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      this.#data = await response.json();
      this.#render();
    } catch (error) {
      console.error("[weather-time] Error al obtener clima:", error);
      this.#renderError();
    }
  }

  get #temperature() {
    return this.#data?.temperature ?? null;
  }

  get #description() {
    return this.#data?.description ?? "";
  }

  get #locationLabel() {
    const loc = this.getAttribute("location") ?? "liberia+guanacaste";
    return loc.replace(/\+/g, " ").replace(/\b\w/g, l => l.toUpperCase()).split(" ")[0];
  }

  #render() {
    const $card = this.shadowRoot.querySelector(".card");
    $card.setHTMLUnsafe(/* html */`
      <span class="city" part="city">${this.#locationLabel}</span>
      <span class="temp" part="temp">${this.#temperature}</span>
      <span class="description" part="description">${this.#description}</span>
    `);
  }

  #renderError() {
    const $card = this.shadowRoot.querySelector(".card");
    $card.setHTMLUnsafe(/* html */`
      <span class="description">No se pudo cargar el clima</span>
    `);
  }
}

customElements.define("weather-time", WeatherTime);
