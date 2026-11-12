import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material';
import BasicInfoCard from './BasicInfoCard.jsx';
import SkillIcon from './SkillIcon.jsx';
import { SKILL_CATEGORIES } from '../data/skillData.js';
import { usePortfolio } from '../context/PortfolioContext.js';

// 홈 탭용 미리보기. 왼쪽에는 프로필 카드, 오른쪽에는 showInHome 섹션의 요약, 아래에는 주요 스킬 아이콘을 보여준다.
// 데이터는 Context에서 받아서, About Me 탭에서 고친 내용이 바로 반영된다.
function AboutPreview() {
  const { getHomeData } = usePortfolio();
  const { content, skills, basicInfo } = getHomeData();
  // 정해 둔 카테고리 순서대로, 스킬이 있는 카테고리만 보여준다.
  const categories = SKILL_CATEGORIES.filter((category) => skills.some((skill) => skill.category === category));

  return (
    <Stack spacing={3} sx={{ mt: 3, textAlign: 'left' }}>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '320px 1fr' } }}>
        {/* About Me 탭과 같은 카드를 써서 두 화면의 프로필이 항상 같게 한다. */}
        <BasicInfoCard info={basicInfo} isStacked />
        {/* 테두리 상자 하나에 섹션들을 모아 한 덩어리로 읽히게 한다. 요약은 3줄까지만 보인다. */}
        <Box sx={{ border: 1, borderColor: 'text.primary', borderRadius: 0, p: { xs: 3, md: 4 } }}>
          <Stack spacing={4} divider={<Divider flexItem />}>
            {content.map((item) => (
              <div key={item.id}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 700, mb: 2 })}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.summary}
                </Typography>
              </div>
            ))}
          </Stack>
        </Box>
      </Box>
      {/* 같은 색(카테고리)끼리 모아 보여준다. 그룹 사이는 간격을 넓게 둔다. */}
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', columnGap: 4, rowGap: 2 }}>
        {categories.map((category) => (
          <Stack key={category} direction="row" spacing={1}>
            {skills
              .filter((skill) => skill.category === category)
              .map((skill) => (
                <Tooltip key={skill.id} title={skill.name} arrow slotProps={{ tooltip: { sx: { borderRadius: 0 } } }}>
                  <Box tabIndex={0} aria-label={skill.name} sx={{ outline: 'none', '&:focus-visible': { outline: 2 } }}>
                    <SkillIcon skill={skill} size={56} />
                  </Box>
                </Tooltip>
              ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default AboutPreview;
