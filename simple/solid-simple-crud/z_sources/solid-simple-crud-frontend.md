# Frontend Source Code Collection (solid-simple-crud)

**Generated on:** wto, 18 lis 2025, 19:49:55 CET
**Frontend directory:** /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/simple/solid-simple-crud/frontend

---

## `index.html`
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solid Todo App - Manage Your Tasks</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body class="font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## `gen.sh`
```
#!/bin/bash
# setup-solid-project.sh
set -e

echo "\U0001f680 Creating SolidJS project structure in current directory..."

# Create directory structure
mkdir -p src/{components/{common,items,layout},stores,hooks,api,types,utils,pages}
mkdir -p public

# Create main files
touch src/{main.tsx,App.tsx,index.css}
touch src/types/index.ts
touch src/utils/{helpers.ts,slugify.ts,schema-helpers.ts}
touch src/api/{apiClient.ts,itemApi.ts}
touch src/stores/{itemStore.ts,uiStore.ts}
touch src/hooks/useItemFilters.ts
touch src/pages/ItemPage.tsx

# Create component files
touch src/components/common/{Button.tsx,Icon.tsx,Modal.tsx,FormField.tsx,TagInput.tsx,SchemaForm.tsx,SchemaField.tsx,ConfirmDeleteModal.tsx,Notifications.tsx}
touch src/components/items/{ItemForm.tsx,ItemItem.tsx}
touch src/components/layout/{AppSidebar.tsx,FilterBar.tsx}

# Create config files
touch {vite.config.ts,tsconfig.json,tailwind.config.js}
touch index.html

# Create package.json
cat > package.json << 'EOF'
{
  "name": "solid-todo-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "solid-js": "^1.8.15",
    "@solidjs/router": "^0.13.0",
    "zod": "^3.23.8",
    "lucide-solid": "^0.379.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "vite-plugin-solid": "^2.10.2",
    "@tailwindcss/vite": "^4.0.0-alpha.13",
    "tailwindcss": "^4.0.0-alpha.13",
    "autoprefixer": "^10.4.19",
    "unplugin-auto-import": "^0.17.6"
  }
}
EOF

echo "\u2705 Project structure created successfully!"
echo ""
echo "\U0001f4c1 Created directory structure:"
echo "\u251c\u2500\u2500 src/"
echo "\u2502   \u251c\u2500\u2500 components/"
echo "\u2502   \u2502   \u251c\u2500\u2500 common/"
echo "\u2502   \u2502   \u251c\u2500\u2500 items/"
echo "\u2502   \u2502   \u2514\u2500\u2500 layout/"
echo "\u2502   \u251c\u2500\u2500 stores/"
echo "\u2502   \u251c\u2500\u2500 hooks/"
echo "\u2502   \u251c\u2500\u2500 api/"
echo "\u2502   \u251c\u2500\u2500 types/"
echo "\u2502   \u251c\u2500\u2500 utils/"
echo "\u2502   \u2514\u2500\u2500 pages/"
echo "\u251c\u2500\u2500 public/"
echo "\u2514\u2500\u2500 config files (package.json, vite.config.ts, etc.)"
echo ""
echo "\U0001f3af Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Copy the provided code files to their respective locations"
echo "3. Start development: npm run dev"
```

## `tsconfig.json`
```
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/auto-imports.d.ts"
  ]
}
```

## `package.json`
```
{
  "name": "solid-todo-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@solidjs/router": "^0.15.3",
    "clsx": "^2.1.1",
    "lucide-solid": "^0.511.0",
    "solid-js": "^1.9.7",
    "zod": "^3.25.42"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vite": "^6.3.5",
    "vite-plugin-solid": "^2.11.6",
    "@tailwindcss/vite": "^4.1.8",
    "tailwindcss": "^4.1.8",
    "autoprefixer": "^10.4.21",
    "unplugin-auto-import": "^19.3.0"
  },
  "trustedDependencies": [
    "@tailwindcss/oxide",
    "esbuild"
  ]
}
```

## `vite.config.ts`
```
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tailwind from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    solid(),
    tailwind(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      imports: [
        'solid-js',
        {
          '@solidjs/router': ['Router', 'Route', 'Navigate', 'useNavigate', 'useLocation', 'useParams', 'useSearchParams'],
          'solid-js/store': ['createStore', 'produce', 'reconcile'],
          'solid-js/web': ['Portal'],
          'clsx': [['default', 'clsx']],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/hooks/**',
        'src/stores/**',
        'src/utils/**',
        'src/api/**',
        'src/types/**',
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ['@solidjs/router'],
    // Pre-bundle lucide-solid for better performance
    include: ['lucide-solid']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Direct alias to lucide-solid icons for better tree-shaking
      'lucide-solid/icons': fileURLToPath(
        new URL('./node_modules/lucide-solid/dist/source/icons', import.meta.url)
      ),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server: {
    watch: {
      ignored: ['**/server-node/data/**']
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['solid-js', '@solidjs/router', 'clsx', 'zod'],
          'icons': ['lucide-solid'],
        }
      }
    }
  }
});

```

## `src/components/items/ItemForm.tsx`
```
import { z } from 'zod';
import { splitProps } from 'solid-js';
import Button from '../common/Button';
import SchemaForm from '../common/SchemaForm';
import type { Item, Priority } from '@/types';

interface ItemFormProps {
  item?: Item | null;
  isLoading?: boolean;
  prefilledCategory?: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const priorityEnum = z.enum(['low', 'mid', 'high']).optional().default('mid');

const itemZodSchema = z.object({
  name: z.string().min(1, "Name is required."),
  text: z.string().min(1, "Description is required."),
  category: z.string().min(1, "Category is required."),
  priority: priorityEnum,
  tags: z.array(z.string()).optional().default([]),
  isCompleted: z.boolean().optional().default(false),
});

type ItemFormDataType = z.infer<typeof itemZodSchema>;

const ItemForm = (props: ItemFormProps) => {
  const [local, _] = splitProps(props, [
    'item', 'isLoading', 'prefilledCategory', 'onSubmit', 'onCancel'
  ]);

  // Use store for form data
  const [formData, setFormData] = createStore<Partial<ItemFormDataType>>({});

  // Layout hints for SchemaForm
  const layoutHints = createMemo(() => ({
    name: { 
      order: 10, 
      placeholder: "e.g., Buy groceries",
      label: "Item Name"
    },
    text: { 
      order: 20, 
      widget: "textarea", 
      rows: 4, 
      placeholder: "Add more details about this item...",
      label: "Description"
    },
    category: { 
      order: 30, 
      label: "Category", 
      placeholder: "e.g., Work, Personal, Shopping" 
    },
    priority: {
      order: 40,
      widget: "select",
      label: "Priority (optional)",
      options: [
        { value: 'low', label: 'Low' },
        { value: 'mid', label: 'Medium' },
        { value: 'high', label: 'High' },
      ],
    },
    tags: { 
      order: 50, 
      widget: "tag-input", 
      placeholder: "Add tags...",
      label: "Tags (optional)"
    },
    isCompleted: { 
      order: 60, 
      label: "Mark as completed",
      hidden: !local.item
    },
  }));

  // Initialize form data when props change
  createEffect(() => {
    if (local.item) {
      // Editing existing item
      setFormData({
        name: local.item.name || '',
        text: local.item.text || '',
        category: local.item.categories[0] || '',
        priority: local.item.priority || 'mid',
        tags: Array.isArray(local.item.tags) ? [...local.item.tags] : [],
        isCompleted: !!local.item.isCompleted,
      });
    } else {
      // Creating new item
      setFormData({
        name: '',
        text: '',
        category: local.prefilledCategory || '',
        priority: 'mid',
        tags: [],
        isCompleted: false,
      });
    }
  });

  const handleSubmit = (validatedData: ItemFormDataType) => {
    const submissionPayload: any = {
      name: validatedData.name,
      text: validatedData.text,
      priority: validatedData.priority || 'mid',
      tags: validatedData.tags || [],
      categories: validatedData.category ? [validatedData.category.trim()] : [],
    };
    
    // Only include isCompleted for existing items
    if (local.item) {
      submissionPayload.isCompleted = validatedData.isCompleted;
    }
    
    local.onSubmit(submissionPayload);
  };

  // Update form data using store setter
  const handleFormDataChange = (key: string, value: any) => {
    setFormData(key, value);
  };

  return (
    <SchemaForm
      schema={itemZodSchema}
      value={formData}
      onChange={handleFormDataChange}
      layoutHints={layoutHints()}
      columns={1}
      onSubmit={handleSubmit}
      onCancel={local.onCancel}
      showErrors={true}
      footer={({ submit }) => (
        <div class="flex justify-end pt-4 space-x-3">
          <Button type="button" variant="secondary" onClick={local.onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            loading={local.isLoading}
            onClick={submit}
            icon={local.item?.id ? 'Save' : 'Plus'}
          >
            {local.item?.id ? 'Update Item' : 'Create Item'}
          </Button>
        </div>
      )}
    />
  );
};

export default ItemForm;
```

