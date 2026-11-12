import { createContext, useContext } from 'react';

// About Me 탭과 홈 탭이 같은 데이터를 보도록 묶어 주는 Context.
export const PortfolioContext = createContext(null);

// Provider 밖에서 쓰면 바로 알 수 있게 오류를 던진다.
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio는 PortfolioProvider 안에서만 쓸 수 있어요.');
  return context;
}
