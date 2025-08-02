import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Checkbox from '../../components/Checkbox';

describe('Checkbox Component', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with label', () => {
    render(
      <Checkbox
        label="I am 18 years old"
        checked={false}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByText('I am 18 years old')).toBeInTheDocument();
    // Note: Custom checkbox doesn't use native checkbox role
    const checkboxDiv = screen.getByText('I am 18 years old').closest('div');
    expect(checkboxDiv).toBeInTheDocument();
  });

  it('should call onChange when clicked', () => {
    render(
      <Checkbox
        label="Test checkbox"
        checked={false}
        onChange={mockOnChange}
      />
    );
    
    fireEvent.click(screen.getByText('Test checkbox'));
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('should show checked state correctly', () => {
    render(
      <Checkbox
        label="Checked checkbox"
        checked={true}
        onChange={mockOnChange}
      />
    );
    
    const label = screen.getByText('Checked checkbox');
    expect(label).toBeInTheDocument();
    // Check if the checkbox visual indicator is present
    const checkboxContainer = label.parentElement;
    const checkboxDiv = checkboxContainer?.querySelector('div');
    expect(checkboxDiv).toHaveClass('bg-yellow-400');
  });

  it('should display error message when error prop is provided', () => {
    render(
      <Checkbox
        label="Test checkbox"
        checked={false}
        onChange={mockOnChange}
        error="This field is required"
      />
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('Test checkbox')).toHaveClass('text-red-500');
  });
});