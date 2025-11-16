import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
}

const Icon = ({ name, size = 24, className = '', color = 'currentColor' }: IconProps) => {
  const IconComponent = (Icons as any)[name] as LucideIcon;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return <Icons.HelpCircle size={size} className={className} color={color} />;
  }

  const sizeProps = typeof size === 'number' ? { size } : {};

  return (
    <IconComponent
      {...sizeProps}
      className={`inline-block align-middle shrink-0 ${className}`}
      color={color}
    />
  );
};

export default Icon;