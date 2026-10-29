import { Card, CardContent, Typography } from '@mui/material';

// color에는 테마 색 이름('primary', 'secondary', 'warning', 'success')을 넘긴다.
// 비워 두면 흰색(paper) 카드가 된다. 글자색은 테마의 contrastText를 따라 다크 모드에서도 잘 보인다.
function SectionCard({ title, description, color, children }) {
  return (
    <Card
      sx={{
        textAlign: 'center',
        bgcolor: color ? `${color}.main` : 'background.paper',
        color: color ? `${color}.contrastText` : 'text.primary',
      }}
    >
      <CardContent sx={{ py: { xs: 5, md: 8 }, px: 3 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography>{description}</Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export default SectionCard;
