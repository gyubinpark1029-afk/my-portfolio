import catProfile from '../assets/catProfile.svg';

// About Me 탭의 내용. showInHome이 true인 섹션은 나중에 홈 탭에서도 보여줄 수 있다.
// photo는 프로젝트 안에 넣어 둔 고양이 캐릭터 그림이다. 외부 주소를 쓰지 않아 항상 같은 모습이다.
export const aboutMeData = {
  basicInfo: {
    name: '박규빈',
    education: '부산가톨릭대학교',
    major: '환경공학과',
    experience: '신입',
    photo: catProfile,
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content:
        '디자인을 공부했고, 코드를 배우면서 디자인과 코드를 결합한 업무를 하게 되었어요. 그 과정에서 코드에 대해 더 깊이 알고 싶어졌습니다.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content: '효율적이고 재사용이 가능한 코드를 짜는 것을 가장 중요하게 생각해요.',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content:
        '취미와 관심사가 다양해요. 러닝을 꾸준히 하고, 책 읽는 것도 좋아합니다.',
      showInHome: false,
    },
  ],
};
