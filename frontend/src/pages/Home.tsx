import { useEffect } from 'react';
import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { message, loading, error, fetchAbout } = useAppContext();

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Template App
      </Typography>
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} />
          <Typography>Loading...</Typography>
        </Box>
      )}
      {error && <Alert severity="error">Error: {error}</Alert>}
      {message && <Alert severity="success">API says: {message}</Alert>}
    </Container>
  );
}
