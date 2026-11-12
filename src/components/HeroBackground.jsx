import { useLayoutEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import { gsap, isReducedMotion } from '../lib/motion.js';

const float = keyframes`
  from { transform: translateY(0) rotate(var(--r)); }
  to { transform: translateY(-16px) rotate(var(--r)); }
`;

// 테마의 글자색(검정)을 투명하게 섞어 만든 연한 선 색. 색 코드를 직접 쓰지 않는다.
const GRID_LINE = 'color-mix(in srgb, var(--mui-palette-text-primary) 8%, transparent)';
const GLOW_SKY = 'color-mix(in srgb, var(--mui-palette-secondary-main) 40%, transparent)';
const GLOW_PINK = 'color-mix(in srgb, var(--mui-palette-info-main) 45%, transparent)';

// 테마의 파스텔 색으로 만든 도형들. 글이 있는 왼쪽은 피하고 오른쪽과 모서리에 둔다.
// rotate는 기울기(deg), seconds는 둥실거리는 속도다.
const SHAPES = [
  {
    key: 'square',
    rotate: 12,
    seconds: 5,
    sx: { width: { xs: 24, md: 72 }, height: { xs: 24, md: 72 }, bgcolor: 'secondary.main', border: 1, top: { xs: 12, md: '10%' }, right: { xs: '8%', md: '6%' } },
  },
  {
    key: 'circle',
    rotate: 0,
    seconds: 6,
    sx: { width: { xs: 32, md: 96 }, height: { xs: 32, md: 96 }, bgcolor: 'info.main', border: 1, borderRadius: '50%', bottom: { xs: 24, md: '16%' }, left: { xs: '8%', md: 'auto' }, right: { md: '3%' } },
  },
  {
    key: 'triangle',
    rotate: -8,
    seconds: 7,
    // clip-path로 자르면 테두리가 같이 잘려서 테두리 없이 색만 쓴다.
    // 글과 겹치지 않도록, 작은 화면에서는 위·아래 여백에, 큰 화면에서는 코드 창 아래쪽에 둔다.
    sx: { width: { xs: 28, md: 80 }, height: { xs: 28, md: 80 }, bgcolor: 'purple.main', clipPath: 'polygon(50% 0, 0 100%, 100% 100%)', bottom: { xs: 28, md: '6%' }, right: { xs: '8%', md: '32%' } },
  },
  {
    key: 'ring',
    rotate: 0,
    seconds: 5.5,
    sx: { display: { xs: 'none', md: 'block' }, width: 48, height: 48, border: 2, borderColor: 'accent.main', borderRadius: '50%', top: '16%', right: '38%' },
  },
  {
    key: 'dot',
    rotate: 20,
    seconds: 4.5,
    sx: { display: { xs: 'none', md: 'block' }, width: 20, height: 20, bgcolor: 'accent.main', top: '68%', right: '22%' },
  },
];

// Hero 뒤에 깔리는 장식: 은은한 색 번짐 + 격자 무늬 + 둥실거리는 도형. 장식이라 스크린 리더에는 읽히지 않는다.
// 도형을 두 층으로 나눠, 스크롤할 때 층마다 다른 속도로 올라가게 한다. (깊이감)
// 둥실거리는 CSS 움직임과 겹치지 않도록 도형 바깥 층에 적용한다.
const LAYERS = [
  { shapes: ['square', 'ring'], rise: -12 },
  { shapes: ['circle', 'triangle', 'dot'], rise: -28 },
];

function HeroBackground() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return undefined;
    const context = gsap.context(() => {
      LAYERS.forEach(({ rise }, index) => {
        gsap.to(`[data-layer="${index}"]`, {
          yPercent: rise,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    }, rootRef);
    return () => context.revert();
  }, []);

  return (
    <Box
      ref={rootRef}
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: `radial-gradient(circle at 10% 15%, ${GLOW_SKY}, transparent 45%), radial-gradient(circle at 90% 85%, ${GLOW_PINK}, transparent 45%)`,
      }}
    >
      {/* 방안지 같은 격자. 아래쪽으로 갈수록 흐려져서 다음 섹션과 자연스럽게 이어진다. */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, ${GRID_LINE} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(to bottom, black 55%, transparent)',
        }}
      />
      {LAYERS.map(({ shapes }, layerIndex) => (
        <Box key={layerIndex} data-layer={layerIndex} sx={{ position: 'absolute', inset: 0 }}>
          {SHAPES.filter(({ key }) => shapes.includes(key)).map(({ key, rotate, seconds, sx }, index) => (
            <Box
              key={key}
              sx={{
                position: 'absolute',
                borderColor: 'text.primary',
                '--r': `${rotate}deg`,
                transform: 'rotate(var(--r))',
                animation: `${float} ${seconds}s ${(layerIndex + index) * 0.4}s ease-in-out infinite alternate`,
                // 움직임을 줄이도록 설정한 사람에게는 도형을 가만히 둔다.
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                ...sx,
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default HeroBackground;
