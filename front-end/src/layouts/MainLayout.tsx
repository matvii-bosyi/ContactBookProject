import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { getContacts } from '@/services/contactService';
import type { IContact } from '@/types/contact';

const MainLayout: React.FC = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header contactCount={contacts.length} />
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
