### **Phase 0: Prerequisites & Setup (Confirmation)**

Before migrating components, we must ensure the foundation is correctly laid. The following steps from the previous guide are essential and must be completed first.

**1. Go to Working Directory:**

```bash
cd /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/crud-app-sqlite-tanstack-shadcn
```

**2. Install Dependencies:**

```bash
bun add class-variance-authority clsx tailwind-merge tailwindcss-animate
```

**3. Initialize Shadcn:**

```bash
bun x --bun shadcn-ui@latest init
```

**Provide these exact answers to the prompts:**
*   TypeScript: **yes**
*   Style: **New York**
*   Base color: **Zinc**
*   Global CSS file: **src/index.css**
*   CSS variables for colors: **yes**
*   Tailwind prefix: **no**
*   `tailwind.config.js` location: **tailwind.config.js**
*   Components alias: **@/components**
*   Utils alias: **@/lib**
*   React Server Components: **no**
*   Proceed?: **yes**

**4. Create Utility Function:**

**Create file:** `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**5. Configure `tsconfig.json`:**

**Update file:** `tsconfig.json` to include the `@/lib` alias.

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/lib/*": ["src/lib/*"] 
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/auto-imports.d.ts"
  ],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**6. Configure `tailwind.config.js`:**

**Update file:** `tailwind.config.js` to merge your existing theme with Shadcn's animation requirements.

```javascript
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        'surface-active': 'var(--color-surface-active)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-active': 'var(--color-primary-active)',
        'primary-light': 'var(--color-primary-light)',
        success: 'var(--color-success)',
        'success-light': 'var(--color-success-light)',
        danger: 'var(--color-danger)',
        'danger-light': 'var(--color-danger-light)',
        'danger-hover': 'var(--color-red-700)',
        warning: 'var(--color-warning)',
        'warning-light': 'var(--color-warning-light)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        'border-focus': 'var(--color-border-focus)',
        backdrop: 'var(--color-backdrop)',
        'modal-bg': 'var(--color-modal-bg)',
        'modal-border': 'var(--color-modal-border)',
      },
      spacing: {
        'input-x': 'var(--input-padding-x)',
        'input-y': 'var(--input-padding-y)',
        'card': 'var(--card-padding)',
        'nav': 'var(--nav-padding)',
      },
      width: { 'checkbox': 'var(--checkbox-size)', 'radio': 'var(--radio-size)' },
      height: { 'checkbox': 'var(--checkbox-size)', 'radio': 'var(--radio-size)' },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'button': 'var(--button-radius)',
        'card': 'var(--card-radius)',
        'input': 'var(--input-radius)',
        'checkbox': 'var(--checkbox-radius)',
      },
      fontWeight: { button: 'var(--button-font-weight)' },
      gap: { 'component': 'var(--gap-component-internal)', 'grid': 'var(--gap-grid-items)' },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in-up': 'fade-in-up 0.3s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

**7. Map CSS Variables in `src/index.css`:**

**Update file:** `src/index.css`. Replace the entire `@layer base { ... }` block that was added by Shadcn with the one below to map to your existing design tokens.

```css
@import "./styles/main.css";

@layer base {
  :root {
    --background: var(--color-background);
    --foreground: var(--color-text-primary);
    --card: var(--color-surface);
    --card-foreground: var(--color-text-primary);
    --popover: var(--color-surface);
    --popover-foreground: var(--color-text-primary);
    --primary: var(--color-primary);
    --primary-foreground: var(--color-text-inverse);
    --secondary: var(--color-gray-200);
    --secondary-foreground: var(--color-text-primary);
    --muted: var(--color-text-muted);
    --muted-foreground: var(--color-text-secondary);
    --accent: var(--color-primary-light);
    --accent-foreground: var(--color-primary);
    --destructive: var(--color-danger);
    --destructive-foreground: var(--color-text-inverse);
    --border: var(--color-border);
    --input: var(--color-border);
    --ring: var(--color-border-focus);
    --radius: 0.375rem; /* Corresponds to your --radius-lg */
  }

  .dark {
    --background: var(--color-background);
    --foreground: var(--color-text-primary);
    --card: var(--color-surface);
    --card-foreground: var(--color-text-primary);
    --popover: var(--color-surface);
    --popover-foreground: var(--color-text-primary);
    --primary: var(--color-primary);
    --primary-foreground: var(--color-text-inverse);
    --secondary: var(--color-gray-800);
    --secondary-foreground: var(--color-text-primary);
    --muted: var(--color-text-muted);
    --muted-foreground: var(--color-text-secondary);
    --accent: var(--color-primary-light);
    --accent-foreground: var(--color-primary);
    --destructive: var(--color-danger);
    --destructive-foreground: var(--color-text-inverse);
    --border: var(--color-border);
    --input: var(--color-input-border, var(--color-gray-600));
    --ring: var(--color-border-focus);
  }

  /* Keep original base styles */
  body {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-family: theme(fontFamily.sans);
    min-height: 100vh;
  }
  
  /* ... rest of your original styles from index.css ... */
}
/* ... your scrollbar styles etc ... */
```

