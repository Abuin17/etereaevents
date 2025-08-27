# Sistema de Consentimiento de Cookies - Etérea

Sistema completo de consentimiento de cookies que cumple con GDPR y WCAG 2.1 AA, integrado con la línea visual de Etérea.

## Características

- ✅ Banner persistente con acciones Aceptar, Rechazar y Configurar
- ✅ Modal de preferencias accesible con toggles para analytics y marketing
- ✅ Almacenamiento versionado con caducidad de 12 meses
- ✅ Bloqueo de scripts no esenciales hasta consentimiento
- ✅ Navegación completa por teclado y focus trap
- ✅ Responsive mobile-first
- ✅ Integración con Design Tokens existentes
- ✅ Sin dependencias nuevas

## Estructura del Proyecto

```
src/
├── components/
│   └── CookieConsent/
│       ├── CookieConsent.tsx          # Componente principal
│       ├── CookieConsent.scss         # Estilos del componente
│       ├── CookiePreferencesButton.tsx # Botón para abrir modal
│       └── README.md                  # Esta documentación
├── hooks/
│   └── useCookieConsent.ts            # Hook para gestión del estado
└── utils/
    └── cookieConsent.ts               # Utilidades para scripts
```

## Modelo de Datos

```typescript
interface CookieConsentData {
  version: number;                    // Versión del modelo (actual: 1)
  decision: 'accepted' | 'rejected' | 'custom';
  categories: {
    necessary: boolean;               // Siempre true, no configurable
    analytics: boolean;               // Configurable por usuario
    marketing: boolean;               // Configurable por usuario
  };
  timestamp: string;                  // ISO string de la decisión
  expiresAt: string;                  // ISO string de caducidad (12 meses)
}
```

## Almacenamiento

- **Clave**: `eterea.cookieConsent.v1`
- **Duración**: 12 meses desde la decisión
- **Ubicación**: `localStorage`
- **Expiración automática**: Se limpia automáticamente si ha expirado

## Integración

### 1. Montar el componente

```tsx
import CookieConsent from './components/CookieConsent/CookieConsent';

function App() {
  return (
    <div className="app">
      {/* Tu contenido */}
      <CookieConsent />
    </div>
  );
}
```

### 2. Integrar en el Footer

```tsx
import Footer from './components/Footer/Footer';
import CookiePreferencesButton from './components/CookieConsent/CookiePreferencesButton';

function App() {
  const [showCookieModal, setShowCookieModal] = useState(false);

  return (
    <div className="app">
      <Footer onOpenCookiePreferences={() => setShowCookieModal(true)} />
      <CookieConsent onOpenModal={() => setShowCookieModal(true)} />
    </div>
  );
}
```

### 3. Integrar scripts de terceros

#### Para scripts externos (Google Analytics, etc.):

```html
<script 
  type="text/plain" 
  data-cookie-category="analytics" 
  data-src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  async
></script>
```

#### Para scripts inline:

```html
<script type="text/plain" data-cookie-category="marketing">
  // Tu código de marketing aquí
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### 4. Usar queueUntilConsent para código JavaScript

```javascript
// Ejecutar código solo cuando se dé consentimiento
if (window.queueUntilConsent) {
  window.queueUntilConsent(function() {
    console.log('Analytics consent granted');
    // Tu código aquí
  }, 'analytics');
}
```

## API del Hook

```typescript
const {
  consent,           // Datos actuales del consentimiento
  isLoaded,          // Si se ha cargado el estado inicial
  hasConsent,        // (category) => boolean
  hasValidConsent,   // () => boolean
  saveConsent,       // (decision, categories?) => CookieConsentData
  clearConsent,      // () => void
  getStoredConsent   // () => CookieConsentData | null
} = useCookieConsent();
```

## Estados del Sistema

### 1. Sin decisión previa
- Banner visible en la parte inferior
- Scripts no esenciales bloqueados
- Atributos del documento sin establecer

### 2. Decisión válida (accepted/rejected/custom)
- Banner oculto
- Scripts cargados según preferencias
- Atributos del documento establecidos
- Botón "Preferencias de cookies" visible en footer

### 3. Decisión expirada
- Consentimiento limpiado automáticamente
- Vuelve al estado "Sin decisión previa"

## Atributos del Documento

El sistema establece automáticamente estos atributos en `<html>`:

```html
<html 
  data-consent="accepted|rejected|custom"
  data-consent-analytics="true|false"
  data-consent-marketing="true|false"
>
```

## Accesibilidad

- ✅ Navegación completa por teclado
- ✅ Focus trap en el modal
- ✅ Cierre con tecla Escape
- ✅ Roles ARIA apropiados (`dialog`, `aria-modal`)
- ✅ Contraste AA (4.5:1 mínimo)
- ✅ Estados de foco visibles
- ✅ Textos alternativos

## Responsive Design

- **Mobile**: Layout compacto, botones apilados
- **Desktop**: Distribución horizontal, no intrusiva
- **Breakpoints**: Utiliza los tokens existentes del proyecto

## Personalización

### Colores y Tipografía
El componente utiliza los Design Tokens existentes:
- `$primary-color`: #393431
- `$font-primary`: 'Revans', serif
- `$font-secondary`: 'Hedvig Letters Sans', sans-serif

### Espaciado
Utiliza las variables de espaciado del proyecto:
- `$spacing-sm`, `$spacing-md`, `$spacing-lg`, etc.

## Testing

### Casos de prueba recomendados:

1. **Primera visita**: Banner visible, scripts bloqueados
2. **Aceptar todo**: Banner desaparece, todos los scripts se cargan
3. **Rechazar todo**: Banner desaparece, solo scripts necesarios
4. **Configuración personalizada**: Modal funcional, scripts según selección
5. **Expiración**: Limpiar localStorage y verificar que vuelve al estado inicial
6. **Accesibilidad**: Navegación por teclado, screen readers
7. **Responsive**: Diferentes tamaños de pantalla

## Cumplimiento GDPR

- ✅ Consentimiento explícito requerido
- ✅ Categorías claramente definidas
- ✅ Posibilidad de rechazar
- ✅ Configuración granular
- ✅ Caducidad definida (12 meses)
- ✅ Fácil revocación (botón en footer)
- ✅ Información clara sobre el uso

## Troubleshooting

### Scripts no se cargan
1. Verificar que el script tiene `type="text/plain"`
2. Verificar que tiene `data-cookie-category="analytics|marketing"`
3. Verificar que el usuario ha dado consentimiento para esa categoría

### Banner no aparece
1. Verificar que no hay consentimiento válido en localStorage
2. Verificar que el componente está montado
3. Verificar que no hay errores en la consola

### Modal no se abre
1. Verificar que el hook `useCookieConsent` está funcionando
2. Verificar que el estado `showModal` se actualiza correctamente
3. Verificar que no hay conflictos de z-index
