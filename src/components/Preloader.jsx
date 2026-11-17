import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setHidden(true), 800);
    const timer2 = setTimeout(() => setRemoved(true), 1300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (removed) return null;

  return (
    <div id="preloader" className={hidden ? 'hidden' : ''}>
      <div className="loader">
        <img src="assets/images/logo.png" alt="RestroMind" className="loader-logo-img" />
        <div className="loader-text">RestroMind</div>
        <div className="loader-bar">
          <div className="loader-bar-inner"></div>
        </div>
      </div>
    </div>
  );
}
