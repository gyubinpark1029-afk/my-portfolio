import { createTheme } from '@mui/material/styles';

// 컬러 팔레트 디자인 시스템(Oatly 기반)을 MUI 테마에 옮긴 것이다.
// 검정(primary)이 중심이고, 파스텔은 섹션 배경용이다: 하늘(secondary), 분홍(info), 노랑(warning).
// 보라(purple)는 MUI 기본 이름이 없어 직접 추가한 색이다.
// 파스텔 위 글자는 모드와 상관없이 항상 검정(contrastText)을 쓴다.
// 빨강(error)은 오류·삭제처럼 눈에 띄어야 하는 곳에만 쓴다.
const theme = createTheme({
  // data-mui-color-scheme 속성으로 모드를 바꾸므로 직접 고른 모드가 시스템 설정보다 우선한다.
  cssVariables: { colorSchemeSelector: 'data' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#000000', light: '#444444', dark: '#444444', contrastText: '#ffffff' },
        secondary: { main: '#98c5d3', contrastText: '#000000' },
        info: { main: '#f8c8d8', contrastText: '#000000' },
        purple: { main: '#a67eb1', contrastText: '#000000' },
        warning: { main: '#fdcf85', contrastText: '#000000' },
        success: { main: '#68c74e', contrastText: '#000000' },
        error: { main: '#e43e39', contrastText: '#ffffff' },
        background: { default: '#ffffff', paper: '#ffffff' },
        text: { primary: '#000000', secondary: '#444444', disabled: '#888888' },
        divider: '#c6c6c6',
      },
    },
    dark: {
      palette: {
        primary: { main: '#ffffff', light: '#c6c6c6', dark: '#c6c6c6', contrastText: '#000000' },
        secondary: { main: '#98c5d3', contrastText: '#000000' },
        info: { main: '#f8c8d8', contrastText: '#000000' },
        purple: { main: '#a67eb1', contrastText: '#000000' },
        warning: { main: '#fdcf85', contrastText: '#000000' },
        success: { main: '#68c74e', contrastText: '#000000' },
        error: { main: '#e43e39', contrastText: '#ffffff' },
        background: { default: '#000000', paper: '#444444' },
        text: { primary: '#ffffff', secondary: '#c6c6c6', disabled: '#888888' },
        divider: '#444444',
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Malgun Gothic", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
  },
  shape: { borderRadius: 16 },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { minHeight: '100vh' },
      },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 500 } },
    },
    MuiLink: {
      // 본문 링크는 남색 + 밑줄, hover 시 빨강. 다크 모드에서는 하늘색으로 바꿔 읽히게 한다.
      styleOverrides: {
        root: ({ theme: currentTheme }) => ({
          color: '#24356a',
          '&:hover': { color: currentTheme.vars.palette.error.main },
          ...currentTheme.applyStyles('dark', {
            color: '#98c5d3',
            '&:hover': { color: '#f8c8d8' },
          }),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme: currentTheme }) => ({
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          ...currentTheme.applyStyles('dark', {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          }),
        }),
      },
    },
  },
});

export default theme;
