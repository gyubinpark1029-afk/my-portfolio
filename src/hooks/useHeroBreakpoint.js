import { useMediaQuery } from '@mui/material';

// Hero 전용 3단계 구분: 모바일(767px 이하) / 태블릿(768~1199px) / 데스크톱(1200px 이상)
// MUI 기본 구분점(600, 900, 1200)과 달라서, 여기서만 따로 정해 쓴다.
// noSsr: 첫 화면부터 정확한 값으로 시작해서, 화면이 한 번 깜빡이며 바뀌는 일을 막는다.
export function useHeroBreakpoint() {
  const isTabletUp = useMediaQuery('(min-width:768px)', { noSsr: true });
  const isDesktop = useMediaQuery('(min-width:1200px)', { noSsr: true });
  if (isDesktop) return 'desktop';
  if (isTabletUp) return 'tablet';
  return 'mobile';
}