## `src/components/items/ItemItem.tsx`
```
import { splitProps } from 'solid-js';
import Button from '../common/Button';
import type { Item, Priority } from '@/types';

interface ItemItemProps {
  item: Item;
  onToggleComplete: (item: Item) => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const ItemItem = (props: ItemItemProps) => {
  const [local, _] = splitProps(props, ['item', 'onToggleComplete', 'onEdit', 'onDelete']);

  const getPriorityClass = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-900/50 text-red-300 border border-red-800';
      case 'mid': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-800';
      case 'low': return 'bg-green-900/50 text-green-300 border border-green-800';
      default: return 'bg-neutral-700 text-neutral-400';
    }
  };

  const handleToggleComplete = () => {
    local.onToggleComplete(local.item);
  };

  const handleEdit = () => {
    local.onEdit(local.item);
  };

  const handleDelete = () => {
    local.onDelete(local.item);
  };

  return (
    <div class="p-4 bg-neutral-800 border border-neutral-700 rounded">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-start flex-1 min-w-0 gap-3">
          <input
            type="checkbox"
            checked={local.item.isCompleted}
            onChange={handleToggleComplete}
            class="mt-1 w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-blue-600 focus:ring-blue-500 focus:ring-1"
          />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-2">
              <h3 
                class={clsx(
                  'font-medium text-lg',
                  local.item.isCompleted ? 'line-through text-neutral-500' : 'text-neutral-100'
                )}
              >
                {local.item.name}
              </h3>
              <span 
                class={clsx(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  getPriorityClass(local.item.priority)
                )}
              >
                {local.item.priority.charAt(0).toUpperCase() + local.item.priority.slice(1)}
              </span>
            </div>
            
            <p 
              class={clsx(
                'text-sm mb-3',
                local.item.isCompleted ? 'line-through text-neutral-600' : 'text-neutral-400'
              )}
            >
              {local.item.text || 'No description provided.'}
            </p>
            
            <Show when={local.item.tags?.length > 0}>
              <div class="max-h-16 overflow-y-auto scrollbar-thin">
                <div class="flex flex-wrap gap-1">
                  <For each={local.item.tags}>
                    {(tag) => (
                      <span class="px-2 py-1 bg-neutral-700 rounded text-neutral-400 text-xs">
                        {tag}
                      </span>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </div>
        
        <div class="flex gap-1">
          <Button 
            variant="text" 
            size="sm" 
            onClick={handleEdit} 
            icon="Edit3"
            aria-label="Edit item"
          />
          <Button 
            variant="text" 
            size="sm" 
            onClick={handleDelete} 
            icon="Trash2" 
            class="text-red-400 hover:text-red-300"
            aria-label="Delete item"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemItem;
```

## `src/components/common/Modal.tsx`
```
import { Portal } from 'solid-js/web';
import { ParentComponent, splitProps } from 'solid-js';
import Button from './Button';
import Icon from './Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  persistent?: boolean;
  closeOnEsc?: boolean;
  hideCloseButton?: boolean;
  headerClass?: string;
  bodyClass?: string;
  footerClass?: string;
  modalClass?: string;
  footer?: JSX.Element;
}

const Modal: ParentComponent<ModalProps> = (props) => {
  const [local, _] = splitProps(props, [
    'isOpen', 'onClose', 'title', 'size', 'persistent', 'closeOnEsc', 
    'hideCloseButton', 'headerClass', 'bodyClass', 'footerClass', 
    'modalClass', 'children', 'footer'
  ]);

  const size = () => local.size || 'md';
  const persistent = () => local.persistent || false;
  const closeOnEsc = () => local.closeOnEsc ?? true;
  const bodyClass = () => local.bodyClass || 'py-4 px-6';

  let modalRef: HTMLDivElement | undefined;

  createEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc() && local.isOpen) {
        closeModal();
      }
    };

    if (local.isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      
      onCleanup(() => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      });
    }
  });

  const closeModal = () => {
    if (persistent() && !local.hideCloseButton) {
      local.onClose();
      return;
    }
    if (!persistent()) {
      local.onClose();
    }
  };

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget && !persistent()) {
      closeModal();
    }
  };

  const baseSizeClasses = createMemo(() => {
    if (local.modalClass && (local.modalClass.includes('max-w-') || local.modalClass.includes('w-'))) {
      return '';
    }
    return {
      'sm': 'sm:max-w-sm',
      'md': 'sm:max-w-md',
      'lg': 'sm:max-w-lg',
    }[size()] || 'sm:max-w-md';
  });

  return (
    <Show when={local.isOpen}>
      <Portal>
        <div
          class="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            class={clsx(
              'bg-neutral-800 text-neutral-100 flex flex-col overflow-hidden w-full',
              baseSizeClasses(),
              local.modalClass
            )}
          >
            <Show when={local.title || !local.hideCloseButton}>
              <header class={clsx('p-4 border-b border-neutral-700 flex items-center justify-between shrink-0', local.headerClass)}>
                <Show when={local.title} fallback={<div></div>}>
                  <h2 class="text-lg font-semibold">{local.title}</h2>
                </Show>
                <Show when={!local.hideCloseButton}>
                  <Button
                    variant="stealth"
                    size="icon"
                    onClick={closeModal}
                    class="ml-auto -mr-2 -my-2"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </Show>
              </header>
            </Show>

            <div class={clsx('flex-1 overflow-y-auto scrollbar-thin', bodyClass())}>
              {local.children}
            </div>

            <Show when={local.footer}>
              <footer class={clsx('p-4 border-t border-neutral-700 shrink-0', local.footerClass)}>
                {local.footer}
              </footer>
            </Show>
          </div>
        </div>
      </Portal>
    </Show>
  );
};

export default Modal;
```

## `src/components/common/TagInput.tsx`
```
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
```

## `src/components/common/SchemaField.tsx`
```
import { z } from 'zod';
import { splitProps, createEffect, createSignal, Show, For } from 'solid-js';
import FormField from './FormField';
import TagInput from './TagInput';
import { unwrapZodType } from '@/utils/schema-helpers';
import clsx from 'clsx';

interface SchemaFieldProps {
  schema: z.ZodTypeAny;
  name: string;
  value: any;
  error?: string;
  layoutHint?: Record<string, any>;
  onChange: (value: any) => void;
}

const SchemaField = (props: SchemaFieldProps) => {
  const [local, _] = splitProps(props, [
    'schema', 'name', 'value', 'error', 'layoutHint', 'onChange'
  ]);

  const fieldId = `field-${local.name}`;
  const layoutHint = () => local.layoutHint || {};
  const baseSchema = () => unwrapZodType(local.schema);

  const fieldType = () => {
    const schema = baseSchema();
    if (!schema) {
      console.warn(`SchemaField: Schema is undefined for field '${local.name}'`);
      return 'unknown';
    }
    
    if (schema instanceof z.ZodString) return 'string';
    if (schema instanceof z.ZodNumber) return 'number';
    if (schema instanceof z.ZodBoolean) return 'boolean';
    if (schema instanceof z.ZodEnum) return 'enum';
    if (schema instanceof z.ZodArray) return 'array';
    if (schema instanceof z.ZodObject) return 'object';
    if (local.name.toLowerCase().includes('date') || (schema._def?.typeName === 'ZodDate')) return 'date';
    
    return 'unknown';
  };

  const effectiveFieldType = () => {
    const hint = layoutHint();
    const type = fieldType();
    
    if (hint?.widget === 'textarea' && type === 'string') {
      return 'textarea';
    }
    if (hint?.widget === 'select' && type === 'string') {
      if (hint?.options) return 'select-string-enum';
    }
    if (hint?.widget === 'select' && type === 'enum') {
      return 'enum';
    }
    if (type === 'array' && (hint?.widget === 'tag-input' || ['tags', 'categories'].includes(local.name.toLowerCase()))) {
      return 'tag-input';
    }
    
    return type;
  };

  const isRequired = () => {
    const originalSchema = local.schema;
    return !(
      originalSchema instanceof z.ZodOptional ||
      originalSchema instanceof z.ZodNullable ||
      originalSchema instanceof z.ZodDefault
    );
  };

  const formatEnumOption = (optionValue: string): string => {
    const hint = layoutHint();
    if (hint?.options) {
      const foundOption = hint.options.find((opt: {value: string, label: string}) => opt.value === optionValue);
      if (foundOption) return foundOption.label;
    }
    return optionValue.replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const enumOptions = () => {
    const type = fieldType();
    const effectiveType = effectiveFieldType();
    const schema = baseSchema();
    const hint = layoutHint();
    
    if (type === 'enum') {
      if (schema instanceof z.ZodEnum) {
        return schema.options.map((opt: string) => ({ 
          value: opt, 
          label: formatEnumOption(opt) 
        }));
      }
    }
    if (effectiveType === 'select-string-enum' && hint?.options) {
      return hint.options;
    }
    return [];
  };

  const getLabel = (): string => {
    const hint = layoutHint();
    return hint?.label ||
      local.name.replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  };

  const fieldClass = () => {
    const hint = layoutHint();
    if (hint?.colSpan === 2) return 'md:col-span-2';
    if (hint?.colSpan === 3) return 'md:col-span-3';
    return '';
  };

  const handleChange = (newValue: any) => {
    const effectiveType = effectiveFieldType();
    const required = isRequired();
    let processedValue = newValue;
    
    if ((effectiveType === 'enum' || effectiveType === 'select-string-enum') && !required && newValue === '') {
      processedValue = undefined;
    } else if (effectiveType === 'number') {
      const num = parseFloat(newValue);
      processedValue = isNaN(num) ? (required ? 0 : undefined) : num;
    }
    
    local.onChange(processedValue);
  };

  // Use local signals for input values
  const [localValue, setLocalValue] = createSignal(local.value || '');
  const [localChecked, setLocalChecked] = createSignal(!!local.value);
  const [localNumberValue, setLocalNumberValue] = createSignal(local.value || '');

  // Sync with external value changes
  createEffect(() => {
    setLocalValue(local.value || '');
    setLocalChecked(!!local.value);
    setLocalNumberValue(local.value || '');
  });

  const renderField = () => {
    const effectiveType = effectiveFieldType();
    const hint = layoutHint();
    const required = isRequired();
    const options = enumOptions();

    switch (effectiveType) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            value={localValue()}
            onInput={(e) => {
              setLocalValue(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows={hint?.rows || 3}
            placeholder={hint?.placeholder}
            required={required}
            aria-invalid={!!local.error}
          />
        );

      case 'tag-input':
        return (
          <TagInput
            value={local.value || []}
            onChange={handleChange}
            placeholder={hint?.placeholder || 'Add items...'}
            error={local.error}
          />
        );

      case 'enum':
      case 'select-string-enum':
        return (
          <select
            id={fieldId}
            value={localValue()}
            onChange={(e) => {
              setLocalValue(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required={required}
            aria-invalid={!!local.error}
          >
            <Show when={!required}>
              <option value="">-- Optional --</option>
            </Show>
            <For each={options}>
              {(option) => (
                <option value={option.value}>
                  {option.label}
                </option>
              )}
            </For>
          </select>
        );

      case 'date':
        return (
          <input
            id={fieldId}
            value={localValue()}
            onInput={(e) => {
              setLocalValue(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            type="date"
            class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required={required}
            aria-invalid={!!local.error}
          />
        );

      case 'number':
        return (
          <input
            id={fieldId}
            value={localNumberValue()}
            onInput={(e) => {
              setLocalNumberValue(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            type="number"
            step={hint?.step || 'any'}
            class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={hint?.placeholder}
            required={required}
            aria-invalid={!!local.error}
          />
        );

      case 'boolean':
        return (
          <div class="flex items-center h-10">
            <input
              id={fieldId}
              checked={localChecked()}
              onChange={(e) => {
                setLocalChecked(e.currentTarget.checked);
                handleChange(e.currentTarget.checked);
              }}
              type="checkbox"
              class="w-4 h-4 rounded accent-blue-500 focus:ring-blue-500 border-neutral-600 bg-neutral-700"
              required={required}
              aria-invalid={!!local.error}
            />
          </div>
        );

      case 'string':
        return (
          <input
            id={fieldId}
            value={localValue()}
            onInput={(e) => {
              setLocalValue(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            type="text"
            class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={hint?.placeholder}
            required={required}
            aria-invalid={!!local.error}
          />
        );

      default:
        return (
          <div class="p-2 text-xs italic text-red-400 border rounded bg-neutral-800 border-red-700/50">
            Unsupported field type: {effectiveType} ({local.name})
          </div>
        );
    }
  };

  return (
    <FormField
      label={getLabel()}
      required={isRequired()}
      error={local.error}
      help={layoutHint()?.help}
      labelFor={fieldId}
      class={fieldClass()}
    >
      {renderField()}
    </FormField>
  );
};

export default SchemaField;
```

