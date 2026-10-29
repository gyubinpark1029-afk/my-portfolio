import { Rating, Stack, Typography } from '@mui/material';

function formatDate(isoString) {
  return new Date(isoString).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
}

function GuestbookList({ entries, isLoading, hasError }) {
  if (isLoading) return <Typography>불러오는 중...</Typography>;
  if (hasError) return <Typography>방명록을 불러오지 못했어요.</Typography>;
  if (entries.length === 0) return <Typography>첫 번째 방명록을 남겨 주세요! 🧡</Typography>;

  return (
    <Stack spacing={2}>
      {entries.map((entry) => (
        <Stack
          key={entry.id}
          spacing={1}
          sx={{ p: 2, borderRadius: 1, bgcolor: 'background.paper', color: 'text.primary', textAlign: 'left' }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography component="span" sx={{ fontSize: '1.5rem' }}>{entry.emoji}</Typography>
            <Typography sx={{ fontWeight: 500 }}>{entry.name}</Typography>
            {entry.rating && <Rating value={entry.rating} size="small" readOnly />}
          </Stack>
          <Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{entry.message}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{formatDate(entry.created_at)}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export default GuestbookList;
