import { Link as RouterLink, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Container, Button, Stack, Typography } from '@mui/material';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function NavBar() {
  return (
    // 흰 바탕 + 검정 글자 + 파란 밑줄: 레퍼런스처럼 가볍고 깔끔한 상단 메뉴
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: 1, borderColor: 'divider' }}
    >
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
            <Typography
              variant="h6"
              component="span"
              sx={(theme) => ({
                fontFamily: theme.typography.fontFamilyPoint,
                fontSize: '1.0625rem',
                fontWeight: 700,
                textTransform: 'none',
              })}
            >
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
                  borderRadius: 0,
                  borderBottom: 2,
                  borderColor: 'transparent',
                  '&:hover': { bgcolor: 'transparent', color: 'accent.main' },
                  '&.active': { color: 'accent.main', borderColor: 'accent.main' },
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
