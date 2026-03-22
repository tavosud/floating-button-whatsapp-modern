import { BASE_CSS } from './_base-css';
import { WhatsAppButtonColors, ButtonPosition } from './types';

export { BASE_CSS };

interface PositionVars {
  fabT: string; fabB: string; fabL: string; fabR: string;
  popT: string; popB: string; popL: string; popR: string;
  popOrigin: string;
}

const POSITIONS: Record<ButtonPosition, PositionVars> = {
  'bottom-right': { fabT:'auto', fabB:'20px', fabL:'auto', fabR:'20px', popT:'auto', popB:'90px', popL:'auto', popR:'20px', popOrigin:'bottom right' },
  'bottom-left':  { fabT:'auto', fabB:'20px', fabL:'20px', fabR:'auto', popT:'auto', popB:'90px', popL:'20px', popR:'auto', popOrigin:'bottom left'  },
  'top-right':    { fabT:'20px', fabB:'auto', fabL:'auto', fabR:'20px', popT:'90px', popB:'auto', popL:'auto', popR:'20px', popOrigin:'top right'    },
  'top-left':     { fabT:'20px', fabB:'auto', fabL:'20px', fabR:'auto', popT:'90px', popB:'auto', popL:'20px', popR:'auto', popOrigin:'top left'     },
};

/**
 * Builds per-instance CSS variable overrides (colors + position + z-index).
 * The BASE_CSS static styles are injected once globally.
 */
export function buildInstanceStyles(
  widgetId: string,
  colors: Required<WhatsAppButtonColors>,
  position: ButtonPosition,
  zIndex: number,
): string {
  const p = POSITIONS[position];
  return `
    #${widgetId} {
      --fwm-header-bg:   ${colors.headerBackground};
      --fwm-header-text: ${colors.headerText};
      --fwm-body-bg:     ${colors.bodyBackground};
      --fwm-btn-bg:      ${colors.buttonBackground};
      --fwm-btn-icon:    ${colors.buttonIcon};
      --fwm-send-bg:     ${colors.sendButtonBackground};
      --fwm-send-text:   ${colors.sendButtonText};
      --fwm-bubble-bg:   ${colors.messageBubbleBackground};
      --fwm-bubble-text: ${colors.messageBubbleText};
      --fwm-z:           ${zIndex};
      --fwm-fab-t: ${p.fabT}; --fwm-fab-b: ${p.fabB};
      --fwm-fab-l: ${p.fabL}; --fwm-fab-r: ${p.fabR};
      --fwm-pop-t: ${p.popT}; --fwm-pop-b: ${p.popB};
      --fwm-pop-l: ${p.popL}; --fwm-pop-r: ${p.popR};
      --fwm-pop-origin: ${p.popOrigin};
    }
  `;
}