## `src/components/common/Notifications.tsx`
```
import { For } from 'solid-js';
import { uiStore } from '@/stores/uiStore';
import Icon from './Icon';
import type { NotificationType } from '@/types';

const Notifications = () => {
  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info':
      default: return 'Info';
    }
  };

  const getBgClassForType = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'bg-green-700 border-green-600';
      case 'error': return 'bg-red-700 border-red-600';
      case 'warning': return 'bg-yellow-700 border-yellow-600';
      case 'info':
      default: return 'bg-blue-700 border-blue-600';
    }
  };

  const getTextClassForType = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'text-green-100';
      case 'error': return 'text-red-100';
      case 'warning': return 'text-yellow-100';
      case 'info':
      default: return 'text-blue-100';
    }
  };

  return (
    <Show when={uiStore.notifications.length > 0}>
      <div class="fixed z-[200] flex flex-col max-w-md gap-2 top-4 right-4">
        <div class="space-y-2">
          <For each={uiStore.notifications}>
            {(notification) => (
              <div
                class={clsx(
                  'flex items-start p-3 rounded-sm shadow-lg border text-white',
                  getBgClassForType(notification.type)
                )}
              >
                <Icon
                  name={getIconForType(notification.type)}
                  class={clsx('h-5 w-5 mt-0.5 mr-2 shrink-0', getTextClassForType(notification.type))}
                />
                <div class="flex-1 mr-2">
                  <p class={clsx('text-sm', getTextClassForType(notification.type))}>
                    {notification.message}
                  </p>
                </div>
                <button
                  onClick={() => uiStore.removeNotification(notification.id)}
                  class={clsx('text-neutral-300 hover:text-white', getTextClassForType(notification.type))}
                >
                  <Icon name="X" class="w-4 h-4" />
                </button>
              </div>
            )}
          </For>
        </div>
      </div>
    </Show>
  );
};

export default Notifications;
```

## `src/components/common/FormField.tsx`
```
import { ParentComponent, splitProps } from 'solid-js';

interface FormFieldProps {
  label?: string;
  labelFor?: string;
  help?: string;
  error?: string;
  required?: boolean;
  labelClass?: string;
  fullWidth?: boolean;
  class?: string;
}

const FormField: ParentComponent<FormFieldProps> = (props) => {
  const [local, _] = splitProps(props, [
    'label', 'labelFor', 'help', 'error', 'required', 'labelClass', 
    'fullWidth', 'children', 'class'
  ]);

  const containerClass = createMemo(() => 
    `mb-4 ${local.fullWidth ? 'w-full' : ''} ${local.class || ''}`.trim()
  );

  const computedLabelClass = createMemo(() => 
    `block text-sm font-medium mb-1 ${local.labelClass || 'text-neutral-300'} ${local.error ? 'text-red-400' : ''}`.trim()
  );

  return (
    <div class={containerClass()}>
      <Show when={local.label}>
        <label for={local.labelFor} class={computedLabelClass()}>
          {local.label}
          <Show when={local.required}>
            <span class="ml-1 text-red-500">*</span>
          </Show>
        </label>
      </Show>
      {local.children}
      <Show when={local.help && !local.error}>
        <div class="mt-1 text-xs text-neutral-500">
          {local.help}
        </div>
      </Show>
      <Show when={local.error}>
        <div class="mt-1 text-xs text-red-400">
          {local.error}
        </div>
      </Show>
    </div>
  );
};

export default FormField;
```

## `src/components/common/ConfirmDeleteModal.tsx`
```
import { splitProps } from 'solid-js';
import Modal from './Modal';
import Button from './Button';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  isLoading?: boolean;
}

const ConfirmDeleteModal = (props: ConfirmDeleteModalProps) => {
  const [local, _] = splitProps(props, [
    'isOpen', 'onClose', 'onConfirm', 'title', 'message', 'confirmText', 'isLoading'
  ]);

  const title = () => local.title || 'Confirm Deletion';
  const message = () => local.message || 'Are you sure you want to delete this item? This action cannot be undone.';
  const confirmText = () => local.confirmText || 'Delete';

  let cancelButtonRef: HTMLButtonElement | undefined;

  createEffect(() => {
    if (local.isOpen) {
      setTimeout(() => {
        cancelButtonRef?.focus();
      }, 100);
    }
  });

  return (
    <Modal isOpen={local.isOpen} onClose={local.onClose} title={title()} size="sm" persistent>
      <p class="text-neutral-300 text-sm mb-6" innerHTML={message()} />
      <div class="flex justify-end gap-3">
        <Button variant="secondary" onClick={local.onClose} ref={cancelButtonRef}>
          Cancel
        </Button>
        <Button variant="danger" onClick={local.onConfirm} loading={local.isLoading}>
          {confirmText()}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
```

