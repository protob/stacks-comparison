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
        className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 w-full px-input-x py-input-y border bg-surface text-text-primary rounded-input ${error ? 'border-danger' : 'border-border'} focus-within:ring-1 focus-within:ring-primary/70 focus-within:border-primary/50 transition-colors duration-150`}
        onClick={focusInput}
      >
        {value.map((tag, index) => (
          <div
            key={`${tag}-${index}`}
            className="flex items-center h-[28px] tag-sm bg-primary-light text-primary rounded-button whitespace-nowrap"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="ml-1 p-0.5 rounded-full text-text-muted hover:bg-danger/50 hover:text-danger focus:outline-none transition-colors"
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
          className="flex-grow min-w-[120px] bg-transparent border-none outline-none rounded-none text-size-sm h-[28px] py-1 px-2 text-text-primary placeholder:text-text-muted"
          placeholder={value.length === 0 ? placeholder : ''}
        />
      </div>

      {error && (
        <div className="mt-1 text-size-xs text-danger">
          {error}
        </div>
      )}
    </div>
  );
};

export default TagInput;