export interface WhatsAppButtonColors {
  /** Color de fondo del encabezado de la ventana. Default: '#075E54' */
  headerBackground?: string;
  /** Color del texto del encabezado. Default: '#FFFFFF' */
  headerText?: string;
  /** Color de fondo del cuerpo de la ventana. Default: '#ECE5DD' */
  bodyBackground?: string;
  /** Color de fondo del botón flotante. Default: '#25D366' */
  buttonBackground?: string;
  /** Color del icono del botón flotante. Default: '#FFFFFF' */
  buttonIcon?: string;
  /** Color de fondo del botón "Enviar mensaje". Default: '#25D366' */
  sendButtonBackground?: string;
  /** Color del texto del botón "Enviar mensaje". Default: '#FFFFFF' */
  sendButtonText?: string;
  /** Color de fondo del globo de mensaje. Default: '#FFFFFF' */
  messageBubbleBackground?: string;
  /** Color del texto del globo de mensaje. Default: '#333333' */
  messageBubbleText?: string;
}

export type ButtonPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface WhatsAppButtonOptions {
  /** Número de teléfono con código de país. Ej: '51987654321' */
  phone: string;
  /** Nombre que se muestra en el encabezado de la ventana */
  name?: string;
  /** Slogan o subtítulo que aparece debajo del nombre */
  slogan?: string;
  /** URL del avatar/foto de perfil */
  avatar?: string;
  /** Mensaje predefinido que se enviará al abrir WhatsApp */
  message?: string;
  /** Personalización de colores */
  colors?: WhatsAppButtonColors;
  /** Posición del botón flotante. Default: 'bottom-right' */
  position?: ButtonPosition;
  /** Texto del botón "Enviar mensaje". Default: 'Enviar mensaje' */
  sendButtonLabel?: string;
  /** Delay en ms antes de mostrar el popup automáticamente. 0 = desactivado. Default: 0 */
  autoOpenDelay?: number;
  /** z-index del widget. Default: 9999 */
  zIndex?: number;
  /** Selector CSS del contenedor donde montar el widget. Default: body */
  target?: string;
}
