import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
	getContactByPhoneNumber,
	updateContact
} from '@/services/contactService'
import type { IContact } from '@/types/contact'
import Input from '@/components/Input'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import toast from 'react-hot-toast'

const EditContact = () => {
	const { phoneNumber } = useParams<{ phoneNumber: string }>()
	const [formData, setFormData] = useState<IContact | null>(null)
	const [errors, setErrors] = useState<Partial<Record<keyof IContact, string>>>(
		{}
	)
	const navigate = useNavigate()

	useEffect(() => {
		if (phoneNumber) {
			const fetchContact = async () => {
				try {
					const contact = await getContactByPhoneNumber(phoneNumber)
					if (contact) {
						setFormData(contact)
					}
				} catch (error) {
					console.error('Failed to fetch contact:', error)
				}
			}
			fetchContact()
		}
	}, [phoneNumber])

	const validate = (): boolean => {
		if (!formData) return false
		const newErrors: Partial<Record<keyof IContact, string>> = {}
		if (formData.name.length < 3) {
			newErrors.name = 'Name must be at least 3 characters long'
		}
		if (!/^\+?[0-9\s\-]{7,15}$/.test(formData.phoneNumber)) {
			newErrors.phoneNumber = 'Invalid phone number format'
		}
		if (
			formData.gmail &&
			!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.gmail)
		) {
			newErrors.gmail = 'Please fill a valid email address'
		}
		if (
			formData.discord &&
			!/^https:\/\/discord\.com\/.+$/.test(formData.discord)
		) {
			newErrors.discord = 'URL must start with https://discord.com/'
		}
		if (formData.telegram && !/^https:\/\/t\.me\/.+$/.test(formData.telegram)) {
			newErrors.telegram = 'URL must start with https://t.me/'
		}
		if (
			formData.github &&
			!/^https:\/\/github\.com\/.+$/.test(formData.github)
		) {
			newErrors.github = 'URL must start with https://github.com/'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => (prev ? { ...prev, [name]: value } : null))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!formData || !validate()) {
			toast.error('Будь ласка, виправте помилки у формі.')
			return
		}
		try {
			if (formData._id) {
				await updateContact(formData._id, formData)
				toast.success('Контакт успішно оновлено!')
				navigate(`/contact/${formData.phoneNumber}`)
			} else {
				console.error('Contact ID is missing')
				toast.error('Помилка: ID контакту відсутній.')
			}
		} catch (error: any) {
			if (error.status === 409) {
				setErrors({ phoneNumber: 'Цей номер телефону вже існує.' })
				toast.error('Контакт з таким номером телефону вже існує.')
			} else if (error.error) {
				setErrors({ phoneNumber: error.error })
				toast.error(error.error)
			} else {
				console.error('Failed to update contact:', error)
				toast.error('Помилка при оновленні контакту.')
			}
		}
	}

	if (!formData) {
		return <div>Loading...</div>
	}

	return (
		<div className='flex flex-col items-center p-4'>
			<h1 className='text-2xl font-bold mb-4'>Edit Contact</h1>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-center space-y-4'>
				<Input
					label='Name'
					id='name'
					value={formData.name}
					onChange={handleChange}
					required
					minLength={3}
					error={errors.name}
				/>
				<Input
					label='Phone Number'
					id='phoneNumber'
					type='tel'
					value={formData.phoneNumber}
					onChange={handleChange}
					required
					pattern='^\+?[0-9\s\-]{7,15}$'
					error={errors.phoneNumber}
				/>
				<Input
					label='Gmail'
					id='gmail'
					type='email'
					value={formData.gmail || ''}
					onChange={handleChange}
					error={errors.gmail}
				/>
				<Input
					label='Note'
					id='note'
					as='textarea'
					value={formData.note || ''}
					onChange={handleChange}
				/>
				<Input
					label='Discord'
					id='discord'
					type='url'
					value={formData.discord || ''}
					onChange={handleChange}
					placeholder='https://discord.com/...'
					error={errors.discord}
				/>
				<Input
					label='Telegram'
					id='telegram'
					type='url'
					value={formData.telegram || ''}
					onChange={handleChange}
					placeholder='https://t.me/...'
					error={errors.telegram}
				/>
				<Input
					label='Github'
					id='github'
					type='url'
					value={formData.github || ''}
					onChange={handleChange}
					placeholder='https://github.com/...'
					error={errors.github}
				/>
				<Button variant='contained' startIcon={<EditIcon />} type='submit'>
					Зберенгти зміни
				</Button>
			</form>
		</div>
	)
}

export default EditContact
