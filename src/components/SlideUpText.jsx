import { useLayoutEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { getScrollTrigger, gsap, isReducedMotion } from '../lib/motion.js';

// 글자가 아래 숨은 곳에서 위로 튀어 올라오는 효과 (레퍼런스의 제목 등장).
// 한 줄짜리 글에 쓴다. 두 줄이면 줄마다 따로 감싸서 delay를 조금씩 늦춘다.
// startAfter(약속)를 주면 스크롤 대신 그것이 끝난 뒤에 재생한다.
function SlideUpText({ children, delay = 0, startAfter, sx }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return undefined;
    const inner = innerRef.current;
    let isCancelled = false;
    const tween = { yPercent: 110, duration: 1.2, delay, ease: 'back.out(1.4)' };
    const context = gsap.context(() => {
      if (startAfter) {
        gsap.set(inner, { yPercent: 110 });
        startAfter.then(() => {
          if (isCancelled) return;
          context.add(() => gsap.to(inner, { ...tween, yPercent: 0 }));
        });
        return;
      }
      gsap.from(inner, { ...tween, scrollTrigger: getScrollTrigger(outerRef.current) });
    }, outerRef);

    return () => {
      isCancelled = true;
      context.revert();
    };
  }, [delay, startAfter]);

  return (
    // 바깥 상자가 넘치는 부분을 가려서, 글자가 "숨은 곳에서 올라오는" 것처럼 보인다.
    <Box ref={outerRef} component="span" sx={{ display: 'block', overflow: 'hidden', ...sx }}>
      <Box ref={innerRef} component="span" sx={{ display: 'block' }}>
        {children}
      </Box>
    </Box>
  );
}

export default SlideUpText;
