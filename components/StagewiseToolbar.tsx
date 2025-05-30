'use client';

import dynamic from 'next/dynamic';

// Dynamically import StagewiseToolbar with SSR disabled and only in development
const StagewiseToolbarComponent = dynamic(
  () => import('@stagewise/toolbar-next').then((mod) => mod.StagewiseToolbar),
  { ssr: false, loading: () => null }
);

// Stagewise configuration
const stagewiseConfig = {
  plugins: []
};

export default function StagewiseToolbar() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <StagewiseToolbarComponent config={stagewiseConfig} />;
}
