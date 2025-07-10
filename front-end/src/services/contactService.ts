import type { IContact } from '@/types/contact';

const API_BASE_URL = '/api/';

export const getContacts = async (): Promise<IContact[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}contacts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IContact[] = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка при отриманні контактів:", error);
    throw error; 
  }
};

export const addContact = async (newContact: IContact): Promise<IContact> => {
  const response = await fetch(`${API_BASE_URL}contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newContact),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw { ...errorData, status: response.status };
  }
  const data: IContact = await response.json();
  return data;
};

export const getContactByPhoneNumber = async (phoneNumber: string): Promise<IContact | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}contacts/phone/${phoneNumber}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IContact = await response.json();
    return data;
  } catch (error) {
    console.error(`Помилка при отриманні контакту з номером ${phoneNumber}:`, error);
    throw error;
  }
};

export const deleteContact = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Помилка при видаленні контакту з id ${id}:`, error);
    throw error;
  }
};

export const updateContact = async (id: string, updatedContact: IContact): Promise<IContact> => {
  const response = await fetch(`${API_BASE_URL}contacts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedContact),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw { ...errorData, status: response.status };
  }
  const data: IContact = await response.json();
  return data;
};

export const getContactById = async (id: string): Promise<IContact | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}contacts/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IContact = await response.json();
    return data;
  } catch (error) {
    console.error(`Помилка при отриманні контакту з id ${id}:`, error);
    throw error;
  }
};