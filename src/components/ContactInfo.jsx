import { Box, IconButton, Link, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import { CONTACT_EMAIL, GITHUB_URL } from '../data/profileLinks.js';

const CONTACT_ITEMS = [
  { key: 'email', label: '이메일', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, Icon: EmailIcon },
  { key: 'phone', label: '전화번호', value: '010-2586-4944', href: 'tel:01025864944', Icon: PhoneIcon },
];

const SNS_LINKS = [{ label: 'GitHub', href: GITHUB_URL, Icon: GitHubIcon }];

// 레퍼런스 사이트처럼 흰 바탕, 각진 모서리, 검정 테두리로 박스를 만든다.
const BOX_SX = {
  p: 3,
  borderRadius: 0,
  border: 1,
  borderColor: 'text.primary',
  bgcolor: 'background.paper',
  color: 'text.primary',
};

// 아이콘 칸은 평소엔 흰 바탕에 검정 선, 마우스를 올리면 파란 포인트색으로 바뀐다.
const ICON_BOX_SX = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 48,
  height: 48,
  border: 1,
  borderColor: 'text.primary',
  borderRadius: 0,
  transition: 'background-color 0.2s, color 0.2s',
};

const HOVER_ACCENT_SX = {
  bgcolor: 'accent.main',
  borderColor: 'accent.main',
  color: 'accent.contrastText',
};

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
      <Stack spacing={2} sx={BOX_SX}>
        {CONTACT_ITEMS.map(({ key, label, value, href, Icon }) => (
          <Stack
            key={key}
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', '&:hover .contact-icon': HOVER_ACCENT_SX }}
          >
            <Box className="contact-icon" sx={ICON_BOX_SX}>
              <Icon />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {label}
              </Typography>
              <Link
                href={href}
                color="inherit"
                underline="hover"
                sx={(theme) => ({
                  fontFamily: theme.typography.fontFamilyPoint,
                  fontWeight: 500,
                  wordBreak: 'break-all',
                  '&:hover': { color: theme.vars.palette.accent.main },
                })}
              >
                {value}
              </Link>
            </Box>
          </Stack>
        ))}
      </Stack>
      <Stack spacing={2} sx={{ ...BOX_SX, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Typography sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 500 })}>
          SNS에서도 편하게 만나요
        </Typography>
        <Stack direction="row" spacing={1.5} useFlexGap sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          {SNS_LINKS.map(({ label, href, Icon }) => (
            <IconButton
              key={label}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              sx={{ ...ICON_BOX_SX, width: 56, height: 56, '&:hover': HOVER_ACCENT_SX }}
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
