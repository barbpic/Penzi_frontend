import React, { useEffect } from 'react';


const HeartBackground = () => {
  useEffect(() => {
    const createHearts = () => {
      const heartsContainer = document.querySelector('.hearts-container');
      if (!heartsContainer) return;

      const numHearts = 100;
      
      for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random position
        const left = Math.random() * 100;
        const size = Math.random() * 10 + 10;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 2;
        
        heart.style.left = `${left}%`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        heartsContainer.appendChild(heart);
      }
    };

    createHearts();

    return () => {
      const heartsContainer = document.querySelector('.hearts-container');
      if (heartsContainer) {
        heartsContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="hearts-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1
    }}></div>
  );
};

export default HeartBackground;