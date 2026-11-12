import { Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';

// 흩어져 있던 단어(개발 키워드)가 가운데로 모이며 사라지는 움직임
const gather = keyframes`
  0% { opacity: 0; transform: translate(var(--x), var(--y)) scale(1); }
  25% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; transform: translate(0, 0) scale(0.4); }
`;

// x, y는 가운데에서 떨어진 시작 위치(px). 화면이 좁으면 부모의 --s로 줄인다.
// 'Design'과 'Code'는 제목("Design meets Code.")과 이어지고, 나머지는 실제로 쓰는 기술이다.
const WORDS = [
  { text: 'Design', x: -320, y: -120 },
  { text: 'Code', x: 320, y: -140 },
  { text: 'React', x: -260, y: 140 },
  { text: 'Deploy', x: 280, y: 130 },
  { text: 'Figma', x: -120, y: -200 },
  { text: 'CSS', x: 140, y: 200 },
  { text: 'HTML', x: -380, y: 10 },
  { text: 'UI', x: 380, y: 0 },
];

// 첫 화면에서 핵심 메시지가 빨리 보이도록 연출을 짧게 한다.
const GATHER_SECONDS = 1.2;
const WORD_STAGGER_SECONDS = 0.05;

function HeroWords() {
  return WORDS.map((word, index) => (
    <Typography
      key={word.text}
      aria-hidden="true"
      sx={(theme) => ({
        position: 'absolute',
        fontFamily: theme.typography.fontFamilyPoint,
        fontSize: { xs: '1rem', md: '1.5rem' },
        // 흐린 회색(text.disabled)은 잘 안 읽혀서 한 단계 진한 회색으로 바꿨다.
        color: 'text.secondary',
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
  ));
}

export default HeroWords;
