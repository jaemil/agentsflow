import React from 'react';
import { ThemeSwitcher } from '@agentsflow/ui-components';
import Link from 'next/link';

export default function Navigation() {
  return (
    <div className="z-10 flex items-center justify-between p-4 border-b">
      <h1>Agentsflow</h1>
      <div className="flex items-center gap-4">
        <Link href="https://github.com/jaemil/agentsflow">Github</Link>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
