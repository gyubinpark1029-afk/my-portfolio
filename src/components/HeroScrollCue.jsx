import { Box, ButtonBase, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { scrollToSection } from '../utils/scrollToSection.js';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

const FADE_IN = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// 아래로 내려가라고 알려 주는 "SCROLL" 글자와 화살표. 누르면 다음 섹션(About Me)으로 부드럽게 이동한다.
// delaySeconds: 제목이 나타난 뒤에 보이도록 시작 시간을 맞춘다.
function HeroScrollCue({ delaySeconds }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 8,
        display: 'flex',
        justifyContent: 'center',
        // 바깥 줄은 클릭을 통과시키고, 안쪽 버튼만 눌리게 해서 뒤의 내용을 가리지 않는다.
        pointerEvents: 'none',
        opacity: 0,
        animation: `${FADE_IN} 0.5s ${delaySeconds}s ease-out forwards`,
        '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
      }}
    >
      <ButtonBase
        onClick={() => scrollToSection('about')}
        aria-label="아래로 스크롤하기"
        sx={{
          pointerEvents: 'auto',
          flexDirection: 'column',
          px: 2,
          pt: 0.5,
          color: 'text.secondary',
          transition: 'color 0.2s',
          '&:hover': { color: 'accent.main' },
          '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'accent.main', outlineOffset: 2 },
        }}
      >
        <Typography variant="caption" sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, letterSpacing: 3 })}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            fontSize: 32,
            animation: `${bounce} 1.6s ${delaySeconds}s ease-in-out infinite`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        />
      </ButtonBase>
    </Box>
  );
}

export default HeroScrollCue;
