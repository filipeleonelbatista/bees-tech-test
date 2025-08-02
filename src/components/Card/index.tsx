import React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { FiPlusCircle } from 'react-icons/fi';
import type { CardProps } from '../../types';
import Badge from '../Badge';

const BadgeType = [
  'micro',
  'zipcode',
  'phone',
]

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
    <div className="border border-gray-800 rounded-sm p-3 w-full max-w-md bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <div className="flex space-x-2">
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-gray-800 hover:text-gray-400 cursor-pointer focus:outline-none"
              aria-label="Remove"
            >
              <BsTrashFill className="w-6 h-6" />
            </button>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className="text-gray-800 hover:text-gray-400 cursor-pointer focus:outline-none"
              aria-label="Add"
            >
              <FiPlusCircle className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {address && (
        <p className="text-[16px] text-gray-600 mb-1">{address}</p>
      )}

      {location && (
        <p className="text-[16px] text-gray-500 mb-3">{location}</p>
      )}

      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {badges.map((badge, index) => (
            <Badge key={index} text={badge} type={BadgeType[index]} />
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