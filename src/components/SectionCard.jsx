import { Card, CardContent, Typography } from '@mui/material';

// color에는 테마 색 이름('primary', 'secondary', 'warning', 'success')이나 'gradient'를 넘긴다.
// 비워 두면 흰색(paper) 카드가 된다. 글자색은 테마의 contrastText를 따라 다크 모드에서도 잘 보인다.
function SectionCard({ title, description, color, children }) {
  const isColored = Boolean(color);
  const isGradient = color === 'gradient';

  return (
    <Card
      sx={[
        {
          textAlign: 'center',
          color: isColored ? `${isGradient ? 'primary' : color}.contrastText` : 'text.primary',
        },
        isColored && !isGradient && { bgcolor: `${color}.main` },
        // 분홍 → 노랑 → 하늘 → 민트로 번지는 몽환적인 배경 (서랍장 히어로와 같은 방식)
        isGradient && {
          background: (theme) =>
            `linear-gradient(135deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 35%, ${theme.vars.palette.secondary.main} 70%, ${theme.vars.palette.success.main} 100%)`,
        },
      ]}
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
