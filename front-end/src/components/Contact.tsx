import { Link } from 'react-router-dom';
import type { IContact } from '@/types/contact';

const Contact: React.FC<IContact> = ({ name, phoneNumber }) => {
  return (
    <Link
      to={`/contact/${phoneNumber}`}
      className="border-b border-gray-200 py-2 px-4 flex justify-between items-center hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
    >
      <div className="text-lg font-medium">{name}</div>
      <div className="text-gray-600">{phoneNumber}</div>
    </Link>
  );
};

export default Contact;