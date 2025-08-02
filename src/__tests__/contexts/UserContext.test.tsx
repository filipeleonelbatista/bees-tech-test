import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserProvider, useUser } from '../../contexts/UserContext';
import { type ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

describe('UserContext', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useUser(), { wrapper });
    
    expect(result.current.name).toBe('');
    expect(result.current.isAdult).toBe(false);
    expect(result.current.breweryFavorites).toEqual([]);
  });

  it('should update name', () => {
    const { result } = renderHook(() => useUser(), { wrapper });
    
    act(() => {
      result.current.setName('John Doe');
    });
    
    expect(result.current.name).toBe('John Doe');
  });

  it('should update isAdult', () => {
    const { result } = renderHook(() => useUser(), { wrapper });
    
    act(() => {
      result.current.setIsAdult(true);
    });
    
    expect(result.current.isAdult).toBe(true);
  });

  it('should add brewery to favorites', () => {
    const { result } = renderHook(() => useUser(), { wrapper });
    const brewery = { id: '1', name: 'Test Brewery' };
    
    act(() => {
      result.current.addFavorite(brewery);
    });
    
    expect(result.current.breweryFavorites).toContain(brewery);
  });

  it('should not add duplicate brewery to favorites', () => {
    const { result } = renderHook(() => useUser(), { wrapper });
    const brewery = { id: '1', name: 'Test Brewery' };
    
    act(() => {
      result.current.addFavorite(brewery);
      result.current.addFavorite(brewery);
    });
    
    expect(result.current.breweryFavorites).toHaveLength(1);
  });

  it('should remove brewery from favorites', () => {
    const { result } = renderHook(() => useUser(), { wrapper });
    const brewery = { id: '1', name: 'Test Brewery' };
    
    act(() => {
      result.current.addFavorite(brewery);
    });
    
    expect(result.current.breweryFavorites).toHaveLength(1);
    
    act(() => {
      result.current.removeFavorite('1');
    });
    
    expect(result.current.breweryFavorites).toHaveLength(0);
  });
});