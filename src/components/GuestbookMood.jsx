import { Rating, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

export const EMOJIS = ['😊', '😍', '🥰', '👍', '🎉', '🔥'];

function GuestbookMood({ emoji, rating, onEmojiChange, onRatingChange }) {
  return (
    <Stack direction="row" spacing={3} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
      <Stack spacing={1}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>오늘의 기분</Typography>
        <ToggleButtonGroup
          exclusive
          value={emoji}
          onChange={(_, value) => value && onEmojiChange(value)}
          aria-label="이모지 선택"
        >
          {EMOJIS.map((item) => (
            <ToggleButton key={item} value={item} sx={{ width: 48, height: 48, fontSize: '1.25rem' }}>
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>별점을 남겨 주세요</Typography>
        <Rating size="large" value={rating} onChange={(_, value) => onRatingChange(value)} />
      </Stack>
    </Stack>
  );
}

export default GuestbookMood;
