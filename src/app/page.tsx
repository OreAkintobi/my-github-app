'use client';

import { StoreProvider } from '@/store';

import { Github } from './github';

export default function Home() {
  return (
    <StoreProvider>
      <Github />
    </StoreProvider>
  );
}
