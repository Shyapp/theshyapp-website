# Quick setup script - Copy your video to test the parallax

Write-Host "Setting up video for parallax test..." -ForegroundColor Cyan

# Create the directory
New-Item -ItemType Directory -Force -Path "public\story\hook" | Out-Null

# Copy your video
$sourceVideo = "shy_story_assets\video-1762408661392mp4.mp4"
$destVideo = "public\story\hook\bg_city.mp4"

if (Test-Path $sourceVideo) {
    Copy-Item $sourceVideo $destVideo -Force
    Write-Host "Video copied to: $destVideo" -ForegroundColor Green
    
    $size = [Math]::Round((Get-Item $destVideo).Length / 1MB, 2)
    Write-Host "File size: $size MB" -ForegroundColor Gray
    
    Write-Host ""
    Write-Host "Ready to test!" -ForegroundColor Green
    Write-Host "Run: npm run dev" -ForegroundColor Yellow
    Write-Host "Then visit: http://localhost:3000/stories-mp4" -ForegroundColor Yellow
} else {
    Write-Host "Source video not found: $sourceVideo" -ForegroundColor Red
    Write-Host "Please check the path" -ForegroundColor Yellow
}
