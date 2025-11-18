import { splitProps } from 'solid-js';
import Icon from './Icon';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  error?: string;
  allowDuplicates?: boolean;
  maxTags?: number;
  delimiter?: string;
  maxTagLength?: number;
}

const TagInput = (props: TagInputProps) => {
  const [local, _] = splitProps(props, [
    'value', 'onChange', 'placeholder', 'error', 'allowDuplicates', 
    'maxTags', 'delimiter', 'maxTagLength'
  ]);

  const [inputValue, setInputValue] = createSignal('');
  let inputRef: HTMLInputElement | undefined;

  const value = () => local.value || [];
  const placeholder = () => local.placeholder || 'Add items...';
  const allowDuplicates = () => local.allowDuplicates || false;
  const maxTags = () => local.maxTags || 10;
  const delimiter = () => local.delimiter || ',';
  const maxTagLength = () => local.maxTagLength || 50;

  const addCurrentTag = () => {
    const trimmedValue = inputValue().trim();
    if (!trimmedValue) return;

    const tryAddTag = (tagToAdd: string) => {
      const finalTag = tagToAdd.substring(0, maxTagLength());
      if (!finalTag) return;
      if (value().length >= maxTags()) {
        console.warn(`TagInput: Max tags limit (${maxTags()}) reached.`);
        return;
      }
      if (!allowDuplicates() && value().includes(finalTag)) {
        console.log(`TagInput: Duplicate tag "${finalTag}" ignored.`);
        return;
      }
      local.onChange([...value(), finalTag]);
    };

    if (delimiter() && trimmedValue.includes(delimiter())) {
      const newTags = trimmedValue
        .split(delimiter())
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      newTags.forEach(tryAddTag);
    } else {
      tryAddTag(trimmedValue);
    }
    setInputValue('');
  };

  const removeTag = (index: number) => {
    if (index >= 0 && index < value().length) {
      const newTags = [...value()];
      newTags.splice(index, 1);
      local.onChange(newTags);
      inputRef?.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      addCurrentTag();
    } else if (event.key === 'Backspace' && inputValue() === '' && value().length > 0) {
      removeTag(value().length - 1);
    } else if (event.key === ',' && delimiter() === ',') {
      event.preventDefault();
      addCurrentTag();
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (inputValue().trim()) {
        addCurrentTag();
      }
    }, 150);
  };

  const focusInput = () => {
    inputRef?.focus();
  };

  return (
    <div>
      <div
        class={`flex flex-wrap items-center gap-x-1.5 gap-y-1 w-full px-3 py-2 border bg-neutral-800 text-neutral-200 rounded border-neutral-600 focus-within:ring-1 focus-within:ring-blue-500/70 focus-within:border-blue-500/50 transition-colors duration-150 ${local.error ? 'border-red-500' : 'border-neutral-600'}`}
        onClick={focusInput}
      >
        <For each={value()}>
          {(tag, index) => (
            <div class="flex items-center h-[28px] px-2 bg-neutral-700 text-neutral-200 rounded-sm text-xs whitespace-nowrap">
              <span>{tag}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index());
                }}
                class="ml-1 p-0.5 rounded-full text-neutral-400 hover:bg-red-800/50 hover:text-red-300 focus:outline-none transition-colors"
                aria-label="Remove tag"
              >
                <Icon name="X" class="w-3 h-3" />
              </button>
            </div>
          )}
        </For>

        <input
          ref={inputRef}
          value={inputValue()}
          onInput={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          class="flex-grow min-w-[120px] bg-transparent border-none outline-none rounded-none text-sm h-[28px] py-1 px-2 text-neutral-200 placeholder:text-neutral-500"
          placeholder={value().length === 0 ? placeholder() : ''}
        />
      </div>

      <Show when={local.error}>
        <div class="mt-1 text-xs text-red-400">
          {local.error}
        </div>
      </Show>
    </div>
  );
};

export default TagInput;