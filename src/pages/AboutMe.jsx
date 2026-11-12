import { useState } from 'react';
import PageContainer from '../components/PageContainer.jsx';
import BasicInfoCard from '../components/BasicInfoCard.jsx';
import AboutSectionAccordion from '../components/AboutSectionAccordion.jsx';
import AboutSkills from '../components/AboutSkills.jsx';
import { aboutMeData } from '../data/aboutMeData.js';

function AboutMe() {
  // 데이터는 state로 두어, 나중에 수정 기능을 붙여도 화면이 바로 바뀌게 한다.
  const [data] = useState(aboutMeData);
  // 처음에는 첫 번째 섹션을 펼쳐 둔다. 같은 항목을 다시 누르면 닫힌다.
  const [expandedId, setExpandedId] = useState(data.sections[0].id);

  const handleChange = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <PageContainer>
      <BasicInfoCard info={data.basicInfo} />
      <AboutSectionAccordion
        sections={data.sections}
        expandedId={expandedId}
        onChange={handleChange}
      />
      <AboutSkills />
    </PageContainer>
  );
}

export default AboutMe;
