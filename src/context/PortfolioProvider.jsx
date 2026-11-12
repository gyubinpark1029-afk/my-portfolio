import { useCallback, useMemo, useState } from 'react';
import { PortfolioContext } from './PortfolioContext.js';
import { aboutMeData as initialAboutMeData } from '../data/aboutMeData.js';
import { skillsData } from '../data/skillData.js';
import { makeSummary } from '../utils/makeSummary.js';
import { sortByLevel } from '../utils/skillUtils.js';

function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState({ ...initialAboutMeData, skills: skillsData });

  // 섹션 내용을 고친다. 홈 탭은 같은 데이터에서 만들어지므로 바로 반영된다.
  const updateSectionContent = useCallback((id, content) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === id ? { ...section, content } : section)),
    }));
  }, []);

  const addSkill = useCallback((newSkill) => {
    setAboutMeData((prev) => {
      const nextId = Math.max(0, ...prev.skills.map((skill) => skill.id)) + 1;
      return { ...prev, skills: [...prev.skills, { ...newSkill, id: nextId, icon: 'code', isMain: false }] };
    });
  }, []);

  // 홈 탭용 데이터. aboutMeData가 바뀔 때만 새로 만들어서 불필요한 리렌더링을 막는다.
  const homeData = useMemo(
    () => ({
      content: aboutMeData.sections
        .filter((section) => section.showInHome)
        .map(({ id, title, content }) => ({ id, title, summary: makeSummary(content) })),
      // 스킬은 전부 보여주되, 숙련도 높은 순으로 놓는다.
      skills: sortByLevel(aboutMeData.skills),
      basicInfo: aboutMeData.basicInfo,
    }),
    [aboutMeData],
  );

  const getHomeData = useCallback(() => homeData, [homeData]);

  const value = useMemo(
    () => ({ aboutMeData, setAboutMeData, updateSectionContent, addSkill, getHomeData }),
    [aboutMeData, updateSectionContent, addSkill, getHomeData],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export default PortfolioProvider;
