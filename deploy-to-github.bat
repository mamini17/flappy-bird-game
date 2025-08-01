@echo off
echo ========================================
echo    Flappy Bird Game Deployment
echo ========================================
echo.
echo This script will help you deploy your game to GitHub Pages.
echo.
echo STEP 1: Create a GitHub Repository
echo -----------------------------------
echo 1. Go to https://github.com and sign in
echo 2. Click the "+" icon in the top right
echo 3. Select "New repository"
echo 4. Name it: flappy-bird-game
echo 5. Make it PUBLIC
echo 6. DO NOT initialize with README (you already have one)
echo 7. Click "Create repository"
echo.
echo After creating the repository, copy the repository URL.
echo It should look like: https://github.com/YOUR_USERNAME/flappy-bird-game.git
echo.
pause
echo.
echo STEP 2: Enter your GitHub repository URL
echo ----------------------------------------
set /p repo_url="Enter your repository URL: "
echo.
echo STEP 3: Deploying to GitHub...
echo ----------------------------------------
git branch -M main
git remote add origin %repo_url%
git push -u origin main
echo.
echo STEP 4: Enable GitHub Pages
echo -----------------------------
echo 1. Go to your repository on GitHub
echo 2. Click "Settings" tab
echo 3. Scroll down to "Pages" section
echo 4. Under "Source", select "Deploy from a branch"
echo 5. Choose "main" branch and "/ (root)" folder
echo 6. Click "Save"
echo 7. Wait 2-3 minutes for deployment
echo.
echo Your game will be available at:
echo https://YOUR_USERNAME.github.io/flappy-bird-game
echo.
echo ========================================
echo    Deployment Complete!
echo ========================================
pause 