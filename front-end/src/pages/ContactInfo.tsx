import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import type { IContact } from '@/types/contact'
import {
	getContactByPhoneNumber,
	deleteContact
} from '@/services/contactService'
import Button from '@/components/Button'

const ContactInfo: React.FC = () => {
	const { phoneNumber } = useParams<{ phoneNumber: string }>()
	const [contact, setContact] = useState<IContact | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (phoneNumber) {
			const fetchContact = async () => {
				try {
					setLoading(true)
					const fetchedContact = await getContactByPhoneNumber(phoneNumber)
					setContact(fetchedContact)
				} catch (err: any) {
					setError(err.message)
				} finally {
					setLoading(false)
				}
			}
			fetchContact()
		}
	}, [phoneNumber])

	const handleDelete = async () => {
		if (contact && contact._id) {
			if (window.confirm('Чи ви впевнені що хочете видалити контакт?')) {
				try {
					await deleteContact(contact._id)
					navigate('/')
				} catch (err: any) {
					setError(err.message)
				}
			}
		}
	}

	if (loading) {
		return (
			<div className='text-center text-xl'>
				Завантаження інформації про контакт...
			</div>
		)
	}

	if (error) {
		return (
			<div className='text-center text-xl text-red-500'>Помилка: {error}</div>
		)
	}

	if (!contact) {
		return (
			<div className='text-center text-xl text-gray-600'>
				Контакт з номером {phoneNumber} не знайдено.
				<div className='mt-4'>
					<Link to='/'>
						<Button variant='back'>Повернутися до списку</Button>
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col items-center p-4'>
			<h1 className='text-4xl font-bold mb-6 text-blue-700'>Деталі Контакту</h1>

			<div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
				<div className='mb-4'>
					<p className='text-gray-600 text-sm'>Ім'я:</p>
					<p className='text-2xl font-semibold text-gray-900'>{contact.name}</p>
				</div>

				<div className='mb-4'>
					<p className='text-gray-600 text-sm'>Номер телефону:</p>
					<p className='text-xl text-gray-800'>{contact.phoneNumber}</p>
				</div>

				{contact.gmail && (
					<div className='mb-4'>
						<p className='text-gray-600 text-sm'>Gmail:</p>
						<p className='text-xl text-gray-800'>{contact.gmail}</p>
					</div>
				)}

				{contact.discord && (
					<div className='mb-4'>
						<p className='text-gray-600 text-sm'>Discord:</p>
						<p className='text-xl text-gray-800'>{contact.discord}</p>
					</div>
				)}

				{contact.telegram && (
					<div className='mb-4'>
						<p className='text-gray-600 text-sm'>Telegram:</p>
						<p className='text-xl text-gray-800'>{contact.telegram}</p>
					</div>
				)}

				{contact.github && (
					<div className='mb-4'>
						<p className='text-gray-600 text-sm'>GitHub:</p>
						<p className='text-xl text-gray-800'>{contact.github}</p>
					</div>
				)}

				{contact.note && (
					<div className='mb-4'>
						<p className='text-gray-600 text-sm'>Примітка:</p>
						<p className='text-xl text-gray-800'>{contact.note}</p>
					</div>
				)}

				<div className='mt-6 flex justify-center space-x-4'>
					<Link to='/'>
						<Button variant='back'>Повернутися до списку</Button>
					</Link>
					<Button variant='delete' onClick={handleDelete}>Видалити</Button>
				</div>
			</div>
		</div>
	)
}

export default ContactInfo
