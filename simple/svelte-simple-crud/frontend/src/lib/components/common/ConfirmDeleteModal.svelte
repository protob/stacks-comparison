<!-- src/lib/components/common/ConfirmDeleteModal.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		onConfirm: () => void;
		title?: string;
		message?: string;
		confirmText?: string;
		isLoading?: boolean;
	}

	let {
		isOpen = false,
		onClose,
		onConfirm,
		title = 'Confirm Deletion',
		message = 'Are you sure you want to delete this item? This action cannot be undone.',
		confirmText = 'Delete',
		isLoading = false
	}: Props = $props();

	// Fix: Use a more reliable approach without element binding
	$effect(() => {
		if (isOpen) {
			// Wait for the modal to render, then focus the cancel button
			setTimeout(() => {
				const cancelButton = document.querySelector('[data-cancel-button]') as HTMLButtonElement;
				if (cancelButton) {
					cancelButton.focus();
				}
			}, 100);
		}
	});
</script>

<Modal {isOpen} onClose={onClose} {title} size="sm" persistent>
	<p class="mb-6 text-sm text-neutral-300">{@html message}</p>
	
	<div class="flex justify-end gap-3">
		<Button 
			data-cancel-button
			variant="secondary" 
			onclick={onClose}
		>
			Cancel
		</Button>
		<Button 
			variant="danger" 
			onclick={onConfirm} 
			loading={isLoading}
		>
			{confirmText}
		</Button>
	</div>
</Modal>
