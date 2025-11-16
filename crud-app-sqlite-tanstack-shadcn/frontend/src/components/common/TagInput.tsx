import { X } from 'lucide-react';
import { useState, KeyboardEvent } from 'react';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({ 
  value = [], 
  onChange, 
  placeholder = 'Add tags...',
  className = ''
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Remove last tag on backspace when input is empty
      removeTag(value[value.length - 1]);
    } else if (e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 p-2 border border-border rounded-input bg-surface focus-within:border-border-focus focus-within:shadow-[0_0_0_1px_var(--color-border-focus)] transition-all ${className}`}>
      {value.map((tag) => (
        <span
          key={tag}
          className="border tag-sm bg-primary/10 text-primary border-primary/20 rounded-button"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="transition-colors hover:text-danger"
            aria-label={`Remove ${tag}`}
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={value.length === 0 ? placeholder : ''}
    className="flex-1 min-w-[80px] bg-transparent border-0 outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none text-size-sm py-0 px-0 text-text-primary placeholder:text-text-muted"
      />
    </div>
  );
}

export default TagInput;