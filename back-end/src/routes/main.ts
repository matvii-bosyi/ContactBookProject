import { Hono } from 'hono'
import mongoose from 'mongoose'
import Contact from '../models/Contact'

const mainRoutes = new Hono()

mainRoutes.get('/', async c => {
	try {
		const contacts = await Contact.find().sort({ createdAt: -1 })
		return c.json(contacts)
	} catch (err) {
		return c.json({ error: 'Failed to fetch contacts' }, 500)
	}
})

mainRoutes.get('/:id', async c => {
	try {
		const id = c.req.param('id')

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return c.json({ error: 'Invalid ID format' }, 400)
		}

		const contact = await Contact.findById(id)

		if (!contact) {
			return c.json({ error: 'Contact not found' }, 404)
		}

		return c.json(contact)
	} catch (err) {
		return c.json({ error: 'Failed to fetch contact' }, 500)
	}
})

mainRoutes.post('/', async c => {
	try {
		const body = await c.req.json()

		if (!body.name || !body.phoneNumber) {
			return c.json({ error: 'Name and phoneNumber are required' }, 400)
		}

		const contact = new Contact({
			name: body.name,
			phoneNumber: body.phoneNumber
		})

		await contact.save()
		return c.json({ message: 'Contact created', contact }, 201)
	} catch (err) {
		if (typeof err === 'object' && err !== null && 'code' in err && (err as any).code === 11000) {
			return c.json({ error: 'Phone number already exists' }, 409)
		}
		return c.json({ error: 'Failed to create contact' }, 500)
	}
})

mainRoutes.put('/:id', async c => {
	try {
		const id = c.req.param('id')

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return c.json({ error: 'Invalid ID format' }, 400)
		}

		const body = await c.req.json()

		if (!body.name || !body.phoneNumber) {
			return c.json({ error: 'Name and phoneNumber are required' }, 400)
		}

		const updated = await Contact.findByIdAndUpdate(
			id,
			{ name: body.name, phoneNumber: body.phoneNumber },
			{ new: true, runValidators: true }
		)

		if (!updated) {
			return c.json({ error: 'Contact not found' }, 404)
		}

		return c.json({ message: 'Contact updated', contact: updated }, 200)
	} catch (err) {
		if (typeof err === 'object' && err !== null && 'code' in err && (err as any).code === 11000) {
			return c.json({ error: 'Phone number already exists' }, 409)
		}
		return c.json({ error: 'Failed to update contact' }, 500)
	}
})

mainRoutes.delete('/:id', async c => {
	try {
		const id = c.req.param('id')

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return c.json({ error: 'Invalid ID format' }, 400)
		}

		const deleted = await Contact.findByIdAndDelete(id)

		if (!deleted) {
			return c.json({ error: 'Contact not found' }, 404)
		}

		return c.json({ message: 'Contact deleted' }, 200)
	} catch (err) {
		return c.json({ error: 'Failed to delete contact' }, 500)
	}
})

export default mainRoutes