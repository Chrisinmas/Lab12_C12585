const template = document.createElement("template");
template.setHTMLUnsafe(/* html */`
  <style>
    :host {
      display: block;
      font-family: inherit;
    }

    .card {
      background: var(--uc-bg, #1e293b);
      border: 1px solid var(--uc-border, #334155);
      border-radius: 1rem;
      padding: 1.75rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      min-width: 180px;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--uc-accent, #6366f1);
      background: #334155;
    }

    .name {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--uc-name-color, #f1f5f9);
      text-align: center;
    }

    .role {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--uc-role-color, #818cf8);
      background: rgb(99 102 241 / 0.15);
      padding: 0.2rem 0.75rem;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .btn {
      margin-top: 0.25rem;
      padding: 0.5rem 1.25rem;
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 600;
      color: #fff;
      background: var(--uc-accent, #6366f1);
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background 0.2s, scale 0.15s;
    }

    .btn:hover {
      background: var(--uc-accent-hover, #4f46e5);
    }

    .btn:active {
      scale: 0.96;
    }
  </style>
  <div class="card" part="card">
    <img class="avatar" part="avatar" src="" alt="Avatar" />
    <span class="name" part="name"></span>
    <span class="role" part="role"></span>
    <button class="btn" part="btn">Saludar</button>
  </div>
`);

class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ["name", "role", "avatar"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#updateContent();
    this.#attachEvents();
  }

  attributeChangedCallback() {
    this.#updateContent();
  }

  #updateContent() {
    const name   = this.getAttribute("name")   ?? "Usuario";
    const role   = this.getAttribute("role")   ?? "";
    const avatar = this.getAttribute("avatar") ?? `https://api.dicebear.com/9.x/thumbs/svg?seed=${name}`;

    const $avatar = this.shadowRoot.querySelector(".avatar");
    const $name   = this.shadowRoot.querySelector(".name");
    const $role   = this.shadowRoot.querySelector(".role");

    if ($avatar) { $avatar.src = avatar; $avatar.alt = name; }
    if ($name)   $name.textContent = name;
    if ($role)   $role.textContent = role;
  }

  #attachEvents() {
    const $btn = this.shadowRoot.querySelector(".btn");
    $btn.addEventListener("click", () => this.#greet());
  }

  #greet() {
    const name = this.getAttribute("name") ?? "Usuario";

    // Dispara evento personalizado que burbujea y atraviesa Shadow DOM
    this.dispatchEvent(new CustomEvent("usercard:greet", {
      bubbles: true,
      composed: true,
      detail: { name }
    }));
  }
}

customElements.define("user-card", UserCard);
