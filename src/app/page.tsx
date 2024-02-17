'use client';

import { StoreProvider } from '@/store';

import { Github } from './github';
import { ThemeProvider } from '@/theme';

export default function Home() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Github />
      </ThemeProvider>
    </StoreProvider>
  );
}
