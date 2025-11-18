<!-- src/lib/components/common/ConfirmDeleteModal.svelte -->
<script lang="ts">
	import { tick } from 'svelte';
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

	let cancelButtonRef = $state<HTMLButtonElement | null>(null);

	// Focus the cancel button when the modal opens, without manual querySelector
	$effect(() => {
		if (isOpen && cancelButtonRef) {
			tick().then(() => {
				cancelButtonRef?.focus();
			});
		}
	});
</script>

<Modal {isOpen} onClose={onClose} {title} size="sm" persistent>
	<p class="mb-6 text-sm text-neutral-300">
		{@html message}
	</p>

	<div class="flex justify-end gap-3">
		<Button
			bind:this={cancelButtonRef}
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