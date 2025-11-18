import { JSX, ParentComponent, splitProps } from 'solid-js';
import Icon from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text' | 'stealth';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
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
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void);
}

const Button: ParentComponent<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, [
    'variant', 'size', 'class', 'fullWidth', 'icon', 'iconClass', 
    'iconOnly', 'iconPosition', 'disabled', 'loading', 'children', 'ref'
  ]);

  const variant = () => local.variant || 'primary';
  const size = () => local.size || 'md';
  const iconPosition = () => local.iconPosition || 'left';

  const baseClasses = createMemo(() => {
    let classes = 'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-sm focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-opacity-30';

    if (local.loading) {
      classes += ' cursor-default';
    } else if (local.disabled) {
      classes += ' opacity-60 cursor-not-allowed';
    } else {
      classes += ' cursor-pointer';
    }
    return classes;
  });

  const variantClasses = createMemo(() => ({
    'primary': 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/30',
    'secondary': 'bg-neutral-700/80 text-neutral-200 hover:bg-neutral-600 focus:ring-neutral-500/30',
    'danger': 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/30',
    'text': 'bg-transparent text-neutral-300 hover:bg-neutral-700/50 focus:ring-blue-500/30',
    'stealth': 'bg-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/60 focus:ring-blue-500/30 p-1.5',
  }[variant()]));

  const effectiveIconOnly = createMemo(() => 
    local.iconOnly || (!!local.icon && !local.children && !local.loading)
  );

  const sizeClasses = createMemo(() => {
    if (effectiveIconOnly() || size() === 'icon') {
      return ({
        'xs': 'p-1',
        'sm': 'p-1.5',
        'md': 'p-2',
        'lg': 'p-2.5',
        'icon': 'p-2',
      }[size() === 'icon' ? 'icon' : size()]) || 'p-2';
    }
    return ({
      'xs': 'text-xs px-2.5 py-1 gap-1',
      'sm': 'text-sm px-3 py-1.5 gap-1.5',
      'md': 'text-base px-4 py-2 gap-2',
      'lg': 'text-lg px-5 py-2.5 gap-2.5',
    }[size()]) || 'text-base px-4 py-2 gap-2';
  });

  const iconSizeMap: Record<Exclude<ButtonSize, 'icon'>, number> = { xs: 14, sm: 16, md: 18, lg: 20 };
  const iconSize = () => size() === 'icon' ? 20 : (iconSizeMap[size() as Exclude<ButtonSize, 'icon'>] ?? 18);

  const widthClass = () => local.fullWidth ? 'w-full' : '';

  const orderClasses = createMemo(() => {
    if (!local.icon || !local.children || local.loading || effectiveIconOnly()) return { icon: '', slot: '' };
    return iconPosition() === 'left'
      ? { icon: 'order-first', slot: 'order-last' }
      : { icon: 'order-last', slot: 'order-first' };
  });

  return (
    <button
      ref={local.ref}
      disabled={local.disabled || local.loading}
      class={`${baseClasses()} ${variantClasses()} ${sizeClasses()} ${widthClass()} ${local.class || ''}`}
      {...others}
    >
      <Show when={local.loading} fallback={
        <>
          <Show when={local.icon}>
            <Icon name={local.icon!} size={iconSize()} class={`${orderClasses().icon} ${local.iconClass || ''}`} />
          </Show>
          <Show when={local.children && !effectiveIconOnly()}>
            <span class={orderClasses().slot}>
              {local.children}
            </span>
          </Show>
        </>
      }>
        <Icon name="Loader" size={iconSize()} class={`animate-spin ${local.iconClass || ''}`} />
        <Show when={local.children && !effectiveIconOnly()}>
          <span class={`${orderClasses().slot} opacity-70`}>{local.children}</span>
        </Show>
      </Show>
    </button>
  );
};

export default Button;