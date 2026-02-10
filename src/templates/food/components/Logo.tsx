import React from 'react';
import { CATEGORY_THEMES } from '../theme';

export const Logo: React.FC<{ className?: string; category?: '뷰티' | '푸드' }> = ({
  className = "",
  category = '푸드',
}) => {
  const theme = CATEGORY_THEMES[category];
  return (
    <div className={`select-none ${className}`}>
      <svg width="260" height="50" viewBox="0 0 260 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text
          x="0"
          y="38"
          fill={theme.logoColor}
          fontFamily="'Caviar Dreams', sans-serif"
          fontSize="44"
          fontWeight="400"
          letterSpacing="-1px"
        >
          {theme.logoText}
        </text>
      </svg>
    </div>
  );
};
