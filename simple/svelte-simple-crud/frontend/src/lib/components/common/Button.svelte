<!-- src/lib/components/common/Button.svelte -->
<script lang="ts">
	type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
	type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

	interface Props {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		disabled?: boolean;
		loading?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: (event: MouseEvent) => void;
		children?: any;
		icon?: string;
		iconOnly?: boolean;
	}

	let {
		variant = 'primary',
		size = 'md',
		class: className = '',
		disabled = false,
		loading = false,
		type = 'button',
		onclick,
		children,
		icon,
		iconOnly = false,
		...rest
	}: Props = $props();

	// Base button styles that always apply
	const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md';

	// Variant styles
	const variantStyles = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm',
		secondary: 'bg-neutral-600 text-white hover:bg-neutral-700 active:bg-neutral-800 shadow-sm',
		danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
		ghost: 'bg-neutral-700 text-neutral-200 hover:bg-neutral-600 hover:text-white',
		outline: 'border border-neutral-600 bg-transparent text-neutral-200 hover:bg-neutral-700 hover:text-white'
	};

	// Size styles
	const sizeStyles = {
		sm: iconOnly ? 'h-8 w-8 p-0' : 'h-8 px-3 text-sm',
		md: iconOnly ? 'h-10 w-10 p-0' : 'h-10 px-4 py-2',
		lg: iconOnly ? 'h-12 w-12 p-0' : 'h-12 px-6 py-3 text-lg',
		icon: 'h-10 w-10 p-0'
	};

	// Combine all styles
	const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

	function handleClick(event: MouseEvent) {
		if (disabled || loading) {
			event.preventDefault();
			return;
		}
		onclick?.(event);
	}
</script>

<button
	{type}
	class={buttonClasses}
	{disabled}
	onclick={handleClick}
	{...rest}
>
	{#if loading}
		<svg class="animate-spin h-4 w-4 {children ? 'mr-2' : ''}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	{:else if icon && !children}
		<!-- Icon only button -->
		{#if icon === 'Plus'}
			<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
		{:else if icon === 'Pencil'}
			<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
			</svg>
		{:else if icon === 'Trash'}
			<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
			</svg>
		{:else if icon === 'Save'}
			<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
			</svg>
		{/if}
	{:else if icon && children}
		<!-- Button with icon and text -->
		{#if icon === 'Plus'}
			<svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
		{:else if icon === 'Save'}
			<svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
			</svg>
		{/if}
		{@render children?.()}
	{:else}
		<!-- Text only button -->
		{@render children?.()}
	{/if}
</button>
