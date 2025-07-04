import { FaTrash, FaArrowLeft, FaPlus } from 'react-icons/fa';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'delete' | 'back' | 'add';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant, ...props }) => {
  const baseStyles = 'text-xs uppercase tracking-[2.5px] font-medium transition-all duration-[0.3s] ease-[ease] delay-[0s] cursor-pointer px-[3em] py-[1.3em] rounded-[45px] border-[none] flex items-center justify-center';

  const variantStyles = {
    delete: 'bg-red-500 text-white hover:bg-red-700 hover:shadow-[0px_15px_20px_rgba(255,0,0,0.4)]',
    back: 'bg-gray-500 text-white hover:bg-gray-700 hover:shadow-[0px_15px_20px_rgba(128,128,128,0.4)]',
    add: 'bg-green-500 text-white hover:bg-green-700 hover:shadow-[0px_15px_20px_rgba(0,255,0,0.4)]',
  };

  const icons = {
    delete: <FaTrash className="mr-2" />,
    back: <FaArrowLeft className="mr-2" />,
    add: <FaPlus className="mr-2" />,
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icons[variant]}
      {children}
    </button>
  );
};

export default Button;