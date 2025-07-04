import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