---

### **Phase 1: Component Migration**

We will now go through your `src/components/common` directory, replacing each component methodically.

#### **1. `Button.tsx` -> Shadcn `Button`**

*   **Action:** Add Shadcn component.
    ```bash
    bun x --bun shadcn-ui@latest add button
    ```
*   **Action:** Delete the old component.
    ```bash
    rm src/components/common/Button.tsx
    ```
*   **Refactoring:** Go to every file that imports `Button.tsx` (e.g., `ItemForm.tsx`, `ItemItem.tsx`, `ConfirmDeleteModal.tsx`) and replace the usage.
    *   **Example (Conceptual):**
        *   **Before:** `<Button className="btn-md bg-primary text-inverse" ...>`
        *   **After:** `<Button variant="default" size="default" ...>` (Shadcn uses props for variants, not classes).

#### **2. `Icon.tsx` -> Direct `lucide-react` Usage**

*   **Analysis:** Your `Icon.tsx` is an abstraction layer that is no longer needed. We will remove it and use icons directly from `lucide-react`.
*   **Action:** Delete the old component.
    ```bash
    rm src/components/common/Icon.tsx
    ```
*   **Refactoring:** Search the codebase for `<Icon name="..." />`.
    *   **Example in `ThemeToggle.tsx`:**
        *   **Before:** `<Icon name={isDark ? 'Sun' : 'Moon'} />`
        *   **After:** Import `Sun, Moon` from `lucide-react` and use them directly: `{isDark ? <Sun /> : <Moon />}`.

#### **3. `Modal.tsx` & `ConfirmDeleteModal.tsx` -> Shadcn `Dialog` & `AlertDialog`**

*   **Analysis:** `Modal.tsx` is a generic modal, which maps to `Dialog`. `ConfirmDeleteModal.tsx` is a specific confirmation prompt, which maps perfectly to `AlertDialog`.
*   **Action:** Add Shadcn components.
    ```bash
    bun x --bun shadcn-ui@latest add dialog
    bun x --bun shadcn-ui@latest add alert-dialog
    ```
*   **Action:** Delete the old components.
    ```bash
    rm src/components/common/Modal.tsx
    rm src/components/common/ConfirmDeleteModal.tsx
    ```
*   **Refactoring:** Create a new `ConfirmDeleteModal.tsx` using `AlertDialog`.
    *   **Create file:** `src/components/common/ConfirmDeleteModal.tsx`
    ```tsx
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
    } from "@/components/ui/alert-dialog";
    import { Button } from "@/components/ui/button";

    interface Props {
      isOpen: boolean;
      onClose: () => void;
      onConfirm: () => void;
      title?: string;
      description?: string;
    }

    export function ConfirmDeleteModal({
      isOpen,
      onClose,
      onConfirm,
      title = "Are you absolutely sure?",
      description = "This action cannot be undone. This will permanently delete the item.",
    }: Props) {
      if (!isOpen) return null;

      return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive" onClick={onConfirm}>Delete</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    }
    ```    *   The API remains similar (`isOpen`, `onClose`, `onConfirm`), so updating the parent component (`ItemItem.tsx`) will be straightforward.

#### **4. `Notifications.tsx` -> `Sonner` (Toast Notifications)**

*   **Analysis:** Your notification system is a perfect candidate for a "toast" library. `Sonner` is the standard choice for the Shadcn ecosystem.
*   **Action:** Install `sonner`.
    ```bash
    bun add sonner
    ```
*   **Action:** Add the Shadcn component.
    ```bash
    bun x --bun shadcn-ui@latest add sonner
    ```
*   **Action:** Delete the old component.
    ```bash
    rm src/components/common/Notifications.tsx
    ```
*   **Refactoring:**
    1.  **Update `useUiStore.ts`:** We no longer need to manage a notification array. We just need to call the toast function.
        **Update file:** `src/stores/useUiStore.ts`
        ```typescript
        // ... other imports
        import { toast } from "sonner";
        
        // Remove 'notifications' and 'removeNotification' from the state and actions
        // Replace 'showNotification' with this:
        showNotification: (type: NotificationType, message: string) => {
          switch (type) {
            case 'success': toast.success(message); break;
            case 'error': toast.error(message); break;
            case 'warning': toast.warning(message); break;
            case 'info': toast.info(message); break;
            default: toast(message);
          }
        },
        // ... rest of the store
        ```
    2.  **Add `Toaster` to the root layout:**
        **Update file:** `src/App.tsx` (or your root route component)
        ```tsx
        import { Outlet } from '@tanstack/react-router';
        import { Toaster } from '@/components/ui/sonner';
        // ... other imports

        function App() {
          // ... your existing logic
          return (
            <>
              {/* Your existing layout */}
              <Outlet />
              <Toaster position="top-right" richColors />
            </>
          );
        }
        export default App;
        ```

#### **5. All Form Components -> Shadcn `Form`**

