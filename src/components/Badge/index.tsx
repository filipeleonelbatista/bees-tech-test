import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { FiMapPin } from 'react-icons/fi';
import { FiPhone } from 'react-icons/fi';

interface BadgeProps {
  text: string;
  type: 'micro' | 'zipcode' | 'phone';
}

const Badge: React.FC<BadgeProps> = ({ text, type }) => {
  // Todos os badges têm o mesmo estilo visual conforme o Figma
  const badgeStyle = 'bg-yellow-200 text-yellow-800';

  const getIcon = () => {
    switch (type) {
      case 'micro':
        return <FiMenu className="w-3 h-3 mr-1" />;
      case 'zipcode':
        return <FiMapPin className="w-3 h-3 mr-1" />;
      case 'phone':
        return <FiPhone className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${badgeStyle}`}>
      {getIcon()}
      {text}
    </span>
  );
};

export default Badge;