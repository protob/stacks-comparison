<script lang="ts">
	interface Props {
		value?: string[];
		onChange?: (tags: string[]) => void;
		placeholder?: string;
		error?: string;
		allowDuplicates?: boolean;
		maxTags?: number;
		delimiter?: string;
		maxTagLength?: number;
	}

	let {
		value = $bindable([]),
		onChange,
		placeholder = 'Add items...',
		error = '',
		allowDuplicates = false,
		maxTags = 10,
		delimiter = ',',
		maxTagLength = 50
	}: Props = $props();

	let inputValue = $state('');
	let inputRef = $state<HTMLInputElement>();

	// Ensure value is always an array
	$effect(() => {
		if (!Array.isArray(value)) {
			value = [];
		}
	});

	const addCurrentTag = () => {
		const trimmedValue = inputValue.trim();
		if (!trimmedValue) return;

		const tryAddTag = (tagToAdd: string) => {
			const finalTag = tagToAdd.substring(0, maxTagLength);
			if (!finalTag) return;

			if (value.length >= maxTags) {
				console.warn(`TagInput: Max tags limit (${maxTags}) reached.`);
				return;
			}

			if (!allowDuplicates && value.includes(finalTag)) {
				console.log(`TagInput: Duplicate tag "${finalTag}" ignored.`);
				return;
			}

			const newValue = [...value, finalTag];
			value = newValue;
			onChange?.(newValue);
		};

		// Support pasting comma-separated values if delimiter is set
		if (delimiter && trimmedValue.includes(delimiter)) {
			const newTags = trimmedValue
				.split(delimiter)
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0);
			newTags.forEach(tryAddTag);
		} else {
			tryAddTag(trimmedValue);
		}

		inputValue = '';
	};

	const removeTag = (index: number) => {
		if (index >= 0 && index < value.length) {
			const newValue = [...value];
			newValue.splice(index, 1);
			value = newValue;
			onChange?.(newValue);
			inputRef?.focus();
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === 'Tab') {
			event.preventDefault();
			addCurrentTag();
		} else if (event.key === 'Backspace' && !inputValue && value.length > 0) {
			removeTag(value.length - 1);
		} else if (event.key === ',' && delimiter === ',') {
			event.preventDefault();
			addCurrentTag();
		}
	};

	const handleBlur = () => {
		setTimeout(() => {
			if (inputValue.trim()) {
				addCurrentTag();
			}
		}, 150);
	};

	const focusInput = () => {
		inputRef?.focus();
	};
</script>

<div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="flex flex-wrap items-center gap-x-1.5 gap-y-1 w-full px-3 py-2 border bg-neutral-800 text-neutral-200 rounded border-neutral-600 focus-within:ring-1 focus-within:ring-blue-500/70 focus-within:border-blue-500/50 transition-colors duration-150 {error
			? 'border-red-500'
			: 'border-neutral-600'}"
		onclick={focusInput}
		role="textbox"
		tabindex="0"
		aria-label="Tag input"
	>
		<!-- Existing tags -->
		{#each value as tag, index (tag + '-' + index)}
			<div class="flex items-center px-2 text-xs rounded-sm h-28px bg-neutral-700 text-neutral-200 whitespace-nowrap">
				<span>{tag}</span>
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						removeTag(index);
					}}
					class="ml-1 p-0.5 rounded-full text-neutral-400 hover:bg-red-800/50 hover:text-red-300 focus:outline-none transition-colors"
					aria-label="Remove tag"
				>
					<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		{/each}

		<!-- Input for new tag -->
		<input
			bind:this={inputRef}
			bind:value={inputValue}
			onkeydown={handleKeyDown}
			onblur={handleBlur}
			class="flex-grow px-2 py-1 text-sm bg-transparent border-none rounded-none outline-none min-w-120px h-28px text-neutral-200 placeholder:text-neutral-500"
			placeholder={value.length === 0 ? placeholder : ''}
		/>
	</div>

	<!-- Error message -->
	{#if error}
		<div class="mt-1 text-xs text-red-400">{error}</div>
	{/if}
</div>
