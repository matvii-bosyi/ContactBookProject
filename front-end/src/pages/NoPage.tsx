import { Link } from 'react-router-dom';

const NoPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[calc(100vh-120px)] bg-gray-100 text-gray-800 p-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Сторінку не знайдено</h2>
      <p className="text-lg text-center mb-8 max-w-md">
        На жаль, сторінка, яку ви шукаєте, не існує. Можливо, ви ввели неправильну адресу або сторінка була переміщена.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg"
      >
        Повернутися на головну
      </Link>
    </div>
  );
};

export default NoPage;
