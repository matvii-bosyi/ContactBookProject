const canvasElement = document.getElementById('canvas')
const ctx = canvasElement.getContext('2d')

let entityCount = 10
let entitySpeed = 1
let entitySize = 20

const images = {
  rock: new Image(),
  paper: new Image(),
  scissors: new Image(),
};

images.rock.src = 'img/Rock.png';
images.paper.src = 'img/Paper.png';
images.scissors.src = 'img/Scissors.png';


const beats = {
	rock: 'scissors',
	paper: 'rock',
	scissors: 'paper'
}

class Entity {
	constructor(x, y, type) {
		this.x = x
		this.y = y
		this.type = type
		this.dx = (Math.random() * 2 - 1) * entitySpeed
		this.dy = (Math.random() * 2 - 1) * entitySpeed
		this.radius = entitySize
	}

	move(canvas) {
		this.x += this.dx
		this.y += this.dy

		if (this.x < this.radius || this.x > canvas.width - this.radius)
			this.dx *= -1
		if (this.y < this.radius || this.y > canvas.height - this.radius)
			this.dy *= -1
	}

	// draw(ctx) {
	// 	ctx.beginPath()

	// 	const colors = {
	// 		rock: 'gray',
	// 		paper: 'white',
	// 		scissors: 'red'
	// 	}
	// 	ctx.fillStyle = colors[this.type]

	// 	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
	// 	ctx.fill()
	// 	ctx.stroke()

	// 	ctx.closePath()
	// }
  draw(ctx) {
    const img = images[this.type];
    const size = this.radius * 2;
    if (img.complete) {
      ctx.drawImage(img, this.x - this.radius, this.y - this.radius, size, size);
    } else {
      ctx.beginPath();
      const colors = { rock: 'gray', paper: 'white', scissors: 'red' };
      ctx.fillStyle = colors[this.type];
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }
}

const entities = []

for (let i = 0; i < entityCount; i++) {
	entities.push(
		new Entity(20 + Math.random() * 50, 20 + Math.random() * 50, 'rock')
	)

	entities.push(
		new Entity(
			canvasElement.width - 20 - Math.random() * 50,
			20 + Math.random() * 50,
			'scissors'
		)
	)
}

for (let i = 0; i < entityCount; i++) {
	entities.push(
		new Entity(
			canvasElement.width / 2 - 100 + Math.random() * 200,
			canvasElement.height - 20 - Math.random() * 50,
			'paper'
		)
	)
}

function checkCollisions() {
	for (let i = 0; i < entities.length; i++) {
		for (let j = i + 1; j < entities.length; j++) {
			const a = entities[i]
			const b = entities[j]

			const dist = Math.hypot(a.x - b.x, a.y - b.y)
			if (dist < a.radius + b.radius) {
				if (beats[a.type] === b.type) {
					b.type = a.type
				} else if (beats[b.type] === a.type) {
					a.type = b.type
				}
			}
		}
	}
}

const countRange = document.getElementById('countRange');
const speedRange = document.getElementById('speedRange');
const sizeRange = document.getElementById('sizeRange');

const countValue = document.getElementById('countValue');
const speedValue = document.getElementById('speedValue');
const sizeValue = document.getElementById('sizeValue');

countRange.addEventListener('input', () => {
  entityCount = +countRange.value;
  countValue.textContent = entityCount;
  resetGame();
});

speedRange.addEventListener('input', () => {
  entitySpeed = +speedRange.value;
  speedValue.textContent = entitySpeed.toFixed(1);

  for (const e of entities) {
    e.dx = (Math.random() * 2 - 1) * entitySpeed;
    e.dy = (Math.random() * 2 - 1) * entitySpeed;
  }
});

sizeRange.addEventListener('input', () => {
  entitySize = +sizeRange.value;
  sizeValue.textContent = entitySize;

  for (const e of entities) {
    e.radius = entitySize / 2;
  }
  // resetGame();
});

function countTypes() {
	const counts = { rock: 0, paper: 0, scissors: 0 }
	for (const entity of entities) {
		counts[entity.type]++
	}
	return counts
}

function animate() {
	ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)

	for (const entity of entities) {
		entity.move(canvasElement)
		entity.draw(ctx)
	}

	checkCollisions()

	function updateCounter() {
		const counts = countTypes()
		document.getElementById('rockCount').textContent = counts.rock
		document.getElementById('paperCount').textContent = counts.paper
		document.getElementById('scissorsCount').textContent = counts.scissors
	}

	requestAnimationFrame(animate)
  updateCounter();
}

animate()

function resetGame() {
  entities.length = 0;

  // Спавн знову (як у початковому коді)
  for (let i = 0; i < entityCount; i++) {
    entities.push(new Entity(20 + Math.random() * 50, 20 + Math.random() * 50, 'rock'));
    entities.push(new Entity(canvasElement.width - 20 - Math.random() * 50, 20 + Math.random() * 50, 'scissors'));
  }
  for (let i = 0; i < entityCount; i++) {
    entities.push(new Entity(canvasElement.width / 2 - 100 + Math.random() * 200, canvasElement.height - 20 - Math.random() * 50, 'paper'));
  }
}

document.getElementById('resetBtn').addEventListener('click', resetGame);
