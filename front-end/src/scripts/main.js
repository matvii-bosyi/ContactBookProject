import { getAllContacts } from '../api/contact.api.js';

async function loadContacts() {
    try {
        const contacts = await getAllContacts();
        console.log('Contacts:', contacts);
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
}

loadContacts();
