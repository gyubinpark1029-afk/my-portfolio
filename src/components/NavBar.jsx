import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Container, Button, IconButton, Stack, useColorScheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function NavBar() {
  const { mode, systemMode, setMode } = useColorScheme();
  // 모드가 'system'이면 컴퓨터 설정에 따라 실제로 보이는 모드를 계산한다.
  const isDarkMode = (mode === 'system' ? systemMode : mode) === 'dark';

  const handleToggleMode = () => setMode(isDarkMode ? 'light' : 'dark');

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ position: 'relative', justifyContent: 'center' }}>
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
          <IconButton
            color="inherit"
            onClick={handleToggleMode}
            aria-label={isDarkMode ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기'}
            sx={{ position: 'absolute', right: 0 }}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
