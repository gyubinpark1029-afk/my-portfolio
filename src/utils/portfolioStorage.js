import { SKILL_CATEGORIES } from '../data/skillData.js';

// 바뀌면 옛 저장 내용을 못 읽으므로, 저장 형식을 바꿀 때만 숫자를 올린다.
const STORAGE_KEY = 'portfolio-data-v1';

// 저장소를 못 쓰는 환경(사생활 보호 모드 등)에서도 화면은 정상으로 보여야 해서, 모든 접근을 try/catch로 감싼다.
function readSaved() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// 직접 고쳐진 저장값이 화면을 망가뜨리지 않도록 모양을 확인한다.
function isValidSkill(skill) {
  return (
    skill !== null &&
    typeof skill === 'object' &&
    typeof skill.id === 'number' &&
    typeof skill.name === 'string' &&
    skill.name.length > 0 &&
    SKILL_CATEGORIES.includes(skill.category)
  );
}

// 기본 데이터 위에 저장해 둔 내용(고친 섹션 글, 추가한 스킬)을 덧씌워 돌려준다.
// 사진은 빌드할 때마다 주소가 바뀌어서 저장하지 않고, 항상 기본값을 쓴다.
export function loadPortfolioData(defaults) {
  const saved = readSaved();
  if (!saved) return defaults;

  const contents = saved.contents && typeof saved.contents === 'object' ? saved.contents : {};
  const extraSkills = Array.isArray(saved.extraSkills) ? saved.extraSkills.filter(isValidSkill) : [];

  return {
    ...defaults,
    sections: defaults.sections.map((section) =>
      typeof contents[section.id] === 'string' ? { ...section, content: contents[section.id] } : section,
    ),
    skills: [
      ...defaults.skills,
      ...extraSkills.filter((skill) => !defaults.skills.some((base) => base.id === skill.id)),
    ],
  };
}

// 기본값과 다른 부분만 저장한다. 그래서 기본 스킬 설명 등을 나중에 코드에서 고쳐도 그대로 반영된다.
export function savePortfolioData(data, defaults) {
  const contents = Object.fromEntries(data.sections.map((section) => [section.id, section.content]));
  const extraSkills = data.skills.filter((skill) => !defaults.skills.some((base) => base.id === skill.id));
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ contents, extraSkills }));
  } catch {
    // 저장 공간이 없거나 막혀 있어도 화면은 계속 쓸 수 있다.
  }
}
