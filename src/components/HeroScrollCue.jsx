import { Box } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

const FADE_IN = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// 아래에 더 볼 내용이 있다는 것을 알려 주는 화살표. 장식이라서 스크린 리더에는 읽히지 않는다.
// delaySeconds: 제목이 나타난 뒤에 보이도록 시작 시간을 맞춘다.
function HeroScrollCue({ delaySeconds }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 8,
        display: 'flex',
        justifyContent: 'center',
        opacity: 0,
        animation: `${FADE_IN} 0.5s ${delaySeconds}s ease-out forwards`,
        '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
      }}
    >
      <KeyboardArrowDownIcon
        sx={{
          fontSize: 32,
          color: 'text.secondary',
          animation: `${bounce} 1.6s ${delaySeconds}s ease-in-out infinite`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      />
    </Box>
  );
}

export default HeroScrollCue;
