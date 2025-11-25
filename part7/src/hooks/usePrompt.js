import { useEffect } from 'react';
import { useNavigate, UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { useContext } from 'react';

export function usePrompt(message, when) {
  const { navigator } = useContext(NavigationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx) => {
      if (window.confirm(message)) {
        unblock();
        tx.retry();
      }
    });

    return unblock;
  }, [navigator, message, when, navigate]);
}
