const template = document.createElement("template");
template.setHTMLUnsafe(/* html */`
  <style>
    :host {
      display: inline-block;
      font-family: inherit;
    }

    .badge {
      --stripe: 22px;
      --color: #FFE000;
      --glow: rgb(100% 90% 0 / 25%);

      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 0.875rem;
      color: #1a1a1a;
      background: repeating-linear-gradient(
        -55deg,
        var(--color) 0,
        var(--color) var(--stripe),
        #333 var(--stripe),
        #333 calc(var(--stripe) * 2)
      );
      border-radius: 0.5rem;
      border: 2px solid var(--color);
      box-shadow: 0 0 12px var(--glow);
      position: relative;
      overflow: hidden;
      user-select: none;
      cursor: default;
    }

    .badge::before {
      content: "⚠";
      font-size: 1rem;
    }

    .badge::after {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(255 255 255 / 0.08);
    }

    :host([pulsing]) .badge::after {
      animation: pulse-screen 1.2s ease-in-out infinite alternate;
    }

    @keyframes pulse-screen {
      0%   { background: rgba(255 255 255 / 0.03); }
      100% { background: rgba(255 255 255 / 0.22); }
    }
  </style>
  <div class="badge" part="badge">
    <slot>Advertencia</slot>
  </div>
`);

class WarningBadge extends HTMLElement {
  static get observedAttributes() {
    return ["pulsing"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldVal, newVal) {
    // La reactividad se maneja con CSS :host([pulsing])
    // Solo necesitamos disparar un re-render si fuera necesario
    console.log(`[warning-badge] atributo "${name}": ${oldVal} → ${newVal}`);
  }

  setPulsing(active) {
    if (active) {
      this.setAttribute("pulsing", "");
    } else {
      this.removeAttribute("pulsing");
    }
  }
}

customElements.define("warning-badge", WarningBadge);
