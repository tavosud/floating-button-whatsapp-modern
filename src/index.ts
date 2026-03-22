import { WhatsAppButtonOptions, WhatsAppButtonColors, ButtonPosition } from './types';
import { BASE_CSS, buildInstanceStyles } from './styles';

export type { WhatsAppButtonOptions, WhatsAppButtonColors, ButtonPosition };

const DEFAULT_COLORS: Required<WhatsAppButtonColors> = {
  headerBackground:       '#075E54',
  headerText:             '#FFFFFF',
  bodyBackground:         '#ECE5DD',
  buttonBackground:       '#25D366',
  buttonIcon:             '#FFFFFF',
  sendButtonBackground:   '#25D366',
  sendButtonText:         '#FFFFFF',
  messageBubbleBackground:'#FFFFFF',
  messageBubbleText:      '#333333',
};

const WHATSAPP_ICON_SVG = `
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.002 2C8.269 2 2 8.268 2 16a13.93 13.93 0 0 0 1.932 7.1L2 30l7.1-1.91A13.97 13.97 0 0 0 16.002 30C23.732 30 30 23.732 30 16S23.732 2 16.002 2zm0 25.455a11.42 11.42 0 0 1-5.815-1.584l-.417-.248-4.213 1.133 1.138-4.105-.27-.43A11.386 11.386 0 0 1 4.545 16c0-6.32 5.137-11.455 11.457-11.455S27.456 9.68 27.456 16c0 6.319-5.136 11.455-11.454 11.455zm6.278-8.58c-.343-.172-2.034-1.002-2.349-1.116-.315-.115-.544-.172-.773.172-.229.344-.887 1.116-1.087 1.345-.2.23-.4.258-.744.086-.344-.172-1.452-.536-2.766-1.707-1.022-.912-1.712-2.038-1.912-2.381-.2-.344-.022-.529.15-.7.155-.154.343-.4.516-.6.172-.2.229-.344.344-.573.115-.23.057-.43-.029-.601-.086-.172-.773-1.864-1.059-2.552-.278-.669-.561-.578-.773-.589l-.658-.012c-.23 0-.601.086-.916.43-.315.344-1.202 1.174-1.202 2.867 0 1.693 1.23 3.328 1.402 3.557.172.23 2.42 3.696 5.864 5.184.82.354 1.46.565 1.958.723.823.261 1.572.224 2.165.136.66-.098 2.034-.832 2.32-1.635.287-.803.287-1.49.201-1.634-.085-.143-.314-.23-.657-.4z"/>
  </svg>
`;

const PERSON_ICON_SVG = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
`;

const CLOSE_ICON_SVG = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
`;

function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function sanitize(str: string): string {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function buildWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const base = 'https://wa.me/' + cleanPhone;
  if (message) {
    return base + '?text=' + encodeURIComponent(message);
  }
  return base;
}

