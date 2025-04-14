const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const slider = document.getElementById("rotationSlider");
const rotationDisplay = document.getElementById("rotationValue");
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextLevelBtn");
const message = document.getElementById("message");

/// This is the basic code, which is used to draw the maze and the ball

const tileSize = 40;
const ballRadius = 0.25;
const gravityStrength = 0.01;
const friction = 0.98;

const levels = [
  [ // Level 1
    ['W','W','W','W','W','W','W','W','W','W'],
    ['W',' ',' ',' ',' ',' ','W',' ',' ','W'],
    ['W','W','W','W','W',' ','W',' ','W','W'],
    ['W',' ',' ',' ','W',' ',' ',' ','W','W'],
    ['W','W','W',' ','W','W','W',' ',' ','W'],
    ['W',' ',' ',' ',' ',' ','W','W',' ','W'],
    ['W',' ','W','W','W',' ',' ',' ',' ','W'],
    ['W',' ',' ',' ','W','W','W','W','W','W'],
    ['W','W','W',' ',' ',' ',' ',' ','E','W'],
    ['W','W','W','W','W','W','W','W','W','W']
  ],
  [ // Level 2
    ['W','W','W','W','W','W','W','W','W','W'],
    ['W',' ',' ',' ','W',' ',' ',' ','E','W'],
    ['W','W','W',' ','W','W',' ','W','W','W'],
    ['W',' ','W',' ',' ','W',' ',' ','W','W'],
    ['W',' ',' ',' ','W','W','W',' ','W','W'],
    ['W',' ','W','W','W',' ','W',' ','W','W'],
    ['W',' ',' ',' ','W',' ',' ',' ',' ','W'],
    ['W','W','W',' ',' ',' ','W','W',' ','W'],
    ['W',' ',' ',' ','W',' ',' ','W',' ','W'],
    ['W','W','W','W','W','W','W','W','W','W']
  ],
  [ // Level 3
    ['W','W','W','W','W','W','W','W','W','W'],
    ['W',' ',' ',' ','W',' ',' ',' ',' ','W'],
    ['W',' ','W',' ','W','W','W','W',' ','W'],
    ['W','W','W',' ',' ',' ',' ',' ',' ','W'],
    ['W',' ','W','W','W','W',' ','W','W','W'],
    ['W',' ',' ',' ',' ',' ',' ','W',' ','W'],
    ['W',' ','W','W',' ','W','W','W',' ','W'],
    ['W',' ',' ','W',' ','W',' ',' ',' ','W'],
    ['W',' ','W','W',' ',' ',' ','W','E','W'],
    ['W','W','W','W','W','W','W','W','W','W']
  ]
];
/// This is what each level of the maze looks like


let currentLevelIndex = 0;
let maze = levels[currentLevelIndex];
let ballPos = { x: 1.5, y: 1.5 };
let ballVel = { x: 0, y: 0 };
let rotation = 0;

/// These codes are about the state of the ball

slider.addEventListener("input", () => {
  rotation = parseInt(slider.value);
  rotationDisplay.innerText = `${rotation}°`;
});

function isWalkable(x, y) {
  return (
    x >= 0 &&
    y >= 0 &&
    y < maze.length &&
    x < maze[0].length &&
    maze[y][x] !== 'W'
  );
}

function renderMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[0].length; x++) {
      if (maze[y][x] === 'W') {
        ctx.fillStyle = "#444";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      } else if (maze[y][x] === 'E') {
        ctx.fillStyle = "#9f0";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    ballPos.x * tileSize,
    ballPos.y * tileSize,
    tileSize * ballRadius,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.restore();
}

function updatePhysics() {
  const angleRad = (rotation * Math.PI) / 180;
  const gx = Math.sin(angleRad) * gravityStrength;
  const gy = Math.cos(angleRad) * gravityStrength;
/// This part is the code for physical gravity, which makes the ball move according to gravity
  ballVel.x += gx;
  ballVel.y += gy;

  ballVel.x *= friction;
  ballVel.y *= friction;

  let nextX = ballPos.x + ballVel.x;
  let nextY = ballPos.y + ballVel.y;

  const xLeft = nextX - ballRadius;
  const xRight = nextX + ballRadius;
  if (
    isWalkable(Math.floor(xLeft), Math.floor(ballPos.y)) &&
    isWalkable(Math.floor(xRight), Math.floor(ballPos.y))
  ) {
    ballPos.x = nextX;
  } else {
    ballVel.x = 0;
  }

  const yTop = nextY - ballRadius;
  const yBottom = nextY + ballRadius;
  if (
    isWalkable(Math.floor(ballPos.x), Math.floor(yTop)) &&
    isWalkable(Math.floor(ballPos.x), Math.floor(yBottom))
  ) {
    ballPos.y = nextY;
  } else {
    ballVel.y = 0;
  }

  const tileX = Math.floor(ballPos.x);
  const tileY = Math.floor(ballPos.y);
  if (maze[tileY][tileX] === 'E') {
    message.textContent = `🎉 FINISH ${currentLevelIndex + 1} `;
    nextBtn.style.display = currentLevelIndex < levels.length - 1 ? "inline-block" : "none";
    ballVel = { x: 0, y: 0 };
  }

  renderMaze();
  requestAnimationFrame(updatePhysics);
}

resetBtn.addEventListener("click", () => {
  ballPos = { x: 1.5, y: 1.5 };
  ballVel = { x: 0, y: 0 };
  rotation = 0;
  slider.value = 0;
  rotationDisplay.innerText = "0°";
  message.textContent = "";
  nextBtn.style.display = "none";
});

// Next
nextBtn.addEventListener("click", () => {
  if (currentLevelIndex < levels.length - 1) {
    currentLevelIndex++;
    maze = levels[currentLevelIndex];
    ballPos = { x: 1.5, y: 1.5 };
    ballVel = { x: 0, y: 0 };
    rotation = 0;
    slider.value = 0;
    rotationDisplay.innerText = "0°";
    message.textContent = "";
    nextBtn.style.display = "none";
  }
});

renderMaze();
updatePhysics();
