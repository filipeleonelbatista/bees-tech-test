import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../../components/Input';

describe('Input Component', () => {
  it('should render with label', () => {
    render(<Input label="Full Name" placeholder="Enter your name" />);
    
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should handle input changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'John Doe' } });
    
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('John Doe');
  });

  it('should display error message and styling when error prop is provided', () => {
    render(<Input error="Name is required" />);
    
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  it('should focus correctly', () => {
    render(<Input />);
    
    const input = screen.getByRole('textbox');
    input.focus();
    
    expect(input).toHaveFocus();
  });
});