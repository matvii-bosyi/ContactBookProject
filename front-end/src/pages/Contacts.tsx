import Button from '@/components/Button'
import Search from '@/components/Search'
import ContactList from '@/features/ContactList'
import { useState, useEffect } from 'react'
import { getContacts } from '@/services/contactService'
import type { IContact } from '@/types/contact'
import { Link } from 'react-router-dom'

const Contacts: React.FC = () => {
	const [contacts, setContacts] = useState<IContact[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchContacts = async () => {
			try {
				const data = await getContacts()
				setContacts(data)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchContacts()
	}, [])

	if (error) {
		return (
			<div className='text-center text-xl text-red-500'>Помилка: {error}</div>
		)
	}

	return (
		<div className='flex flex-col gap-8 items-center'>
			<h1 className='text-3xl font-bold'>Список Контактів</h1>
      <Link to="add-contact">
        <Button variant='add' className=''>Створити Контакт</Button>
      </Link>
			<Search />
			{loading ? <div>Loading...</div> : <ContactList contacts={contacts} />}
		</div>
	)
}

export default Contacts
