const API_BASE_URL = 'http://localhost:3000';

/**
 * Fetches all contacts from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of contacts.
 */
export async function getAllContacts() {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}

/**
 * Fetches a single contact by its ID.
 * @param {string} id - The ID of the contact to fetch.
 * @returns {Promise<Object>} A promise that resolves to the contact object.
 */
export async function getContactById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch contact');
    }
    return await response.json();
}

/**
 * Creates a new contact.
 * @param {Object} contactData - The data for the new contact (e.g., { name, phoneNumber }).
 * @returns {Promise<Object>} A promise that resolves to the newly created contact object.
 */
export async function createContact(contactData) {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create contact');
    }
    return await response.json();
}

/**
 * Updates an existing contact.
 * @param {string} id - The ID of the contact to update.
 * @param {Object} contactData - The new data for the contact.
 * @returns {Promise<Object>} A promise that resolves to the updated contact object.
 */
export async function updateContact(id, contactData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update contact');
    }
    return await response.json();
}

/**
 * Deletes a contact by its ID.
 * @param {string} id - The ID of the contact to delete.
 * @returns {Promise<Object>} A promise that resolves to the deletion confirmation message.
 */
export async function deleteContact(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete contact');
    }
    return await response.json();
}
