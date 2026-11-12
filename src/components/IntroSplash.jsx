import { useLayoutEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { finishIntro, isIntroFinished, WILL_PLAY_INTRO } from '../lib/intro.js';
import { gsap } from '../lib/motion.js';

// 처음 접속했을 때 한 번만 보이는 인트로 (레퍼런스의 intro).
// 이름이 흐릿하게 나타났다가 화면이 위로 걷히면, 그 뒤에 Hero 연출이 시작된다.
function IntroSplash() {
  const [isVisible, setIsVisible] = useState(WILL_PLAY_INTRO && !isIntroFinished());
  const rootRef = useRef(null);
  const nameRef = useRef(null);
  const subRef = useRef(null);

  useLayoutEffect(() => {
    if (!isVisible) return undefined;
    // 인트로가 보이는 동안에는 뒤 화면이 스크롤되지 않게 막는다.
    document.documentElement.style.overflow = 'hidden';
    const timeline = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = '';
        finishIntro();
        setIsVisible(false);
      },
    });
    timeline
      .fromTo(nameRef.current, { x: 40, opacity: 0, filter: 'blur(12px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1 })
      .fromTo(subRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.4)
      .to({}, { duration: 0.6 })
      .to(rootRef.current, { yPercent: -100, duration: 0.8, ease: 'power3.inOut' });

    return () => {
      timeline.kill();
      document.documentElement.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Box
      ref={rootRef}
      aria-hidden="true"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        borderBottom: 2,
        borderColor: 'text.primary',
      }}
    >
      <Typography
        ref={nameRef}
        sx={(theme) => ({
          fontFamily: theme.typography.fontFamilyPoint,
          fontWeight: 700,
          fontSize: { xs: '3.5rem', md: '6rem' },
          lineHeight: 1.1,
          opacity: 0,
        })}
      >
        박규빈
      </Typography>
      <Typography ref={subRef} sx={{ mt: 2, letterSpacing: 4, color: 'accent.main', opacity: 0 }}>
        FRONTEND DEVELOPER · PORTFOLIO
      </Typography>
    </Box>
  );
}

export default IntroSplash;
