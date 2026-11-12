import { useCallback, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SkillCategoryList from './SkillCategoryList.jsx';
import AddSkillDialog from './AddSkillDialog.jsx';
import { usePortfolio } from '../context/PortfolioContext.js';

// About Me 탭의 스킬 섹션. 제목, 스킬 추가 버튼, 카테고리별 목록으로 이루어진다.
function AboutSkills() {
  const { aboutMeData, addSkill } = usePortfolio();
  const skills = aboutMeData.skills;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = useCallback(() => setIsDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setIsDialogOpen(false), []);

  return (
    <Stack spacing={4} sx={{ mt: 3, textAlign: 'left' }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          component="h2"
          sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 700 })}
        >
          Skills
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ minHeight: 48, borderRadius: 0, '&:hover': { bgcolor: 'accent.main' } }}
        >
          스킬 추가
        </Button>
      </Stack>
      <SkillCategoryList skills={skills} />
      <AddSkillDialog isOpen={isDialogOpen} onClose={handleCloseDialog} onAdd={addSkill} />
    </Stack>
  );
}

export default AboutSkills;
