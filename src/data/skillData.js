// 주력 기술. 숙련도는 점수 대신 "프로젝트를 진행하는 데 어려움이 없는 정도"라는 한 가지 기준으로 말한다.
export const SKILL_LEVEL_TEXT = '프로젝트를 진행하는 데 어려움이 없어요';

export const skillGroups = [
  {
    category: 'Design',
    skills: [
      { id: 'figma', name: 'Figma' },
      { id: 'photoshop', name: 'Photoshop' },
      { id: 'illustration', name: 'Illustration' },
    ],
  },
  {
    category: 'Code',
    skills: [
      { id: 'html', name: 'HTML' },
      { id: 'css', name: 'CSS' },
    ],
  },
];

// About Me 탭의 스킬 섹션용 데이터.
// level은 0~100 숙련도, isMain은 홈 탭에 보여줄 대표 스킬인지 여부다.
// level 값은 예시이니 실제 실력에 맞게 고쳐서 쓴다.
export const skillsData = [
  { id: 1, icon: 'html', name: 'HTML', category: 'Frontend', level: 85, isMain: true, description: '웹 페이지의 뼈대를 만드는 마크업 언어예요.' },
  { id: 2, icon: 'css', name: 'CSS', category: 'Frontend', level: 80, isMain: true, description: '색, 배치, 간격으로 화면을 꾸미는 스타일 언어예요.' },
  { id: 3, icon: 'javascript', name: 'JavaScript', category: 'Frontend', level: 65, isMain: false, description: '화면이 움직이고 반응하게 만드는 프로그래밍 언어예요.' },
  { id: 4, icon: 'react', name: 'React', category: 'Framework', level: 60, isMain: true, description: '화면을 작은 조각(컴포넌트)으로 나눠 만드는 라이브러리예요.' },
  { id: 5, icon: 'figma', name: 'Figma', category: 'Design', level: 75, isMain: true, description: '화면 디자인과 프로토타입을 만드는 디자인 도구예요.' },
  { id: 6, icon: 'photoshop', name: 'Photoshop', category: 'Design', level: 70, isMain: false, description: '사진을 편집하고 이미지를 만드는 도구예요.' },
  { id: 7, icon: 'illustration', name: 'Illustration', category: 'Design', level: 60, isMain: false, description: '벡터 그림과 로고를 그리는 도구예요.' },
];

// 카테고리 표시 순서와 색. 색은 테마의 파스텔 이름이다.
export const SKILL_CATEGORIES = ['Frontend', 'Framework', 'Design'];
export const SKILL_CATEGORY_COLORS = { Frontend: 'secondary', Framework: 'purple', Design: 'info' };
// 목록에 없는 새 카테고리에 쓰는 색
export const DEFAULT_CATEGORY_COLOR = 'warning';
