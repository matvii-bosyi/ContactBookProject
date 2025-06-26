import { Hono } from 'hono'
import { Eta } from 'eta'
import { serveStatic } from 'hono/bun'
import mainRoutes from './src/routes/main'
const mongoose = require('mongoose')

const DATABASE = process.env.DATABASE

export const eta = new Eta({
  views: './src/views',
  cache: false, 
})

const app = new Hono()
app.use('/public/*', serveStatic({ root: './' }))
app.route('/', mainRoutes)

async function start() {
	try {
		await mongoose.connect(DATABASE)
		console.log("✅ Connected to MongoDB")
	} catch (e) {
		console.log('❌ DB error', e);
	}	
}

start()

export default app