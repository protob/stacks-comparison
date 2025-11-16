import { forwardRef, InputHTMLAttributes } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ className = '', ...props }, ref) {
    return (
      <input
        type="radio"
        ref={ref}
        className={`
          w-radio h-radio rounded-full border border-border bg-surface
          checked:bg-primary checked:border-primary checked:text-inverse
          focus-visible:outline-primary transition appearance-none
          ${className}
        `.trim()}
        {...props}
      />
    );
  }
);

export default Radio;
