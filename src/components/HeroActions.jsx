import { Button, IconButton, Stack } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import { CONTACT_EMAIL, GITHUB_URL } from '../data/profileLinks.js';
import { scrollToSection } from '../utils/scrollToSection.js';

// 화살표가 아래로 톡톡 가리키는 움직임: "아래에 프로젝트가 있어요"를 몸짓으로 알려 준다.
const nudge = keyframes`
  0%, 100% { transform: translateY(-2px); }
  50% { transform: translateY(3px); }
`;

// 소셜 링크. 이메일은 새 탭 없이 메일 앱이 열리고, GitHub은 새 탭에서 열린다.
const SOCIAL_LINKS = [
  { label: 'GitHub 열기', href: GITHUB_URL, Icon: GitHubIcon, isExternal: true },
  { label: '이메일 보내기', href: `mailto:${CONTACT_EMAIL}`, Icon: EmailIcon, isExternal: false },
];

// Hero의 다음 행동 안내: 프로젝트 보기(주요) > 연락하기(보조) > 소셜 링크
function HeroActions() {
  return (
    <Stack
      direction="row"
      spacing={2}
      useFlexGap
      sx={{ alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap', mt: 4 }}
    >
      {/* 주요 버튼: 가장 크고, 파란 바탕에 딱딱한 그림자를 둔다. 누르면 그림자 쪽으로 눌리고 검정으로 바뀐다. */}
      <Button
        variant="contained"
        size="large"
        onClick={() => scrollToSection('projects')}
        endIcon={
          <ArrowDownwardIcon
            sx={{ animation: `${nudge} 1.6s ease-in-out infinite`, '@media (prefers-reduced-motion: reduce)': { animation: 'none' } }}
          />
        }
        sx={(theme) => ({
          minHeight: 56,
          px: 4,
          borderRadius: 0,
          fontSize: '1rem',
          fontWeight: 700,
          bgcolor: 'accent.main',
          color: 'accent.contrastText',
          boxShadow: `4px 4px 0 ${theme.vars.palette.text.primary}`,
          transition: 'transform 0.15s, box-shadow 0.15s, background-color 0.15s',
          '&:hover': {
            bgcolor: 'text.primary',
            transform: 'translate(2px, 2px)',
            boxShadow: `2px 2px 0 ${theme.vars.palette.accent.main}`,
          },
        })}
      >
        프로젝트 보기
      </Button>
      {/* 보조 버튼: 테두리만 있어서 주요 버튼보다 조용하지만 같은 줄에서 바로 눌 수 있다. */}
      <Button
        variant="outlined"
        onClick={() => scrollToSection('contact')}
        sx={{ minHeight: 48, px: 3, borderRadius: 0, borderColor: 'text.primary', '&:hover': { borderColor: 'accent.main', color: 'accent.main' } }}
      >
        연락하기
      </Button>
      {SOCIAL_LINKS.map(({ label, href, Icon, isExternal }) => (
        <IconButton
          key={label}
          component="a"
          href={href}
          {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
          aria-label={isExternal ? `${label} (새 탭)` : label}
          sx={{
            width: 48,
            height: 48,
            border: 1,
            borderColor: 'text.primary',
            borderRadius: 0,
            color: 'text.primary',
            transition: 'transform 0.2s, background-color 0.2s, color 0.2s',
            '&:hover': { bgcolor: 'accent.main', borderColor: 'accent.main', color: 'accent.contrastText', transform: 'translateY(-3px)' },
          }}
        >
          <Icon />
        </IconButton>
      ))}
    </Stack>
  );
}

export default HeroActions;