## `src/components/common/Icon.tsx`
```
// Direct imports from lucide-solid icons directory for better tree-shaking
import CheckCircle from 'lucide-solid/icons/check-circle';
import AlertCircle from 'lucide-solid/icons/alert-circle';
import AlertTriangle from 'lucide-solid/icons/alert-triangle';
import Edit3 from 'lucide-solid/icons/edit-3';
import Trash2 from 'lucide-solid/icons/trash-2';
import Plus from 'lucide-solid/icons/plus';
import Save from 'lucide-solid/icons/save';
import X from 'lucide-solid/icons/x';
import Loader from 'lucide-solid/icons/loader';
import Loader2 from 'lucide-solid/icons/loader-2';
import Info from 'lucide-solid/icons/info';
import ClipboardList from 'lucide-solid/icons/clipboard-list';
import HelpCircle from 'lucide-solid/icons/help-circle';

interface IconProps {
  name: string;
  size?: number | string;
  class?: string;
  color?: string;
}

// Map of icon names to their imported components
const iconMap = {
  'CheckCircle': CheckCircle,
  'AlertCircle': AlertCircle,
  'AlertTriangle': AlertTriangle,
  'Edit3': Edit3,
  'Trash2': Trash2,
  'Plus': Plus,
  'Save': Save,
  'X': X,
  'Loader': Loader,
  'Loader2': Loader2,
  'Info': Info,
  'ClipboardList': ClipboardList,
  'HelpCircle': HelpCircle,
};

const Icon = (props: IconProps): JSX.Element => {
  const IconComponent = iconMap[props.name as keyof typeof iconMap];
  
  if (!IconComponent) {
    console.warn(`Icon "${props.name}" not found in iconMap. Available icons:`, Object.keys(iconMap));
    // Fallback to HelpCircle for unknown icons
    const FallbackIcon = iconMap['HelpCircle'];
    return (
      <FallbackIcon
        size={props.size || 24}
        class={`inline-block align-middle shrink-0 ${props.class || ''}`}
        color={props.color || 'currentColor'}
      />
    );
  }

  return (
    <IconComponent
      size={props.size || 24}
      class={`inline-block align-middle shrink-0 ${props.class || ''}`}
      color={props.color || 'currentColor'}
    />
  );
};

export default Icon;

```

## `src/components/common/Button.tsx`
```
import { JSX, ParentComponent, splitProps } from 'solid-js';
import Icon from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text' | 'stealth';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: string;
  iconClass?: string;
  iconOnly?: boolean;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void);
}

const Button: ParentComponent<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, [
    'variant', 'size', 'class', 'fullWidth', 'icon', 'iconClass', 
    'iconOnly', 'iconPosition', 'disabled', 'loading', 'children', 'ref'
  ]);

  const variant = () => local.variant || 'primary';
  const size = () => local.size || 'md';
  const iconPosition = () => local.iconPosition || 'left';

  const baseClasses = createMemo(() => {
    let classes = 'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-sm focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-opacity-30';

    if (local.loading) {
      classes += ' cursor-default';
    } else if (local.disabled) {
      classes += ' opacity-60 cursor-not-allowed';
    } else {
      classes += ' cursor-pointer';
    }
    return classes;
  });

  const variantClasses = createMemo(() => ({
    'primary': 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/30',
    'secondary': 'bg-neutral-700/80 text-neutral-200 hover:bg-neutral-600 focus:ring-neutral-500/30',
    'danger': 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/30',
    'text': 'bg-transparent text-neutral-300 hover:bg-neutral-700/50 focus:ring-blue-500/30',
    'stealth': 'bg-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/60 focus:ring-blue-500/30 p-1.5',
  }[variant()]));

  const effectiveIconOnly = createMemo(() => 
    local.iconOnly || (!!local.icon && !local.children && !local.loading)
  );

  const sizeClasses = createMemo(() => {
    if (effectiveIconOnly() || size() === 'icon') {
      return ({
        'xs': 'p-1',
        'sm': 'p-1.5',
        'md': 'p-2',
        'lg': 'p-2.5',
        'icon': 'p-2',
      }[size() === 'icon' ? 'icon' : size()]) || 'p-2';
    }
    return ({
      'xs': 'text-xs px-2.5 py-1 gap-1',
      'sm': 'text-sm px-3 py-1.5 gap-1.5',
      'md': 'text-base px-4 py-2 gap-2',
      'lg': 'text-lg px-5 py-2.5 gap-2.5',
    }[size()]) || 'text-base px-4 py-2 gap-2';
  });

  const iconSizeMap: Record<Exclude<ButtonSize, 'icon'>, number> = { xs: 14, sm: 16, md: 18, lg: 20 };
  const iconSize = () => size() === 'icon' ? 20 : (iconSizeMap[size() as Exclude<ButtonSize, 'icon'>] ?? 18);

  const widthClass = () => local.fullWidth ? 'w-full' : '';

  const orderClasses = createMemo(() => {
    if (!local.icon || !local.children || local.loading || effectiveIconOnly()) return { icon: '', slot: '' };
    return iconPosition() === 'left'
      ? { icon: 'order-first', slot: 'order-last' }
      : { icon: 'order-last', slot: 'order-first' };
  });

  return (
    <button
      ref={local.ref}
      disabled={local.disabled || local.loading}
      class={`${baseClasses()} ${variantClasses()} ${sizeClasses()} ${widthClass()} ${local.class || ''}`}
      {...others}
    >
      <Show when={local.loading} fallback={
        <>
          <Show when={local.icon}>
            <Icon name={local.icon!} size={iconSize()} class={`${orderClasses().icon} ${local.iconClass || ''}`} />
          </Show>
          <Show when={local.children && !effectiveIconOnly()}>
            <span class={orderClasses().slot}>
              {local.children}
            </span>
          </Show>
        </>
      }>
        <Icon name="Loader" size={iconSize()} class={`animate-spin ${local.iconClass || ''}`} />
        <Show when={local.children && !effectiveIconOnly()}>
          <span class={`${orderClasses().slot} opacity-70`}>{local.children}</span>
        </Show>
      </Show>
    </button>
  );
};

export default Button;
```

## `src/components/common/SchemaForm.tsx`
```
import { z } from 'zod';
import { splitProps } from 'solid-js';
import SchemaField from './SchemaField';
import Button from './Button';
import { getBaseSchema } from '@/utils/schema-helpers';

interface SchemaFormProps {
  schema: z.ZodTypeAny;
  value: Record<string, any>;
  onChange: (key: string, value: any) => void;
  layoutHints?: Record<string, any>;
  columns?: number;
  excludeFields?: string[];
  showErrors?: boolean;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  children?: JSX.Element;
  customFields?: JSX.Element;
  footer?: (props: { submit: () => void }) => JSX.Element;
}

const SchemaForm = (props: SchemaFormProps) => {
  const [local, _] = splitProps(props, [
    'schema', 'value', 'onChange', 'layoutHints', 'columns', 'excludeFields',
    'showErrors', 'onSubmit', 'onCancel', 'children', 'customFields', 'footer'
  ]);

  const [errors, setErrors] = createStore<Record<string, { message: string }>>({});
  const [touchedFields, setTouchedFields] = createStore<Record<string, boolean>>({});

  const layoutHints = () => local.layoutHints || {};
  const columns = () => local.columns || 1;
  const excludeFields = () => local.excludeFields || ['id', 'slug', 'created_at', 'modified_at', 'updatedAt', 'createdAt'];
  const showErrors = () => local.showErrors ?? true;

  const columnClass = createMemo(() => {
    switch (columns()) {
      case 1: return '';
      case 2: return 'md:grid-cols-2';
      case 3: return 'md:grid-cols-3';
      case 4: return 'md:grid-cols-4';
      default: return '';
    }
  });

  // Create a stable array of sorted field keys instead of object entries
  const sortedFieldKeys = createMemo(() => {
    const baseSchema = getBaseSchema(local.schema);
    if (!baseSchema || !(baseSchema instanceof z.ZodObject)) {
      console.error("SchemaForm: Cannot compute sortedFields. Base schema is not a ZodObject.");
      return [];
    }
    const schemaShape = baseSchema.shape as Record<string, z.ZodTypeAny>;

    if (!schemaShape) {
      console.error("SchemaForm: Schema shape is undefined!");
      return [];
    }

    const keys = Object.keys(schemaShape);
    const hints = layoutHints();
    return keys.sort((keyA, keyB) => {
      const orderA = hints[keyA]?.order ?? 999;
      const orderB = hints[keyB]?.order ?? 999;
      return orderA - orderB;
    });
  });

  const shouldRenderField = (key: string): boolean => {
    const excluded = excludeFields().includes(key);
    const hidden = layoutHints()[key]?.hidden;
    return !excluded && !hidden;
  };

  const getFieldSchema = (key: string): z.ZodTypeAny | undefined => {
    const baseSchema = getBaseSchema(local.schema);
    if (!baseSchema || !(baseSchema instanceof z.ZodObject)) return undefined;
    return baseSchema.shape[key];
  };

  const getLayoutHint = (key: string): Record<string, any> => {
    return layoutHints()[key] || {};
  };

  // Updated to use the key-value onChange pattern
  const updateFieldValue = (key: string, fieldValue: any) => {
    setTouchedFields(key, true);
    local.onChange(key, fieldValue);
    validateField(key, fieldValue);
  };

  const getFieldName = (key: string): string => {
    const hints = layoutHints();
    return hints[key]?.label ||
      key.replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  };

  const validateField = (key: string, fieldValue: any) => {
    const fieldSchema = getFieldSchema(key);
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(fieldValue);
    setErrors(key, result.success ? undefined : { message: result.error.errors[0]?.message || "Invalid value" });
  };

  const validateForm = () => {
    setErrors({});

    const parseResult = local.schema.safeParse(local.value);
    if (parseResult.success) {
      return { valid: true, data: parseResult.data };
    } else {
      const formattedErrors = parseResult.error.format();
      const errorMap: Record<string, { message: string }> = {};

      Object.entries(formattedErrors).forEach(([key, errorValue]) => {
        if (key === '_errors') return;
        if (errorValue && typeof errorValue === 'object' && '_errors' in errorValue && Array.isArray(errorValue._errors) && errorValue._errors.length > 0) {
          errorMap[key] = { message: errorValue._errors[0] };
        }
      });

      if (formattedErrors._errors?.length) {
        errorMap._form = { message: formattedErrors._errors[0] };
      }

      setErrors(errorMap);
      return { valid: false, errors: errorMap };
    }
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const result = validateForm();
    if (result.valid && local.onSubmit) {
      local.onSubmit(result.data);
    }
  };

  const internalSubmit = () => {
    const result = validateForm();
    if (result.valid && local.onSubmit) {
      local.onSubmit(result.data);
    }
  };

  // Watch for value changes to validate touched fields
  createEffect(() => {
    Object.keys(touchedFields).forEach(key => {
      if (touchedFields[key] && Object.prototype.hasOwnProperty.call(local.value, key)) {
        validateField(key, local.value[key]);
      }
    });
  });

  return (
    <form onSubmit={handleSubmit} class="space-y-5">
      {/* Header slot */}
      {local.children}

      {/* Fields rendered in a grid layout */}
      <div class={clsx(
        'grid gap-x-4 gap-y-0',
        `grid-cols-1 ${columnClass()}`
      )}>
        {/* Schema-generated fields - Using stable keys array */}
        <For each={sortedFieldKeys()}>
          {(key) => (
            <Show when={shouldRenderField(key)}>
              <SchemaField
                name={key}
                schema={getFieldSchema(key)!}
                value={local.value[key]}
                error={errors[key]?.message}
                layoutHint={getLayoutHint(key)}
                onChange={(fieldValue) => updateFieldValue(key, fieldValue)}
              />
            </Show>
          )}
        </For>
      </div>

      {/* Custom fields slot */}
      {local.customFields}

      {/* Error summary block */}
      <Show when={showErrors() && Object.keys(errors).length > 0}>
        <div class="p-3 mt-4 text-red-300 border rounded bg-red-900/10 border-red-700/50">
          <h4 class="mb-1 font-medium">Please fix the following errors:</h4>
          <ul class="space-y-1 text-sm list-disc list-inside">
            <For each={Object.entries(errors)}>
              {([field, error]) => (
                <li>
                  <Show when={field === '_form'} fallback={
                    <>
                      <span class="font-semibold">{getFieldName(field)}:</span> {error.message}
                    </>
                  }>
                    {error.message}
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>

      {/* Footer with default or custom buttons */}
      <div class="flex justify-end gap-3 pt-4 mt-6 border-t border-neutral-700">
        <Show when={local.footer} fallback={
          <>
            <Button onClick={local.onCancel} variant="secondary">Cancel</Button>
            <Button type="submit" variant="primary" icon="Save">Save</Button>
          </>
        }>
          {local.footer!({ submit: internalSubmit })}
        </Show>
      </div>
    </form>
  );
};

export default SchemaForm;
```

