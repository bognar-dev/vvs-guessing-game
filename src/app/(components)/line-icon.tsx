import React from 'react';

interface LineIconProps {
  line: string;
  key?: number;
}

const LineIcon: React.FC<LineIconProps> = ({ line, key }) => {
  return (
    <span key={key} className={`bg-${line} text-white rounded-full px-2 py-1 m-1`}>{line}</span>
  );
};

export default LineIcon;
