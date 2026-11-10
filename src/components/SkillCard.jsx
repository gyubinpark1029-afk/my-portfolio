import { Box, Typography } from '@mui/material';
import HtmlIcon from '@mui/icons-material/Html';
import CssIcon from '@mui/icons-material/Css';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ImageIcon from '@mui/icons-material/Image';
import DrawIcon from '@mui/icons-material/Draw';
import { SKILL_LEVEL_TEXT } from '../data/skillData.js';

const ICONS = {
  figma: DesignServicesIcon,
  photoshop: ImageIcon,
  illustration: DrawIcon,
  html: HtmlIcon,
  css: CssIcon,
};

// 앞면에는 기술 이름, 뒷면에는 숙련도 기준이 있다. 마우스를 올리거나 눌러서(키보드 포커스 포함) 뒤집는다.
const faceSx = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  p: 2,
  borderRadius: 1,
  backfaceVisibility: 'hidden',
};

function SkillCard({ skill }) {
  const Icon = ICONS[skill.id];

  return (
    <Box
      tabIndex={0}
      sx={{
        width: { xs: 144, sm: 168 },
        height: 168,
        perspective: '800px',
        outline: 'none',
        '&:hover .inner, &:focus-visible .inner': { transform: 'rotateY(180deg)' },
      }}
    >
      <Box
        className="inner"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      >
        <Box sx={{ ...faceSx, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
          <Icon sx={{ fontSize: 48, color: 'accent.main' }} />
          <Typography sx={{ fontWeight: 700 }}>{skill.name}</Typography>
        </Box>
        <Box
          sx={{
            ...faceSx,
            bgcolor: 'accent.main',
            color: 'accent.contrastText',
            transform: 'rotateY(180deg)',
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>{skill.name}</Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {SKILL_LEVEL_TEXT}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SkillCard;
