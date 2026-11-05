import { Container, Stack } from '@mui/material';

// 모든 페이지의 가운데 정렬과 반응형 폭을 한 곳에서 담당한다.
// 카드가 여러 열로 놓이는 페이지는 maxWidth="lg"처럼 더 넓게 쓸 수 있다.
function PageContainer({ children, maxWidth = 'md' }) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={3}>{children}</Stack>
    </Container>
  );
}

export default PageContainer;
