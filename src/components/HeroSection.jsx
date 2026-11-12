import { Box, Container, Grid } from '@mui/material';
import HeroBackground from './HeroBackground.jsx';
import HeroCodeWindow from './HeroCodeWindow.jsx';
import HeroIntro from './HeroIntro.jsx';
import HeroScrollCue from './HeroScrollCue.jsx';
import { useHeroBreakpoint } from '../hooks/useHeroBreakpoint.js';
import { useIntroDone } from '../hooks/useIntroDone.js';

// 화면 크기별 위·아래 여백(8px 단위)과 두 칸 사이 간격.
// 아래쪽 여백에는 "SCROLL" 안내가 들어갈 자리가 포함돼 있다.
const LAYOUT = {
  mobile: { pt: 5, pb: 10, gap: 4 },
  tablet: { pt: 8, pb: 12, gap: 4 },
  desktop: { pt: 10, pb: 14, gap: 6 },
};

// 화면 폭 전체에 배경을 깔고, 안쪽은 Container와 Grid로 나눈다.
// 모바일: 글만 가운데에 세로로 쌓는다 / 태블릿·데스크톱: 왼쪽 글 + 오른쪽 코드 창
function HeroSection() {
  const breakpoint = useHeroBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const { pt, pb, gap } = LAYOUT[breakpoint];
  // 코드 창의 타이핑과 화살표는 인트로가 끝난 뒤에 나타나서 시작한다.
  const isIntroDone = useIntroDone();

  return (
    <Box
      component="section"
      sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'background.paper', pt, pb }}
    >
      <HeroBackground />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={gap} sx={{ alignItems: 'center' }}>
          <Grid size={isMobile ? 12 : 7}>
            <HeroIntro breakpoint={breakpoint} />
          </Grid>
          {/* 코드 창은 모바일에서는 아예 만들지 않아서, 제목과 버튼이 먼저 보이고 타이핑 연산도 아낀다. */}
          {!isMobile && (
            <Grid size={5}>{isIntroDone && <HeroCodeWindow breakpoint={breakpoint} />}</Grid>
          )}
        </Grid>
      </Container>
      {isIntroDone && <HeroScrollCue delaySeconds={1} />}
    </Box>
  );
}

export default HeroSection;
