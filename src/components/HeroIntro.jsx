import { Avatar, Box, Stack, Typography } from '@mui/material';
import HeroActions from './HeroActions.jsx';
import Reveal from './Reveal.jsx';
import ScrambleText from './ScrambleText.jsx';
import SlideUpText from './SlideUpText.jsx';
import TechStack from './TechStack.jsx';
import { usePortfolio } from '../context/PortfolioContext.js';
import { introDone } from '../lib/intro.js';

// 첫 화면에서 바로 보여줄 대표 기술
const HERO_STACK = ['React', 'MUI', 'Supabase', 'CSS3'];

// Hero의 글 영역. 크기 순서: 큰 제목 > 한 줄 소개 > 이름·직무 > 기술 칩.
// 연출 순서(인트로가 끝난 뒤 시작): 이름 타이핑 -> 제목 슬라이드업 -> 한 줄 소개 타이핑 -> 칩과 버튼 떠오름
function HeroIntro() {
  const { aboutMeData } = usePortfolio();
  const { name, photo } = aboutMeData.basicInfo;

  return (
    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 3 }}>
        {/* About Me와 같은 고양이 캐릭터 */}
        <Reveal startAfter={introDone}>
          <Avatar
            src={photo}
            alt={`${name} 프로필 사진`}
            sx={{ width: 56, height: 56, border: 1, borderColor: 'text.primary', bgcolor: 'secondary.main' }}
          />
        </Reveal>
        <Typography
          component="div"
          sx={(theme) => ({
            fontFamily: theme.typography.fontFamilyPoint,
            fontWeight: 500,
            fontSize: { xs: '1.125rem', md: '1.25rem' },
          })}
        >
          <ScrambleText text={`${name} · Frontend Developer`} startAfter={introDone} delay={0.2} />
        </Typography>
      </Stack>
      <Typography
        variant="h1"
        sx={(theme) => ({
          fontFamily: theme.typography.fontFamilyPoint,
          // 한국어 문장은 글자 수가 많아서 화면 크기별로 나눠 줄였다. 둘째 줄의 '쓰기 좋게'를 강조한다.
          fontSize: { xs: '1.75rem', sm: '3rem', md: '3rem', lg: '4rem' },
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          // 단어 중간이 아니라 띄어쓰기에서만 줄이 바뀌게 한다.
          wordBreak: 'keep-all',
        })}
      >
        <SlideUpText startAfter={introDone} delay={0.1}>
          보기 좋은 화면을,
        </SlideUpText>
        <SlideUpText startAfter={introDone} delay={0.25}>
          <Box component="span" sx={{ color: 'accent.main' }}>
            쓰기 좋게
          </Box>{' '}
          만듭니다.
        </SlideUpText>
      </Typography>
      <Typography component="div" sx={{ mt: 3, mb: 3, fontSize: { xs: '1rem', md: '1.25rem' } }}>
        <ScrambleText text="디자인으로 시작해, React로 직접 만들고 배포합니다." startAfter={introDone} delay={0.6} />
      </Typography>
      <Reveal startAfter={introDone} delay={0.9}>
        <TechStack items={HERO_STACK} justifyContent={{ xs: 'center', md: 'flex-start' }} />
      </Reveal>
      <Reveal startAfter={introDone} delay={1}>
        <HeroActions />
      </Reveal>
    </Box>
  );
}

export default HeroIntro;
