import { Button, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GITHUB_URL } from '../data/profileLinks.js';
import { scrollToSection } from '../utils/scrollToSection.js';

const BUTTON_SX = { minHeight: 48, px: 3, borderRadius: 0 };

// Hero의 다음 행동 안내: 프로젝트 보기(주요), 연락하기(보조), GitHub 바로가기
function HeroActions() {
  return (
    <Stack direction="row" spacing={2} useFlexGap sx={{ justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
      <Button
        variant="contained"
        onClick={() => scrollToSection('projects')}
        sx={{ ...BUTTON_SX, '&:hover': { bgcolor: 'accent.main' } }}
      >
        프로젝트 보기
      </Button>
      <Button
        variant="outlined"
        onClick={() => scrollToSection('contact')}
        sx={{ ...BUTTON_SX, borderColor: 'text.primary', '&:hover': { borderColor: 'accent.main', color: 'accent.main' } }}
      >
        연락하기
      </Button>
      <IconButton
        component="a"
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub 열기"
        sx={{
          width: 48,
          height: 48,
          border: 1,
          borderColor: 'text.primary',
          borderRadius: 0,
          color: 'text.primary',
          '&:hover': { bgcolor: 'accent.main', borderColor: 'accent.main', color: 'accent.contrastText' },
        }}
      >
        <GitHubIcon />
      </IconButton>
    </Stack>
  );
}

export default HeroActions;
