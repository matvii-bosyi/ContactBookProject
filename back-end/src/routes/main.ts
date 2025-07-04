import { Hono } from 'hono'
import mongoose from 'mongoose'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import Contact from '../models/Contact'

const mainRoutes = new Hono()

const contactSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  phoneNumber: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, 'Invalid phone number format'),
  gmail: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')), // Allow empty string
  note: z.string().optional(),
  discord: z.string().url({ message: 'Invalid URL' }).startsWith('https://discord.com/', { message: 'URL must start with https://discord.com/' }).optional().or(z.literal('')),
  telegram: z.string().url({ message: 'Invalid URL' }).startsWith('https://t.me/', { message: 'URL must start with https://t.me/' }).optional().or(z.literal('')),
  github: z.string().url({ message: 'Invalid URL' }).startsWith('https://github.com/', { message: 'URL must start with https://github.com/' }).optional().or(z.literal(''))
})

mainRoutes.get('/', async c => {
	try {
		const contacts = await Contact.find().sort({ createdAt: -1 })
		return c.json(contacts)
	} catch (err) {
		return c.json({ error: 'Failed to fetch contacts' }, 500)
	}
})

mainRoutes.get('/phone/:phoneNumber', async c => {
  try {
    const phoneNumber = c.req.param('phoneNumber')
    const contact = await Contact.findOne({ phoneNumber })

    if (!contact) {
      return c.json({ error: 'Contact not found' }, 404)
    }

    return c.json(contact)
  } catch (err) {
    return c.json({ error: 'Failed to fetch contact' }, 500)
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

mainRoutes.post('/', zValidator('json', contactSchema), async c => {
  try {
    const body = c.req.valid('json')
    const contact = new Contact(body)
    await contact.save()
    return c.json({ message: 'Contact created', contact }, 201)
  } catch (err) {
    if (typeof err === 'object' && err !== null && 'code' in err && (err as any).code === 11000) {
      return c.json({ error: 'Phone number already exists' }, 409)
    }
    return c.json({ error: 'Failed to create contact' }, 500)
  }
})

mainRoutes.patch('/:id', zValidator('json', contactSchema.partial()), async c => {
  try {
    const id = c.req.param('id')

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return c.json({ error: 'Invalid ID format' }, 400)
    }

    const body = c.req.valid('json')

    const updated = await Contact.findByIdAndUpdate(
      id,
      body,
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