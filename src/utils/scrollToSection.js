// id가 있는 섹션으로 스크롤한다.
// HashRouter가 주소의 #을 쓰고 있어서 #링크 대신 스크롤 함수를 쓴다.
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  // 움직임을 줄이도록 설정한 사용자에게는 부드러운 스크롤 없이 바로 이동한다.
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth', block: 'start' });
}