## `src/components/layout/FilterBar.tsx`
```
import { splitProps } from 'solid-js';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  showPriorityFilter?: boolean;
  priorityLabel?: string;
  priorityOptions?: FilterOption[];
  selectedPriority?: string;
  onPriorityChange: (priority: string) => void;
  
  showStatusFilter?: boolean;
  statusLabel?: string;
  completedLabel?: string;
  showCompleted?: boolean;
  onShowCompletedChange: (show: boolean) => void;
}

const FilterBar = (props: FilterBarProps) => {
  const [local, _] = splitProps(props, [
    'showPriorityFilter', 'priorityLabel', 'priorityOptions', 'selectedPriority', 'onPriorityChange',
    'showStatusFilter', 'statusLabel', 'completedLabel', 'showCompleted', 'onShowCompletedChange'
  ]);

  const showPriorityFilter = () => local.showPriorityFilter ?? true;
  const priorityLabel = () => local.priorityLabel || 'Priority';
  const priorityOptions = () => local.priorityOptions || [
    { value: 'all', label: 'All' },
    { value: 'high', label: 'High' },
    { value: 'mid', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];
  const selectedPriority = () => local.selectedPriority || 'all';
  
  const showStatusFilter = () => local.showStatusFilter ?? true;
  const statusLabel = () => local.statusLabel || 'Status';
  const completedLabel = () => local.completedLabel || 'Show completed';
  const showCompleted = () => local.showCompleted || false;

  return (
    <div class="flex items-center gap-8 mb-6 p-3 bg-neutral-800 border border-neutral-700 rounded">
      {/* Priority Filter */}
      <Show when={showPriorityFilter()}>
        <div>
          <h4 class="text-sm font-medium text-neutral-300 mb-2">{priorityLabel()}</h4>
          <div class="flex gap-4">
            <For each={priorityOptions()}>
              {(option) => (
                <label class="flex items-center gap-2 text-sm text-neutral-400">
                  <input
                    value={option.value}
                    checked={selectedPriority() === option.value}
                    onChange={(e) => local.onPriorityChange(e.currentTarget.value)}
                    type="radio"
                    class="w-4 h-4 border-neutral-600 bg-neutral-700 text-blue-600"
                  />
                  {option.label}
                </label>
              )}
            </For>
          </div>
        </div>
      </Show>

      {/* Status Filter */}
      <Show when={showStatusFilter()}>
        <div>
          <h4 class="text-sm font-medium text-neutral-300 mb-2">{statusLabel()}</h4>
          <label class="flex items-center gap-2 text-sm text-neutral-400">
            <input
              checked={showCompleted()}
              onChange={(e) => local.onShowCompletedChange(e.currentTarget.checked)}
              type="checkbox"
              class="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-blue-600"
            />
            {completedLabel()}
          </label>
        </div>
      </Show>
    </div>
  );
};

export default FilterBar;
```

## `src/components/layout/AppSidebar.tsx`
```
// frontends/solid/src/components/layout/AppSidebar.tsx
import { splitProps, For, Show } from 'solid-js';
import { clsx } from 'clsx'; // Make sure clsx is available

interface AppSidebarProps {
  searchQuery: string; 
  onSearchQueryChange: (query: string) => void;
  searchPlaceholder?: string;
  availableTags: () => string[]; // Expects an accessor
  selectedTags: string[]; 
  onToggleTag: (tag: string) => void;
  tagsLabel?: string;
  tagPrefix?: string;
}

const AppSidebar = (props: AppSidebarProps) => {
  const [local, _] = splitProps(props, [
    'searchQuery', 'onSearchQueryChange', 'searchPlaceholder', 'availableTags',
    'selectedTags', 'onToggleTag', 'tagsLabel', 'tagPrefix'
  ]);

  const searchPlaceholder = () => local.searchPlaceholder || 'Search items...';
  const tagsLabel = () => local.tagsLabel || 'TAGS';
  const tagPrefix = () => local.tagPrefix || '#';

  return (
    <div class="w-64 bg-neutral-800 border-r border-neutral-700 p-4 space-y-6">
      <div>
        <h3 class="text-sm font-medium text-neutral-300 mb-3">Search</h3>
        <input
          value={local.searchQuery} 
          onInput={(e) => local.onSearchQueryChange(e.currentTarget.value)}
          type="text"
          placeholder={searchPlaceholder()}
          class="w-full px-3 py-2 text-sm bg-neutral-700 border border-neutral-600 rounded text-neutral-200 placeholder:text-neutral-500"
        />
      </div>

      {/* local.availableTags is an accessor, so call it to get the array */}
      <Show when={local.availableTags().length > 0}>
        <div>
          <h3 class="text-sm font-medium text-neutral-300 mb-3">{tagsLabel()}</h3>
          <div class="max-h-64 overflow-y-auto scrollbar-thin">
            <div class="flex flex-wrap gap-2">
              {/* Call local.availableTags() here for the <For> component */}
              <For each={local.availableTags()}>
                {(tag) => (
                  <button
                    onClick={() => local.onToggleTag(tag)}
                    class={clsx(
                      'px-2 py-1 text-xs rounded transition-colors',
                      local.selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                    )}
                  >
                    {tagPrefix()}{tag}
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default AppSidebar;
```

## `src/AppRoutes.tsx`
```
// frontends/solid/src/AppRoutes.tsx
import { Route } from '@solidjs/router';

const TestPage = () => {
  return (
    <div class="p-8">
      <h1 class="text-2xl font-bold text-neutral-100">Hello from Test Page</h1>
      <p class="text-neutral-400 mt-4">SolidJS Todo App is working!</p>
    </div>
  );
};

const NotFound = () => {
  return (
    <div class="p-8">
      <h1 class="text-xl font-bold text-red-400">Page Not Found</h1>
      <p class="text-neutral-400 mt-2">The page you're looking for doesn't exist.</p>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Route path="/" component={TestPage} />
      <Route path="*" component={NotFound} />
    </>
  );
};

export default AppRoutes;

```

## `src/main.tsx`
```
import { render } from 'solid-js/web';
import App from './App';
import './index.css';

const root = document.getElementById('root');

if (root) { // Good practice to check if root exists
  render(() => <App />, root);
} else {
  console.error("Root element #root not found in the HTML.");
}
```

## `src/utils/slugify.ts`
```
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
```

## `src/utils/helpers.ts`
```
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });
};
```

