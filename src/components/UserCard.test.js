import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./UserCard.js";

describe("UserCard", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("user-card");
    document.body.append(el);
  });

  afterEach(() => el.remove());

  describe("registro y renderizado inicial", () => {
    it("se registra como custom element", () => {
      expect(customElements.get("user-card")).toBeDefined();
    });

    it("renderiza un botón al conectarse", () => {
      expect(el.shadowRoot.querySelector(".btn")).not.toBeNull();
    });

    it("muestra nombre por defecto", () => {
      expect(el.shadowRoot.querySelector(".name").textContent).toBe("Usuario");
    });
  });

  describe("atributos", () => {
    it("muestra el nombre del atributo", () => {
      el.setAttribute("name", "Alonso");
      expect(el.shadowRoot.querySelector(".name").textContent).toBe("Alonso");
    });

    it("muestra el rol del atributo", () => {
      el.setAttribute("role", "Profesor");
      expect(el.shadowRoot.querySelector(".role").textContent).toBe("Profesor");
    });
  });

  describe("evento", () => {
    it("dispara evento usercard:greet al hacer click", () => {
      el.setAttribute("name", "Alonso");
      let fired = false;
      el.addEventListener("usercard:greet", (e) => {
        fired = true;
        expect(e.detail.name).toBe("Alonso");
      });
      el.shadowRoot.querySelector(".btn").click();
      expect(fired).toBe(true);
    });
  });
});