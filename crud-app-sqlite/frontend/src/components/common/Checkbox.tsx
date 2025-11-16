import { forwardRef, InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className = '', ...props }, ref) {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={`
          w-checkbox h-checkbox rounded-checkbox border border-border bg-surface
          text-primary focus-visible:outline-primary transition appearance-none
          ${className}
        `.trim()}
        {...props}
      />
    );
  }
);

export default Checkbox;
