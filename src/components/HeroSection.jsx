import { Avatar, Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import HeroActions from './HeroActions.jsx';
import HeroScrollCue from './HeroScrollCue.jsx';
import HeroWords from './HeroWords.jsx';
import TechStack from './TechStack.jsx';
import { usePortfolio } from '../context/PortfolioContext.js';

// 단어들이 모이는 동안 헤드라인이 나타난다.
const reveal = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const REVEAL_DELAY_SECONDS = 0.5;
const REVEAL_SECONDS = 0.7;
// 첫 화면에서 바로 보여줄 대표 기술
const HERO_STACK = ['React', 'MUI', 'Supabase', 'CSS3'];

function HeroSection() {
  const { aboutMeData } = usePortfolio();
  const { name, photo } = aboutMeData.basicInfo;

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        // 다른 박스들처럼 각진 모서리로 맞춘다.
        borderRadius: 0,
        minHeight: { xs: 480, md: 680 },
        // 아래쪽 화살표가 버튼과 겹치지 않도록 여백을 둔다.
        pt: 2,
        pb: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
        '--s': { xs: 0.5, md: 1 },
      }}
    >
      <HeroWords />

      <Box
        sx={{
          opacity: 0,
          animation: `${reveal} ${REVEAL_SECONDS}s ${REVEAL_DELAY_SECONDS}s ease-out forwards`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
        }}
      >
        {/* About Me와 같은 고양이 캐릭터. 처음 보는 사람에게 사람 냄새가 나도록 이름 위에 둔다. */}
        <Avatar
          src={photo}
          alt={`${name} 프로필 사진`}
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
            border: 1,
            borderColor: 'text.primary',
            bgcolor: 'secondary.main',
          }}
        />
        {/* 이름과 직무를 가장 먼저 읽히도록 검정 글씨로 또렷하게 둔다. */}
        <Typography
          sx={(theme) => ({
            mb: 2,
            fontFamily: theme.typography.fontFamilyPoint,
            fontWeight: 500,
            fontSize: { xs: '1.125rem', md: '1.5rem' },
          })}
        >
          {name} · Frontend Developer
        </Typography>
        <Typography
          variant="h1"
          sx={(theme) => ({
            fontFamily: theme.typography.fontFamilyPoint,
            // 한국어 문장은 영어보다 글자 수가 많아서 크기를 줄였다. 두 줄로 나눠 둘째 줄의 '쓰기 좋게'를 강조한다.
            fontSize: { xs: '1.75rem', sm: '3rem', md: '5rem' },
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            // 단어 중간이 아니라 띄어쓰기에서만 줄이 바뀌게 한다.
            wordBreak: 'keep-all',
          })}
        >
          보기 좋은 화면을,
          <br />
          <Box component="span" sx={{ color: 'accent.main' }}>
            쓰기 좋게
          </Box>{' '}
          만듭니다.
        </Typography>
        {/* 같은 말을 되풀이하던 두 줄을, 무엇을 하는지 말해 주는 한 줄로 합쳤다. */}
        <Typography sx={{ mt: 3, mb: 3, fontSize: { xs: '1rem', md: '1.25rem' } }}>
          디자인으로 시작해, React로 직접 만들고 배포합니다.
        </Typography>
        <TechStack items={HERO_STACK} isCentered />
        <HeroActions />
      </Box>

      <HeroScrollCue delaySeconds={REVEAL_DELAY_SECONDS + REVEAL_SECONDS} />
    </Box>
  );
}

export default HeroSection;
