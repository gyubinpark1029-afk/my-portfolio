import { useLayoutEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { FADE_UP, getScrollTrigger, gsap, isReducedMotion } from '../lib/motion.js';

// 아래에서 위로 떠오르며 나타나는 효과 (레퍼런스의 fadeup).
// 기본은 스크롤로 화면에 들어올 때 재생한다.
// startAfter(약속)를 주면 스크롤과 상관없이 그것이 끝난 뒤에 재생한다. (Hero처럼 인트로 뒤에 시작할 때)
function Reveal({ children, delay = 0, startAfter, sx, ...props }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return undefined;
    const element = ref.current;
    let isCancelled = false;
    const context = gsap.context(() => {
      if (startAfter) {
        gsap.set(element, FADE_UP);
        startAfter.then(() => {
          if (isCancelled) return;
          context.add(() => gsap.to(element, { opacity: 1, y: 0, duration: FADE_UP.duration, delay }));
        });
        return;
      }
      gsap.from(element, { ...FADE_UP, delay, scrollTrigger: getScrollTrigger(element) });
    }, element);

    return () => {
      isCancelled = true;
      context.revert();
    };
  }, [delay, startAfter]);

  return (
    <Box ref={ref} sx={sx} {...props}>
      {children}
    </Box>
  );
}

export default Reveal;
