import React from 'react';

const AnimatedImage = ({ src, alt, animationConfig }) => {
  return (
    <div {...animationConfig}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default AnimatedImage;
