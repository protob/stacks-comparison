import { useMemo } from 'react';

interface FormFieldProps {
  label?: string;
  labelFor?: string;
  help?: string;
  error?: string;
  required?: boolean;
  labelClass?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormField = ({
  label,
  labelFor,
  help,
  error,
  required = false,
  labelClass = '',
  fullWidth = false,
  children,
  className = ''
}: FormFieldProps) => {
  const containerClass = useMemo(() => 
    `mb-4 ${fullWidth ? 'w-full' : ''} ${className}`.trim(),
    [fullWidth, className]
  );

  const computedLabelClass = useMemo(() =>
    `block text-size-sm font-medium mb-1 ${labelClass || 'text-text-secondary'} ${error ? 'text-danger' : ''}`.trim(),
    [labelClass, error]
  );

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={labelFor} className={computedLabelClass}>
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}
      {children}
      {help && !error && (
        <div className="mt-1 text-size-xs text-text-muted">
          {help}
        </div>
      )}
      {error && (
        <div className="mt-1 text-size-xs text-danger">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;