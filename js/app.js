// Global variable for the player's score
var score = 0;

// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Places enemies off grid before they start moving at start of game
    this.x = -101;
    // Array of 'y' positions to put enemies in center of rows
    var positions = [305, 230, 150, 65];
    // Gets a random y value from the positions array. I used StackOverflow for guidance on this: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
    this.y = positions[Math.floor(Math.random() * positions.length)];
    // Array of possible speeds for enemies to move
    var speeds = [100, 200, 300];
    this.speed = speeds[Math.floor(Math.random() * speeds.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // When the enemies reach position "x" of 505 on the canvas, they return to off the left side so they can come back in
    if (this.x >= 505) {
        this.x = -101;
    }

    // Checks for collisions within 25 x or y of the player. I referenced this website for guidance on implementing this: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
    if (player.y >= this.y - 25 && player.y <= this.y + 25) {
        if (player.x >= this.x - 25 && player.x <= this.x + 25) {
            player.x = 0;
            player.y = 404;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    // Puts player on bottom row, since image height is 101
    this.y = 401;
    this.speed = 100;
};

// Update's the player's position on screen, required for the game
Player.prototype.update = function (dt) {
    // Checks if player has reached the water and resets it to the bottom row. If so, the player gets one point added to their score and returns to the default position. The #score text is updated on the HTML. 
    if (this.y <= 0) {
        score+=1;
        $("#score").text(score);
        this.x = 0;
        this.y = 404;
    }

    // Once the player scores 10 points, an alert message pops up, and the score is reset to 0.
    if(score ===10) {
        window.alert("Congrats! You won!");
        score = 0;
        $("#score").text(score);
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moves player according to the key input
Player.prototype.handleInput = function (key) {
    // this switch statement both handles input and prevents movement that will lead to going off the canvas
    switch (key) {
    case 'right':
        if (this.x < 401) {
            this.x += 101;
        }
        break;
    case 'left':
        if (this.x > 0) {
            this.x -= 101;
        }
        break;
    case 'up':
        if (this.y > 0) {
            this.y -= 83;
        }
        break;
    case 'down':
        if (this.y < 401) {
            this.y += 83;
        }
        break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

// Creating four enemies
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();

var allEnemies = new Array(enemy1, enemy2, enemy3, enemy4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});