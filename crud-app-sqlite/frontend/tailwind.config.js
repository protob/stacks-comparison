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
        'checkbox': 'var(--checkbox-size)',
        'radio': 'var(--radio-size)',
      },
      height: {
        'checkbox': 'var(--checkbox-size)',
        'radio': 'var(--radio-size)',
      },
      borderRadius: {
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
    },
  },
  plugins: [],
};
