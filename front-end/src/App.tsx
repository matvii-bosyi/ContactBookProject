import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import ContactInfo from '@/pages/ContactInfo'
import NoPage from '@/pages/NoPage'
import Contacts from '@/pages/Contacts'
import AddContact from '@/pages/AddContact'
import EditContact from '@/pages/EditContact'
function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<Contacts />} />
				<Route path='add-contact' element={<AddContact />} />
				<Route path='edit-contact/:phoneNumber' element={<EditContact />} />
				<Route path='contact/:phoneNumber' element={<ContactInfo />} />
				<Route path='*' element={<NoPage />} />
			</Route>
		</Routes>
	)
}

export default App
