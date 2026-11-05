import PageContainer from '../components/PageContainer.jsx';
import SectionCard from '../components/SectionCard.jsx';
import ContactInfo from '../components/ContactInfo.jsx';
import Guestbook from '../components/Guestbook.jsx';
import ProjectsPreview from '../components/ProjectsPreview.jsx';

const SECTIONS = [
  {
    title: 'Hero',
    description: '여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.',
    color: 'primary',
  },
  {
    title: 'About Me',
    description: "여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.",
    color: 'secondary',
  },
  {
    title: 'Skill Tree',
    description: '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
    color: 'purple',
  },
  {
    title: 'Projects',
    description: '직접 만들고 배포한 프로젝트들이에요.',
    color: 'info',
    children: <ProjectsPreview />,
  },
  {
    title: 'Contact',
    description: '여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.',
    color: 'warning',
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
      {SECTIONS.map((section) => (
        <SectionCard key={section.title} {...section} />
      ))}
    </PageContainer>
  );
}

export default Home;
