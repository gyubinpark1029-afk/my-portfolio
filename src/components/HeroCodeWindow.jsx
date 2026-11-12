import { Box, Stack, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';

// 글자가 한 칸씩 나타나는 타이핑 효과. 최종 너비는 각 줄의 width가 정한다.
const type = keyframes`
  from { width: 0; }
`;

const blink = keyframes`
  50% { opacity: 0; }
`;

const show = keyframes`
  to { opacity: 1; }
`;

// 코드 색은 테마 색으로 나타낸다. kw: 예약어, str: 문자열, plain: 일반, punc: 기호
const TOKEN_COLORS = { kw: 'accent.main', str: 'success.dark', plain: 'text.primary', punc: 'text.secondary' };

// 한글은 고정폭 글꼴에서 칸 너비가 달라 타이핑 폭이 어긋나므로, 코드는 영어로만 쓴다.
const CODE_LINES = [
  [['const ', 'kw'], ['developer', 'plain'], [' = {', 'punc']],
  [['  role', 'plain'], [': ', 'punc'], ["'Frontend'", 'str'], [',', 'punc']],
  [['  skills', 'plain'], [': [', 'punc'], ["'HTML'", 'str'], [', ', 'punc'], ["'CSS'", 'str'], [', ', 'punc'], ["'Figma'", 'str'], ['],', 'punc']],
  [['  goal', 'plain'], [': ', 'punc'], ["'Easy to use'", 'str'], [',', 'punc']],
  [['  loves', 'plain'], [': ', 'punc'], ["'New challenges'", 'str'], [',', 'punc']],
  [['  reusable', 'plain'], [': ', 'punc'], ['true', 'kw'], [',', 'punc']],
  [['};', 'punc']],
];

// 전체 타이핑이 약 3초 안에 끝나도록 속도를 맞췄다.
const SECONDS_PER_CHAR = 0.018;
const START_DELAY_SECONDS = 0.5;
const LINE_GAP_SECONDS = 0.06;

// 각 줄의 글자 수와, 앞 줄이 끝난 뒤에 시작하도록 계산한 시작 시간
const TIMED_LINES = CODE_LINES.reduce((lines, tokens) => {
  const length = tokens.reduce((sum, [text]) => sum + text.length, 0);
  const delay = lines.length ? lines[lines.length - 1].end + LINE_GAP_SECONDS : START_DELAY_SECONDS;
  return [...lines, { tokens, length, delay, end: delay + length * SECONDS_PER_CHAR }];
}, []);
const TYPING_END_SECONDS = TIMED_LINES[TIMED_LINES.length - 1].end;

// 개발자 포트폴리오다운 코드 창. 장식이라 스크린 리더에는 읽히지 않는다.
// 태블릿은 칸이 좁아서 글자와 안쪽 여백을 줄이고, 데스크톱은 넉넉하게 쓴다.
const WINDOW_STYLE = {
  tablet: { padding: 2, fontSize: 'clamp(0.6875rem, 1.45vw, 1rem)' },
  desktop: { padding: 3, fontSize: '1rem' },
};

function HeroCodeWindow({ breakpoint = 'desktop' }) {
  const { padding, fontSize } = WINDOW_STYLE[breakpoint];
  return (
    <Box
      aria-hidden="true"
      sx={(theme) => ({
        position: 'relative',
        zIndex: 1,
        border: 1,
        borderColor: 'text.primary',
        bgcolor: 'background.paper',
        // 번지지 않는 딱딱한 그림자. 마우스를 올리면 창이 눌리듯 움직인다.
        boxShadow: `8px 8px 0 ${theme.vars.palette.text.primary}`,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translate(4px, 4px)', boxShadow: `4px 4px 0 ${theme.vars.palette.accent.main}` },
      })}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', px: 2, py: 1, borderBottom: 1, borderColor: 'text.primary' }}>
        {['info.main', 'warning.main', 'secondary.main'].map((color) => (
          <Box key={color} sx={{ width: 12, height: 12, border: 1, borderColor: 'text.primary', bgcolor: color }} />
        ))}
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', pl: 1 }}>
          developer.js
        </Typography>
      </Stack>
      <Box sx={{ p: padding, fontFamily: '"Consolas", "Menlo", monospace', fontSize, lineHeight: 1.9, textAlign: 'left' }}>
        {TIMED_LINES.map(({ tokens, length, delay, end }, index) => (
          <Box
            key={index}
            sx={{
              width: `${length}ch`,
              whiteSpace: 'pre',
              overflow: 'hidden',
              animation: `${type} ${end - delay}s ${delay}s steps(${length}) backwards`,
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            {tokens.map(([text, kind], tokenIndex) => (
              <Box key={tokenIndex} component="span" sx={{ color: TOKEN_COLORS[kind], fontWeight: kind === 'kw' ? 700 : 400 }}>
                {text}
              </Box>
            ))}
          </Box>
        ))}
        {/* 타이핑이 끝나면 깜빡이는 커서가 나타난다. */}
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            opacity: 0,
            animation: `${show} 0.01s ${TYPING_END_SECONDS}s forwards`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'block',
              width: '0.6em',
              height: '1.1em',
              bgcolor: 'accent.main',
              animation: `${blink} 1s steps(2, jump-none) infinite`,
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default HeroCodeWindow;
