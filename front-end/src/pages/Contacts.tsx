import Search from '@/components/Search'
import ContactList from '@/features/ContactList'
import { useState, useEffect, useMemo } from 'react'
import { getContacts } from '@/services/contactService'
import type { IContact } from '@/types/contact'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ContactListSkeleton from '@/features/ContactListSkeleton'

const Contacts: React.FC = () => {
	const [contacts, setContacts] = useState<IContact[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		const fetchContacts = async () => {
			try {
				// Симуляцію довгого очікування беку
				// await new Promise(resolve => setTimeout(resolve, 1000))
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

	const filteredContacts = useMemo(() => {
		return contacts.filter(
			contact =>
				contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				contact.phoneNumber.includes(searchTerm)
		)
	}, [contacts, searchTerm])

	if (error) {
		return (
			<div className='text-center text-xl text-red-500'>Помилка: {error}</div>
		)
	}

	return (
		<div className='flex flex-col gap-8 items-center w-full px-4'>
			<h1 className='text-3xl font-bold'>Список Контактів</h1>
			<Link to='add-contact'>
				<Button variant='contained' startIcon={<AddIcon />}>
					Створити контакт
				</Button>
			</Link>
			<div>
				<Search
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					onClear={() => setSearchTerm('')}
					placeholder='Пошук за іменем або номером'
				/>
			</div>

			{loading ? (
				<ContactListSkeleton />
			) : (
				<ContactList contacts={filteredContacts} />
			)}
		</div>
	)
}

export default Contacts