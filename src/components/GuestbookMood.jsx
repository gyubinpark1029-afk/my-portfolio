import { Box, Rating, Stack, ToggleButton, Typography } from '@mui/material';

export const EMOJIS = ['😊', '😍', '🥰', '👍', '🎉', '🔥'];

function GuestbookMood({ emoji, rating, onEmojiChange, onRatingChange }) {
  return (
    <Stack direction="row" spacing={3} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
      {/* 칸이 좁으면 이모지가 아래 줄로 넘어가도록, 한 묶음(ToggleButtonGroup) 대신 줄바꿈되는 상자에 버튼을 놓는다. */}
      <Stack spacing={1} sx={{ minWidth: 0, maxWidth: '100%' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>오늘의 기분</Typography>
        <Box
          role="group"
          aria-label="이모지 선택"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            pr: '1px',
            pb: '1px',
            // 폰 폭에서는 5개 + 1개로 갈라지지 않도록, 버튼 3개 폭으로 제한해서 3개씩 두 줄로 나눈다.
            '@media (max-width:419px)': { maxWidth: 145 },
          }}
        >
          {EMOJIS.map((item) => (
            <ToggleButton
              key={item}
              value={item}
              selected={emoji === item}
              // 하나만 고르는 방식: 이미 고른 것을 다시 눌러도 선택이 풀리지 않는다.
              onChange={() => onEmojiChange(item)}
              sx={{
                width: 48,
                height: 48,
                fontSize: '1.25rem',
                border: 1,
                borderColor: 'text.primary',
                borderRadius: 0,
                // 이웃 버튼과 테두리를 1px씩 겹쳐서, 한 줄일 때도 여러 줄일 때도 얇은 선 하나로 이어지게 한다.
                m: '0 -1px -1px 0',
                '&:hover': { borderColor: 'accent.main', zIndex: 1 },
                '&.Mui-selected, &.Mui-selected:hover': { bgcolor: 'accent.main', borderColor: 'accent.main', zIndex: 1 },
              }}
            >
              {item}
            </ToggleButton>
          ))}
        </Box>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>별점을 남겨 주세요</Typography>
        <Rating
          size="large"
          value={rating}
          onChange={(_, value) => onRatingChange(value)}
          sx={{ '& .MuiRating-iconFilled': { color: 'accent.main' } }}
        />
      </Stack>
    </Stack>
  );
}

export default GuestbookMood;
