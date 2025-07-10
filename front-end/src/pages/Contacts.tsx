import Search from '@/components/Search'
import ContactList from '@/features/ContactList'
import { useState, useEffect, useMemo } from 'react'
import { getContacts } from '@/services/contactService'
import type { IContact } from '@/types/contact'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ContactListSkeleton from '@/features/ContactListSkeleton'
import SortButtons, { type SortDirection, type SortType } from '@/components/SortButtons'

const Contacts: React.FC = () => {
	const [contacts, setContacts] = useState<IContact[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [sortType, setSortType] = useState<SortType>('date')
	const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

	useEffect(() => {
		const fetchContacts = async () => {
			try {
				const data = await getContacts()
				setContacts(data)
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message)
				} else {
					setError('An unknown error occurred')
				}
			} finally {
				setLoading(false)
			}
		}

		fetchContacts()
	}, [])

	const processedContacts = useMemo(() => {
		const filtered = contacts.filter(
			contact =>
				contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				contact.phoneNumber.includes(searchTerm)
		)

		const sorted = [...filtered].sort((a, b) => {
			if (sortType === 'name') {
				const nameA = a.name.toLowerCase()
				const nameB = b.name.toLowerCase()
				if (nameA < nameB) return sortDirection === 'asc' ? -1 : 1
				if (nameA > nameB) return sortDirection === 'asc' ? 1 : -1
				return 0
			}
			if (sortType === 'date') {
				const dateA = new Date(a.createdAt || 0).getTime()
				const dateB = new Date(b.createdAt || 0).getTime()
				return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
			}
			return 0
		})

		return sorted
	}, [contacts, searchTerm, sortType, sortDirection])

	const handleSortChange = (type: SortType, direction: SortDirection) => {
		setSortType(type)
		setSortDirection(direction)
	}

	return (
		<div className='flex flex-col gap-8 items-center w-full px-4'>
			<h1 className='text-3xl font-bold'>Список Контактів</h1>
			<Link to='add-contact'>
				<Button variant='contained' startIcon={<AddIcon />}>
					Створити контакт
				</Button>
			</Link>
			<div className="flex flex-col sm:flex-row items-center gap-4">
				<Search
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					onClear={() => setSearchTerm('')}
					placeholder='Пошук за іменем або номером'
				/>
				<SortButtons
					onSortChange={handleSortChange}
					currentSort={sortType}
					currentDirection={sortDirection}
				/>
			</div>

			{error ? (
				<div className='text-center text-xl text-red-500'>Помилка: {error}</div>
			) : loading ? (
				<ContactListSkeleton />
			) : (
				<ContactList contacts={processedContacts} />
			)}
		</div>
	)
}

export default Contacts
