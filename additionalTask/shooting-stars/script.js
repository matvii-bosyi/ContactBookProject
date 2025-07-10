const canvas = document.getElementById('starsCanvas')
const ctx = canvas.getContext('2d')

const CONFIG = {
	STAR_TAIL_LENGTH: 50,
	STAR_SIZE_MIN: 1,
	STAR_SIZE_MAX: 3,
	STAR_SPEED_MIN: 0.3,
	STAR_SPEED_MAX: 0.5,
	FLASH_INITIAL_RADIUS: 10,
	FLASH_RADIUS_GROWTH: 5,
	FLASH_OPACITY_DECAY: 0.05,
	STAR_CREATION_PROBABILITY: 0.1
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let stars = []
let flashes = []

class Star {
	constructor(x, y, size, speed) {
		this.x = x
		this.y = y
		this.size = size
		this.speed = speed
		const intensity = Math.floor(Math.random() * 56) + 200
		const hexColor = intensity.toString(16)
		this.color = `#${hexColor}${hexColor}${hexColor}`
		this.tailLength = CONFIG.STAR_TAIL_LENGTH
	}

	update() {
		this.x += this.speed
		this.y += this.speed
	}

	draw() {
		ctx.beginPath()
		ctx.lineCap = 'round'
		const gradient = ctx.createLinearGradient(
			this.x,
			this.y,
			this.x - this.tailLength,
			this.y - this.tailLength
		)
		gradient.addColorStop(0, this.color)
		gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
		ctx.strokeStyle = gradient
		ctx.lineWidth = this.size
		ctx.moveTo(this.x, this.y)
		ctx.lineTo(this.x - this.tailLength, this.y - this.tailLength)
		ctx.stroke()
	}

	isHovered(clickX, clickY) {
		const distance = Math.sqrt((clickX - this.x) ** 2 + (clickY - this.y) ** 2)
		return distance < this.size * 5
	}
}

class Flash {
	constructor(x, y, color) {
		this.x = x
		this.y = y
		this.color = color
		this.radius = CONFIG.FLASH_INITIAL_RADIUS
		this.opacity = 1
	}

	draw() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		ctx.fillStyle = `rgba(${parseInt(this.color.slice(1, 3), 16)}, ${parseInt(
			this.color.slice(3, 5),
			16
		)}, ${parseInt(this.color.slice(5, 7), 16)}, ${this.opacity})`
		ctx.fill()
	}

	update() {
		this.radius += CONFIG.FLASH_RADIUS_GROWTH
		this.opacity -= CONFIG.FLASH_OPACITY_DECAY
	}
}

function createStar() {
	const size =
		Math.random() * (CONFIG.STAR_SIZE_MAX - CONFIG.STAR_SIZE_MIN) +
		CONFIG.STAR_SIZE_MIN
	const speed =
		Math.random() * (CONFIG.STAR_SPEED_MAX - CONFIG.STAR_SPEED_MIN) +
		CONFIG.STAR_SPEED_MIN
	const x = Math.random() * canvas.width - canvas.width / 2
	const y = Math.random() * canvas.height - canvas.height / 2
	stars.push(new Star(x, y, size, speed))
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	if (Math.random() < CONFIG.STAR_CREATION_PROBABILITY) {
		createStar()
	}

	stars.forEach((star, index) => {
		star.update()
		star.draw()

		if (
			star.x > canvas.width + star.tailLength ||
			star.y > canvas.height + star.tailLength
		) {
			stars.splice(index, 1)
		}
	})

	flashes.forEach((flash, index) => {
		flash.update()
		flash.draw()

		if (flash.opacity <= 0) {
			flashes.splice(index, 1)
		}
	})

	requestAnimationFrame(animate)
}

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
})

canvas.addEventListener('mousemove', event => {
	const mouseX = event.clientX
	const mouseY = event.clientY

	stars.forEach((star, index) => {
		if (star.isHovered(mouseX, mouseY)) {
			flashes.push(new Flash(star.x, star.y, star.color))
			stars.splice(index, 1)
		}
	})
})

animate()
