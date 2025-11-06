/**
 * Tiny GSAP ScrollTrigger variant for Shy parallax storytelling
 * Adds scroll-driven animations without full GSAP dependency
 */

export type ScrollAnimation = {
  element: HTMLElement | string;
  from?: Partial<CSSStyleDeclaration>;
  to?: Partial<CSSStyleDeclaration>;
  start?: string; // e.g., "top center", "top bottom"
  end?: string;   // e.g., "bottom center"
  scrub?: boolean | number; // true or delay in seconds
  pin?: boolean;
  markers?: boolean; // debug markers
};

class MiniScrollTrigger {
  private animations: Array<{
    element: HTMLElement;
    from: Partial<CSSStyleDeclaration>;
    to: Partial<CSSStyleDeclaration>;
    start: number;
    end: number;
    scrub: number;
    pin: boolean;
  }> = [];

  private rafId: number | null = null;

  create(config: ScrollAnimation) {
    const el = typeof config.element === 'string' 
      ? document.querySelector<HTMLElement>(config.element)
      : config.element;

    if (!el) {
      console.warn('ScrollTrigger: element not found', config.element);
      return;
    }

    // Parse start/end positions (simplified: viewport percentages)
    const start = this.parsePosition(config.start || 'top bottom');
    const end = this.parsePosition(config.end || 'bottom top');

    this.animations.push({
      element: el,
      from: config.from || {},
      to: config.to || {},
      start,
      end,
      scrub: typeof config.scrub === 'number' ? config.scrub : config.scrub ? 0 : 1,
      pin: config.pin || false,
    });

    this.startRAF();
  }

  private parsePosition(pos: string): number {
    // Simplified: "top bottom" = 100, "top center" = 50, "top top" = 0
    const parts = pos.split(' ');
    const viewport = parts[1] || 'center';
    
    switch (viewport) {
      case 'top': return 0;
      case 'center': return 50;
      case 'bottom': return 100;
      default: return 50;
    }
  }

  private startRAF() {
    if (this.rafId) return;

    const update = () => {
      this.update();
      this.rafId = requestAnimationFrame(update);
    };

    this.rafId = requestAnimationFrame(update);
  }

  private update() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    this.animations.forEach((anim) => {
      const rect = anim.element.getBoundingClientRect();
      const elementTop = scrollY + rect.top;
      const elementBottom = elementTop + rect.height;

      // Calculate scroll progress through trigger zone
      const scrollStart = elementTop - (viewportHeight * anim.start / 100);
      const scrollEnd = elementBottom - (viewportHeight * anim.end / 100);
      const scrollDistance = scrollEnd - scrollStart;
      
      let progress = (scrollY - scrollStart) / scrollDistance;
      progress = Math.max(0, Math.min(1, progress));

      // Apply interpolated styles
      this.applyStyles(anim.element, anim.from, anim.to, progress);
    });
  }

  private applyStyles(
    el: HTMLElement,
    from: Partial<CSSStyleDeclaration>,
    to: Partial<CSSStyleDeclaration>,
    progress: number
  ) {
    Object.keys(to).forEach((key) => {
      const fromVal = from[key as any] || '0';
      const toVal = to[key as any] || '0';

      // Simple numeric interpolation
      const fromNum = parseFloat(fromVal as string);
      const toNum = parseFloat(toVal as string);
      
      if (!isNaN(fromNum) && !isNaN(toNum)) {
        const value = fromNum + (toNum - fromNum) * progress;
        const unit = (toVal as string).replace(/[\d.-]/g, '') || '';
        (el.style as any)[key] = `${value}${unit}`;
      } else {
        // Non-numeric values (colors, etc.) - just snap
        (el.style as any)[key] = progress < 0.5 ? fromVal : toVal;
      }
    });
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.animations = [];
  }
}

// Singleton instance
let instance: MiniScrollTrigger | null = null;

export const ScrollTrigger = {
  create(config: ScrollAnimation) {
    if (!instance) instance = new MiniScrollTrigger();
    instance.create(config);
  },

  destroy() {
    instance?.destroy();
    instance = null;
  },
};
