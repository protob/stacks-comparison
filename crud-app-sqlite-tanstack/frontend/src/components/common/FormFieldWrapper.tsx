import { FieldApi } from '@tanstack/react-form';

interface FormFieldWrapperProps {
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>;
  label: string;
  children: React.ReactNode;
}

export function FormFieldWrapper({ field, label, children }: FormFieldWrapperProps) {
  const { isTouched, isBlurred, errors } = field.state.meta;
  
  // Debug logging
  console.log('Field errors:', errors);
  console.log('Field meta:', field.state.meta);
  
  // Only show errors if field has been touched/blurred
  const shouldShowError = (isTouched || isBlurred) && errors.length > 0;
  
  const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && error !== null && 'message' in error) {
      return (error as any).message;
    }
    return JSON.stringify(error);
  };
  
  return (
    <div className="mb-4">
      <label className="block text-text-primary font-medium mb-2">
        {label}
      </label>
      {children}
      {shouldShowError && (
        <div className="text-danger text-size-sm mt-1">
          {errors.map((error, i: number) => (
            <div key={i}>{getErrorMessage(error)}</div>
          ))}
        </div>
      )}
    </div>
  );
}