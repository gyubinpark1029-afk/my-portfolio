import { keyframes } from '@emotion/react';
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

// 바가 왼쪽에서 오른쪽으로 차오르게 한다. 최종 너비는 sx의 width가 정한다.
const fill = keyframes`
  from { width: 0; }
`;

// 아이콘, 이름, 숙련도 바. 마우스를 올리거나 키보드로 포커스하면 설명 툴팁이 뜬다.
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
          <Typography variant="body2">{skill.level}%</Typography>
        </Stack>
        <Box
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} 숙련도`}
          sx={{ height: 12, border: 1, borderColor: 'text.primary' }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${skill.level}%`,
              bgcolor: `${color}.main`,
              animation: `${fill} 1s ease-out`,
              // 움직임을 줄이도록 설정한 사용자에게는 애니메이션을 끈다.
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          />
        </Box>
      </Stack>
    </Tooltip>
  );
}

export default SkillItemCard;
