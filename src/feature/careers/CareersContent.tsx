'use client';

import { useState, useRef } from 'react';

import { CareersHeroSection } from './CareersHeroSection';
import { JobListSection } from './JobListSection';
import { ApplicationFormSection } from './ApplicationFormSection';

export function CareersContent() {
  const [selectedPosition, setSelectedPosition] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const handleSelectPosition = (positionId: string) => {
    setSelectedPosition(positionId);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-screen">
      <CareersHeroSection />
      <JobListSection onSelectPosition={handleSelectPosition} />
      <div ref={formRef}>
        <ApplicationFormSection selectedPosition={selectedPosition} />
      </div>
    </div>
  );
}
