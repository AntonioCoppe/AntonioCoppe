// Get canvas and popup element references
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const popup = document.getElementById("popup");

// Resize canvas to fill the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Define the player (a simple square) and its initial properties
const player = {
  x: 50,
  y: 50,
  width: 30,
  height: 30,
  speed: 5
};

// Define building objects with x, y, width, height, and a message.
// You can adjust these values to match your “map” layout.
const buildings = [
  {
    x: 200,
    y: 100,
    width: 100,
    height: 100,
    message: "At Building A, I developed a scalable backend solution."
  },
  {
    x: 500,
    y: 300,
    width: 120,
    height: 100,
    message: "At Building B, I led a full-stack integration project."
  },
  {
    x: 800,
    y: 150,
    width: 150,
    height: 120,
    message: "At Building C, I optimized system performance."
  }
];

// Handle keyboard arrow key input for player movement
const keysPressed = {};
window.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
});
window.addEventListener("keyup", (e) => {
  keysPressed[e.key] = false;
});

// Update player's position based on keys pressed
function updatePlayer() {
  if (keysPressed["ArrowUp"] || keysPressed["w"]) {
    player.y -= player.speed;
  }
  if (keysPressed["ArrowDown"] || keysPressed["s"]) {
    player.y += player.speed;
  }
  if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
    player.x -= player.speed;
  }
  if (keysPressed["ArrowRight"] || keysPressed["d"]) {
    player.x += player.speed;
  }
  
  // Ensure player stays within canvas boundaries
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

// Check proximity between player and buildings.
// If close (using a simple collision/intersection threshold), return the building's message.
function checkProximity() {
  // Using simple rectangle intersection with a little extra padding
  const padding = 20;
  for (let building of buildings) {
    if (
      player.x + player.width > building.x - padding &&
      player.x < building.x + building.width + padding &&
      player.y + player.height > building.y - padding &&
      player.y < building.y + building.height + padding
    ) {
      return building.message;
    }
  }
  return null;
}

// Draw the map, buildings, and player
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw buildings
  buildings.forEach((building) => {
    ctx.fillStyle = "#8B4513"; // Brown color for buildings
    ctx.fillRect(building.x, building.y, building.width, building.height);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(building.x, building.y, building.width, building.height);
  });

  // Draw player
  ctx.fillStyle = "#00f"; // Blue color for player
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Main game loop
function gameLoop() {
  updatePlayer();
  draw();
  
  // Check for proximity to a building
  const message = checkProximity();
  if (message) {
    // Position the popup above and to the right of the player
    popup.style.left = (player.x + player.width + 10) + "px";
    popup.style.top = (player.y - 10) + "px";
    popup.innerText = message;
    popup.classList.remove("hidden");
  } else {
    popup.classList.add("hidden");
  }
  
  requestAnimationFrame(gameLoop);
}
gameLoop();
