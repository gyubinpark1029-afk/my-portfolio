import { useCallback, useEffect, useMemo, useState } from 'react';
import { PortfolioContext } from './PortfolioContext.js';
import { aboutMeData as initialAboutMeData } from '../data/aboutMeData.js';
import { skillsData } from '../data/skillData.js';
import { makeSummary } from '../utils/makeSummary.js';
import { loadPortfolioData, savePortfolioData } from '../utils/portfolioStorage.js';
import { sortByLevel } from '../utils/skillUtils.js';

const DEFAULT_DATA = { ...initialAboutMeData, skills: skillsData };

function PortfolioProvider({ children }) {
  // 처음 한 번만 브라우저에 저장된 내용을 불러온다.
  const [aboutMeData, setAboutMeData] = useState(() => loadPortfolioData(DEFAULT_DATA));

  // 데이터가 바뀔 때마다 브라우저에 저장해서, 새로고침해도 고친 내용이 남게 한다.
  useEffect(() => {
    savePortfolioData(aboutMeData, DEFAULT_DATA);
  }, [aboutMeData]);

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

  // 홈 탭용 데이터. 항목마다 따로 캐싱해서, 글을 고쳐도 스킬 목록은 다시 계산하지 않고 같은 배열을 그대로 쓴다.
  const homeContent = useMemo(
    () => aboutMeData.sections
      .filter((section) => section.showInHome)
      .map(({ id, title, content }) => ({ id, title, summary: makeSummary(content) })),
    [aboutMeData.sections],
  );
  // 스킬은 전부 보여주되, 숙련도 높은 순으로 놓는다.
  const homeSkills = useMemo(() => sortByLevel(aboutMeData.skills), [aboutMeData.skills]);

  const homeData = useMemo(
    () => ({ content: homeContent, skills: homeSkills, basicInfo: aboutMeData.basicInfo }),
    [homeContent, homeSkills, aboutMeData.basicInfo],
  );

  const getHomeData = useCallback(() => homeData, [homeData]);

  const value = useMemo(
    () => ({ aboutMeData, setAboutMeData, updateSectionContent, addSkill, getHomeData }),
    [aboutMeData, updateSectionContent, addSkill, getHomeData],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export default PortfolioProvider;
