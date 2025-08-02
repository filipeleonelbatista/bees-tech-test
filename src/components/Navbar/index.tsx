import React from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import type { NavbarProps } from '../../types';

const Navbar: React.FC<NavbarProps> = ({ userName, onLogout }) => {
  return (
    <nav
      className="flex items-center justify-between w-full px-4 py-2 bg-yellow-300 text-black shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <button
        onClick={onLogout}
        className="flex cursor-pointer items-center gap-1 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-full px-2 py-1"
        aria-label="Logout"
      >
        <FiArrowLeftCircle className="w-12 h-12 mr-2" />
        <span className="text-3xl">Logout</span>
      </button>

      <span className="text-3xl" aria-label={`Logged in as ${userName}`}>
        Hi, {userName}
      </span>
    </nav>
  );
};

export default Navbar;
