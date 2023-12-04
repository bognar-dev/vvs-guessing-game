import React from 'react';

interface LineIconProps {
  line: string;
  key?: number;
}

const LineIcon: React.FC<LineIconProps> = ({ line, key }) => {
  return (
    <span key={key} className={`bg-${line} text-white rounded-full px-1 py-0.5 m-1`}>{line}</span>
  );
};

export default LineIcon;
