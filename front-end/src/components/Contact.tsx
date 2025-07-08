import { Link } from 'react-router-dom';
import type { IContact } from '@/types/contact';

const Contact: React.FC<IContact> = ({ name, phoneNumber  }) => {
  return (
    <Link
      to={`/contact/${phoneNumber}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img 
              className="w-16 h-16 rounded-full object-cover"
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
              alt={`${name}'s avatar`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl font-bold text-gray-900 truncate">
              {name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Contact;