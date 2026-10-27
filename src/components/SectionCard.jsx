import { Card, CardContent, Typography } from '@mui/material';

// bgColor에는 index.css의 CSS 변수를 문자열로 넘긴다. 파스텔 배경 위 글자는 다크모드에서도 검정을 유지한다.
function SectionCard({ title, description, bgColor = 'var(--color-bg-secondary)', isPastel = false }) {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: bgColor,
        color: isPastel ? '#000000' : 'text.primary',
        textAlign: 'center',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ py: { xs: 5, md: 8 }, px: 3 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
}

export default SectionCard;
