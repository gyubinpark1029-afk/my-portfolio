import { memo } from 'react';
import { Box } from '@mui/material';
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

// 카테고리 색 네모 칸 안의 스킬 아이콘. 카드와 홈 미리보기가 함께 쓴다.
function SkillIcon({ skill, size = 48 }) {
  const Icon = ICONS[skill.icon] ?? CodeIcon;
  const color = SKILL_CATEGORY_COLORS[skill.category] ?? DEFAULT_CATEGORY_COLOR;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: size,
        height: size,
        border: 1,
        borderColor: 'text.primary',
        bgcolor: `${color}.main`,
        color: `${color}.contrastText`,
      }}
    >
      <Icon />
    </Box>
  );
}

export default memo(SkillIcon);
