/**
 * Scrollytelling Types & Interfaces
 * Defines the structure for parallax scrolling scenes and animations
 */

export interface ScrollProgress {
  scrollY: number;
  scrollProgress: number; // 0-1 normalized
  viewportHeight: number;
}

export interface ParallaxConfig {
  speed: number; // Multiplier for scroll speed (0.5 = slower, 2 = faster)
  direction: 'up' | 'down' | 'left' | 'right';
  offset?: number; // Starting offset in pixels
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
}

export interface SceneConfig {
  id: string;
  title: string;
  startProgress: number; // 0-1, when scene becomes active
  endProgress: number; // 0-1, when scene ends
  backgroundColor?: string;
  parallaxLayers?: ParallaxLayer[];
  animations?: SceneAnimation[];
}

export interface ParallaxLayer {
  id: string;
  type: 'image' | 'video' | 'element';
  src?: string; // For images/videos
  element?: React.ReactNode; // For custom elements
  parallax: ParallaxConfig;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface SceneAnimation {
  id: string;
  target: string; // CSS selector or element ID
  property: string; // CSS property to animate (opacity, transform, etc.)
  from: string | number;
  to: string | number;
  startProgress: number; // 0-1 within scene
  endProgress: number; // 0-1 within scene
  easing?: string;
}

export interface ScrollytellingConfig {
  scenes: SceneConfig[];
  showProgress?: boolean; // Debug progress indicator
  smoothScroll?: boolean;
  snapToScenes?: boolean;
}
