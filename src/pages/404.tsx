import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
          {t('notFound.title', 'Page not found')}
        </h2>
        <p className="mt-2 text-gray-600">
          {t('notFound.message', 'The page you are looking for does not exist.')}
        </p>
        <div className="mt-8">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-base font-medium"
          >
            {t('notFound.backToHome', 'Go back home')}
          </button>
        </div>
      </div>
    </div>
  );
}
