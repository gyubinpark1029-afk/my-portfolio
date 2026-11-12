import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SkillItemCard from './SkillItemCard.jsx';
import AddSkillDialog from './AddSkillDialog.jsx';
import { DEFAULT_CATEGORY_COLOR, SKILL_CATEGORIES, SKILL_CATEGORY_COLORS } from '../data/skillData.js';
import { usePortfolio } from '../context/PortfolioContext.js';

// About Me 탭의 스킬 섹션. 카테고리별로 묶어 반응형 그리드(1열 -> 2열 -> 3열)로 보여준다.
function AboutSkills() {
  const { aboutMeData, addSkill } = usePortfolio();
  const skills = aboutMeData.skills;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 정해 둔 순서의 카테고리를 먼저 보여주고, 스킬이 없는 카테고리는 건너뛴다.
  const categories = SKILL_CATEGORIES.filter((category) => skills.some((skill) => skill.category === category));

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
          onClick={() => setIsDialogOpen(true)}
          sx={{ minHeight: 48, borderRadius: 0, '&:hover': { bgcolor: 'accent.main' } }}
        >
          스킬 추가
        </Button>
      </Stack>
      {categories.map((category) => {
        const color = SKILL_CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR;
        return (
          <div key={category}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: 16, height: 16, border: 1, borderColor: 'text.primary', bgcolor: `${color}.main` }} />
              <Typography sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 700, letterSpacing: 2 })}>
                {category}
              </Typography>
            </Stack>
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <SkillItemCard key={skill.id} skill={skill} />
                ))}
            </Box>
          </div>
        );
      })}
      <AddSkillDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onAdd={addSkill} />
    </Stack>
  );
}

export default AboutSkills;
