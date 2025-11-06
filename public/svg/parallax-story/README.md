# Shy SVG Pack - Parallax Storytelling Assets

This folder contains SVG assets designed for parallax scrollytelling experiences in the Shy marketing site.

## Files

### Venue Interiors (Mid-layer backgrounds)
- `mid_venue-cafe.svg` - Café interior silhouette
- `mid_venue-library.svg` - Library interior silhouette  
- `mid_venue-gym.svg` - Gym bench area silhouette

### UI Components
- `lobby-list.svg` - Lobby list with user profiles
- `dm-request-modal.svg` - DM request modal interface
- `group-create-modal.svg` - Create group modal
- `group-queue.svg` - Requests queue with approve/decline actions
- `chip-tabs.svg` - Venue filter chips (Café, Library, Gym)
- `cta-banner.svg` - Call-to-action banner
- `tooltip.svg` - "Consent first" tooltip
- `progress-dots.svg` - Progress indicator dots
- `focus-ring.svg` - Animated focus ring

### Icon Libraries
- `badges.svg` - Badge and status icons (accepted, declined, ephemeral, geofence, lock)
- `icons.svg` - General UI icons (user, shield, report, block, map-pin, timer, check, x, info, sparkles, dumbbell, tea, laptop, cafe, library, gym)

## Usage

These SVGs are designed to:
- Use `currentColor` for theme-adaptive coloring
- Include proper ARIA labels for accessibility
- Support opacity-based layering for parallax effects
- Maintain crisp rendering at various sizes

## Integration with Parallax

The assets are organized to support multi-layer scrollytelling:
1. **Background layer**: Venue interiors (`mid_venue-*.svg`)
2. **Mid layer**: UI components and modals
3. **Foreground layer**: Icons and badges

Use with the scrollytelling system in `lib/scrollytelling/` for animated story experiences.
