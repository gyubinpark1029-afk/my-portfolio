import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import App from './App.jsx';
import PortfolioProvider from './context/PortfolioProvider.jsx';
import theme from './theme.js';
import './index.css';

// 새로고침하면 브라우저가 이전 스크롤 위치를 기억해서 되돌려 놓는다. 항상 맨 위에서 시작하도록 끈다.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// HashRouter: GitHub Pages는 새로고침 시 서버 라우팅이 없어 주소에 #을 붙이는 방식이 안전하다.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