## `src/utils/schema-helpers.ts`
```
import { z } from 'zod';

export function unwrapZodType(schema: z.ZodTypeAny): z.ZodTypeAny {
  if (
    schema instanceof z.ZodOptional ||
    schema instanceof z.ZodNullable ||
    schema instanceof z.ZodDefault
  ) {
    const inner = schema._def.innerType || (typeof (schema as any).unwrap === 'function' ? (schema as any).unwrap() : undefined);
    return inner ? unwrapZodType(inner) : schema;
  }
  if (schema instanceof z.ZodEffects) {
    return unwrapZodType(schema.innerType());
  }
  return schema;
}

export function getBaseSchema(schema: z.ZodTypeAny): z.ZodObject<any, any, any> | null {
  const unwrapped = unwrapZodType(schema);
  if (unwrapped instanceof z.ZodObject) {
    return unwrapped;
  }
  console.error("getBaseSchema: Expected a ZodObject after unwrapping, but got:", unwrapped);
  return null;
}
```

## `src/stores/uiStore.ts`
```
import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';
import type { Notification, NotificationType } from '@/types';

const [isLoading, setIsLoading] = createSignal(false);
const [loadingMessage, setLoadingMessage] = createSignal<string | null>(null);
const [notifications, setNotifications] = createStore<Notification[]>([]);

export const uiStore = {
  get isLoading() { return isLoading(); },
  get loadingMessage() { return loadingMessage(); },
  get notifications() { return notifications; },

  setIsLoading: (status: boolean, message?: string) => {
    setIsLoading(status);
    setLoadingMessage(message || null);
  },

  showNotification: (type: NotificationType, message: string, duration = 3000): string => {
    const id = `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const notification: Notification = { 
      id, 
      type, 
      message, 
      duration, 
      timestamp: Date.now() 
    };

    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => uiStore.removeNotification(id), duration);
    }

    return id;
  },

  removeNotification: (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  },
};
```

## `src/stores/itemStore.ts`
```
// frontends/solid/src/stores/itemStore.ts
import { createStore, produce, reconcile } from 'solid-js/store';
import { createSignal, batch } from 'solid-js';
import type { Item, ItemTree, Priority, SingleCategory, CreateItemPayload, UpdateItemPayload } from '@/types';
import { slugify } from '@/utils/slugify';
import { uiStore } from '@/stores/uiStore';

const API_BASE_URL = 'http://localhost:3000';

const [itemTree, setItemTree] = createStore<ItemTree>({});
const [isLoading, setIsLoading] = createSignal(false);
const [error, setError] = createSignal<string | null>(null);

const fetchItemTree = async () => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(`${API_BASE_URL}/api/items/tree`);
    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      console.error("Fetch item tree HTTP error:", response.status, errorText);
      throw new Error(`HTTP ${response.status}: ${errorText.substring(0,150)}`);
    }
    const result: ApiResponse<ItemTree> = await response.json();
    if (result.success && result.data) {
      batch(() => {
        setItemTree(reconcile(result.data, { merge: false }));
        setIsLoading(false);
      });
    } else {
      const apiErrorMsg = result.error || result.message || 'Invalid API response format for fetchItemTree';
      console.error("Fetch item tree API error:", apiErrorMsg, "Full result:", result);
      throw new Error(apiErrorMsg);
    }
  } catch (err) {
    console.error("Catch block - Failed to fetch items:", err);
    batch(() => {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
      setIsLoading(false);
    });
  }
};

const addItem = async (itemData: CreateItemPayload) => {
  if (!itemData.categories || !Array.isArray(itemData.categories) || itemData.categories.length === 0 || typeof itemData.categories[0] !== 'string' || !itemData.categories[0].trim()) {
    const errMessage = "Item must have a valid, non-empty category.";
    setError(errMessage);
    uiStore.showNotification('error', errMessage);
    return;
  }

  setIsLoading(true);
  setError(null);
  console.log("Attempting to add item. Payload:", JSON.stringify(itemData, null, 2));
  try {
    const response = await fetch(`${API_BASE_URL}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: `HTTP ${response.status} ${response.statusText}`, error: `HTTP ${response.status} ${response.statusText}` }));
      console.error("Add item HTTP error response:", response.status, errorBody, "Payload sent:", itemData);
      throw new Error(errorBody.message || errorBody.error || `HTTP ${response.status}`);
    }

    const result: ApiResponse<Item> = await response.json();
    if (result.success && result.data) {
      console.log("Add item successful, server data:", result.data);
      await fetchItemTree(); 
      uiStore.showNotification('success', `Item "${result.data.name || itemData.name}" added.`);
    } else {
      const apiErrorMsg = result.error || result.message || 'Failed to add item (API success:false)';
      console.error("Add item API error (result.success=false):", apiErrorMsg, "Full result:", result);
      throw new Error(apiErrorMsg);
    }
  } catch (err) {
    console.error("Catch block - Failed to add item:", err, "Original payload:", itemData);
    const errMessage = err instanceof Error ? err.message : 'Failed to add item';
    setError(errMessage);
    uiStore.showNotification('error', errMessage);
  } finally {
    setIsLoading(false);
  }
};

const updateItem = async (originalCategorySlug: string, itemSlug: string, formData: UpdateItemPayload) => {
  setIsLoading(true);
  setError(null);
  console.log("Attempting to update item:", originalCategorySlug, itemSlug, "Payload:", JSON.stringify(formData, null, 2));

  try {
    const response = await fetch(`${API_BASE_URL}/api/items/${originalCategorySlug}/${itemSlug}`, {
      method: 'PATCH', // <--- CHANGED FROM PUT TO PATCH
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: `HTTP ${response.status} ${response.statusText}`, error: `HTTP ${response.status} ${response.statusText}` }));
      console.error("Update item HTTP error response:", response.status, errorBody, "Payload sent:", formData);
      throw new Error(errorBody.message || errorBody.error || `HTTP ${response.status}`);
    }

    const result: ApiResponse<Item> = await response.json();
    if (result.success && result.data) {
      console.log("Update successful, server data:", result.data);
      await fetchItemTree();
      uiStore.showNotification('success', `Item "${result.data.name || itemSlug}" updated.`);
    } else {
      const apiErrorMsg = result.error || result.message || 'Failed to update item (API success:false)';
      console.error("Update item API error (result.success=false):", apiErrorMsg, "Full result:", result);
      throw new Error(apiErrorMsg);
    }
  } catch (err) {
    console.error("Catch block - Failed to update item:", err, "Original payload:", formData);
    const errMessage = err instanceof Error ? err.message : 'Failed to update item';
    setError(errMessage);
    uiStore.showNotification('error', errMessage);
  } finally {
    setIsLoading(false);
  }
};

const deleteItem = async (categorySlug: string, itemSlug: string) => {
  setIsLoading(true);
  setError(null);
  console.log("Attempting to delete item:", categorySlug, itemSlug);
  try {
    const response = await fetch(`${API_BASE_URL}/api/items/${categorySlug}/${itemSlug}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: `HTTP ${response.status} ${response.statusText}`, error: `HTTP ${response.status} ${response.statusText}` }));
      console.error("Delete item HTTP error response:", response.status, errorBody);
      throw new Error(errorBody.message || errorBody.error || `HTTP ${response.status}`);
    }
    const result: ApiResponse<{deleted: boolean}> = await response.json();
    if (result.success) {
      console.log("Delete item successful on server.");
      setItemTree(
        produce(tree => {
          if (tree[categorySlug]) {
            const itemIndex = tree[categorySlug].findIndex(item => item.slug === itemSlug);
            if (itemIndex > -1) {
              tree[categorySlug].splice(itemIndex, 1);
            }
            if (tree[categorySlug].length === 0) {
              delete tree[categorySlug];
            }
            console.log("Local itemTree updated after delete for category:", categorySlug);
          } else {
            console.warn("Category slug not found in local tree for deletion:", categorySlug);
          }
        })
      );
      uiStore.showNotification('success', `Item "${itemSlug}" deleted.`);
    } else {
      const apiErrorMsg = result.error || result.message || 'Failed to delete item (API success:false)';
      console.error("Delete item API error (result.success=false):", apiErrorMsg, "Full result:", result);
      throw new Error(apiErrorMsg);
    }
  } catch (err) {
    console.error("Catch block - Failed to delete item:", err);
    const errMessage = err instanceof Error ? err.message : 'Failed to delete item';
    setError(errMessage);
    uiStore.showNotification('error', errMessage);
  } finally {
    setIsLoading(false);
  }
};

const toggleItemCompletion = async (item: Item) => {
  const originalCategorySlug = slugify(item.categories[0]);
  const payload: UpdateItemPayload = {
    name: item.name,
    text: item.text,
    priority: item.priority,
    tags: item.tags,
    categories: item.categories,
    isCompleted: !item.isCompleted,
  };
  await updateItem(originalCategorySlug, item.slug, payload);
};

export const itemStore = {
  get itemTree() { return itemTree; },
  get isLoading() { return isLoading(); },
  get error() { return error(); },
  fetchItemTree,
  addItem,
  updateItem,
  deleteItem,
  toggleItemCompletion,
};
```

## `src/App.tsx`
```
import { Router, Route, Navigate } from '@solidjs/router';
import ItemPage from './pages/ItemPage';
import Notifications from './components/common/Notifications';

