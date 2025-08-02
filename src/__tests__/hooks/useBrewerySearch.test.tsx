import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useBrewerySearch } from '../../hooks/useBrewerySearch';

describe('useBrewerySearch Hook', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useBrewerySearch());
    expect(result.current.search).toBe('');
    expect(result.current.results).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('updates search state', () => {
    const { result } = renderHook(() => useBrewerySearch());
    act(() => {
      result.current.setSearch('test');
    });
    expect(result.current.search).toBe('test');
  });

  it('handleSearch fetches data and updates results and loading', async () => {
    const fakeData = [{ id: '1', name: 'Brewery 1' }];
    mockFetch.mockResolvedValueOnce({
      json: async () => fakeData,
    });

    const { result } = renderHook(() => useBrewerySearch());

    act(() => {
      result.current.setSearch('test');
    });

    act(() => {
      result.current.handleSearch();
    });

    expect(result.current.loading).toBe(true);

    // Wait for the async fetch to finish and states to update
    await waitFor(() => {
      expect(result.current.results).toEqual(fakeData);
      expect(result.current.loading).toBe(false);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('query=test')
    );
  });

  it('handleSearch sets results to empty array if fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Fetch failed'));

    const { result } = renderHook(() => useBrewerySearch());

    act(() => {
      result.current.setSearch('failtest');
    });

    act(() => {
      result.current.handleSearch();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.results).toEqual([]);
      expect(result.current.loading).toBe(false);
    });
  });
});
