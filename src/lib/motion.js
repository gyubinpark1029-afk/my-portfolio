import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

// 플러그인은 앱 전체에서 한 번만 등록한다.
gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

// 움직임을 줄이도록 설정한 사람에게는 모든 효과를 건너뛰고 완성된 화면을 바로 보여준다.
export function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// 마우스가 없는 터치 기기인지 (커서 효과를 끄는 데 쓴다)
export function isTouchDevice() {
  return window.matchMedia('(hover: none)').matches;
}

// 레퍼런스 사이트(itddaa.com)와 같은 공통 값: 아래에서 60px 올라오며 0.8초 동안 나타난다.
export const FADE_UP = { opacity: 0, y: 60, duration: 0.8 };

// 화면 아래쪽에서 요소가 보이기 시작하면 재생하고, 다시 위로 올리면 거꾸로 재생한다.
export function getScrollTrigger(trigger) {
  return {
    trigger,
    start: isTouchDevice() ? 'top 95%' : 'top 90%',
    toggleActions: 'play none none reverse',
  };
}

// 글자가 섞였다가 제자리를 찾는 타이핑 효과에 쓰는 문자들
export const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// 글자 수에 비례하되 너무 길거나 짧지 않게 타이핑 시간을 정한다.
export function getTypingSeconds(text) {
  return Math.min(Math.max(text.length * 0.06, 0.8), 2.2);
}

// 이미지·데이터가 늦게 불러와져 페이지 높이가 바뀌면 스크롤 위치 계산을 새로 한다.
let refreshTimer = null;
if (typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(() => {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
  }).observe(document.body);
}

export { gsap, ScrollTrigger };
