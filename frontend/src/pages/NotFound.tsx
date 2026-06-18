import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        404 — Page Not Found
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Go home
      </Button>
    </Container>
  );
}
