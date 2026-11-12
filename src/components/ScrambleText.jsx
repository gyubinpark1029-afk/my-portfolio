import { useLayoutEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { getScrollTrigger, getTypingSeconds, gsap, isReducedMotion, SCRAMBLE_CHARS } from '../lib/motion.js';

// 스크린 리더만 읽는 글자 (화면에는 보이지 않는다)
const SR_ONLY_SX = {
  position: 'absolute',
  // MUI sx에서 숫자 1은 100%를 뜻해서, 1픽셀은 문자열로 적어야 한다.
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
};

// 글자가 뒤섞였다가 제자리를 찾으며 "타이핑"되는 효과 (레퍼런스의 txtTypingSet).
// 글이 쳐지는 동안에도 줄 수와 높이가 바뀌지 않도록, 안 보이는 같은 글자로 자리를 먼저 잡아 둔다.
// text는 바뀌지 않는 글이어야 한다. startAfter(약속)를 주면 스크롤 대신 그것이 끝난 뒤에 재생한다.
function ScrambleText({ text, delay = 0, startAfter, sx }) {
  const rootRef = useRef(null);
  const typedRef = useRef(null);
  const sizerRef = useRef(null);

  useLayoutEffect(() => {
    const typed = typedRef.current;
    if (isReducedMotion()) {
      typed.textContent = text;
      return undefined;
    }
    typed.textContent = '';
    // 한 줄짜리 글은 뒤섞인 글자가 더 넓어도 줄이 꺾이지 않게 한다. 여러 줄인 글은 원래대로 줄바꿈한다.
    const sizer = sizerRef.current;
    const lineHeight = parseFloat(getComputedStyle(sizer).lineHeight) || sizer.offsetHeight;
    typed.style.whiteSpace = sizer.offsetHeight < lineHeight * 1.5 ? 'nowrap' : 'normal';
    let isCancelled = false;
    const tween = {
      duration: getTypingSeconds(text),
      delay,
      ease: 'none',
      scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.4 },
    };
    const context = gsap.context(() => {
      if (startAfter) {
        startAfter.then(() => {
          if (isCancelled) return;
          context.add(() => gsap.to(typed, tween));
        });
        return;
      }
      gsap.to(typed, { ...tween, scrollTrigger: getScrollTrigger(rootRef.current) });
    }, rootRef);

    return () => {
      isCancelled = true;
      context.revert();
    };
  }, [text, delay, startAfter]);

  return (
    <Box ref={rootRef} component="span" sx={{ position: 'relative', display: 'block', ...sx }}>
      <Box component="span" sx={SR_ONLY_SX}>
        {text}
      </Box>
      <Box ref={sizerRef} component="span" aria-hidden="true" sx={{ display: 'block', visibility: 'hidden' }}>
        {text}
      </Box>
      <Box ref={typedRef} component="span" aria-hidden="true" sx={{ position: 'absolute', inset: 0, display: 'block' }} />
    </Box>
  );
}

export default ScrambleText;
