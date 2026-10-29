import PageContainer from '../components/PageContainer.jsx';
import SectionCard from '../components/SectionCard.jsx';

function AboutMe() {
  return (
    <PageContainer>
      <SectionCard
        title="About Me"
        description="About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다."
        color="secondary"
      />
    </PageContainer>
  );
}

export default AboutMe;
