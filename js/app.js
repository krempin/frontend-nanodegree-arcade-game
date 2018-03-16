// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    "use strict";
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    "use strict";
    this.x = this.x + this.speed * dt;

    // Reset enemies when reaching the right border of the canvas
    if (this.x > 505){
      this.x = 0;
    }

    this.checkCollisions();
};

//Check collision of enemy and player
Enemy.prototype.checkCollisions = function() {
  if (this.x + 50 > player.x && this.x < player.x + 20 &&
      this.y + 45 > player.y && this.y < player.y + 40) {
      player.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function (x, y) {
    "use strict";
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
  // If the player reaches the water, so y > -40,
  // set player`s position to default
  "use strict";
  if (this.y < -40) {
    this.reset();
    score += 10;
    changeScore();
  }
}

Player.prototype.render = function() {
  "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keypressed) {
  "use strict";
  if (keypressed == 'left' && this.x > 0) {
    this.x -= 101;
  } else if (keypressed == 'right' && this.x < 400) {
    this.x += 101;
  } else if (keypressed == 'up' && this.y > -50) {
    this.y -= 90;
  } else if (keypressed == 'down' && this.y < 400) {
    this.y += 90;
  }
}

// Resets the location of the player to start position

Player.prototype.reset = function() {
    "use strict";
    this.x = 200;
    this.y = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(-120,60,95);
const enemy2 = new Enemy(-120,140,120);
const enemy3 = new Enemy(-120,225,60);

const allEnemies = [enemy1,enemy2,enemy3];

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Score that adds 10 points every time the player reaches the water

let score = 0;

function changeScore () {
  "use strict";
  document.getElementById('score').innerHTML = score;
}
