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
