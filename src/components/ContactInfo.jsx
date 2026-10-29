import { Box, IconButton, Link, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

// 지금은 예시 값이다. 실제 연락처와 SNS 주소로 바꿔서 쓴다.
const CONTACT_ITEMS = [
  { key: 'email', label: '이메일', value: 'hello@example.com', href: 'mailto:hello@example.com', Icon: EmailIcon },
  { key: 'phone', label: '전화번호', value: '010-0000-0000', href: 'tel:01000000000', Icon: PhoneIcon },
];

const SNS_LINKS = [
  { label: 'GitHub', href: 'https://github.com/', Icon: GitHubIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: LinkedInIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/', Icon: YouTubeIcon },
];

// 파스텔 노랑에 포인트 색(빨강)을 조금 섞어 따뜻한 주황을 만든다. 팔레트 변수만 사용한다.
const WARM_ORANGE = 'color-mix(in srgb, var(--color-pastel-yellow) 70%, var(--color-accent) 30%)';
const CREAM = 'color-mix(in srgb, var(--color-pastel-yellow) 25%, white)';

function ContactInfo() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gap: 3,
        mt: 4,
        textAlign: 'left',
      }}
    >
      <Stack spacing={2} sx={{ p: 3, borderRadius: 4, bgcolor: CREAM }}>
        {CONTACT_ITEMS.map(({ key, label, value, href, Icon }) => (
          <Stack key={key} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: WARM_ORANGE,
              }}
            >
              <Icon />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2">{label}</Typography>
              <Link href={href} color="inherit" underline="hover" sx={{ fontWeight: 500, wordBreak: 'break-all' }}>
                {value}
              </Link>
            </Box>
          </Stack>
        ))}
      </Stack>
      <Stack spacing={2} sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Typography>SNS에서도 편하게 만나요 🧡</Typography>
        <Stack direction="row" spacing={1.5} useFlexGap sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          {SNS_LINKS.map(({ label, href, Icon }) => (
            <IconButton
              key={label}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              sx={{
                width: 56,
                height: 56,
                color: 'inherit',
                bgcolor: WARM_ORANGE,
                transition: 'transform 0.2s',
                '&:hover': { bgcolor: WARM_ORANGE, transform: 'translateY(-4px)' },
              }}
            >
              <Icon />
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default ContactInfo;
