import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../../components/Navbar';

describe('Navbar Component', () => {
  const mockOnLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with user name', () => {
    render(<Navbar userName="John" onLogout={mockOnLogout} />);
    
    expect(screen.getByText('Hi, John')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should call onLogout when logout button is clicked', () => {
    render(<Navbar userName="John" onLogout={mockOnLogout} />);
    
    fireEvent.click(screen.getByLabelText('Logout'));
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('should have proper accessibility attributes', () => {
    render(<Navbar userName="John" onLogout={mockOnLogout} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    
    const logoutButton = screen.getByLabelText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });
});