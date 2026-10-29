import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { useAuth } from '../contexts/AuthContext.jsx';
import { COMMUNITY_URL } from '../constants/links.js';
import DrawerLogo from './DrawerLogo.jsx';

// 서랍장 사이트의 히어로를 가져왔다. 가입 버튼은 포트폴리오 안으로, 나머지 버튼은 서랍장 사이트로 연결된다.
function HeroSection() {
  const { session } = useAuth();
  // 로그인 전에는 포트폴리오 회원가입으로, 로그인 후에는 서랍장 글쓰기로 연결한다.
  const startButtonProps = session
    ? { href: `${COMMUNITY_URL}#/posts/new`, target: '_blank', rel: 'noopener noreferrer' }
    : { component: RouterLink, to: '/signup' };

  return (
    <Box
      sx={{
        p: { xs: 4, md: 6 },
        borderRadius: 4,
        textAlign: 'center',
        // 배경이 항상 파스텔이라 글자는 모드와 상관없이 어두운 잉크색(contrastText)을 쓴다
        color: 'primary.contrastText',
        // 모드에 따라 바뀌는 색은 theme.vars로 가져와야 다크 모드에서도 따라 바뀐다
        boxShadow: (theme) =>
          `0 16px 40px color-mix(in srgb, ${theme.vars.palette.primary.main} 40%, transparent)`,
        // 분홍 → 노랑 → 하늘 → 민트로 번지는 몽환적인 배경 위에 흰 빛 번짐을 겹친다
        background: (theme) =>
          `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.55) 0%, transparent 45%), linear-gradient(135deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 35%, ${theme.vars.palette.secondary.main} 70%, ${theme.vars.palette.success.main} 100%)`,
      }}
    >
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 96,
            height: 96,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            boxShadow: 2,
          }}
        >
          <DrawerLogo size={64} />
        </Box>
        <Stack spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.125rem', md: '3rem' }, letterSpacing: 4 }}>
            서랍장
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, lineHeight: 1.8, maxWidth: 480, wordBreak: 'keep-all' }}>
            마음에 담아 둔 책 이야기를
            <br />
            서랍처럼 하나씩 꺼내 나누는 곳
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            startIcon={<CreateIcon />}
            {...startButtonProps}
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              '&:hover': { bgcolor: 'background.default' },
            }}
          >
            {session ? '글쓰기' : '함께 시작하기'}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href={COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.contrastText',
              borderColor: 'primary.contrastText',
              '&:hover': { borderColor: 'primary.contrastText', bgcolor: 'rgba(255, 255, 255, 0.4)' },
            }}
          >
            글 둘러보기
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default HeroSection;
