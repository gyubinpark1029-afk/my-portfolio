// 숙련도(level) 높은 순으로 정렬한 새 배열을 돌려준다. 원본은 바꾸지 않는다.
export function sortByLevel(skills) {
  return [...skills].sort((a, b) => b.level - a.level);
}

// 홈 탭용: 숙련도 높은 순으로 상위 count개를 고른다.
// onlyMain이 true이면 isMain인 스킬만 대상으로 한다.
export function pickTopSkills(skills, count, onlyMain = false) {
  const candidates = onlyMain ? skills.filter((skill) => skill.isMain) : skills;
  return sortByLevel(candidates).slice(0, count);
}
