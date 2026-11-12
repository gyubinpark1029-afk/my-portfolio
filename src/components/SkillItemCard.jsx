import { memo } from 'react';
import { Stack, Tooltip, Typography } from '@mui/material';
import SkillIcon from './SkillIcon.jsx';

// 아이콘과 이름. 마우스를 올리거나 키보드로 포커스하면 설명 툴팁이 뜬다.
function SkillItemCard({ skill }) {
  return (
    <Tooltip
      title={skill.description}
      arrow
      placement="top"
      slotProps={{ tooltip: { sx: { borderRadius: 0 } } }}
    >
      <Stack
        direction="row"
        tabIndex={0}
        spacing={2}
        sx={{
          alignItems: 'center',
          p: 3,
          border: 1,
          borderColor: 'text.primary',
          bgcolor: 'background.paper',
          transition: 'border-color 0.2s',
          '&:hover': { borderColor: 'accent.main' },
          // 키보드로 이동할 때 어디에 있는지 보이도록 파란 윤곽선을 그린다.
          outline: 'none',
          '&:focus-visible': { borderColor: 'accent.main', outline: '2px solid', outlineColor: 'accent.main', outlineOffset: 2 },
        }}
      >
        <SkillIcon skill={skill} />
        <Typography sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 700 })}>
          {skill.name}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

export default memo(SkillItemCard);
