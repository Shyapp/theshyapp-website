/**
 * Scene manifest for Shy parallax storytelling
 * Maps scene IDs to video assets and metadata
 */

export type SceneId = 'hook' | 'mechanic' | 'charger' | 'logo' | 'tea' | 'gym';

type SceneDef = {
  bg: string;
  poster: string;
  fg?: string;
  mobileBg?: string;
  mobilePoster?: string;
};

export const SCENES: Record<SceneId, SceneDef> = {
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
    poster: '/story/charger/poster.avif',
    fg: '/story/charger/fg_handoff_charger.webm',
  },
  logo: {
    bg: '/story/logo/bg_cowork_plate.webm',
    poster: '/story/logo/poster.avif',
    fg: '/story/logo/fg_tablet_hand.webm',
  },
  tea: {
    bg: '/story/tea/bg_teabar_plate.webm',
    poster: '/story/tea/poster.avif',
    fg: '/story/tea/fg_teacups.webm',
  },
  gym: {
    bg: '/story/gym/bg_gym_plate.webm',
    poster: '/story/gym/poster.avif',
    fg: '/story/gym/fg_spotter_pair.webm',
  },
};
