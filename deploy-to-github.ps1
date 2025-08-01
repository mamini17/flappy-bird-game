Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Flappy Bird Game Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will help you deploy your game to GitHub Pages." -ForegroundColor Yellow
Write-Host ""
Write-Host "STEP 1: Create a GitHub Repository" -ForegroundColor Green
Write-Host "-----------------------------------" -ForegroundColor Green
Write-Host "1. Go to https://github.com and sign in"
Write-Host "2. Click the '+' icon in the top right"
Write-Host "3. Select 'New repository'"
Write-Host "4. Name it: flappy-bird-game"
Write-Host "5. Make it PUBLIC"
Write-Host "6. DO NOT initialize with README (you already have one)"
Write-Host "7. Click 'Create repository'"
Write-Host ""
Write-Host "After creating the repository, copy the repository URL."
Write-Host "It should look like: https://github.com/YOUR_USERNAME/flappy-bird-game.git"
Write-Host ""
Read-Host "Press Enter when you're ready to continue"
Write-Host ""
Write-Host "STEP 2: Enter your GitHub repository URL" -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Green
$repoUrl = Read-Host "Enter your repository URL"
Write-Host ""
Write-Host "STEP 3: Deploying to GitHub..." -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Green

try {
    git branch -M main
    git remote add origin $repoUrl
    git push -u origin main
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "❌ Error pushing to GitHub. Please check your repository URL." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "STEP 4: Enable GitHub Pages" -ForegroundColor Green
Write-Host "-----------------------------" -ForegroundColor Green
Write-Host "1. Go to your repository on GitHub"
Write-Host "2. Click 'Settings' tab"
Write-Host "3. Scroll down to 'Pages' section"
Write-Host "4. Under 'Source', select 'Deploy from a branch'"
Write-Host "5. Choose 'main' branch and '/ (root)' folder"
Write-Host "6. Click 'Save'"
Write-Host "7. Wait 2-3 minutes for deployment"
Write-Host ""
Write-Host "Your game will be available at:" -ForegroundColor Yellow
Write-Host "https://YOUR_USERNAME.github.io/flappy-bird-game" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Deployment Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Read-Host "Press Enter to exit" 