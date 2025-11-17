import { forwardRef, ButtonHTMLAttributes, useMemo, useCallback } from 'react';
import Icon from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text' | 'stealth';
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
      let classes = 'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-sm focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-opacity-30';

      if (loading) {
        classes += ' cursor-default';
      } else if (disabled) {
        classes += ' opacity-60 cursor-not-allowed';
      } else {
        classes += ' cursor-pointer';
      }
      return classes;
    }, [loading, disabled]);

    const variantClasses = useMemo(() => ({
      'primary': 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/30',
      'secondary': 'bg-neutral-700/80 text-neutral-200 hover:bg-neutral-600 focus:ring-neutral-500/30',
      'danger': 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/30',
      'text': 'bg-transparent text-neutral-300 hover:bg-neutral-700/50 focus:ring-blue-500/30',
      'stealth': 'bg-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/60 focus:ring-blue-500/30 p-1.5',
    }[variant]), [variant]);

    const effectiveIconOnly = useMemo(() => 
      iconOnly || (!!icon && !children && !loading), 
      [iconOnly, icon, children, loading]
    );

    const sizeClasses = useMemo(() => {
      if (effectiveIconOnly || size === 'icon') {
        return ({
          'xs': 'p-1',
          'sm': 'p-1.5',
          'md': 'p-2',
          'lg': 'p-2.5',
          'icon': 'p-2',
        }[size === 'icon' ? 'icon' : size]) || 'p-2';
      }
      return ({
        'xs': 'text-xs px-2.5 py-1 gap-1',
        'sm': 'text-sm px-3 py-1.5 gap-1.5',
        'md': 'text-base px-4 py-2 gap-2',
        'lg': 'text-lg px-5 py-2.5 gap-2.5',
      }[size]) || 'text-base px-4 py-2 gap-2';
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

export default Button;