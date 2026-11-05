import { Link as RouterLink, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Container, Button, IconButton, Stack, Typography, useColorScheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DrawerLogo from './DrawerLogo.jsx';

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
        {/* 좁은 화면에서는 오른쪽 아이콘과 겹치지 않도록 메뉴를 왼쪽에 붙인다. */}
        <Toolbar disableGutters sx={{ position: 'relative', justifyContent: { xs: 'flex-start', sm: 'center' } }}>
          {/* 좁은 화면에서는 메뉴와 아이콘만으로 자리가 꽉 차서 로고를 숨긴다. */}
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            aria-label="홈으로 가기"
            sx={{ position: 'absolute', left: 0, display: { xs: 'none', sm: 'inline-flex' }, gap: 1 }}
          >
            <DrawerLogo size={40} />
            {/* 이름은 메뉴와 겹치지 않는 넓은 화면에서만 보인다. */}
            <Typography variant="h6" component="span" sx={{ display: { xs: 'none', md: 'inline' }, fontWeight: 700 }}>
              서랍장
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
          <Stack direction="row" sx={{ position: 'absolute', right: 0 }}>
            <IconButton
              color="inherit"
              onClick={handleToggleMode}
              aria-label={isDarkMode ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기'}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
