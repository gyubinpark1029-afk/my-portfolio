const SUMMARY_MAX_LENGTH = 100;

// 긴 글은 앞부분만 잘라 "..."을 붙이고, 짧은 글은 그대로 돌려준다.
export function makeSummary(text) {
  if (text.length <= SUMMARY_MAX_LENGTH) return text;
  return `${text.substring(0, SUMMARY_MAX_LENGTH)}...`;
}
