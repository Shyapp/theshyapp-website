/**
 * Responsive Container Component
 * Industry-standard wrapper for different screen sizes
 */

import React from 'react';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  noPadding?: boolean;
}

const sizeClasses: Record<ContainerSize, string> = {
  xs: 'max-w-container-xs',
  sm: 'max-w-container-sm',
  md: 'max-w-container-md',
  lg: 'max-w-container-lg',
  xl: 'max-w-container-xl',
  '2xl': 'max-w-container-2xl',
  full: 'max-w-full',
};

/**
 * Container component with responsive padding and max-width
 * 
 * @example
 * <Container size="lg">
 *   <h1>Content</h1>
 * </Container>
 */
export function Container({
  children,
  size = 'xl',
  className = '',
  as: Component = 'div',
  noPadding = false,
}: ContainerProps) {
  const paddingClasses = noPadding ? '' : 'px-4 sm:px-6 lg:px-8';
  
  return (
    <Component 
      className={`w-full mx-auto ${sizeClasses[size]} ${paddingClasses} ${className}`}
    >
      {children}
    </Component>
  );
}

/**
 * Section wrapper for full-width sections with optional background
 */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerSize?: ContainerSize;
}

export function Section({
  children,
  className = '',
  id,
  containerSize = 'xl',
}: SectionProps) {
  return (
    <section id={id} className={`relative w-full ${className}`}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}

/**
 * Safe area wrapper for mobile devices (respects notches, home indicators)
 */
export function SafeAreaWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="safe-area-wrapper"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Responsive grid wrapper
 */
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export function ResponsiveGrid({
  children,
  className = '',
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
}: ResponsiveGridProps) {
  const gridCols = `
    grid-cols-${cols.xs || 1}
    ${cols.sm ? `sm:grid-cols-${cols.sm}` : ''}
    ${cols.md ? `md:grid-cols-${cols.md}` : ''}
    ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''}
    ${cols.xl ? `xl:grid-cols-${cols.xl}` : ''}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={`grid gap-6 ${gridCols} ${className}`}>
      {children}
    </div>
  );
}
