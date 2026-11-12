import { Box } from '@mui/material';
import SkillItemCard from './SkillItemCard.jsx';
import { usePortfolio } from '../context/PortfolioContext.js';

// 홈 탭용 스킬 목록. Context가 정리해 준 스킬을 전부 보여준다.
function SkillsPreview() {
  const { getHomeData } = usePortfolio();
  const { skills } = getHomeData();

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        mt: 4,
        textAlign: 'left',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
      }}
    >
      {skills.map((skill) => (
        <SkillItemCard key={skill.id} skill={skill} />
      ))}
    </Box>
  );
}

export default SkillsPreview;
