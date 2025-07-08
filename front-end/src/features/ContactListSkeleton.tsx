import ContactSkeleton from '@/components/ContactSkeleton';

const ContactListSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ContactSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ContactListSkeleton;