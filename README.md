# Lab 11 - WebComponents

Lab11 con todo lo que se ha visto en el curso

## Componentes

| Componente | Descripción |
|---|---|
| `<user-dashboard>` | Orquestador principal. Captura eventos y coordina los hijos. |
| `<user-card>` | Tarjeta de usuario con avatar, nombre, rol y botón "Saludar". |
| `<weather-time>` | Muestra el clima actual usando la API de goweather. |
| `<warning-badge>` | Badge animado con atributo `pulsing` reactivo. |

## Flujo de eventos

1. El usuario presiona **Saludar** en `<user-card>`
2. `<user-card>` dispara el evento `usercard:greet` (bubbles + composed)
3. `<user-dashboard>` captura el evento
4. `<user-dashboard>` alterna el atributo `pulsing` en `<warning-badge>`

## Uso local

```bash
pnpm install
pnpm run dev
```

Abrir [http://localhost:1234](http://localhost:1234)

## Deploy

```bash
pnpm run deploy
```
