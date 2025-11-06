'use client';

import { useScrollProgress } from '@/hooks/scrollytelling/use-scroll-progress';

const SCENES = [
  { id: 'hook', label: 'Hook' },
  { id: 'mechanic', label: 'How it works' },
  { id: 'charger', label: 'Café' },
  { id: 'logo', label: 'Coworking' },
  { id: 'tea', label: 'Social' },
  { id: 'gym', label: 'Fitness' },
];

export function ScrollProgressIndicator() {
  const progress = useScrollProgress();

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-3">
        {SCENES.map((scene, idx) => {
          const sceneProgress = idx / (SCENES.length - 1);
          const isActive = Math.abs(progress - sceneProgress) < 0.2;
          const isPast = progress > sceneProgress + 0.1;
          
          return (
            <a
              key={scene.id}
              href={`#${scene.id}`}
              className="group flex items-center gap-3"
              aria-label={`Go to ${scene.label} section`}
            >
              {/* Dot indicator */}
              <div
                className={`
                  w-3 h-3 rounded-full border-2 transition-all duration-300
                  ${isActive 
                    ? 'bg-shy-yellow border-shy-yellow scale-125' 
                    : isPast
                    ? 'bg-shy-yellow/50 border-shy-yellow/50'
                    : 'bg-transparent border-white/30'
                  }
                `}
              />
              
              {/* Label (shows on hover) */}
              <span
                className={`
                  text-sm whitespace-nowrap transition-all duration-300
                  ${isActive
                    ? 'text-shy-yellow opacity-100 translate-x-0'
                    : 'text-white/60 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }
                `}
              >
                {scene.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
