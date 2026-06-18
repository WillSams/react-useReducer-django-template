import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useAppContext } from '../src/context/AppContext';
import { apiClient } from '../src/api/client';

vi.mock('../src/api/client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(apiClient.get);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe('AppContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with empty state', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    expect(result.current.message).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets loading while fetching', async () => {
    let resolvePromise!: (value: unknown) => void;
    mockedGet.mockReturnValue(new Promise((res) => (resolvePromise = res)));

    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => { result.current.fetchAbout(); });
    expect(result.current.loading).toBe(true);

    await act(async () => { resolvePromise({ data: { message: 'ok' } }); });
  });

  it('stores the API result on success', async () => {
    mockedGet.mockResolvedValue({ data: { message: 'hello from api' } });

    const { result } = renderHook(() => useAppContext(), { wrapper });
    await act(async () => { await result.current.fetchAbout(); });

    expect(result.current.message).toBe('hello from api');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('stores error message on failure', async () => {
    mockedGet.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useAppContext(), { wrapper });
    await act(async () => { await result.current.fetchAbout(); });

    expect(result.current.error).toBe('Network error');
    expect(result.current.loading).toBe(false);
    expect(result.current.message).toBeNull();
  });
});
