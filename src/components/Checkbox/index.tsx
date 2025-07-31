import React from 'react';

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, error }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <div 
          className={`w-4 h-4 flex items-center bg-white justify-center border-2 rounded cursor-pointer mr-2 ${checked ? 'bg-yellow-400 border-yellow-500' : error ? 'border-red-500' : 'border-gray-300'}`}
          onClick={() => onChange(!checked)}
        >
          {checked && (
            <svg 
              className="w-4 h-4 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <label className={`cursor-pointer ${error ? 'text-red-500' : 'text-gray-700'}`} onClick={() => onChange(!checked)}>
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Checkbox;