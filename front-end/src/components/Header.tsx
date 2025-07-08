import { Link } from 'react-router-dom';

interface HeaderProps {
  contactCount: number;
}

const Header: React.FC<HeaderProps> = ({ contactCount }) => {
  return (
    <header className='sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10'>
      <div className='container mx-auto flex items-center justify-between p-4 border-b border-gray-200'>
        <Link to='/' className='text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors'>
          Контактна Книга
        </Link>
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="font-medium">Всього контактів:</span>
          <span className="font-bold text-blue-600 text-lg">{contactCount}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
