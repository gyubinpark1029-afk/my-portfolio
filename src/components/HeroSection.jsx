import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import HeroActions from './HeroActions.jsx';
import TechStack from './TechStack.jsx';

// 흩어져 있던 단어(아이디어)가 가운데로 모이며 사라지는 움직임
const gather = keyframes`
  0% { opacity: 0; transform: translate(var(--x), var(--y)) scale(1); }
  25% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; transform: translate(0, 0) scale(0.4); }
`;

// 단어들이 모인 뒤에 헤드라인이 나타난다.
const reveal = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

// x, y는 가운데에서 떨어진 시작 위치(px). 화면이 좁으면 --s로 줄인다.
const WORDS = [
  { text: 'Design', x: -320, y: -120 },
  { text: 'Code', x: 320, y: -140 },
  { text: 'Idea', x: -260, y: 140 },
  { text: 'Story', x: 280, y: 130 },
  { text: 'Figma', x: -120, y: -200 },
  { text: 'CSS', x: 140, y: 200 },
  { text: 'Run', x: -380, y: 10 },
  { text: 'Book', x: 380, y: 0 },
];

// 첫 화면에서 핵심 메시지가 빨리 보이도록 연출을 짧게 한다. (이전에는 제목이 약 2초 뒤에 나타났다)
const GATHER_SECONDS = 1.2;
const WORD_STAGGER_SECONDS = 0.05;
const REVEAL_DELAY_SECONDS = 0.5;
// 첫 화면에서 바로 보여줄 대표 기술
const HERO_STACK = ['React', 'MUI', 'Supabase', 'CSS3'];

function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: 1,
        minHeight: { xs: 480, md: 680 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
        '--s': { xs: 0.5, md: 1 },
      }}
    >
      {WORDS.map((word, index) => (
        <Typography
          key={word.text}
          aria-hidden="true"
          sx={(theme) => ({
            position: 'absolute',
            fontFamily: theme.typography.fontFamilyPoint,
            fontSize: { xs: '1rem', md: '1.5rem' },
            color: 'text.disabled',
            opacity: 0,
            '--x': `calc(${word.x}px * var(--s))`,
            '--y': `calc(${word.y}px * var(--s))`,
            animation: `${gather} ${GATHER_SECONDS}s ${index * WORD_STAGGER_SECONDS}s ease-in-out forwards`,
            // 움직임을 줄이도록 설정한 사람에게는 단어 애니메이션을 보여주지 않는다.
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          })}
        >
          {word.text}
        </Typography>
      ))}

      <Box
        sx={{
          opacity: 0,
          animation: `${reveal} 0.7s ${REVEAL_DELAY_SECONDS}s ease-out forwards`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
        }}
      >
        {/* 이름과 직무를 가장 먼저 읽히도록 검정 글씨로 또렷하게 둔다. */}
        <Typography
          sx={(theme) => ({
            mb: 2,
            fontFamily: theme.typography.fontFamilyPoint,
            fontWeight: 500,
            fontSize: { xs: '1.125rem', md: '1.5rem' },
          })}
        >
          박규빈 · Frontend Developer
        </Typography>
        <Typography
          variant="h1"
          sx={(theme) => ({
            fontFamily: theme.typography.fontFamilyPoint,
            // 레퍼런스처럼 화면을 가득 채우는 큰 글자. 두 줄로 나눠 'Code.'를 강조한다.
            fontSize: { xs: '3.25rem', md: '7rem' },
            fontWeight: 700,
            // 'Design'의 g 꼬리가 아래 줄 글자와 겹치지 않도록 줄 간격을 살짝 넓힌다.
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          })}
        >
          Design meets
          <br />
          <Box component="span" sx={{ color: 'accent.main' }}>
            Code.
          </Box>
        </Typography>
        {/* 같은 말을 되풀이하던 두 줄을, 무엇을 하는지 말해 주는 한 줄로 합쳤다. */}
        <Typography sx={{ mt: 3, mb: 3, fontSize: { xs: '1rem', md: '1.25rem' } }}>
          디자인으로 시작해, React로 직접 만들고 배포합니다.
        </Typography>
        <TechStack items={HERO_STACK} isCentered />
        <HeroActions />
      </Box>
    </Box>
  );
}

export default HeroSection;
