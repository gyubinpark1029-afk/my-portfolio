import { Box, Stack, Tooltip, Typography } from '@mui/material';
import HtmlIcon from '@mui/icons-material/Html';
import CssIcon from '@mui/icons-material/Css';
import JavascriptIcon from '@mui/icons-material/Javascript';
import ScienceIcon from '@mui/icons-material/Science';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ImageIcon from '@mui/icons-material/Image';
import DrawIcon from '@mui/icons-material/Draw';
import CodeIcon from '@mui/icons-material/Code';
import { DEFAULT_CATEGORY_COLOR, SKILL_CATEGORY_COLORS } from '../data/skillData.js';

const ICONS = {
  html: HtmlIcon,
  css: CssIcon,
  javascript: JavascriptIcon,
  react: ScienceIcon,
  figma: DesignServicesIcon,
  photoshop: ImageIcon,
  illustration: DrawIcon,
};

// 아이콘과 이름. 마우스를 올리거나 키보드로 포커스하면 설명 툴팁이 뜬다.
function SkillItemCard({ skill }) {
  const Icon = ICONS[skill.icon] ?? CodeIcon;
  const color = SKILL_CATEGORY_COLORS[skill.category] ?? DEFAULT_CATEGORY_COLOR;

  return (
    <Tooltip
      title={skill.description}
      arrow
      placement="top"
      slotProps={{ tooltip: { sx: { borderRadius: 0 } } }}
    >
      <Stack
        tabIndex={0}
        spacing={2}
        sx={{
          p: 3,
          border: 1,
          borderColor: 'text.primary',
          bgcolor: 'background.paper',
          transition: 'border-color 0.2s',
          '&:hover, &:focus-visible': { borderColor: 'accent.main' },
          outline: 'none',
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              border: 1,
              borderColor: 'text.primary',
              bgcolor: `${color}.main`,
              color: `${color}.contrastText`,
            }}
          >
            <Icon />
          </Box>
          <Typography sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 700, flexGrow: 1 })}>
            {skill.name}
          </Typography>
        </Stack>
      </Stack>
    </Tooltip>
  );
}

export default SkillItemCard;
