import { useCallback, useState } from 'react';
import { Button, Fade, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import PageContainer from '../components/PageContainer.jsx';
import BasicInfoCard from '../components/BasicInfoCard.jsx';
import AboutSectionAccordion from '../components/AboutSectionAccordion.jsx';
import AboutSkills from '../components/AboutSkills.jsx';
import Reveal from '../components/Reveal.jsx';
import { usePortfolio } from '../context/PortfolioContext.js';

function AboutMe() {
  // 데이터는 Context에 있어서, 여기서 고치면 홈 탭에도 바로 반영된다.
  const { aboutMeData, updateSectionContent } = usePortfolio();
  // 처음에는 첫 번째 섹션을 펼쳐 둔다. 같은 항목을 다시 누르면 닫힌다.
  const [expandedId, setExpandedId] = useState(aboutMeData.sections[0].id);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = useCallback((id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  }, []);

  const handleToggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  return (
    <PageContainer>
      <Reveal>
        <BasicInfoCard info={aboutMeData.basicInfo} />
      </Reveal>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        {/* 안내 문구는 부드럽게 나타나고, 스크린 리더에는 상태 변화로 읽힌다. */}
        <Fade in={isEditing} mountOnEnter unmountOnExit>
          <Typography variant="body2" color="text.secondary" role="status">
            고친 내용은 홈 탭에 바로 반영돼요.
          </Typography>
        </Fade>
        <Button
          variant={isEditing ? 'contained' : 'outlined'}
          aria-pressed={isEditing}
          startIcon={isEditing ? <CheckIcon /> : <EditIcon />}
          onClick={handleToggleEdit}
          sx={{ minHeight: 48, borderRadius: 0, borderColor: 'text.primary', '&:hover': { bgcolor: 'accent.main', color: 'accent.contrastText' } }}
        >
          {isEditing ? '편집 완료' : '내용 편집'}
        </Button>
      </Stack>
      <Reveal>
        <AboutSectionAccordion
          sections={aboutMeData.sections}
          expandedId={expandedId}
          onChange={handleChange}
          isEditing={isEditing}
          onContentChange={updateSectionContent}
        />
      </Reveal>
      <Reveal>
        <AboutSkills />
      </Reveal>
    </PageContainer>
  );
}

export default AboutMe;
