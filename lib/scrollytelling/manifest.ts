/**
 * Scrollytelling Scene Manifest
 * Central configuration for all video assets, posters, and scene metadata
 */

export interface SceneAssets {
  bg: string;           // Background video (desktop)
  bg_m?: string;        // Background video (mobile, optional)
  fg?: string;          // Foreground video (optional)
  fg_m?: string;        // Foreground video (mobile, optional)
  poster: string;       // Poster image (AVIF)
  poster_m?: string;    // Poster image (mobile, optional)
}

export interface SceneMetadata extends SceneAssets {
  id: string;
  title: string;
  startProgress: number;  // 0-1
  endProgress: number;    // 0-1
  backgroundColor?: string;
}

/**
 * Scene Assets Registry
 * Maps scene IDs to their video/poster paths
 */
export const SCENES: Record<string, SceneAssets> = {
  hook: {
    bg: '/story/hook/bg_city.webm',
    poster: '/story/hook/poster.avif',
  },
  mechanic: {
    bg: '/story/mechanic/bg_softgradient.webm',
    poster: '/story/mechanic/poster.avif',
  },
  charger: {
    bg: '/story/charger/bg_cafe_plate.webm',
    fg: '/story/charger/fg_handoff_charger.webm',
    poster: '/story/charger/poster.avif',
  },
  logo: {
    bg: '/story/logo/bg_cowork_plate.webm',
    fg: '/story/logo/fg_tablet_hand.webm',
    poster: '/story/logo/poster.avif',
  },
  tea: {
    bg: '/story/tea/bg_teabar_plate.webm',
    fg: '/story/tea/fg_teacups.webm',
    poster: '/story/tea/poster.avif',
  },
  gym: {
    bg: '/story/gym/bg_gym_plate.webm',
    fg: '/story/gym/fg_spotter_pair.webm',
    poster: '/story/gym/poster.avif',
  },
};

/**
 * UI Assets Registry
 * SVG overlays and UI elements
 */
export const UI_ASSETS = {
  lobbyList: '/story/ui/lobby-list.svg',
  dmRequestModal: '/story/ui/dm-request-modal.svg',
  groupCreateModal: '/story/ui/group-create-modal.svg',
  groupQueue: '/story/ui/group-queue.svg',
  badges: '/story/ui/badges.svg',
  chipTabs: '/story/ui/chip-tabs.svg',
  ctaBanner: '/story/ui/cta-banner.svg',
  tooltip: '/story/ui/tooltip.svg',
  progressDots: '/story/ui/progress-dots.svg',
  focusRing: '/story/ui/focus-ring.svg',
  icons: '/story/ui/icons.svg',
} as const;

/**
 * Shared Assets
 */
export const SHARED_ASSETS = {
  particles: '/story/shared/particles.webm',
} as const;

/**
 * Scene Configuration with Progress Ranges
 */
export const SCENE_CONFIG: SceneMetadata[] = [
  {
    id: 'hook',
    title: 'Meet People Nearby',
    ...SCENES.hook,
    startProgress: 0,
    endProgress: 0.16,
    backgroundColor: '#000000',
  },
  {
    id: 'mechanic',
    title: 'How Shy Works',
    ...SCENES.mechanic,
    startProgress: 0.16,
    endProgress: 0.33,
    backgroundColor: '#000000',
  },
  {
    id: 'charger',
    title: 'Coffee Shop Discovery',
    ...SCENES.charger,
    startProgress: 0.33,
    endProgress: 0.50,
    backgroundColor: '#000000',
  },
  {
    id: 'logo',
    title: 'Coworking Connections',
    ...SCENES.logo,
    startProgress: 0.50,
    endProgress: 0.66,
    backgroundColor: '#000000',
  },
  {
    id: 'tea',
    title: 'Tea Bar Meetups',
    ...SCENES.tea,
    startProgress: 0.66,
    endProgress: 0.83,
    backgroundColor: '#000000',
  },
  {
    id: 'gym',
    title: 'Gym Spotters',
    ...SCENES.gym,
    startProgress: 0.83,
    endProgress: 1.0,
    backgroundColor: '#000000',
  },
];
