'use client';

import Link from 'next/link';
import { LayoutList, Info } from 'lucide-react';

export function TopBar() {
  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="font-semibold text-lg flex items-center gap-2">
        {/* Left side can be breadcrumbs or title if needed, currently empty/logo */}
      </div>
      
      <nav className="flex items-center gap-6">
        <Link 
          href="/" 
          className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
        >
          <LayoutList className="size-4" />
          Items
        </Link>
        <Link 
          href="/about" 
          className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
        >
          <Info className="size-4" />
          About
        </Link>
      </nav>
    </header>
  );
}