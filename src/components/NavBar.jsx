import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Container, Button, Stack } from '@mui/material';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function NavBar() {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
          <Stack direction="row" spacing={1}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                end
                color="inherit"
                sx={{
                  '&.active': { bgcolor: 'secondary.main', color: 'secondary.contrastText' },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
