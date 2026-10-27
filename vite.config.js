import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub Pages는 https://사용자명.github.io/my-portfolio/ 아래에서 서비스되므로 base가 필요하다.
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [react()],
});
