'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React, { } from 'react';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#2563EB"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default ProgressBarProvider;
