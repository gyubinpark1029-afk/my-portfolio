import { Box, Container, Grid } from '@mui/material';
import HeroBackground from './HeroBackground.jsx';
import HeroCodeWindow from './HeroCodeWindow.jsx';
import HeroIntro from './HeroIntro.jsx';
import HeroScrollCue from './HeroScrollCue.jsx';
import { useIntroDone } from '../hooks/useIntroDone.js';

// 화면 폭 전체에 배경을 깔고, 안쪽은 Container와 Grid로 나눈다.
// 큰 화면: 왼쪽 글 + 오른쪽 코드 창 / 작은 화면: 글만 가운데에 쌓는다.
function HeroSection() {
  // 코드 창의 타이핑과 화살표는 인트로가 끝난 뒤에 나타나서 시작한다.
  const isIntroDone = useIntroDone();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        // 아래쪽 화살표가 버튼과 겹치지 않도록 여백을 넉넉히 둔다.
        pt: { xs: 6, md: 10 },
        pb: { xs: 10, md: 14 },
      }}
    >
      <HeroBackground />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <HeroIntro />
          </Grid>
          {/* 코드 창은 넓은 화면에서만 보여서, 모바일에서는 제목과 버튼이 먼저 보이게 한다. */}
          <Grid size={{ md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            {isIntroDone && <HeroCodeWindow />}
          </Grid>
        </Grid>
      </Container>
      {isIntroDone && <HeroScrollCue delaySeconds={1} />}
    </Box>
  );
}

export default HeroSection;
