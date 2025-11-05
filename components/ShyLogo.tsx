import React from 'react';

export default function ShyLogo({
  className = 'h-8 w-auto',
}: {
  className?: string;
}) {
  return (
    <img
      src="/shyLogo.png"
      alt="Shy App logo"
      className={className}
      height={40}
      width={40}
    />
  );
}

export function ShyWordmark({className = ''}: {className?: string}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <ShyLogo className="h-9 w-auto" />
      <span className="text-2xl font-semibold tracking-tight text-white">
        Shy App
      </span>
    </div>
  );
}
