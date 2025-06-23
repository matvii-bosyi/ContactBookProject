import { Hono } from 'hono';
import { eta } from '../../index'
const Contact = require("../models/Contact");

const mainRoutes = new Hono();

mainRoutes.get('/', async (c) => {
	const contacts = await Contact.find().sort({ createdAt: -1 });

	const html = await eta.render('layouts/main', { contacts })

	return c.html(html)
});

mainRoutes.post('/create', async (c) => {
  const body = await c.req.json()

  const contact = new Contact({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });

  await contact.save();
  return c.redirect("/");
});

mainRoutes.delete('/delete', async (c) => {
  const body = await c.req.json()

  await Contact.findByIdAndDelete(body.id);

  return c.redirect("/");
});

export default mainRoutes