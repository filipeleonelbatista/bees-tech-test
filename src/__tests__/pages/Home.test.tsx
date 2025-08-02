import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../../contexts/UserContext';
import Home from '../../pages/Home';
import { describe, it, expect } from 'vitest';

describe('Home Page', () => {
  const renderHome = () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>
    );
  };

  it('should disable button when form is invalid', () => {
    renderHome();
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    const nameInput = screen.getByRole('textbox');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(button).toBeDisabled();

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(button).toBeEnabled();
  });

  it('should show validation errors for invalid input', () => {
    renderHome();
    
    const nameInput = screen.getByRole('textbox');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.blur(nameInput);
    
    expect(screen.getByText('Please enter your full name (first and last).')).toBeInTheDocument();
  });
});