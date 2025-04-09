// Get references to the canvas and its drawing context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions (responsive if needed)
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.5;

// Draw an initial game start screen
function drawStartScreen() {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#fff';
  ctx.font = '32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Welcome to Antonio\'s Code Quest', canvas.width / 2, canvas.height / 2);
}

drawStartScreen();

// Animation function for the “game”
function startGame() {
  // Starting positions for our “player” square
  let x = 50;
  let y = 50;
  let dx = 2;
  let dy = 2;
  
  function gameLoop() {
    // Clear the canvas
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw a moving square (this represents your interactive element)
    ctx.fillStyle = '#0f0';
    ctx.fillRect(x, y, 50, 50);
    
    // Update square’s position
    x += dx;
    y += dy;
    
    // Bounce off the canvas edges
    if (x + 50 > canvas.width || x < 0) dx = -dx;
    if (y + 50 > canvas.height || y < 0) dy = -dy;
    
    requestAnimationFrame(gameLoop);
  }
  
  gameLoop();
}

// Setup button event listeners
document.getElementById('playButton').addEventListener('click', () => {
  startGame();
});

document.getElementById('aboutButton').addEventListener('click', () => {
  // Interactive alert showcasing your expertise (customize with more details as desired)
  alert("I am a focused Software Engineer with strong C# expertise and extensive experience in backend development and full stack integration.");
});

document.getElementById('resumeButton').addEventListener('click', () => {
  // Opens your resume PDF in a new tab
  window.open('Antonio_CV.pdf', '_blank');
});

document.getElementById('projectsButton').addEventListener('click', () => {
  // Redirects to your GitHub projects (or you can create a custom projects page)
  window.open('https://github.com/AntonioCoppe', '_blank');
});
