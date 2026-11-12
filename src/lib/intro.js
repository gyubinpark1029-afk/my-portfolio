import { isReducedMotion } from './motion.js';

// 인트로는 "홈 화면으로 들어온 경우"에 보여준다. 새로고침하면 매번 다시 보인다.
// 페이지가 불려올 때 한 번만 정하므로, 사이트 안에서 메뉴로 홈에 돌아올 때는 다시 보이지 않는다.
const isHomeUrl = ['', '#', '#/'].includes(window.location.hash);
export const WILL_PLAY_INTRO = isHomeUrl && !isReducedMotion();

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
  resolveIntro();
}
