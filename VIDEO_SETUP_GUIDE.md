# Video Setup for Shy Parallax Showcase

## Current Status
You have: `shy_story_assets/video-1762408661392mp4.mp4`

## What You Need
The parallax showcase needs videos in WebM format for optimal web performance.

## Option 1: Quick Test (Use MP4 directly - works but not optimal)
Move your MP4 file to the public folder:

```powershell
# Create the story folder structure
New-Item -ItemType Directory -Force -Path "public\story\hook"

# Copy your video
Copy-Item "shy_story_assets\video-1762408661392mp4.mp4" "public\story\hook\bg_city.mp4"
```

Then update the page to use .mp4 instead of .webm

## Option 2: Convert to WebM (Recommended)

### Install FFmpeg:
```powershell
# Using Chocolatey (https://chocolatey.org/)
choco install ffmpeg

# OR using Scoop (https://scoop.sh/)
scoop install ffmpeg

# OR download from: https://ffmpeg.org/download.html
```

### Convert your video:
```powershell
# Create output folder
New-Item -ItemType Directory -Force -Path "public\story\hook"

# Convert to WebM (8 seconds, optimized for web)
ffmpeg -i "shy_story_assets\video-1762408661392mp4.mp4" `
  -c:v libvpx-vp9 -b:v 2M -crf 30 `
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30" `
  -t 8 -an `
  "public\story\hook\bg_city.webm"

# Extract poster frame
ffmpeg -i "shy_story_assets\video-1762408661392mp4.mp4" `
  -vf "scale=1920:1080" `
  -frames:v 1 `
  "public\story\hook\poster.jpg"
```

## Option 3: Online Conversion (No installation needed)

1. Go to https://cloudconvert.com/mp4-to-webm
2. Upload: `shy_story_assets\video-1762408661392mp4.mp4`
3. Settings:
   - Codec: VP9
   - Quality: Good (2 Mbps)
   - Trim: First 8 seconds only
   - Remove audio
4. Download and save as: `public\story\hook\bg_city.webm`

5. For poster image:
   - Go to https://ezgif.com/video-to-jpg
   - Upload your video
   - Extract first frame
   - Download and save as: `public\story\hook\poster.jpg`

## Quick Start: Use the Demo Version
The `/stories-demo` route works WITHOUT any video files - it uses gradients.
Test this first: https://your-preview-url.vercel.app/stories-demo

## File Structure Needed
```
public/
  story/
    hook/
      bg_city.webm (or .mp4)
      poster.jpg
    mechanic/
      bg_gradient.webm
      poster.jpg
    charger/
      bg_cafe.webm
      poster.jpg
    logo/
      bg_coworking.webm
      poster.jpg
    tea/
      bg_tea.webm
      poster.jpg
    gym/
      bg_gym.webm
      poster.jpg
```

## Next Steps
1. Choose an option above to convert your video
2. I'll update the showcase page to use .mp4 for now if you want to test quickly
3. Once you have videos ready, we'll deploy the full showcase

Would you like me to:
A) Create a version that uses .mp4 files directly?
B) Wait for you to convert to WebM?
C) Use the gradient demo version for now?
