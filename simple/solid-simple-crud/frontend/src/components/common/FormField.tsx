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