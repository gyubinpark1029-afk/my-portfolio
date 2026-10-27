import { createTheme } from '@mui/material/styles';

// 색상 값은 index.css의 CSS 변수를 참조한다. (다크모드는 변수만 바뀌면 자동 반영)
const theme = createTheme({
  palette: {
    primary: { main: 'var(--color-button-primary)', contrastText: 'var(--color-bg-primary)' },
    secondary: { main: 'var(--color-secondary)', contrastText: '#000000' },
    error: { main: 'var(--color-error)' },
    success: { main: 'var(--color-success)' },
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
