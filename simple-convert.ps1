# Simple Video Converter for Shy Parallax
# Usage: .\simple-convert.ps1

$inputVideo = "D:\ShyFresh\shy-app\marketing\shy_story_assets\video-1762408661392mp4.mp4"
$sceneName = "hook"
$outputDir = "D:\ShyFresh\shy-app\marketing\public\story\$sceneName"

# Create output directory
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Write-Host "Converting video for scene: $sceneName"

# Convert to WebM
$webmOut = "$outputDir\bg_${sceneName}.webm"
ffmpeg -i $inputVideo -c:v libvpx-vp9 -b:v 2M -crf 30 -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30" -t 8 -an -y $webmOut

# Extract poster
$posterOut = "$outputDir\poster.jpg"
ffmpeg -i $inputVideo -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -frames:v 1 -q:v 85 -y $posterOut

Write-Host "Done! Files created in: $outputDir"
Get-ChildItem $outputDir
