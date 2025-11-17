import { useState, useRef, useCallback } from 'react';
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

const TagInput = ({
  value = [],
  onChange,
  placeholder = 'Add items...',
  error = '',
  allowDuplicates = false,
  maxTags = 10,
  delimiter = ',',
  maxTagLength = 50
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addCurrentTag = useCallback(() => {
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
      onChange([...value, finalTag]);
    };

    if (delimiter && trimmedValue.includes(delimiter)) {
      const newTags = trimmedValue
        .split(delimiter)
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      newTags.forEach(tryAddTag);
    } else {
      tryAddTag(trimmedValue);
    }
    setInputValue('');
  }, [inputValue, value, onChange, allowDuplicates, maxTags, delimiter, maxTagLength]);

  const removeTag = useCallback((index: number) => {
    if (index >= 0 && index < value.length) {
      const newTags = [...value];
      newTags.splice(index, 1);
      onChange(newTags);
      inputRef.current?.focus();
    }
  }, [value, onChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      addCurrentTag();
    } else if (event.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value.length - 1);
    } else if (event.key === ',' && delimiter === ',') {
      event.preventDefault();
      addCurrentTag();
    }
  }, [addCurrentTag, inputValue, value.length, removeTag, delimiter]);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      if (inputValue.trim()) {
        addCurrentTag();
      }
    }, 150);
  }, [inputValue, addCurrentTag]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <div
        className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 w-full px-3 py-2 border bg-neutral-800 text-neutral-200 rounded border-neutral-600 focus-within:ring-1 focus-within:ring-blue-500/70 focus-within:border-blue-500/50 transition-colors duration-150 ${error ? 'border-red-500' : 'border-neutral-600'}`}
        onClick={focusInput}
      >
        {value.map((tag, index) => (
          <div
            key={`${tag}-${index}`}
            className="flex items-center h-[28px] px-2 bg-neutral-700 text-neutral-200 rounded-sm text-xs whitespace-nowrap"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="ml-1 p-0.5 rounded-full text-neutral-400 hover:bg-red-800/50 hover:text-red-300 focus:outline-none transition-colors"
              aria-label="Remove tag"
            >
              <Icon name="X" className="w-3 h-3" />
            </button>
          </div>
        ))}

        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="flex-grow min-w-[120px] bg-transparent border-none outline-none rounded-none text-sm h-[28px] py-1 px-2 text-neutral-200 placeholder:text-neutral-500"
          placeholder={value.length === 0 ? placeholder : ''}
        />
      </div>

      {error && (
        <div className="mt-1 text-xs text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};

export default TagInput;