*   **Analysis:** `FormField.tsx`, `FormFieldWrapper.tsx`, `SchemaField.tsx`, and `SchemaForm.tsx` will be replaced by a single, powerful `Form` component from Shadcn that integrates directly with `@tanstack/react-form`.
*   **Action:** Add all necessary Shadcn form components.
    ```bash
    bun x --bun shadcn-ui@latest add form
    bun x --bun shadcn-ui@latest add input
    bun x --bun shadcn-ui@latest add label
    bun x --bun shadcn-ui@latest add select
    bun x --bun shadcn-ui@latest add textarea
    bun x --bun shadcn-ui@latest add checkbox
    bun x --bun shadcn-ui@latest add radio-group
    ```
*   **Action:** Delete the old components.
    ```bash
    rm src/components/common/FormField.tsx
    rm src/components/common/FormFieldWrapper.tsx
    rm src/components/common/SchemaField.tsx
    rm src/components/common/SchemaForm.tsx
    rm src/components/common/Checkbox.tsx
    rm src/components/common/Radio.tsx
    ```
*   **Refactoring:** This requires a complete rewrite of `ItemForm.tsx`.
    *   **See Appendix A** for the full, refactored code of `src/components/items/ItemForm.tsx`.

#### **6. `TagInput.tsx` -> Custom Component with Shadcn Primitives**

*   **Analysis:** Shadcn does not have a native `TagInput`. We will build one using its `Input` and `Badge` components.
*   **Action:** Add the `Badge` component.
    ```bash
    bun x --bun shadcn-ui@latest add badge
    ```
*   **Refactoring:** Replace the content of your existing `TagInput.tsx` with a new implementation.
    *   **See Appendix B** for the full, new implementation of `src/components/common/TagInput.tsx`.

#### **7. `ThemeToggle.tsx` -> Shadcn `Button`**

*   **Analysis:** This component can be simplified to a single Shadcn `Button`.
*   **Action:** Delete the old component.
    ```bash
    rm src/components/common/ThemeToggle.tsx
    ```
*   **Refactoring:** Wherever `ThemeToggle` was used (e.g., `AppSidebar.tsx`), replace it with this logic:
    ```tsx
    import { Button } from "@/components/ui/button";
    import { useUiStore } from "@/stores/useUiStore";
    import { Sun, Moon } from "lucide-react";

    export function ThemeToggle() {
      const { theme, toggleTheme } = useUiStore();
      const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      );
    }
    ```

#### **8. `Clock.tsx` -> Remove**

*   **Action:** As requested, delete the component entirely.
    ```bash
    rm src/components/common/Clock.tsx
    ```
*   **Refactoring:** Remove any import and usage of `<Clock />` from your application.

---

### **Appendix A: Refactored `ItemForm.tsx`**

**Update file:** `src/components/items/ItemForm.tsx`

```tsx
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { itemFormSchema, ItemFormData } from '@/schemas/itemSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TagInput } from '@/components/common/TagInput'; // Using our new custom TagInput
import type { Item } from '@/types';

interface ItemFormProps {
  onSubmit: (data: ItemFormData) => void;
  onCancel: () => void;
  item?: Item | null;
  isSubmitting?: boolean;
}

export function ItemForm({ onSubmit, onCancel, item, isSubmitting }: ItemFormProps) {
  const form = useForm({
    defaultValues: {
      name: item?.name ?? '',
      text: item?.text ?? '',
      priority: item?.priority ?? 'mid',
      tags: item?.tags ?? [],
      categories: item?.categories ?? [''],
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
    validatorAdapter: zodValidator,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <FormField
          control={form}
          name="name"
          validators={{ onChange: itemFormSchema.shape.name }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Finalize project report" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form}
          name="text"
          validators={{ onChange: itemFormSchema.shape.text }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Add more details about the task..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form}
          name="categories"
          validators={{ onChange: itemFormSchema.shape.categories }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                {/* For simplicity, using a text input. Could be replaced with a Select or Combobox */}
                <Input 
                  placeholder="e.g., Work" 
                  value={field.value[0]}
                  onChange={(e) => field.handleChange([e.target.value])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form}
          name="priority"
          validators={{ onChange: itemFormSchema.shape.priority }}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.handleChange}
                  defaultValue={field.value}
                  className="flex items-center space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value="low" /></FormControl>
                    <FormLabel className="font-normal">Low</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value="mid" /></FormControl>
                    <FormLabel className="font-normal">Medium</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value="high" /></FormControl>
                    <FormLabel className="font-normal">High</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  tags={field.value}
                  onTagsChange={field.handleChange}
                  placeholder="Add a tag..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : item ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

### **Appendix B: New `TagInput.tsx`**

**Update file:** `src/components/common/TagInput.tsx`

```tsx
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({ tags, onTagsChange, placeholder, className }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      onTagsChange([...tags, newTag]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary">
            {tag}
            <button
              type="button"
              className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder || "Add a tag and press Enter"}
        />
        <Button type="button" variant="outline" onClick={addTag}>
          Add
        </Button>
      </div>
    </div>
  );
}
```