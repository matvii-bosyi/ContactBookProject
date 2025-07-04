import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addContact } from '@/services/contactService'
import type { IContact } from '@/types/contact'
import Button from '@/components/Button'
import Input from '@/components/Input'

const AddContact = () => {
	const [formData, setFormData] = useState<IContact>({
		name: '',
		phoneNumber: '',
		gmail: '',
		note: '',
		discord: '',
		telegram: '',
		github: ''
	})

	const [errors, setErrors] = useState<Partial<Record<keyof IContact, string>>>(
		{}
	)
	const navigate = useNavigate()

	const validate = (): boolean => {
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
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validate()) {
			return
		}
		try {
			await addContact(formData)
			navigate('/')
		} catch (error: any) {
			if (error.response && error.response.data && error.response.data.error) {
				setErrors({ phoneNumber: error.response.data.error })
			} else {
				console.error('Failed to add contact:', error)
			}
		}
	}

	return (
		<div className='flex flex-col items-center p-4'>
			<h1 className='text-2xl font-bold mb-4'>Add Contact</h1>
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
					value={formData.gmail}
					onChange={handleChange}
					error={errors.gmail}
				/>
				<Input
					label='Note'
					id='note'
					as='textarea'
					value={formData.note}
					onChange={handleChange}
				/>
				<Input
					label='Discord'
					id='discord'
					type='url'
					value={formData.discord}
					onChange={handleChange}
					placeholder='https://discord.com/...'
					error={errors.discord}
				/>
				<Input
					label='Telegram'
					id='telegram'
					type='url'
					value={formData.telegram}
					onChange={handleChange}
					placeholder='https://t.me/...'
					error={errors.telegram}
				/>
				<Input
					label='Github'
					id='github'
					type='url'
					value={formData.github}
					onChange={handleChange}
					placeholder='https://github.com/...'
					error={errors.github}
				/>
				<Button variant='add' type='submit'>
					Add Contact
				</Button>
			</form>
		</div>
	)
}

export default AddContact
