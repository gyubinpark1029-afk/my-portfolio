import { createTheme } from '@mui/material/styles';

// MUI는 palette 값을 내부에서 직접 파싱해 밝기를 계산하므로 var(--...)를 쓸 수 없고 hex만 가능하다.
// 값은 index.css의 라이트모드 CSS 변수와 같게 유지한다.
// 다크모드는 CssBaseline의 body 스타일과 각 컴포넌트 sx의 var(--...)로 처리한다.
const theme = createTheme({
  palette: {
    primary: { main: '#000000', contrastText: '#ffffff' },
    secondary: { main: '#98c5d3', contrastText: '#000000' },
    error: { main: '#e43e39' },
    success: { main: '#68c74e' },
    background: {
      default: '#ffffff',
      paper: '#eeeeee',
    },
    text: {
      primary: '#000000',
      secondary: '#444444',
      disabled: '#888888',
    },
    divider: '#c6c6c6',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--color-bg-primary)',
          color: 'var(--color-text-primary)',
        },
      },
    },
  },
});

export default theme;
