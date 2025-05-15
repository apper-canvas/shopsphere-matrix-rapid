import * as LucideIcons from 'lucide-react';

/**
 * Utility function to get icon component by name
 * @param {string} iconName - Name of the icon
 * @returns {Function} Icon component
 */
function getIcon(iconName) {
  const Icon = LucideIcons[iconName] || LucideIcons.HelpCircle;
  return Icon;
}

export default getIcon;