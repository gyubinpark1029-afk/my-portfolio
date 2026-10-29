import { Box, IconButton, Link, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';

const CONTACT_ITEMS = [
  { key: 'email', label: '이메일', value: 'gyubinpark1029@gmail.com', href: 'mailto:gyubinpark1029@gmail.com', Icon: EmailIcon },
  { key: 'phone', label: '전화번호', value: '010-2586-4944', href: 'tel:01025864944', Icon: PhoneIcon },
];

const SNS_LINKS = [{ label: 'GitHub', href: 'https://github.com/gyubinpark1029-afk', Icon: GitHubIcon }];

// 테마의 노랑에 빨강(error)을 조금 섞어 따뜻한 주황을 만든다. 테마 변수만 사용한다.
const WARM_ORANGE = 'color-mix(in srgb, var(--mui-palette-warning-main) 70%, var(--mui-palette-error-main) 30%)';
const CREAM = 'color-mix(in srgb, var(--mui-palette-warning-main) 25%, white)';

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
      <Stack spacing={2} sx={{ p: 3, borderRadius: 1, bgcolor: CREAM }}>
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
      <Stack
        spacing={2}
        sx={{ p: 3, borderRadius: 1, bgcolor: CREAM, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
      >
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
