# Video Asset Organization Guide
# Run this to convert and organize your video files for the parallax showcase

## Your current video:
# D:\ShyFresh\shy-app\marketing\shy_story_assets\video-1762408661392mp4.mp4

## Required structure for each scene:
# /public/story/{scene-name}/
#   bg_{scene}.webm       - Background video (1920×1080, WebM VP9, <5MB, 8s loop)
#   poster.avif           - Poster frame (1920×1080, AVIF, <200KB)
#   fg_{element}.webm     - Foreground keyed video (optional, alpha channel)

## Step 1: Install FFmpeg (if not already installed)
# Download from: https://ffmpeg.org/download.html
# Or via Chocolatey: choco install ffmpeg

## Step 2: Convert your MP4 to WebM with VP9 codec
# Example for Hook scene (city background):

# Convert to WebM VP9:
ffmpeg -i "D:\ShyFresh\shy-app\marketing\shy_story_assets\video-1762408661392mp4.mp4" `
  -c:v libvpx-vp9 `
  -b:v 2M `
  -crf 30 `
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30" `
  -t 8 `
  -an `
  "D:\ShyFresh\shy-app\marketing\public\story\hook\bg_city.webm"

# Extract poster frame as AVIF:
ffmpeg -i "D:\ShyFresh\shy-app\marketing\shy_story_assets\video-1762408661392mp4.mp4" `
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" `
  -frames:v 1 `
  -q:v 85 `
  "D:\ShyFresh\shy-app\marketing\public\story\hook\poster.jpg"

# Convert JPG to AVIF (requires ffmpeg with libaom):
ffmpeg -i "D:\ShyFresh\shy-app\marketing\public\story\hook\poster.jpg" `
  -c:v libaom-av1 `
  -crf 32 `
  "D:\ShyFresh\shy-app\marketing\public\story\hook\poster.avif"

## Step 3: Repeat for each scene
# You need 6 background videos total:
# - /public/story/hook/bg_city.webm
# - /public/story/mechanic/bg_gradient.webm  
# - /public/story/charger/bg_cafe.webm
# - /public/story/logo/bg_coworking.webm
# - /public/story/tea/bg_tea.webm
# - /public/story/gym/bg_gym.webm

## Quick conversion function (PowerShell):
function Convert-VideoForParallax {
    param(
        [string]$InputPath,
        [string]$SceneName,
        [string]$OutputName = "bg"
    )
    
    $outputDir = "D:\ShyFresh\shy-app\marketing\public\story\$SceneName"
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
    
    # Convert to WebM
    ffmpeg -i "$InputPath" `
        -c:v libvpx-vp9 -b:v 2M -crf 30 `
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30" `
        -t 8 -an `
        "$outputDir\${OutputName}_${SceneName}.webm"
    
    # Extract poster
    ffmpeg -i "$InputPath" `
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" `
        -frames:v 1 -q:v 85 `
        "$outputDir\poster.jpg"
    
    Write-Host "✓ Converted: $SceneName" -ForegroundColor Green
}

## Usage example:
# Convert-VideoForParallax -InputPath "D:\ShyFresh\shy-app\marketing\shy_story_assets\video-1762408661392mp4.mp4" -SceneName "hook"

## Alternative: Use online converters
# If FFmpeg is too complex, use these online tools:
# - CloudConvert.com (MP4 → WebM VP9)
# - Squoosh.app (JPG → AVIF)
# - EZGIF.com (Extract video frame)

## File size targets:
# Background WebM: 2-5 MB each (30 MB total for 6 scenes)
# Poster AVIF: 100-200 KB each (1.2 MB total)
# Foreground WebM (optional): 1-3 MB each
