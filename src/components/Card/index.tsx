import React from 'react';
import Badge from '../Badge';
import { FiPlus, FiX } from 'react-icons/fi';

const Card: React.FC<CardProps> = ({
  title,
  address,
  location,
  badges = [],
  children,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 w-full max-w-md bg-white shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex space-x-2">
          {onRemove && (
            <button 
              onClick={onRemove}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Remove"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
          {onAdd && (
            <button 
              onClick={onAdd}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Add"
            >
              <FiPlus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      {address && (
        <p className="text-sm text-gray-600 mb-1">{address}</p>
      )}
      
      {location && (
        <p className="text-sm text-gray-500 mb-3">{location}</p>
      )}
      
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {badges.map((badge, index) => (
            <Badge key={index} text={badge.text} type={badge.type} />
          ))}
        </div>
      )}
      
      {children && (
        <div className="mt-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default Card;