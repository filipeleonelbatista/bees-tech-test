import React from 'react';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import { HiOutlineChartSquareBar } from 'react-icons/hi';

interface BadgeProps {
  text: string;
  type: string;
}

const Badge: React.FC<BadgeProps> = ({ text, type }) => {
  const badgeStyle = 'bg-yellow-200 text-yellow-800';

  const getIcon = () => {
    switch (type) {
      case 'micro':
        return <HiOutlineChartSquareBar className="w-6 h-6 mr-1" />;
      case 'zipcode':
        return <FiMapPin className="w-6 h-6 mr-1" />;
      case 'phone':
        return <FiPhone className="w-6 h-6 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 text-[16px] rounded-full ${badgeStyle}`}>
      {getIcon()}
      {text}
    </span>
  );
};

export default Badge;