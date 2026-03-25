import React from 'react';
import * as Icons from 'lucide-react-native';

const Lucide = ({ name, size = 24, color = '#000', ...props }) => {
  // Convert "mail" -> "Mail", "chevron-left" -> "ChevronLeft"
  const iconName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  const IconComponent = Icons[iconName];

  if (!IconComponent) {
    // Check para sa may numbers (e.g. edit-3 -> Edit3)
    const numericName = name.replace(/-([0-9])/g, '$1').replace(/^\w/, c => c.toUpperCase());
    const NumericComponent = Icons[numericName];
    
    if (!NumericComponent) {
        console.warn(`Icon "${name}" not found in lucide-react-native`);
        return null;
    }
    return <NumericComponent size={size} color={color} {...props} />;
  }

  return <IconComponent size={size} color={color} {...props} />;
};

export default Lucide;