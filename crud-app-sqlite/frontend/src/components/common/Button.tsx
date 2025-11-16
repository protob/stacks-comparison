import { forwardRef, ButtonHTMLAttributes, useMemo, useCallback } from 'react';
import Icon from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text' | 'stealth' | 'ghost' | 'default';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: string;
  iconClass?: string;
  iconOnly?: boolean;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    className = '',
    fullWidth = false,
    icon,
    iconClass,
    iconOnly = false,
    iconPosition = 'left',
    disabled = false,
    loading = false,
    children,
    onClick,
    ...props
  }, ref) => {
    const baseClasses = useMemo(() => {
      let classes = 'inline-flex items-center justify-center font-button transition-[--button-transition] rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';

      if (loading) {
        classes += ' cursor-default';
      } else if (disabled) {
        classes += ' opacity-50 cursor-not-allowed pointer-events-none';
      } else {
        classes += ' cursor-pointer';
      }
      return classes;
    }, [loading, disabled]);

    const variantClasses = useMemo(() => ({
      'default': 'bg-primary text-text-inverse hover:bg-primary-hover active:bg-primary-active',
      'primary': 'bg-primary text-text-inverse hover:bg-primary-hover active:bg-primary-active',
      'secondary': 'bg-surface-active text-text-primary hover:bg-surface-hover border border-border',
      'danger': 'bg-danger text-text-inverse hover:bg-danger-hover focus:ring-danger',
      'text': 'bg-transparent text-text-primary hover:bg-surface-hover focus:ring-primary',
      'stealth': 'bg-transparent text-text-muted hover:text-text-primary hover:bg-surface-hover focus:ring-primary btn-icon-sm',
      'ghost': 'bg-transparent hover:bg-surface-hover text-text-primary',
    }[variant]), [variant]);

    const effectiveIconOnly = useMemo(() => 
      iconOnly || (!!icon && !children && !loading), 
      [iconOnly, icon, children, loading]
    );

    const sizeClasses = useMemo(() => {
      if (effectiveIconOnly || size === 'icon') {
        return ({
          'xs': 'btn-icon-xs',
          'sm': 'btn-icon-sm',
          'md': 'btn-icon-md',
          'lg': 'btn-icon-lg',
          'icon': 'btn-icon-md',
        }[size === 'icon' ? 'icon' : size]) || 'btn-icon-md';
      }
      return ({
        'xs': 'btn-xs',
        'sm': 'btn-sm',
        'md': 'btn-md',
        'lg': 'btn-lg',
      }[size]) || 'btn-md';
    }, [effectiveIconOnly, size]);

    const iconSizeMap: Record<Exclude<ButtonSize, 'icon'>, number> = { xs: 14, sm: 16, md: 18, lg: 20 };
    const iconSize = size === 'icon' ? 20 : (iconSizeMap[size as Exclude<ButtonSize, 'icon'>] ?? 18);

    const widthClass = fullWidth ? 'w-full' : '';

    const orderClasses = useMemo(() => {
      if (!icon || !children || loading || effectiveIconOnly) return { icon: '', slot: '' };
      return iconPosition === 'left'
        ? { icon: 'order-first', slot: 'order-last' }
        : { icon: 'order-last', slot: 'order-first' };
    }, [icon, children, loading, effectiveIconOnly, iconPosition]);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    }, [disabled, loading, onClick]);

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`}
        onClick={handleClick}
        {...props}
      >
        {loading ? (
          <>
            <Icon name="Loader" size={iconSize} className={`animate-spin ${iconClass || ''}`} />
            {children && !effectiveIconOnly && (
              <span className={`${orderClasses.slot} opacity-70`}>{children}</span>
            )}
          </>
        ) : (
          <>
            {icon && (
              <Icon name={icon} size={iconSize} className={`${orderClasses.icon} ${iconClass || ''}`} />
            )}
            {children && !effectiveIconOnly && (
              <span className={orderClasses.slot}>
                {children}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export default Button;