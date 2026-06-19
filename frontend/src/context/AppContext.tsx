import { createContext, useCallback, useContext, useReducer, type ReactNode } from 'react';
import { apiClient } from '../api/client';

interface AppState {
  message: string | null;
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: string }
  | { type: 'FETCH_ERROR'; payload: string };

const initialState: AppState = {
  message: null,
  loading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, message: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
  }
}

interface AppContextValue extends AppState {
  fetchAbout: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchAbout = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const { data } = await apiClient.get<{ message: string }>('/about');
      dispatch({ type: 'FETCH_SUCCESS', payload: data.message });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      dispatch({ type: 'FETCH_ERROR', payload: message });
    }
  }, []);

  return <AppContext.Provider value={{ ...state, fetchAbout }}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
