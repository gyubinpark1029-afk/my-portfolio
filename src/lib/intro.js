import { isReducedMotion } from './motion.js';

const STORAGE_KEY = 'portfolio-intro-seen';

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

// 인트로는 "처음 접속했을 때, 홈 화면으로 들어온 경우"에만 한 번 보여준다. (레퍼런스 사이트와 같은 방식)
// 페이지가 처음 불려올 때 한 번만 정하고, 이후에는 바뀌지 않는다.
const isHomeUrl = ['', '#', '#/'].includes(window.location.hash);
export const WILL_PLAY_INTRO = isHomeUrl && !hasSeenIntro() && !isReducedMotion();

let isFinished = !WILL_PLAY_INTRO;
let resolveIntro = () => {};

// Hero 애니메이션은 이 약속이 지켜진 뒤(인트로가 끝난 뒤)에 시작한다.
export const introDone = isFinished
  ? Promise.resolve()
  : new Promise((resolve) => {
      resolveIntro = resolve;
    });

export function isIntroFinished() {
  return isFinished;
}

export function finishIntro() {
  isFinished = true;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // 저장소를 못 써도 인트로만 다시 보일 뿐 문제는 없다.
  }
  resolveIntro();
}
