import { useState } from 'react';
import { keyframes } from '@emotion/react';
import { TextField } from '@mui/material';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
`;

// 글자가 있으면 테마의 핑크(primary)로 채우고, 입력할 때마다 살짝 흔든다.
function GuestbookField({ value, onChange, ...props }) {
  const [isShaking, setIsShaking] = useState(false);

  const handleChange = (event) => {
    setIsShaking(true);
    onChange(event);
  };

  const handleAnimationEnd = (event) => {
    // 안쪽 요소의 애니메이션 종료는 무시하고 흔들림이 끝났을 때만 상태를 되돌린다.
    if (event.target === event.currentTarget) setIsShaking(false);
  };

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleChange}
      onAnimationEnd={handleAnimationEnd}
      sx={{
        animation: isShaking ? `${shake} 0.25s` : 'none',
        '& .MuiOutlinedInput-root': {
          transition: 'background-color 0.2s',
          bgcolor: value ? 'primary.main' : 'transparent',
          color: value ? 'primary.contrastText' : 'inherit',
        },
        // 움직임을 줄이도록 설정한 사용자에게는 흔들림을 끈다.
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    />
  );
}

export default GuestbookField;
