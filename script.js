// Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#222",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    }
  };
  
  const game = new Phaser.Game(config);
  
  let player;
  let cursors;
  let buildings = [];  // Array to store building objects
  let popupText;       // Text object for popup messages
  
  // Preload assets
  function preload() {
    // Load a sprite image (using Phaser Labs asset)
    this.load.image("player", "https://labs.phaser.io/assets/sprites/dude.png");
  }
  
  // Create the game scene
  function create() {
    // Create the player sprite and enable arcade physics
    player = this.physics.add.sprite(100, 100, "player");
    player.setCollideWorldBounds(true);
    player.setScale(0.5); // Scale down the sprite to a reasonable size
  
    // Setup arrow keys input
    cursors = this.input.keyboard.createCursorKeys();
  
    // Helper function to create a building (as a static physics object)
    function createBuilding(scene, x, y, width, height, message) {
      // Draw a rectangle using Phaser's Graphics, then convert it into a texture
      let graphics = scene.add.graphics();
      graphics.fillStyle(0x8B4513, 1);
      graphics.fillRect(0, 0, width, height);
      // Generate a texture from this graphic
      let key = `building_${x}_${y}`;
      graphics.generateTexture(key, width, height);
      graphics.destroy();
      
      // Create an image from the generated texture and position it with center origin
      let building = scene.physics.add.staticImage(x, y, key);
      building.setOrigin(0.5, 0.5);
      building.message = message;
      buildings.push(building);
    }
  
    // Create several buildings with positions, dimensions, and associated messages
    createBuilding(this, 400, 300, 150, 100, "At Building A, I developed a scalable backend solution.");
    createBuilding(this, 700, 500, 120, 100, "At Building B, I led a full-stack integration project.");
    createBuilding(this, 1000, 250, 150, 120, "At Building C, I optimized system performance.");
  
    // Create a popup text object; it will be updated and shown when near a building.
    popupText = this.add.text(0, 0, "", { font: "16px Arial", fill: "#fff", backgroundColor: "rgba(0,0,0,0.7)", padding: { x: 5, y: 5 }});
    popupText.setVisible(false);
  }
  
  // Update loop: handle movement and check for proximity to buildings
  function update() {
    const speed = 200;
    player.setVelocity(0);
  
    // Move the player based on arrow key input
    if (cursors.left.isDown) {
      player.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      player.setVelocityX(speed);
    }
    if (cursors.up.isDown) {
      player.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      player.setVelocityY(speed);
    }
  
    // Check if the player is near any building
    let threshold = 100;  // Distance threshold (in pixels)
    let foundMessage = null;
    for (let building of buildings) {
      let dx = player.x - building.x;
      let dy = player.y - building.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < threshold) {
        foundMessage = building.message;
        break;  // Show only one building's message at a time
      }
    }
    
    if (foundMessage) {
      // Update and display the popup text near the player
      popupText.setText(foundMessage);
      popupText.setPosition(player.x + 40, player.y - 20);
      popupText.setVisible(true);
    } else {
      popupText.setVisible(false);
    }
  }
  