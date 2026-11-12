import { Box, Divider, Stack, Typography } from '@mui/material';
import BasicInfoCard from './BasicInfoCard.jsx';
import { aboutMeData } from '../data/aboutMeData.js';

// 홈 탭용 미리보기. 프로필 카드와, showInHome이 true인 섹션만 보여준다.
function AboutPreview() {
  const homeSections = aboutMeData.sections.filter((section) => section.showInHome);

  return (
    <Stack spacing={3} sx={{ mt: 3, textAlign: 'left' }}>
      {/* About Me 탭과 같은 카드를 써서 두 화면의 프로필이 항상 같게 한다. */}
      <BasicInfoCard info={aboutMeData.basicInfo} />
      {/* 테두리 상자 하나에 섹션들을 모아 한 덩어리로 읽히게 한다. */}
      <Box sx={{ border: 1, borderColor: 'text.primary', borderRadius: 0, p: { xs: 3, md: 4 } }}>
        <Stack spacing={4} divider={<Divider flexItem />}>
          {homeSections.map((section) => (
            <div key={section.id}>
              <Typography
                variant="h6"
                component="h3"
                sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 700, mb: 2 })}
              >
                {section.title}
              </Typography>
              <Typography sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                {section.content}
              </Typography>
            </div>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

export default AboutPreview;
