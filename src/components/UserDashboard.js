const template = document.createElement("template");
template.setHTMLUnsafe(/* html */`
  <style>
    :host {
      display: block;
      font-family: inherit;
    }

    .dashboard {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .widgets {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }

    .notification {
      display: flex;
      justify-content: center;
    }
  </style>
  <div class="dashboard" part="dashboard">
    <div class="widgets" part="widgets">
      <slot name="card"></slot>
      <slot name="weather"></slot>
    </div>
    <div class="notification" part="notification">
      <slot name="badge"></slot>
    </div>
  </div>
`);

class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#assignSlots();
    this.#listenGreet();
  }

  // Asigna slots a los hijos según su tipo
  #assignSlots() {
    const $card    = this.querySelector("user-card");
    const $weather = this.querySelector("weather-time");
    const $badge   = this.querySelector("warning-badge");

    if ($card)    $card.setAttribute("slot", "card");
    if ($weather) $weather.setAttribute("slot", "weather");
    if ($badge)   $badge.setAttribute("slot", "badge");
  }

  // Escucha el evento del botón "Saludar" del user-card
  #listenGreet() {
    this.addEventListener("usercard:greet", (event) => {
      const { name } = event.detail;
      console.log(`[user-dashboard] Saludo recibido de: ${name}`);
      this.#toggleBadgePulsing(name);
    });
  }

  // Activa o desactiva el atributo pulsing del warning-badge
  #toggleBadgePulsing(name) {
    const $badge = this.querySelector("warning-badge");
    if (!$badge) return;

    const isActive = $badge.hasAttribute("pulsing");

    if (isActive) {
      $badge.removeAttribute("pulsing");
      $badge.textContent = `Sesión por expirar`;
    } else {
      $badge.setAttribute("pulsing", "");
      $badge.textContent = `¡Hola, ${name}! Sesión activa`;
    }
  }
}

customElements.define("user-dashboard", UserDashboard);
