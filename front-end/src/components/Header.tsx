import { Link } from 'react-router-dom'

const Header: React.FC = () => {
	return (
		<header className='bg-blue-600 p-4 text-white shadow-md'>
			<div className='container mx-auto flex items-center justify-between'>
          <Link to="/" className="text-2xl font-bold mr-4">
            Контактна Книга
          </Link>
          <span className="text-lg">Всього контактів: [Кількість]</span>
			</div>
		</header>
	)
}

export default Header
