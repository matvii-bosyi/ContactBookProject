import { fetchContacts } from '../api/contact.js';

async function loadContacts() {
    try {
        const contacts = await fetchContacts();
        console.log('Contacts:', contacts);
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
}

loadContacts();
