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
  const [isFocused, setIsFocused] = useState(false);
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
        className={`flex flex-wrap items-center gap-1 w-full px-input-x py-input-y border rounded-input bg-surface text-text-primary transition-shadow ${error ? 'border-danger' : 'border-border'} ${isFocused ? 'ring-2 ring-primary ring-inset' : ''}`}
        onClick={focusInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={-1}
      >
        {value.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="tag-sm bg-primary-light text-primary rounded-button inline-flex items-center whitespace-nowrap"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              tabIndex={-1}
              className="btn-icon-xs inline-flex items-center justify-center ml-1 text-primary hover:text-danger hover:bg-danger/20 focus-visible:outline-none transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <Icon name="X" className="w-3 h-3" />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="flex-1 min-w-[80px] bg-transparent border-0 outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none text-size-sm py-0 px-0 text-text-primary placeholder:text-text-muted"
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