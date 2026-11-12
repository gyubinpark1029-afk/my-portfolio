import { Box } from '@mui/material';
import SkillCategoryList from './SkillCategoryList.jsx';
import { usePortfolio } from '../context/PortfolioContext.js';

// 홈 탭용 스킬 목록. Context가 정리해 준 스킬을 카테고리별로 전부 보여준다.
function SkillsPreview() {
  const { getHomeData } = usePortfolio();
  const { skills } = getHomeData();

  return (
    <Box sx={{ mt: 4 }}>
      <SkillCategoryList skills={skills} />
    </Box>
  );
}

export default SkillsPreview;
