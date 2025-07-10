import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import mainRoutes from './src/routes/main'
const mongoose = require('mongoose')

const DATABASE = process.env.DATABASE

const app = new Hono()

app.route('/api', mainRoutes)

app.use('/*', serveStatic({ root: './public' }))

app.get('*', serveStatic({ path: './public/index.html' }))


async function start() {
	try {
		await mongoose.connect(DATABASE)
		console.log("✅ Connected to MongoDB")
	} catch (e) {
		console.log('❌ DB error', e);
	}	
}

start()

export default {
  port: 3000,
  fetch: app.fetch,
}

console.log("Server is running on port 3000")
