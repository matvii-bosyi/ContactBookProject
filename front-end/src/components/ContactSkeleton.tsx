const ContactSkeleton: React.FC = () => {
  return (
    <div className="block bg-white rounded-lg shadow-md p-5">
      <div className="flex items-center space-x-4 animate-pulse">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;