function injectBaseStyles(css: string): void {
  const BASE_STYLE_ID = 'fwm-base-styles';
  if (document.getElementById(BASE_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BASE_STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

function injectInstanceStyles(css: string, widgetId: string): void {
  const styleId = 'fwm-styles-' + widgetId;
  if (document.getElementById(styleId)) return;
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
}

export class WhatsAppButton {
  private options: Required<Omit<WhatsAppButtonOptions, 'colors'>> & { colors: Required<WhatsAppButtonColors> };
  private container: HTMLElement | null = null;
  private popup: HTMLElement | null = null;
  private fab: HTMLElement | null = null;
  private isOpen: boolean = false;
  private readonly widgetId: string;
  private autoOpenTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(options: WhatsAppButtonOptions) {
    this.widgetId = 'fwm-' + Math.random().toString(36).slice(2, 9);

    this.options = {
      phone:           options.phone,
      name:            options.name            ?? 'WhatsApp',
      slogan:          options.slogan          ?? 'Normalmente responde en minutos',
      avatar:          options.avatar          ?? '',
      message:         options.message         ?? '',
      position:        options.position        ?? 'bottom-right',
      sendButtonLabel: options.sendButtonLabel ?? 'Enviar mensaje',
      autoOpenDelay:   options.autoOpenDelay   ?? 0,
      zIndex:          options.zIndex          ?? 9999,
      target:          options.target          ?? 'body',
      colors: {
        ...DEFAULT_COLORS,
        ...options.colors,
      },
    };
  }

  mount(): void {
    if (this.container) return;

    const targetEl = document.querySelector<HTMLElement>(this.options.target);
    if (!targetEl) {
      console.error('[WhatsAppButton] Target element not found:', this.options.target);
      return;
    }

    injectBaseStyles(BASE_CSS);
    injectInstanceStyles(
      buildInstanceStyles(this.widgetId, this.options.colors, this.options.position, this.options.zIndex),
      this.widgetId,
    );
    const wrapper = document.createElement('div');
    wrapper.className = 'fwm-widget';
    wrapper.id = this.widgetId;

    wrapper.innerHTML = this._buildHTML();
    targetEl.appendChild(wrapper);

    this.container = wrapper;
    this.fab       = wrapper.querySelector('.fwm-fab');
    this.popup     = wrapper.querySelector('.fwm-popup');

    this._bindEvents();

    if (this.options.autoOpenDelay > 0) {
      this.autoOpenTimer = setTimeout(() => this.open(), this.options.autoOpenDelay);
    }
  }

  unmount(): void {
    if (this.autoOpenTimer) clearTimeout(this.autoOpenTimer);
    const styleEl = document.getElementById('fwm-styles-' + this.widgetId);
    if (styleEl) styleEl.remove();
    if (this.container) {
      this.container.remove();
      this.container = null;
      this.fab = null;
      this.popup = null;
    }
  }
  open(): void {
    if (!this.popup) return;
    this.isOpen = true;
    this.popup.classList.add('fwm-open');
  }

  close(): void {
    if (!this.popup) return;
    this.isOpen = false;
    this.popup.classList.remove('fwm-open');
  }

  toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  private _buildHTML(): string {
    const { name, slogan, avatar, message, sendButtonLabel, phone } = this.options;
    const waUrl = buildWhatsAppUrl(phone, message);

    const avatarHTML = avatar
      ? `<img src="${sanitize(avatar)}" alt="${sanitize(name)}" />`
      : PERSON_ICON_SVG;

    const bubbleText = message
      ? sanitize(message)
      : 'Hola 👋, ¿en qué puedo ayudarte?';

    return `
      <div class="fwm-popup" role="dialog" aria-label="Chat de WhatsApp" aria-modal="true">
        <div class="fwm-header">
          <div class="fwm-avatar-wrap">
            <div class="fwm-avatar">${avatarHTML}</div>
            <span class="fwm-online-dot"></span>
          </div>
          <div class="fwm-header-info">
            <div class="fwm-name">${sanitize(name)}</div>
            ${slogan ? `<div class="fwm-slogan">${sanitize(slogan)}</div>` : ''}
          </div>
          <button class="fwm-close-btn" aria-label="Cerrar">${CLOSE_ICON_SVG}</button>
        </div>

        <div class="fwm-body">
          <div class="fwm-bubble">
            <div class="fwm-bubble-sender">${sanitize(name)}</div>
            <span class="fwm-bubble-text">${bubbleText}</span>
            <div class="fwm-bubble-time">${getCurrentTime()}</div>
          </div>
        </div>

        <div class="fwm-footer">
          <a
            class="fwm-send-btn"
            href="${waUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${sanitize(sendButtonLabel)}"
          >
            <span class="fwm-send-icon">${WHATSAPP_ICON_SVG}</span>
            ${sanitize(sendButtonLabel)}
          </a>
        </div>
      </div>

      <button class="fwm-fab" aria-label="Abrir chat de WhatsApp" aria-expanded="false">
        ${WHATSAPP_ICON_SVG}
      </button>
    `;
  }

  private _bindEvents(): void {
    if (!this.fab || !this.popup || !this.container) return;

    this.fab.addEventListener('click', () => {
      this.toggle();
      this.fab!.setAttribute('aria-expanded', String(this.isOpen));
    });

    const closeBtn = this.popup.querySelector<HTMLButtonElement>('.fwm-close-btn');
    closeBtn?.addEventListener('click', () => {
      this.close();
      this.fab!.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
        this.fab!.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', (e: MouseEvent) => {
      if (
        this.isOpen &&
        this.container &&
        !this.container.contains(e.target as Node)
      ) {
        this.close();
        this.fab!.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * Función de conveniencia para montar el widget directamente.
 * Equivalente a: new WhatsAppButton(options).mount()
 */
export function createWhatsAppButton(options: WhatsAppButtonOptions): WhatsAppButton {
  const btn = new WhatsAppButton(options);
  btn.mount();
  return btn;
}

export default createWhatsAppButton;
