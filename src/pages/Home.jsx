import PageContainer from '../components/PageContainer.jsx';
import SectionCard from '../components/SectionCard.jsx';
import ContactInfo from '../components/ContactInfo.jsx';
import Guestbook from '../components/Guestbook.jsx';
import ProjectsPreview from '../components/ProjectsPreview.jsx';
import AboutPreview from '../components/AboutPreview.jsx';
import HeroSection from '../components/HeroSection.jsx';
import SkillSection from '../components/SkillSection.jsx';
const SECTIONS = [
  {
    title: 'About Me',
    description: '안녕하세요, 박규빈입니다.',
    to: '/about',
    children: <AboutPreview />,
  },
  {
    title: 'Skill Tree',
    description: '주로 다루는 기술이에요. 카드에 마우스를 올려 보세요.',
    children: <SkillSection />,
  },
  {
    title: 'Projects',
    description: '직접 만들고 배포한 프로젝트들이에요.',
    children: <ProjectsPreview />,
  },
  {
    title: 'Contact',
    description: '여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.',
    // 메시지 폼 자리에 방명록을 둔다.
    children: (
      <>
        <ContactInfo />
        <Guestbook />
      </>
    ),
  },
];

function Home() {
  return (
    <PageContainer>
      <HeroSection />
      {SECTIONS.map((section, index) => (
        <SectionCard key={section.title} number={index + 1} {...section} />
      ))}
    </PageContainer>
  );
}

export default Home;
