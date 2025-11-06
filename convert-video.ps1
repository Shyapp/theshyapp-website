# Quick Video Converter for Shy Parallax Showcase
# This script converts your MP4 video to optimized WebM format for web

param(
    [Parameter(Mandatory=$false)]
    [string]$InputVideo = "D:\ShyFresh\shy-app\marketing\shy_story_assets\video-1762408661392mp4.mp4",
    
    [Parameter(Mandatory=$false)]
    [string]$SceneName = "hook"
)

Write-Host "🎬 Shy Parallax Video Converter" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Check if FFmpeg is installed
$ffmpegPath = Get-Command ffmpeg -ErrorAction SilentlyContinue

if (-not $ffmpegPath) {
    Write-Host "❌ FFmpeg not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Install options:" -ForegroundColor Yellow
    Write-Host "1. Chocolatey: choco install ffmpeg" -ForegroundColor Gray
    Write-Host "2. Download: https://ffmpeg.org/download.html" -ForegroundColor Gray
    Write-Host "3. Scoop: scoop install ffmpeg" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Alternative: Use online converter at cloudconvert.com" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ FFmpeg found: $($ffmpegPath.Source)" -ForegroundColor Green

# Create output directory
$outputDir = "D:\ShyFresh\shy-app\marketing\public\story\$SceneName"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
Write-Host "✓ Output directory: $outputDir" -ForegroundColor Green

# Check if input exists
if (-not (Test-Path $InputVideo)) {
    Write-Host "❌ Input video not found: $InputVideo" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Input video: $InputVideo" -ForegroundColor Green
Write-Host ""

# Convert to WebM VP9
Write-Host "🎥 Converting to WebM VP9 (this may take a minute)..." -ForegroundColor Cyan
$webmOutput = Join-Path $outputDir "bg_${SceneName}.webm"

& ffmpeg -i $InputVideo `
    -c:v libvpx-vp9 `
    -b:v 2M `
    -crf 30 `
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30" `
    -t 8 `
    -an `
    -y `
    $webmOutput 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    $webmSize = [Math]::Round((Get-Item $webmOutput).Length / 1MB, 2)
    Write-Host "WebM created: $webmOutput ($webmSize MB)" -ForegroundColor Green
} else {
    Write-Host "WebM conversion failed" -ForegroundColor Red
    exit 1
}

# Extract poster frame
Write-Host "📸 Extracting poster frame..." -ForegroundColor Cyan
$posterJpg = Join-Path $outputDir "poster.jpg"

& ffmpeg -i $InputVideo `
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" `
    -frames:v 1 `
    -q:v 85 `
    -y `
    $posterJpg 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    $jpgSize = [Math]::Round((Get-Item $posterJpg).Length / 1KB, 2)
    Write-Host "Poster created: $posterJpg ($jpgSize KB)" -ForegroundColor Green
} else {
    Write-Host "Poster extraction failed, but WebM is ready" -ForegroundColor Yellow
}

# Try to convert to AVIF (may fail if libaom not available)
$posterAvif = Join-Path $outputDir "poster.avif"
Write-Host "🖼 Attempting AVIF conversion..." -ForegroundColor Cyan

& ffmpeg -i $posterJpg `
    -c:v libaom-av1 `
    -crf 32 `
    -y `
    $posterAvif 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    $avifSize = [Math]::Round((Get-Item $posterAvif).Length / 1KB, 2)
    Write-Host "AVIF created: $posterAvif ($avifSize KB)" -ForegroundColor Green
} else {
    Write-Host "AVIF not available, using JPG as poster" -ForegroundColor Yellow
    Write-Host "  (This is fine - the site will still work)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Done! Scene '$SceneName' is ready" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Convert videos for remaining scenes: mechanic, charger, logo, tea, gym" -ForegroundColor Gray
Write-Host "2. Run: .\convert-video.ps1 -InputVideo 'path\to\video.mp4' -SceneName 'mechanic'" -ForegroundColor Gray
Write-Host "3. Deploy with: vercel --yes" -ForegroundColor Gray
Write-Host ""
Write-Host "Files created:" -ForegroundColor Cyan
Get-ChildItem $outputDir | ForEach-Object {
    $size = if ($_.Length -gt 1MB) { 
        "$([Math]::Round($_.Length / 1MB, 2)) MB" 
    } else { 
        "$([Math]::Round($_.Length / 1KB, 2)) KB" 
    }
    Write-Host "  - $($_.Name) ($size)" -ForegroundColor Gray
}
