import React from 'react';

interface SubtitleProps {
    subtitle: string;
  }

  const Subtitle: React.FC<SubtitleProps> = ({ subtitle }) =>  {
    return <h3 className='section__subtitle'>{subtitle}</h3>;
  }
export default Subtitle;
