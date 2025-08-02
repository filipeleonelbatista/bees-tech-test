import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  id?: string; 
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, error, id = 'checkbox' }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="sr-only"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id} className={`cursor-pointer flex items-center ${error ? 'text-red-500' : 'text-gray-700'}`}>
          <div 
            className={`w-4 h-4 flex items-center justify-center border-2 rounded mr-2 bg-white
              ${checked ? 'bg-yellow-400 border-yellow-500' : error ? 'border-red-500' : 'border-gray-300'}`}
            aria-hidden="true"
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
          {label}
        </label>
      </div>
      {error && <p id={`${id}-error`} className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Checkbox;
