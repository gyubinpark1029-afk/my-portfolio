import { memo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import SkillItemCard from './SkillItemCard.jsx';
import { DEFAULT_CATEGORY_COLOR, SKILL_CATEGORIES, SKILL_CATEGORY_COLORS } from '../data/skillData.js';

// 스킬을 카테고리별로 묶어 반응형 그리드(1열 -> 2열 -> 3열)로 보여준다.
// About Me 탭과 홈 탭이 같은 모양으로 보이도록 함께 쓴다.
function SkillCategoryList({ skills }) {
  // 정해 둔 순서의 카테고리를 먼저 보여주고, 스킬이 없는 카테고리는 건너뛴다.
  const categories = SKILL_CATEGORIES.filter((category) => skills.some((skill) => skill.category === category));

  return (
    <Stack spacing={4} sx={{ textAlign: 'left' }}>
      {categories.map((category) => {
        const color = SKILL_CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR;
        return (
          <section key={category} aria-label={`${category} 스킬`}>
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
          </section>
        );
      })}
    </Stack>
  );
}

export default memo(SkillCategoryList);
