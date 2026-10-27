import { createTheme } from '@mui/material/styles';

// primary, secondary, error, success의 main은 MUI가 밝기 계산을 위해 직접 파싱하므로
// var(--...) 대신 실제 hex를 써야 한다. 값은 index.css의 CSS 변수와 같게 유지한다.
// 나머지(배경, 글자, 구분선)는 CSS 변수를 써서 다크모드가 자동 반영된다.
const theme = createTheme({
  palette: {
    primary: { main: '#000000', contrastText: '#ffffff' },
    secondary: { main: '#98c5d3', contrastText: '#000000' },
    error: { main: '#e43e39' },
    success: { main: '#68c74e' },
    background: {
      default: 'var(--color-bg-primary)',
      paper: 'var(--color-bg-secondary)',
    },
    text: {
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
      disabled: 'var(--color-text-muted)',
    },
    divider: 'var(--color-border)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
  },
  spacing: 8,
});

export default theme;
