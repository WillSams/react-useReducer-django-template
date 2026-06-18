import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import App from '../src/App';
import * as AppContextModule from '../src/context/AppContext';

const theme = createTheme();

const renderWithProviders = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

vi.mock('../src/context/AppContext', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/context/AppContext')>();
  return {
    ...actual,
    useAppContext: vi.fn(() => ({
      message: null,
      loading: false,
      error: null,
      fetchAbout: vi.fn(),
    })),
  };
});

const mockedUseAppContext = vi.mocked(AppContextModule.useAppContext);

describe('App routing', () => {
  it('renders the home page at /', () => {
    mockedUseAppContext.mockReturnValue({
      message: null,
      loading: false,
      error: null,
      fetchAbout: vi.fn(),
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /template app/i })).toBeInTheDocument();
  });

  it('renders the 404 page for unknown routes', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/does-not-exist']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });
});
