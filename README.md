# @tavosud/floating-button-whatsapp-modern

Botón flotante de WhatsApp completamente personalizable con popup estilo chat. Compatible con Vanilla JS, TypeScript, React, Vue, Angular y cualquier framework JavaScript/TypeScript.

[![npm version](https://img.shields.io/npm/v/@tavosud/floating-button-whatsapp-modern)](https://www.npmjs.com/package/@tavosud/floating-button-whatsapp-modern)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

![Preview](assets/preview.jpg)

---

## Características

- **Popup estilo WhatsApp** — encabezado con avatar, indicador online, nombre y slogan; burbuja de mensaje con nombre del remitente; botón de envío tipo píldora
- **Animación shake** — el botón flotante se sacude periódicamente para llamar la atención (cada 6 s, pausa al hacer hover)
- **Totalmente personalizable** — 9 propiedades de color + posición, texto y más
- **Sin dependencias** — cero dependencias en producción
- **CSS separado** — incluye un archivo `.css` standalone para uso con CDN
- **Formatos ESM y CJS** — compatible con bundlers modernos y Node.js
- **TypeScript nativo** — tipos incluidos

---

## Instalación

```bash
npm install @tavosud/floating-button-whatsapp-modern
```

---

## Uso rápido

### Vanilla JS / TypeScript

```ts
import { createWhatsAppButton } from '@tavosud/floating-button-whatsapp-modern';

createWhatsAppButton({
  phone:   '51987654321',         // requerido — con código de país
  name:    'Soporte',
  slogan:  'Respondemos en minutos',
  avatar:  'https://ejemplo.com/foto.jpg',
  message: 'Hola, tengo una consulta sobre...',
});
```

### HTML (CDN / script tag)

Incluye el CSS standalone y el módulo JS:

```html
<!-- Estilos base (opcional si ya los incluye tu bundler) -->
<link rel="stylesheet" href="https://unpkg.com/@tavosud/floating-button-whatsapp-modern/dist/floating-button-whatsapp-modern.css">

<script type="module">
  import { createWhatsAppButton } from 'https://unpkg.com/@tavosud/floating-button-whatsapp-modern/dist/index.esm.js';

  createWhatsAppButton({
    phone:   '51987654321',
    name:    'Ventas',
    slogan:  '¡Hola! ¿Cómo podemos ayudarte?',
    message: 'Hola, quiero más información.',
  });
</script>
```

### React

```tsx
import { useEffect, useRef } from 'react';
import { WhatsAppButton } from '@tavosud/floating-button-whatsapp-modern';

export function WhatsAppWidget() {
  const btnRef = useRef<WhatsAppButton | null>(null);

  useEffect(() => {
    btnRef.current = new WhatsAppButton({
      phone:   '51987654321',
      name:    'Ventas',
      slogan:  '¡Hola! ¿Cómo podemos ayudarte?',
      message: 'Hola, quiero más información.',
    });
    btnRef.current.mount();

    return () => btnRef.current?.unmount();
  }, []);

  return null;
}
```

### Vue 3

```ts
// composable: useWhatsApp.ts
import { onMounted, onUnmounted } from 'vue';
import { WhatsAppButton } from '@tavosud/floating-button-whatsapp-modern';

export function useWhatsApp() {
  let btn: WhatsAppButton;

  onMounted(() => {
    btn = new WhatsAppButton({
      phone:   '51987654321',
      name:    'Soporte',
      slogan:  'Respondemos en minutos',
    });
    btn.mount();
  });

  onUnmounted(() => btn?.unmount());
}
```

### Angular

```ts
// app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WhatsAppButton } from '@tavosud/floating-button-whatsapp-modern';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent implements OnInit, OnDestroy {
  private btn!: WhatsAppButton;

  ngOnInit() {
    this.btn = new WhatsAppButton({
      phone:   '51987654321',
      name:    'Soporte',
    });
    this.btn.mount();
  }

  ngOnDestroy() { this.btn.unmount(); }
}
```

---

## Opciones

| Propiedad         | Tipo                   | Default                              | Descripción                                                                  |
|-------------------|------------------------|--------------------------------------|------------------------------------------------------------------------------|
| `phone`           | `string`               | **requerido**                        | Número con código de país (solo dígitos). Ej: `'51987654321'`                |
| `name`            | `string`               | `'WhatsApp'`                         | Nombre mostrado en el encabezado del popup                                   |
| `slogan`          | `string`               | `'Normalmente responde en minutos'`  | Subtítulo debajo del nombre                                                  |
| `avatar`          | `string`               | *(icono genérico)*                   | URL de la foto de perfil mostrada en el encabezado                           |
| `message`         | `string`               | `''`                                 | Mensaje predefinido que se envía al abrir WhatsApp                           |
| `position`        | `ButtonPosition`       | `'bottom-right'`                     | Posición del botón: `'bottom-right'` \| `'bottom-left'` \| `'top-right'` \| `'top-left'` |
| `sendButtonLabel` | `string`               | `'Enviar mensaje'`                   | Texto del botón de envío                                                     |
| `autoOpenDelay`   | `number`               | `0`                                  | Milisegundos antes de abrir el popup automáticamente. `0` = desactivado      |
| `zIndex`          | `number`               | `9999`                               | z-index del widget                                                           |
| `target`          | `string`               | `'body'`                             | Selector CSS del elemento donde montar el widget                             |
| `colors`          | `WhatsAppButtonColors` | *(colores oficiales de WhatsApp)*    | Objeto de personalización de colores (ver tabla a continuación)              |

### Colores (`colors`)

| Propiedad                   | Default     | Descripción                                    |
|-----------------------------|-------------|------------------------------------------------|
| `headerBackground`          | `#075E54`   | Color de fondo del encabezado del popup        |
| `headerText`                | `#FFFFFF`   | Color del texto e iconos del encabezado        |
| `bodyBackground`            | `#ECE5DD`   | Color de fondo del cuerpo del popup            |
| `buttonBackground`          | `#25D366`   | Color de fondo del botón flotante (FAB)        |
| `buttonIcon`                | `#FFFFFF`   | Color del icono de WhatsApp en el FAB          |
| `sendButtonBackground`      | `#25D366`   | Color de fondo del botón "Enviar mensaje"      |
| `sendButtonText`            | `#FFFFFF`   | Color del texto del botón "Enviar mensaje"     |
| `messageBubbleBackground`   | `#FFFFFF`   | Color de fondo de la burbuja de mensaje        |
| `messageBubbleText`         | `#333333`   | Color del texto dentro de la burbuja          |

### Ejemplo con colores personalizados

```ts
createWhatsAppButton({
  phone:   '51987654321',
  name:    'Mi Empresa',
  slogan:  'Atención 24/7',
  avatar:  '/img/logo.png',
  message: '¡Hola! Me interesa obtener más información.',
  colors: {
    headerBackground:        '#1A237E',
    headerText:              '#FFFFFF',
    bodyBackground:          '#E8EAF6',
    buttonBackground:        '#3F51B5',
    buttonIcon:              '#FFFFFF',
    sendButtonBackground:    '#3F51B5',
    sendButtonText:          '#FFFFFF',
    messageBubbleBackground: '#FFFFFF',
    messageBubbleText:       '#1A237E',
  },
});
```

---

## API de instancia

```ts
const btn = new WhatsAppButton({ phone: '51987654321' });

btn.mount();    // Inserta el widget en el DOM
btn.open();     // Abre el popup programáticamente
btn.close();    // Cierra el popup
btn.toggle();   // Alterna abierto/cerrado
btn.unmount();  // Elimina completamente el widget del DOM
```

---

## Archivos distribuidos

```
dist/
├── index.esm.js                          # Módulo ES (para bundlers: Vite, Webpack, etc.)
├── index.cjs.js                          # CommonJS (para Node.js / require)
├── index.d.ts                            # Tipos TypeScript
├── types.d.ts                            # Tipos auxiliares
└── floating-button-whatsapp-modern.css   # CSS standalone (para uso con CDN o <link>)
```

---

## Build del proyecto

```bash
npm install
npm run build
```

---

## Licencia

ISC © Gustavo Cuyutupa
