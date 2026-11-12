import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SkillItemCard from './SkillItemCard.jsx';
import { usePortfolio } from '../context/PortfolioContext.js';

// 홈 탭용 미리보기. Context가 골라 준 상위 스킬을 보여주고, About Me 탭으로 안내한다.
function SkillsPreview() {
  const { getHomeData } = usePortfolio();
  const topSkills = getHomeData().skills;

  return (
    <Box sx={{ mt: 4, textAlign: 'left' }}>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
        {topSkills.map((skill) => (
          <SkillItemCard key={skill.id} skill={skill} />
        ))}
      </Box>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/about"
          sx={{ minHeight: 48, borderRadius: 0, '&:hover': { bgcolor: 'accent.main' } }}
        >
          스킬 전체 보기
        </Button>
      </Box>
    </Box>
  );
}

export default SkillsPreview;
