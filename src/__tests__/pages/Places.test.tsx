import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { UserProvider } from '../../contexts/UserContext';
import Places from '../../pages/Places';

vi.mock('../../hooks/useBrewerySearch', () => {
  return {
    useBrewerySearch: () => {
      const [search, setSearch] = useState('');
      return {
        search,
        setSearch,
        results: [
          {
            id: '1',
            name: 'Test Brewery',
            street: '123 Test St',
            city: 'Test City',
            state: 'Test State',
            country: 'Test Country',
            brewery_type: 'micro',
            postal_code: '12345',
            phone: '555-0123',
          },
        ],
        loading: false,
        handleSearch: vi.fn(),
      };
    },
  };
});

describe('Places Page', () => {
  const renderPlaces = () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <Places />
        </UserProvider>
      </BrowserRouter>
    );
  };

  it('should render search input and button', () => {
    renderPlaces();

    expect(screen.getByPlaceholderText("Find for your new favorite brewery")).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should display brewery results when available', () => {
    renderPlaces();

    expect(screen.getByText('Test Brewery')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText('Test City, Test State - Test Country')).toBeInTheDocument();
  });

  it('should handle search input changes', () => {
    renderPlaces();

    const searchInput = screen.getByPlaceholderText("Find for your new favorite brewery");
    fireEvent.change(searchInput, { target: { value: 'brewery name' } });

    expect(searchInput).toHaveValue('brewery name');
  });
});