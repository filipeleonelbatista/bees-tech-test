import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Card from '../../components/Card';

describe('Card Component', () => {
  const mockOnAdd = vi.fn();
  const mockOnRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render card with correct information', () => {
    render(
      <Card
        title="Test Brewery"
        address="123 Test St"
        location="Test City, State - Country"
        badges={['micro', '12345', '555-0123']}
        onAdd={mockOnAdd}
      />
    );

    expect(screen.getByText('Test Brewery')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText('Test City, State - Country')).toBeInTheDocument();
  });

  it('should call onAdd when add button is clicked', () => {
    render(
      <Card
        title="Test Brewery"
        onAdd={mockOnAdd}
      />
    );

    fireEvent.click(screen.getByLabelText('Add'));
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  it('should call onRemove when remove button is clicked', () => {
    render(
      <Card
        title="Test Brewery"
        onRemove={mockOnRemove}
      />
    );

    fireEvent.click(screen.getByLabelText('Remove'));
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});