function App() {
  return (
    <div class="flex flex-col min-h-screen text-neutral-100">
      <header class="border-b border-neutral-800 bg-neutral-900">
        <div class="container px-4 py-4 mx-auto">
          <h1 class="text-xl font-semibold text-neutral-100">Items</h1>
        </div>
      </header>
      <main class="flex-1 w-full">
        <Router>
          <Route path="/" component={ItemPage} />
          <Route path="*" element={<Navigate href="/" />} />
        </Router>
      </main>
      <Notifications />
    </div>
  );
}

export default App;
```

## `src/hooks/useItemFilters.ts`
```
// frontends/solid/src/hooks/useItemFilters.ts
import { createMemo } from 'solid-js';
import type { Item, Priority, ItemTree } from '@/types';

interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function useItemFilters(itemTreeGetter: () => ItemTree, filtersAccessor: () => FilterOptions) {

  const itemTree = createMemo(() => {
    const tree = itemTreeGetter();
    return tree;
  });

  const _allTags = createMemo(() => { // Renamed to avoid conflict in return
    const tree = itemTree();
    const tags = new Set<string>();
    Object.values(tree).forEach(items => {
      items.forEach(item => {
        item.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  });

  const _hasActiveFilters = createMemo(() => { // Renamed
    const currentFilters = filtersAccessor();
    return currentFilters.searchQuery.trim() !== '' ||
           currentFilters.selectedPriority !== 'all' ||
           currentFilters.showCompleted || // Corrected: showCompleted means filter is active if true
           currentFilters.selectedTags.length > 0;
  });

  const _filteredItemTree = createMemo(() => { // Renamed
    const tree = itemTree();
    const currentFilters = filtersAccessor();
    
    const filtered: Record<string, Item[]> = {};
    
    Object.entries(tree).forEach(([categoryName, items]) => {
      const filteredItems = items.filter(item => {
        if (currentFilters.searchQuery.trim()) {
          const query = currentFilters.searchQuery.toLowerCase();
          const matchesSearch = 
            item.name.toLowerCase().includes(query) ||
            (item.text && item.text.toLowerCase().includes(query)) ||
            item.tags?.some(tag => tag.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        if (currentFilters.selectedPriority !== 'all' && item.priority !== currentFilters.selectedPriority) {
          return false;
        }

        if (!currentFilters.showCompleted && item.isCompleted) {
          return false;
        }

        if (currentFilters.selectedTags.length > 0) {
          const hasSelectedTag = currentFilters.selectedTags.some(tag => 
            item.tags?.includes(tag)
          );
          if (!hasSelectedTag) return false;
        }

        return true;
      });
      
      if (filteredItems.length > 0) {
        filtered[categoryName] = filteredItems;
      }
    });
    
    return filtered;
  });

  const _totalItems = createMemo(() => { // Renamed
    return Object.values(itemTree()).reduce((total, items) => total + items.length, 0);
  });

  const _totalFilteredItems = createMemo(() => { // Renamed
    return Object.values(_filteredItemTree()).reduce((total, items) => total + items.length, 0);
  });

  // Return the accessors directly
  return {
    allTags: _allTags,
    hasActiveFilters: _hasActiveFilters,
    filteredItemTree: _filteredItemTree,
    totalItems: _totalItems,
    totalFilteredItems: _totalFilteredItems,
  };
}
```

## `src/types/lucide.d.ts`
```
// src/types/lucide.d.ts
declare module "lucide-solid/icons/*" {
  import { LucideProps } from "lucide-solid";
  import { Component } from "solid-js";
  const cmp: Component<LucideProps>;
  export = cmp;
}

```

## `src/types/index.ts`
```
// frontends/solid/src/types/index.ts

export type Priority = 'low' | 'mid' | 'high';
export type SingleCategory<T> = [T];

export interface Item {
  id: string;
  slug: string;
  name: string;
  text: string;
  isCompleted: boolean;
  priority: Priority;
  tags: string[];
  categories: SingleCategory<string>;
  createdAt: string;
  updatedAt: string;
  isEditing?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
  timestamp: number;
}

export interface ItemTree {
  [categorySlug: string]: Item[];
}

// API Payload Types - Single Source of Truth
export interface CreateItemPayload {
  name: string;
  text: string;
  priority: Priority;
  tags?: string[];
  categories: SingleCategory<string>;
}

export type UpdateItemPayload = Partial<Omit<CreateItemPayload, 'categories'>> & {
    isCompleted?: boolean;
    categories?: SingleCategory<string>;
};
```

## `src/pages/ItemPage.tsx`
```
// frontends/solid/src/pages/ItemPage.tsx
import { createSignal, createMemo, onMount, For, Show } from 'solid-js';
import { itemStore } from '@/stores/itemStore';
import { uiStore } from '@/stores/uiStore'; // Import uiStore for notifications
import { useItemFilters } from '@/hooks/useItemFilters';
import { slugify } from '@/utils/slugify';
import type { Item, UpdateItemPayload, CreateItemPayload, Priority, SingleCategory } from '@/types'; // Import payload types
import AppSidebar from '@/components/layout/AppSidebar';
import FilterBar from '@/components/layout/FilterBar';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modal';
import ItemForm from '@/components/items/ItemForm';
import ItemItem from '@/components/items/ItemItem';
import ConfirmDeleteModal from '@/components/common/ConfirmDeleteModal';

const ItemPage = () => {
  // Filter state
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedPriority, setSelectedPriority] = createSignal<'all' | Priority>('all');
  const [showCompleted, setShowCompleted] = createSignal(false);
  const [selectedTags, setSelectedTags] = createSignal<string[]>([]);

  // Modal state
  const [showFormModal, setShowFormModal] = createSignal(false);
  const [editingItem, setEditingItem] = createSignal<Item | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = createSignal(false);
  const [prefilledCategory, setPrefilledCategory] = createSignal<string>('');

  // Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = createSignal(false);
  const [itemToDelete, setItemToDelete] = createSignal<Item | null>(null);
  const [isDeleting, setIsDeleting] = createSignal(false);

  onMount(async () => {
    await itemStore.fetchItemTree();
  });

  const filtersAccessor = createMemo(() => ({
    searchQuery: searchQuery(),
    selectedPriority: selectedPriority(),
    showCompleted: showCompleted(),
    selectedTags: selectedTags()
  }));

  const { allTags, hasActiveFilters, filteredItemTree, totalItems, totalFilteredItems } = useItemFilters(
    () => itemStore.itemTree,
    filtersAccessor 
  );

  const deleteConfirmationMessage = createMemo(() => {
    const item = itemToDelete();
    const itemName = item?.name || 'this item';
    return `Are you sure you want to delete "<strong>${itemName}</strong>"? This action cannot be undone.`;
  });

  const retryFetch = async () => {
    await itemStore.fetchItemTree();
  };

  const openAddModal = (categoryName?: string) => {
    setEditingItem(null);
    setPrefilledCategory(categoryName || '');
    setShowFormModal(true);
  };

  const openEditModal = (item: Item) => {
    setEditingItem({ ...item });
    setPrefilledCategory(''); // Not prefilling category when editing
    setShowFormModal(true);
  };

  // formData comes from ItemForm's submissionPayload
  // It will have: name, text, priority, tags, categories ([string]), isCompleted
  const handleFormSubmit = async (formDataFromForm: {
    name: string;
    text: string;
    priority: Priority;
    tags: string[];
    categories: SingleCategory<string>;
    isCompleted: boolean;
  }) => {
    setIsSubmittingForm(true);
    try {
      const editing = editingItem();
      if (editing?.id) { // Editing existing item
        const originalCategorySlug = slugify(editing.categories[0]);
        
        // Construct UpdateItemPayload
        const updatePayload: UpdateItemPayload = {
          name: formDataFromForm.name,
          text: formDataFromForm.text,
          priority: formDataFromForm.priority,
          tags: formDataFromForm.tags,
          categories: formDataFromForm.categories, // New categories from form
          isCompleted: formDataFromForm.isCompleted,
        };
        await itemStore.updateItem(originalCategorySlug, editing.slug, updatePayload);
      } else { // Adding new item
        // Construct CreateItemPayload
        const createPayload: CreateItemPayload = {
          name: formDataFromForm.name,
          text: formDataFromForm.text,
          priority: formDataFromForm.priority,
          tags: formDataFromForm.tags,
          categories: formDataFromForm.categories,
        };
        // isCompleted is not part of CreateItemPayload; backend handles default
        await itemStore.addItem(createPayload);
      }
      setShowFormModal(false);
      setEditingItem(null);
      setPrefilledCategory('');
    } catch (error) {
      console.error("Error submitting form from ItemPage:", error);
      uiStore.showNotification('error', 'Failed to submit form. See console for details.');
    }
    finally {
      setIsSubmittingForm(false);
    }
  };

  const handleToggleComplete = async (item: Item) => {
    await itemStore.toggleItemCompletion(item);
  };

  const confirmDelete = (item: Item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const executeDelete = async () => {
    const item = itemToDelete();
    if (!item) return;
    
    setIsDeleting(true);
    try {
      const categorySlug = slugify(item.categories[0]);
      await itemStore.deleteItem(categorySlug, item.slug);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting item from ItemPage:", error);
      uiStore.showNotification('error', 'Failed to delete item. See console for details.');
    }
    finally {
      setIsDeleting(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedPriority('all');
    setShowCompleted(false);
    setSelectedTags([]);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingItem(null);
    setPrefilledCategory('');
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  return (
    <div class="flex min-h-screen">
      <AppSidebar
        searchQuery={searchQuery()} 
        onSearchQueryChange={setSearchQuery}
        searchPlaceholder="Search items..."
        availableTags={allTags} 
        selectedTags={selectedTags()} 
        onToggleTag={toggleTag}
        tagsLabel="TAGS"
        tagPrefix="#"
      />

      <div class="flex-1">
        <div class="container max-w-4xl px-4 py-6 mx-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-2xl font-bold text-neutral-100 mb-1">Items</h1>
              <p class="text-neutral-400">
                {hasActiveFilters() ? `${totalFilteredItems()} of ${totalItems()}` : `${totalItems()} total`} items
              </p>
            </div>
            <Button onClick={() => openAddModal()} variant="primary" icon="Plus">
              Add Item
            </Button>
          </div>

          <FilterBar
            selectedPriority={selectedPriority()}
            onPriorityChange={(priority) => setSelectedPriority(priority as Priority | 'all')}
            showCompleted={showCompleted()}
            onShowCompletedChange={setShowCompleted}
            priorityOptions={[
              { value: 'all', label: 'All' },
              { value: 'high', label: 'High' },
              { value: 'mid', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />

          <Show when={itemStore.isLoading && Object.keys(itemStore.itemTree).length === 0}>
            <div class="py-12 text-center">
              <Icon name="Loader2" class="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
              <p class="text-neutral-400">Loading items...</p>
            </div>
          </Show>
          
          <Show when={itemStore.error && Object.keys(itemStore.itemTree).length === 0}> {/* Show general error only if no items loaded */}
            <div class="p-6 text-center bg-red-900/20 border border-red-800 rounded">
              <Icon name="AlertTriangle" class="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p class="text-red-300 mb-3">{itemStore.error}</p>
              <Button onClick={retryFetch} variant="danger" size="sm">Retry</Button>
            </div>
          </Show>
          
          <Show when={!itemStore.isLoading && (!itemStore.error || Object.keys(itemStore.itemTree).length > 0) && Object.keys(filteredItemTree()).length === 0}>
            <div class="py-12 text-center">
              <Icon name="ClipboardList" class="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h2 class="text-xl font-semibold text-neutral-300 mb-2">
                {hasActiveFilters() ? 'No matching items' : 'No items yet'}
              </h2>
              <p class="text-neutral-500 mb-4">
                {hasActiveFilters() ? 'Try adjusting your filters or ' : 'Create your first item to get started or '}
                <Show when={itemStore.error}>
                  <span class="text-red-400">an error occurred: {itemStore.error} </span>
                  <Button onClick={retryFetch} variant="secondary" size="sm" class="ml-2">Retry Fetch</Button>
                </Show>
              </p>
              <Show when={hasActiveFilters()} fallback={
                <Button onClick={() => openAddModal()} variant="primary" icon="Plus">
                  Create Item
                </Button>
              }>
                <Button onClick={clearAllFilters} variant="secondary">
                  Clear Filters
                </Button>
              </Show>
            </div>
          </Show>
          
          <Show when={Object.keys(filteredItemTree()).length > 0}>
            <div class="space-y-6">
              <For each={Object.entries(filteredItemTree())}>
                {([categoryName, categoryItems]) => (
                  <div>
                    <div class="flex items-center gap-3 pb-2 border-b border-neutral-700">
                      <Button 
                        variant="text" 
                        size="sm" 
                        icon="Plus" 
                        onClick={() => openAddModal(categoryName)}
                        class="text-neutral-400 hover:text-neutral-200"
                        aria-label={`Add item to ${categoryName}`}
                      />
                      <h2 class="text-lg font-medium text-neutral-200">{categoryName}</h2>
                      <span class="text-sm text-neutral-500">({categoryItems.length})</span>
                    </div>
                    
                    <div class="space-y-2 mt-3">
                      <For each={categoryItems}>
                        {(item) => (
                          <ItemItem
                            item={item}
                            onToggleComplete={handleToggleComplete}
                            onEdit={openEditModal}
                            onDelete={confirmDelete}
                          />
                        )}
                      </For>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>

      <Modal 
        isOpen={showFormModal()} 
        onClose={handleCloseFormModal} 
        title={editingItem() ? 'Edit Item' : 'New Item'}
        size="md"
      >
        <ItemForm
          item={editingItem()}
          isLoading={isSubmittingForm()}
          prefilledCategory={prefilledCategory()}
          onSubmit={handleFormSubmit} // onSubmit expects the specific form data shape
          onCancel={handleCloseFormModal}
        />
      </Modal>

      <ConfirmDeleteModal
        isOpen={showDeleteConfirm()}
        onClose={handleCloseDeleteModal}
        onConfirm={executeDelete}
        title="Delete Item"
        message={deleteConfirmationMessage()}
        confirmText="Delete"
        isLoading={isDeleting()}
      />
    </div>
  );
};

export default ItemPage;
```

## `src/index.css`
```
@import "tailwindcss";

@layer base {
  body {
    background-color: theme(colors.neutral.900);
    color: theme(colors.neutral.100);
    font-family: theme(fontFamily.sans);
    min-height: 100vh;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid theme(colors.neutral.700);
    border-radius: 0.375rem;
    background-color: theme(colors.neutral.800);
    color: theme(colors.neutral.100);
  }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: theme(colors.blue.500);
    box-shadow: 0 0 0 1px theme(colors.blue.500 / 50%);
  }

  input[type="checkbox"] {
    width: auto;
  }
}

/* Scrollbar styling */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background-color: theme(colors.neutral.800);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: theme(colors.neutral.600);
  border-radius: 0.25rem;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: theme(colors.neutral.500);
}
```

## `src/api/itemApi.ts`
```
// frontends/solid/src/api/itemApi.ts
import { get, post, patch, del } from './apiClient';
// Import all necessary types, including payload types, from @/types
import type { 
  Item, 
  // Priority,         // Keep if used directly in this file, otherwise can be removed
  // SingleCategory,   // Keep if used directly in this file, otherwise can be removed
  ItemTree, 
  CreateItemPayload,  // Import this
  UpdateItemPayload   // Import this
} from '@/types';


// Removed local definitions of CreateItemPayload and UpdateItemPayload

export async function getItemTree(): Promise<ItemTree> {
  return get<ItemTree>('/items/tree');
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
  return post<Item, CreateItemPayload>('/items', payload);
}

export async function getItem(categorySlug: string, itemSlug: string): Promise<Item> {
  return get<Item>(`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`);
}

export async function updateItem(
  categorySlug: string,
  itemSlug: string,
  payload: UpdateItemPayload // Use imported type
): Promise<Item> {
  return patch<Item, UpdateItemPayload>( // Use imported type for TRequest generic
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`,
    payload
  );
}

export async function deleteItem(categorySlug: string, itemSlug: string): Promise<{ deleted: boolean }> {
  return del<{ deleted: boolean }>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`
  );
}
```

## `src/api/apiClient.ts`
```
const API_URL_BASE = 'http://localhost:3000/api';

type Result<T, E = string> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

const success = <T>(data: T): Result<T> => ({ success: true, data });
const failure = <E>(error: E): Result<never, E> => ({ success: false, error });

export interface ApiErrorData {
  message: string;
  statusCode: number;
  details?: any;
}

export const createApiError = (
  message: string, 
  statusCode: number = 500, 
  details?: any
): ApiErrorData => ({
  message,
  statusCode,
  details,
});

export const isApiError = (error: any): error is ApiErrorData => {
  return error && typeof error.message === 'string' && typeof error.statusCode === 'number';
};

const request = async <T>(
  method: string,
  endpoint: string,
  body?: any
): Promise<Result<T, ApiErrorData>> => {
  try {
    const response = await fetch(`${API_URL_BASE}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      let message = `Request failed: ${response.status}`;
      try {
        const errorData = await response.json();
        message = errorData.message || message;
      } catch {}
      
      return failure(createApiError(message, response.status));
    }

    const data = await response.json();
    return success(data.data ?? data);
  } catch (error: any) {
    return failure(createApiError(
      error.message || 'Network request failed',
      503
    ));
  }
};

const unwrapResult = async <T>(resultPromise: Promise<Result<T, ApiErrorData>>): Promise<T> => {
  const result = await resultPromise;
  if (!result.success) {
    const error = new Error(result.error.message);
    (error as any).statusCode = result.error.statusCode;
    (error as any).details = result.error.details;
    throw error;
  }
  return result.data;
};

export const get = <T>(endpoint: string) => 
  unwrapResult(request<T>('GET', endpoint));

export const post = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(request<TResponse>('POST', endpoint, data));

export const patch = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(request<TResponse>('PATCH', endpoint, data));

export const del = <TResponse = { deleted: boolean }>(endpoint: string) =>
  unwrapResult(request<TResponse>('DELETE', endpoint));

export const api = { get, post, patch, delete: del };
```

## `tailwind.config.js`
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

