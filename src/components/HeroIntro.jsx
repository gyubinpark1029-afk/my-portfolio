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

// 화면 크기별 글자 크기와 간격(간격은 8px 단위).
// 제목은 비례해서 줄어들도록 clamp(최소, 화면 폭 비율, 최대)를 쓴다. 모바일 제목은 데스크톱(h1)보다 한 단계 작은 크기다.
const TYPE = {
  mobile: { name: '1.125rem', headline: 'clamp(1.75rem, 7.5vw, 2.5rem)', sub: '1rem', nameGap: 2, subTop: 2.5 },
  tablet: { name: '1.125rem', headline: 'clamp(2.25rem, 5.2vw, 4rem)', sub: '1.125rem', nameGap: 2.5, subTop: 2.5 },
  desktop: { name: '1.25rem', headline: '4rem', sub: '1.25rem', nameGap: 3, subTop: 3 },
};

// Hero의 글 영역. 크기 순서: 큰 제목 > 한 줄 소개 > 이름·직무 > 기술 칩.
// 연출 순서(인트로가 끝난 뒤 시작): 이름 타이핑 -> 제목 슬라이드업 -> 한 줄 소개 타이핑 -> 칩과 버튼 떠오름
function HeroIntro({ breakpoint }) {
  const { aboutMeData } = usePortfolio();
  const { name, photo } = aboutMeData.basicInfo;
  const isMobile = breakpoint === 'mobile';
  const type = TYPE[breakpoint];
  const alignment = isMobile ? 'center' : 'flex-start';

  return (
    <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
      {/* 모바일에서는 이름이 한 줄에 다 들어가지 않아서, 아바타 아래에 이름을 둔다. */}
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        sx={{ alignItems: 'center', justifyContent: alignment, mb: type.nameGap }}
      >
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
          sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 500, fontSize: type.name })}
        >
          <ScrambleText text={`${name} · Frontend Developer`} startAfter={introDone} delay={0.2} />
        </Typography>
      </Stack>
      <Typography
        variant="h1"
        sx={(theme) => ({
          fontFamily: theme.typography.fontFamilyPoint,
          // 한국어 문장은 글자 수가 많아서 화면 폭에 비례해 줄인다. 둘째 줄의 '쓰기 좋게'를 강조한다.
          fontSize: type.headline,
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
      {/* 소개 글은 줄 간격을 넉넉히(1.6) 두어서 여러 줄로 꺾여도 읽기 편하게 한다. */}
      <Typography component="div" sx={{ mt: type.subTop, mb: 3, fontSize: type.sub, lineHeight: 1.6 }}>
        <ScrambleText text="디자인으로 시작해, React로 직접 만들고 배포합니다." startAfter={introDone} delay={0.6} />
      </Typography>
      <Reveal startAfter={introDone} delay={0.9}>
        <TechStack items={HERO_STACK} justifyContent={alignment} />
      </Reveal>
      <Reveal startAfter={introDone} delay={1}>
        <HeroActions isMobile={isMobile} />
      </Reveal>
    </Box>
  );
}

export default HeroIntro;
