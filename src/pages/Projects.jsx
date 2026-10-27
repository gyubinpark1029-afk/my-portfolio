import PageContainer from '../components/PageContainer.jsx';
import SectionCard from '../components/SectionCard.jsx';

function Projects() {
  return (
    <PageContainer>
      <SectionCard
        title="Projects"
        description="Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다."
        bgColor="var(--color-pastel-pink)"
        isPastel
      />
    </PageContainer>
  );
}

export default Projects;
