import { Link as RouterLink, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Container, Button, Stack, Typography } from '@mui/material';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function NavBar() {
  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Container maxWidth="md">
        {/* 좁은 화면에서는 메뉴가 왼쪽에 붙는다. */}
        <Toolbar disableGutters sx={{ position: 'relative', justifyContent: { xs: 'flex-start', sm: 'center' } }}>
          {/* 좁은 화면에서는 메뉴만으로 자리가 꽉 차서 사이트 이름을 숨긴다. */}
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            aria-label="홈으로 가기"
            sx={{ position: 'absolute', left: 0, display: { xs: 'none', sm: 'inline-flex' } }}
          >
            <Typography variant="h6" component="span" sx={{ fontSize: '1.0625rem', fontWeight: 700, textTransform: 'none' }}>
              MY portfolio
            </Typography>
          </Button>
          <Stack direction="row" spacing={1}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                end
                color="inherit"
                sx={{
                  '&.active': { bgcolor: 'background.paper', color: 'text.primary' },
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
