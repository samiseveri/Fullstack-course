import { useCallback } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';

export const usePrompt = (message, when = true) => {
  const blocker = useBlocker(when);

  const handleBlocker = useCallback(() => {
    if (!blocker.state) return;
    const allowTransition = window.confirm(message);
    if (allowTransition) {
      blocker.proceed();
    } else {
      blocker.reset();
    }
  }, [blocker, message]);

  if (when) handleBlocker();
};
