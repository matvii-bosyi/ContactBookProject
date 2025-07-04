import Contact from '@/components/Contact';
import type { IContact } from '@/types/contact';

interface ContactListProps {
  contacts: IContact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <div className='w-full h-[500px] max-w-3xl bg-white shadow-md rounded-xl p-[20px]'>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <Contact key={contact.phoneNumber} name={contact.name} phoneNumber={contact.phoneNumber} />
        ))
      ) : (
        <div className="text-center text-gray-500">Контакти не знайдено.</div>
      )}
    </div>
  );
};

export default ContactList;
