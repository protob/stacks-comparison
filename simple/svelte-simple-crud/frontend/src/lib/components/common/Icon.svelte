<!-- src/lib/components/common/Icon.svelte -->
<script lang="ts">
	import * as LucideIcons from 'lucide-svelte';
	import type { IconName } from '$lib/types';

	interface Props {
		name: IconName;
		class?: string;
		size?: number | string;
		color?: string;
	}

	let { name, class: className = '', size = 24, color = 'currentColor' }: Props = $props();

	const Component = $derived((LucideIcons as any)[name] ?? LucideIcons.HelpCircle);

	// Fix: Handle size properly
	const sizeValue = $derived(() => {
		if (typeof size === 'number') return size;
		const s = Number(size);
		return isNaN(s) ? 24 : s;
	});

	const iconProps = $derived(() => {
		return {
			class: `inline-flex items-center justify-center shrink-0 ${className}`,
			color,
			size: sizeValue,
			style: 'vertical-align: middle; display: inline-flex; align-items: center;'
		};
	});
</script>

<Component {...iconProps} />
