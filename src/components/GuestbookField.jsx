import { useState } from 'react';
import { keyframes } from '@emotion/react';
import { InputAdornment, TextField } from '@mui/material';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
`;

// 입력할 때마다 살짝 흔든다.
// icon에는 입력칸 앞에 보일 MUI 아이콘 컴포넌트를 넘긴다.
function GuestbookField({ value, onChange, icon: Icon, slotProps, ...props }) {
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
      slotProps={{
        ...slotProps,
        input: Icon && {
          startAdornment: (
            <InputAdornment position="start" sx={{ alignSelf: props.multiline ? 'flex-start' : 'center', mt: props.multiline ? 1 : 0 }}>
              <Icon />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        animation: isShaking ? `${shake} 0.25s` : 'none',
        // 움직임을 줄이도록 설정한 사용자에게는 흔들림을 끈다.
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    />
  );
}

export default GuestbookField;
