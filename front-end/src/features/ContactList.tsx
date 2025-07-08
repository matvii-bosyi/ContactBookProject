import Contact from '@/components/Contact';
import type { IContact } from '@/types/contact';

interface ContactListProps {
  contacts: IContact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <div className='w-full max-w-4xl'>
      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <Contact key={contact.phoneNumber} {...contact} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-xl">Контакти не знайдено.</p>
          <p className="text-md mt-2">Спробуйте змінити пошуковий запит або додати новий контакт.</p>
        </div>
      )}
    </div>
  );
};

export default ContactList;
