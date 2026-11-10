import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, Divider, Typography } from '@mui/material';

// 레퍼런스 사이트처럼 흰 바탕에 위쪽 굵은 선으로 섹션을 나눈다.
// to를 넘기면 카드 전체가 해당 페이지로 가는 링크가 된다.
// number를 넘기면 제목 위에 01, 02처럼 번호를 붙인다. (레퍼런스 사이트의 번호 체계)
function SectionCard({ title, description, to, number, children }) {
  // 위쪽 여백은 요청에 따라 35px로 고정한다. (8의 배수가 아닌 예외 값)
  const content = (
    <CardContent sx={{ pt: '35px', pb: { xs: 5, md: 8 }, px: { xs: 3, md: 5 } }}>
      {number && (
        <Typography
          sx={(theme) => ({
            fontFamily: theme.typography.fontFamilyPoint,
            color: 'accent.main',
            letterSpacing: 2,
            mb: 1,
          })}
        >
          {String(number).padStart(2, '0')}
        </Typography>
      )}
      <Typography
        variant="h4"
        component="h2"
        sx={(theme) => ({
          fontFamily: theme.typography.fontFamilyPoint,
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 700,
          lineHeight: 1.1,
          mb: 3,
        })}
      >
        {title}
      </Typography>
      <Divider sx={{ borderColor: 'currentColor', opacity: 0.3, mb: 3 }} />
      <Typography>{description}</Typography>
      {children}
    </CardContent>
  );

  return (
    <Card
      sx={{
        textAlign: 'left',
        // 확대된 카드가 섹션 밖으로 나와도 잘리지 않게 한다.
        overflow: 'visible',
        boxShadow: 'none',
        borderRadius: 0,
        borderTop: 2,
        borderColor: 'text.primary',
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      {to ? (
        <CardActionArea component={RouterLink} to={to} sx={{ borderRadius: 'inherit' }}>
          {content}
        </CardActionArea>
      ) : (
        <Box>{content}</Box>
      )}
    </Card>
  );
}

export default SectionCard;
