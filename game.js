class FlappyBird {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Game state
        this.gameState = 'menu'; // menu, playing, gameOver
        this.score = 0;
        this.highScore = localStorage.getItem('flappyBirdHighScore') || 0;
        
        // Bird properties
        this.bird = {
            x: 80,
            y: this.height / 2,
            width: 30,
            height: 30,
            velocity: 0,
            gravity: 0.5,
            jumpPower: -8,
            rotation: 0
        };
        
        // Pipes
        this.pipes = [];
        this.pipeWidth = 60;
        this.pipeGap = 150;
        this.pipeSpacing = 200;
        this.pipeSpeed = 2;
        
        // Game settings
        this.groundY = this.height - 50;
        this.skyY = 50;
        
        // UI elements
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.gameOverDiv = document.getElementById('gameOver');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('highScore');
        this.finalScoreElement = document.getElementById('finalScore');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        
        this.setupEventListeners();
        this.updateHighScore();
        this.drawMenu();
    }
    
    setupEventListeners() {
        // Button events
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.startGame());
        this.playAgainBtn.addEventListener('click', () => this.startGame());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.gameState === 'playing') {
                    this.jump();
                } else if (this.gameState === 'menu') {
                    this.startGame();
                }
            }
        });
        
        // Mouse/touch events
        this.canvas.addEventListener('click', () => {
            if (this.gameState === 'playing') {
                this.jump();
            } else if (this.gameState === 'menu') {
                this.startGame();
            }
        });
    }
    
    startGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.pipes = [];
        this.bird.y = this.height / 2;
        this.bird.velocity = 0;
        this.bird.rotation = 0;
        
        // Generate initial pipes
        for (let i = 0; i < 3; i++) {
            this.addPipe();
        }
        
        this.startBtn.style.display = 'none';
        this.restartBtn.style.display = 'inline-block';
        this.gameOverDiv.style.display = 'none';
        
        this.gameLoop();
    }
    
    jump() {
        this.bird.velocity = this.bird.jumpPower;
        this.bird.rotation = -20;
    }
    
    addPipe() {
        // Ensure the gap is properly positioned with adequate space from top and bottom
        const minGapY = this.skyY + 50; // Minimum distance from top
        const maxGapY = this.groundY - this.pipeGap - 50; // Maximum distance from bottom
        const gapY = Math.random() * (maxGapY - minGapY) + minGapY;
        
        const pipe = {
            x: this.width + this.pipeWidth,
            topHeight: gapY,
            bottomY: gapY + this.pipeGap,
            passed: false
        };
        this.pipes.push(pipe);
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        // Update bird
        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;
        
        // Bird rotation
        if (this.bird.velocity > 0) {
            this.bird.rotation = Math.min(90, this.bird.rotation + 5);
        }
        
        // Update pipes
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            pipe.x -= this.pipeSpeed;
            
            // Remove pipes that are off screen
            if (pipe.x + this.pipeWidth < 0) {
                this.pipes.splice(i, 1);
            }
            
            // Check if bird passed pipe
            if (!pipe.passed && pipe.x + this.pipeWidth < this.bird.x) {
                pipe.passed = true;
                this.score++;
                this.updateScore();
            }
        }
        
        // Add new pipes
        if (this.pipes.length === 0 || 
            this.pipes[this.pipes.length - 1].x < this.width - this.pipeSpacing) {
            this.addPipe();
        }
        
        // Check collisions
        this.checkCollisions();
    }
    
    checkCollisions() {
        // Ground and sky collision
        if (this.bird.y + this.bird.height > this.groundY || this.bird.y < this.skyY) {
            this.gameOver();
            return;
        }
        
        // Pipe collision
        for (const pipe of this.pipes) {
            if (this.bird.x + this.bird.width > pipe.x && 
                this.bird.x < pipe.x + this.pipeWidth) {
                
                if (this.bird.y < pipe.topHeight || 
                    this.bird.y + this.bird.height > pipe.bottomY) {
                    this.gameOver();
                    return;
                }
            }
        }
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('flappyBirdHighScore', this.highScore);
            this.updateHighScore();
        }
        
        this.finalScoreElement.textContent = this.score;
        this.gameOverDiv.style.display = 'block';
        this.restartBtn.style.display = 'none';
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw clouds
        this.drawClouds();
        
        // Draw pipes
        this.drawPipes();
        
        // Draw bird
        this.drawBird();
        
        // Draw ground
        this.drawGround();
        
        // Draw UI
        this.drawUI();
    }
    
    drawClouds() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 3; i++) {
            const x = (Date.now() * 0.02 + i * 200) % (this.width + 100) - 50;
            const y = 50 + i * 30;
            this.drawCloud(x, y, 40 + i * 10);
        }
    }
    
    drawCloud(x, y, size) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.arc(x + size * 0.5, y, size * 0.8, 0, Math.PI * 2);
        this.ctx.arc(x + size * 1, y, size * 0.6, 0, Math.PI * 2);
        this.ctx.arc(x + size * 0.5, y - size * 0.3, size * 0.6, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawPipes() {
        this.ctx.fillStyle = '#2ECC71';
        for (const pipe of this.pipes) {
            // Top pipe
            this.ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.topHeight);
            
            // Bottom pipe
            this.ctx.fillRect(pipe.x, pipe.bottomY, this.pipeWidth, this.height - pipe.bottomY);
            
            // Pipe caps
            this.ctx.fillStyle = '#27AE60';
            this.ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, this.pipeWidth + 10, 20);
            this.ctx.fillRect(pipe.x - 5, pipe.bottomY, this.pipeWidth + 10, 20);
            this.ctx.fillStyle = '#2ECC71';
        }
    }
    
    drawBird() {
        this.ctx.save();
        this.ctx.translate(this.bird.x + this.bird.width / 2, this.bird.y + this.bird.height / 2);
        this.ctx.rotate(this.bird.rotation * Math.PI / 180);
        
        // Bird body
        this.ctx.fillStyle = '#FFD700';
        this.ctx.fillRect(-this.bird.width / 2, -this.bird.height / 2, this.bird.width, this.bird.height);
        
        // Bird wing
        this.ctx.fillStyle = '#FFA500';
        this.ctx.fillRect(-this.bird.width / 2 + 5, -this.bird.height / 2 - 5, 15, 10);
        
        // Bird eye
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(this.bird.width / 2 - 8, -this.bird.height / 2 + 5, 4, 4);
        
        // Bird beak
        this.ctx.fillStyle = '#FF6B35';
        this.ctx.fillRect(this.bird.width / 2, -2, 8, 4);
        
        this.ctx.restore();
    }
    
    drawGround() {
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);
        
        // Grass
        this.ctx.fillStyle = '#228B22';
        this.ctx.fillRect(0, this.groundY, this.width, 10);
    }
    
    drawUI() {
        if (this.gameState === 'playing') {
            // Score display
            this.ctx.fillStyle = '#333';
            this.ctx.font = 'bold 24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`Score: ${this.score}`, this.width / 2, 40);
        }
    }
    
    drawMenu() {
        this.draw();
        
        // Menu overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Flappy Bird', this.width / 2, this.height / 2 - 50);
        
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Click or press SPACE to start', this.width / 2, this.height / 2);
        this.ctx.fillText(`High Score: ${this.highScore}`, this.width / 2, this.height / 2 + 30);
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
    }
    
    updateHighScore() {
        this.highScoreElement.textContent = this.highScore;
    }
    
    gameLoop() {
        this.update();
        this.draw();
        
        if (this.gameState === 'playing') {
            requestAnimationFrame(() => this.gameLoop());
        } else if (this.gameState === 'menu') {
            this.drawMenu();
        }
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    new FlappyBird();
}); 