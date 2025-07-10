import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import type { IContact } from '@/types/contact'
import {
	getContactByPhoneNumber,
	deleteContact
} from '@/services/contactService'
import { Button, IconButton, Modal, Box, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import toast from 'react-hot-toast'

const ContactInfo = () => {
	const { phoneNumber } = useParams<{ phoneNumber: string }>()
	const [contact, setContact] = useState<IContact | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [open, setOpen] = useState(false)
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

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleDelete = async () => {
		if (contact?._id) {
			try {
				await deleteContact(contact._id)
				toast.success('Контакт успішно видалено!')
				navigate('/')
			} catch (err: any) {
				setError(err.message)
				toast.error('Помилка при видаленні контакту.')
				try {
					await deleteContact(contact._id)
					navigate('/')
				} catch (err: any) {
					setError(err.message)
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
							<Button variant='contained'>Повернутися до списку</Button>
						</Link>
					</div>
				</div>
			)
		}

		return (
			<div className='flex flex-col items-center p-4'>
				<h1 className='text-4xl font-bold mb-6 text-blue-700'>
					Деталі Контакту
				</h1>

				<div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
					<div className='mb-4'>
						<p className='text-gray-600 text-sm'>Ім'я:</p>
						<p className='text-2xl font-semibold text-gray-900'>
							{contact.name}
						</p>
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
							<Button variant='contained'>Повернутися до списку</Button>
						</Link>
						<Link to={`/edit-contact/${contact.phoneNumber}`}>
							<IconButton aria-label='edit' color='primary'>
								<EditIcon />
							</IconButton>
						</Link>
						<IconButton
							onClick={handleOpen}
							aria-label='delete'
							color='primary'>
							<DeleteIcon />
						</IconButton>
					</div>
				</div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<Box
						sx={{
							position: 'absolute' as const,
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: 400,
							bgcolor: 'background.paper',
							border: '2px solid #000',
							boxShadow: 24,
							p: 4
						}}>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							Ви впевнені, що хочете видалити контакт?
						</Typography>
						<Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
							<Button onClick={handleClose}>Ні</Button>
							<Button onClick={handleDelete} color='error'>
								Так
							</Button>
						</Box>
					</Box>
				</Modal>
			</div>
		)
	}
}

export default ContactInfo
