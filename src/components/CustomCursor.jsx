import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { gsap, isReducedMotion, isTouchDevice } from '../lib/motion.js';

// 링크·버튼 위에서는 커지고, data-cursor="VIEW"처럼 글을 단 요소 위에서는 글이 적힌 큰 원이 된다.
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [tabindex="0"]';
const SIZES = { dot: 16, link: 48, label: 80 };

// 마우스를 부드럽게 따라다니는 커서 (레퍼런스의 _cursor).
// 원래 커서는 그대로 두고 그 위에 원을 더한다. 터치 기기와 "움직임 줄이기" 설정에서는 만들지 않는다.
function CustomCursor() {
  const cursorRef = useRef(null);
  const [mode, setMode] = useState('dot');
  const [label, setLabel] = useState('');
  const [isEnabled] = useState(() => !isReducedMotion() && !isTouchDevice());

  useEffect(() => {
    if (!isEnabled) return undefined;
    const cursor = cursorRef.current;
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });

    const handleMove = (event) => {
      moveX(event.clientX);
      moveY(event.clientY);
      cursor.style.opacity = '1';
    };
    const handleOver = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const labelText = target?.closest('[data-cursor]')?.dataset.cursor;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        setMode('link');
      } else if (labelText) {
        setMode('label');
        setLabel(labelText);
      } else {
        setMode('dot');
      }
    };
    const handleLeave = () => {
      cursor.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  const isLabel = mode === 'label';
  return (
    <Box
      ref={cursorRef}
      aria-hidden="true"
      sx={(theme) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2000,
        pointerEvents: 'none',
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES[mode],
        height: SIZES[mode],
        borderRadius: '50%',
        // 흰 원을 "차이" 모드로 겹치면 흰 바탕에서는 검정, 검정 위에서는 흰색으로 보여서 어디서든 눈에 띈다.
        bgcolor: isLabel ? 'accent.main' : 'background.paper',
        mixBlendMode: isLabel ? 'normal' : 'difference',
        color: 'accent.contrastText',
        fontFamily: theme.typography.fontFamilyPoint,
        fontSize: '0.8125rem',
        transition: 'width 0.25s, height 0.25s, background-color 0.25s',
      })}
    >
      {isLabel ? label : null}
    </Box>
  );
}

export default CustomCursor;
