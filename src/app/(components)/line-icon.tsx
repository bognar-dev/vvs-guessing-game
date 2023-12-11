import React from 'react';

interface LineIconProps {
  line: string;
  i: number;
}

const LineIcon: React.FC<LineIconProps> = ({ line, i }) => {
  if(line==="S11"){
    return (
      <span key={i} className={`bg-S1 text-white rounded-full px-1 py-0.5 m-1`}>{line}</span>
    );
  }
  return (
    <span key={i} className={`bg-${line} text-white rounded-full px-1 py-0.5 m-1`}>{line}</span>
  );
};

export default LineIcon;
