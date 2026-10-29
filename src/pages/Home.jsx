import PageContainer from '../components/PageContainer.jsx';
import SectionCard from '../components/SectionCard.jsx';
import ContactInfo from '../components/ContactInfo.jsx';
import Guestbook from '../components/Guestbook.jsx';
import HeroSection from '../components/HeroSection.jsx';

const SECTIONS = [
  {
    title: 'About Me',
    description: "여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.",
  },
  {
    title: 'Skill Tree',
    description: '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
    color: 'primary',
  },
  {
    title: 'Projects',
    description: "여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.",
  },
  {
    title: 'Contact',
    description: '궁금한 점이 있다면 편하게 연락 주세요. 반갑게 답장할게요!',
    color: 'warning',
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
      {SECTIONS.map((section) => (
        <SectionCard key={section.title} {...section} />
      ))}
    </PageContainer>
  );
}

export default Home;
