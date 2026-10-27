import { Container, Stack } from '@mui/material';

// 모든 페이지의 가운데 정렬과 반응형 폭을 한 곳에서 담당한다.
function PageContainer({ children }) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={3}>{children}</Stack>
    </Container>
  );
}

export default PageContainer;
