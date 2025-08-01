# Flappy Bird Game

A complete Flappy Bird game built with HTML5 Canvas and JavaScript.

## Features

- **Classic Flappy Bird gameplay**: Navigate through pipes by making the bird flap
- **Smooth animations**: Bird rotation and physics-based movement
- **Score tracking**: Current score and high score persistence
- **Beautiful graphics**: Gradient backgrounds, animated clouds, and detailed sprites
- **Responsive design**: Works on desktop and mobile devices
- **Multiple controls**: Click, tap, or press SPACE to flap

## How to Play

1. **Start the game**: Click the "Start Game" button or press SPACE
2. **Control the bird**: Click/tap or press SPACE to make the bird flap upward
3. **Navigate through pipes**: Avoid hitting the pipes, ground, and sky
4. **Score points**: Pass through pipes to earn points
5. **Try to beat your high score**: Your best score is saved locally

## Controls

- **SPACE key**: Flap the bird (works in menu and during gameplay)
- **Mouse click**: Flap the bird (works in menu and during gameplay)
- **Touch**: Tap to flap (mobile devices)

## Game Mechanics

- **Bird physics**: Realistic gravity and momentum
- **Pipe generation**: Randomly positioned pipes with consistent gaps
- **Collision detection**: Precise hit detection for game over conditions
- **Score system**: Points awarded for each pipe passed
- **High score persistence**: Best score saved in browser localStorage

## Files Structure

```
flappy-bird-game/
├── index.html      # Main HTML file
├── style.css       # CSS styling
├── game.js         # Game logic and mechanics
└── README.md       # This file
```

## How to Run

1. **Open the game**: Double-click `index.html` or open it in your web browser
2. **No installation required**: The game runs entirely in the browser
3. **No internet connection needed**: All assets are local

## Technical Details

- **Built with**: HTML5 Canvas, CSS3, Vanilla JavaScript
- **No dependencies**: Pure frontend implementation
- **Cross-platform**: Works on Windows, Mac, Linux, and mobile devices
- **Modern browser support**: Compatible with all modern browsers

## Game Features

### Visual Elements
- Animated clouds moving across the sky
- Gradient sky and ground backgrounds
- Detailed bird sprite with rotation
- Green pipes with darker caps
- Smooth animations and transitions

### Audio (Future Enhancement)
- Sound effects for flapping, scoring, and game over
- Background music option

### Performance
- Optimized rendering with requestAnimationFrame
- Efficient collision detection
- Smooth 60fps gameplay

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

The game is built using object-oriented JavaScript with a clean, modular structure:

- **FlappyBird class**: Main game controller
- **Game states**: Menu, playing, and game over states
- **Event handling**: Keyboard, mouse, and touch controls
- **Rendering**: Canvas-based graphics with smooth animations

Enjoy playing Flappy Bird! 🐦 