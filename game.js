
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const player = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  width: 20,
  height: 20,
  speed: 5,
};


const objects = [
  { x: 50, y: 50, width: 10, height: 10 },
  { x: 150, y: 150, width: 10, height: 10 },
  { x: 250, y: 250, width: 10, height: 10 }
];

let gameCompleted = false; 


function checkGameCompletion() {
  if (objects.length === 0 && !gameCompleted) {
    gameCompleted = true; 

    
    ctx.fillStyle = "green";
    ctx.font = "24px Arial";
    ctx.fillText("Game Completed", canvas.width / 2 - 100, canvas.height / 2 - 20);
    
    
    const restartButton = document.createElement("button");
    restartButton.textContent = "Click to Restart";
    restartButton.addEventListener("click", restartGame);
    document.body.appendChild(restartButton);
  }
}


function restartGame() {
  gameCompleted = false; 


  player.x = canvas.width / 2;
  player.y = canvas.height - 30;


  objects.length = 0;
  objects.push(
    { x: 50, y: 50, width: 10, height: 10 },
    { x: 150, y: 150, width: 10, height: 10 },
    { x: 250, y: 250, width: 10, height: 10 }
  );


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const restartButton = document.querySelector("button");
  if (restartButton) {
    restartButton.remove();
  }
}


document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
  }
  if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
  if (event.key === "ArrowUp" && player.y > 0) {
    player.y -= player.speed;
  }
  if (event.key === "ArrowDown" && player.y < canvas.height - player.height) {
    player.y += player.speed;
  }
});


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);


  ctx.fillStyle = "green";
  objects.forEach((object) => {
    ctx.fillRect(object.x, object.y, object.width, object.height);
  });

 
  objects.forEach((object, index) => {
    if (
      player.x < object.x + object.width &&
      player.x + player.width > object.x &&
      player.y < object.y + object.height &&
      player.y + player.height > object.y
    ) {
    
      objects.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);

  checkGameCompletion();
}

draw();

