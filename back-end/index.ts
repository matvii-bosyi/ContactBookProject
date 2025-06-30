import { Hono } from 'hono'
import { cors } from 'hono/cors'
import mainRoutes from './src/routes/main'
const mongoose = require('mongoose')

const DATABASE = process.env.DATABASE

const app = new Hono()
app.use('*', cors())
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