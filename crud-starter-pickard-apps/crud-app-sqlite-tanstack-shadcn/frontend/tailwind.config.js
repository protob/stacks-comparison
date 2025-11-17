module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic token mappings
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        'surface-active': 'var(--color-surface-active)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-active': 'var(--color-primary-active)',
        'primary-light': 'var(--color-primary-light)',
        success: 'var(--color-success)',
        'success-light': 'var(--color-success-light)',
        danger: 'var(--color-danger)',
        'danger-light': 'var(--color-danger-light)',
        'danger-hover': 'var(--color-red-700)',
        warning: 'var(--color-warning)',
        'warning-light': 'var(--color-warning-light)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        'border-focus': 'var(--color-border-focus)',
        backdrop: 'var(--color-backdrop)',
        'modal-bg': 'var(--color-modal-bg)',
        'modal-border': 'var(--color-modal-border)',
      },
      spacing: {
        'input-x': 'var(--input-padding-x)',
        'input-y': 'var(--input-padding-y)',
        'card': 'var(--card-padding)',
        'nav': 'var(--nav-padding)',
      },
      width: {
        // 'checkbox' and 'radio' removed
      },
      height: {
        // 'checkbox' and 'radio' removed
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'button': 'var(--button-radius)',
        'card': 'var(--card-radius)',
        'input': 'var(--input-radius)',
        'checkbox': 'var(--checkbox-radius)',
      },
      fontWeight: {
        button: 'var(--button-font-weight)',
      },
      gap: {
        'component': 'var(--gap-component-internal)',
        'grid': 'var(--gap-grid-items)',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in-up': 'fade-in-up 0.3s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
