import { useEffect, useState } from 'react';
import { introDone, isIntroFinished } from '../lib/intro.js';

// 인트로가 끝났는지 알려 준다. 끝나기 전에는 false여서, 화면 연출을 그 뒤로 미룰 때 쓴다.
export function useIntroDone() {
  const [isDone, setIsDone] = useState(isIntroFinished);

  useEffect(() => {
    let isActive = true;
    introDone.then(() => {
      if (isActive) setIsDone(true);
    });
    return () => {
      isActive = false;
    };
  }, []);

  return isDone;
}
