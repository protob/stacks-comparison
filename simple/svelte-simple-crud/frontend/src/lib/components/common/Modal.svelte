<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		isOpen: boolean;
		title?: string;
		size?: 'sm' | 'md' | 'lg';
		persistent?: boolean;
		closeOnEsc?: boolean;
		hideCloseButton?: boolean;
		headerClass?: string;
		bodyClass?: string;
		footerClass?: string;
		modalClass?: string;
		children?: any;
		footer?: any;
	}

	let {
		isOpen = $bindable(),
		title,
		size = 'md',
		persistent = false,
		closeOnEsc = true,
		hideCloseButton = false,
		headerClass = '',
		bodyClass = 'py-4 px-6',
		footerClass = '',
		modalClass = '',
		children,
		footer
	}: Props = $props();

	let modalRef = $state<HTMLDivElement>();

	const baseSizeClasses = $derived(() => {
		if (modalClass && (modalClass.includes('max-w-') || modalClass.includes('w-'))) {
			return '';
		}
		
		const sizeMap = {
			sm: 'sm:max-w-sm',
			md: 'sm:max-w-md',
			lg: 'sm:max-w-lg'
		};
		
		return sizeMap[size] || 'sm:max-w-md';
	});

	const closeModal = () => {
		if (persistent && !hideCloseButton) {
			isOpen = false;
			return;
		}
		if (!persistent) {
			isOpen = false;
		}
	};

	const handleBackdropClick = (event: MouseEvent) => {
		if (event.target === event.currentTarget && !persistent) {
			closeModal();
		}
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && closeOnEsc && isOpen) {
			closeModal();
		}
	};

	onMount(() => {
		const handleEsc = (event: KeyboardEvent) => handleKeydown(event);
		
		if (isOpen) {
			document.addEventListener('keydown', handleEsc);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.body.style.overflow = 'unset';
		};
	});

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	});
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 flex items-center justify-center p-4 z-100 bg-black/70 backdrop-blur-sm"
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
		tabindex="-1"
	>
		<div
			bind:this={modalRef}
			class="bg-neutral-800 text-neutral-100 flex flex-col overflow-hidden w-full {baseSizeClasses()} {modalClass}"
		>
			{#if title || !hideCloseButton}
				<header class="p-4 border-b border-neutral-700 flex items-center justify-between shrink-0 {headerClass}">
					{#if title}
						<h2 id="modal-title" class="text-lg font-semibold">{title}</h2>
					{:else}
						<div></div>
					{/if}
					
					{#if !hideCloseButton}
						<button
							onclick={closeModal}
							class="ml-auto -mr-2 -my-2 bg-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/60 focus:ring-blue-500/30 p-1.5"
							aria-label="Close modal"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					{/if}
				</header>
			{/if}

			<div class="flex-1 overflow-y-auto scrollbar-thin {bodyClass}">
				{@render children?.()}
			</div>

			{#if footer}
				<footer class="p-4 border-t border-neutral-700 shrink-0 {footerClass}">
					{@render footer()}
				</footer>
			{/if}
		</div>
	</div>
{/if}
