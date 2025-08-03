import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const MySwal = withReactContent(Swal);

interface FormData {
  name: string;
  email: string;
  motivation: string;
  portfolio: string;
  cv: File | null;
  idCard: File | null;
}


interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, jobTitle }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    motivation: '',
    portfolio: '',
    cv: null,
    idCard: null,
  });
  // État pour suivre la soumission en cours
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  // Afficher les notifications avec SweetAlert2
  const showAlert = (success: boolean, message: string) => {
    MySwal.fire({
      title: success ? (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-6 h-6" />
          <span>{t('apply.successTitle', 'Succès !')}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-600">
          <XCircle className="w-6 h-6" />
          <span>{t('apply.errorTitle', 'Erreur')}</span>
        </div>
      ),
      text: message,
      icon: success ? 'success' : 'error',
      confirmButtonText: t('common.ok', 'OK'),
      confirmButtonColor: success ? '#10B981' : '#EF4444',
      customClass: {
        popup: 'rounded-xl shadow-xl',
        confirmButton: 'px-4 py-2 rounded-lg font-medium',
      },
      buttonsStyling: false,
      showClass: {
        popup: 'animate-fade-in-up animate-duration-300',
      },
      hideClass: {
        popup: 'animate-fade-out-down animate-duration-200',
      },
    });
  };

  // Afficher un message de confirmation avant soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier que les fichiers requis sont présents
    if (!formData.cv || !formData.idCard) {
      showAlert(false, t('apply.requiredFiles', 'Veuillez télécharger votre CV et votre pièce d\'identité.'));
      return;
    }

    const { value: confirm } = await MySwal.fire({
      title: t('apply.confirmTitle', 'Confirmar inscrição'),
      text: t('apply.confirmText', 'Tem a certeza de que pretende enviar a sua candidatura?'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: t('common.yes', 'Sim, enviar'),
      cancelButtonText: t('common.cancel', 'Cancelar'),
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-xl shadow-xl',
        confirmButton: 'px-4 py-2 rounded-lg font-medium',
        cancelButton: 'px-4 py-2 rounded-lg font-medium mr-2',
      },
      buttonsStyling: false,
    });

    if (!confirm) return;

    setIsSubmitting(true);

    // Afficher un indicateur de chargement
    MySwal.fire({
      title: t('apply.sending', 'Enviando...'),
      html: t('apply.pleaseWait', 'Por favor aguarde enquanto enviamos a sua candidatura.'),
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formDataToSend = new FormData();

      // Ajouter les champs texte
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('motivation', formData.motivation);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('jobTitle', jobTitle);

      // Ajouter les fichiers
      if (formData.cv) formDataToSend.append('cv', formData.cv);
      if (formData.idCard) formDataToSend.append('idCard', formData.idCard);

      // Envoyer à la fonction Netlify
      const response = await fetch('/.netlify/functions/sendmail', {
        method: 'POST',
        body: formDataToSend,
      });

      let responseData;
      try {
        const responseText = await response.text();
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error('Erreur de parsing de la réponse:', e);
        throw new Error('Réponse invalide du serveur');
      }

      if (!response.ok) {
        const errorMessage = responseData.error || 
                           responseData.message || 
                           `Erreur ${response.status} lors de la soumission du formulaire`;
        throw new Error(errorMessage);
      }

      // Fermer tous les SweetAlert ouverts
      MySwal.close();

      // Afficher le message de succès
      await MySwal.fire({
        title: (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-6 h-6" />
            <span>{t('apply.successTitle', 'Inscrição enviada!')}</span>
          </div>
        ),
        text: t('apply.success', 'A sua inscrição foi recebida. Entraremos em contacto em breve.'),
        icon: 'success',
        confirmButtonText: t('common.great', 'Parfait !'),
        confirmButtonColor: '#10B981',
        customClass: {
          popup: 'rounded-xl shadow-xl',
          confirmButton: 'px-4 py-2 rounded-lg font-medium',
        },
        buttonsStyling: false,
      });

      // Réinitialiser le formulaire en cas de succès
      setFormData({
        name: '',
        email: '',
        cv: null,
        motivation: '',
        portfolio: '',
        idCard: null
      });

      // Fermer la modale
      onClose();

    } catch (error) {
      console.error('Error submitting form:', error);
      let errorMessage = t('apply.error', 'Une erreur est survenue lors de l\'envoi de votre candidature. Veuillez réessayer.');

      // Améliorer les messages d'erreur
      if (error instanceof TypeError) {
        errorMessage = t('apply.networkError', 'Erreur réseau. Veuillez vérifier votre connexion internet et réessayer.');
      } else if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      
      // Afficher l'erreur avec SweetAlert
      MySwal.fire({
        title: (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="w-6 h-6" />
            <span>{t('apply.errorTitle', 'Erreur')}</span>
          </div>
        ),
        text: errorMessage,
        icon: 'error',
        confirmButtonText: t('common.understand', 'J\'ai compris'),
        confirmButtonColor: '#EF4444',
        customClass: {
          popup: 'rounded-xl shadow-xl',
          confirmButton: 'px-4 py-2 rounded-lg font-medium',
        },
        buttonsStyling: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
          aria-label={t('common.close', 'Close')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="sticky top-0 bg-white z-10 pt-6 pb-4 px-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('apply.title', 'Apply for')} <span className="text-green-600">{jobTitle}</span>
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {t('apply.form.name', 'Full Name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('apply.form.email', 'Email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
              {t('apply.form.cv', 'CV (PDF, DOC, DOCX)')}
            </label>
            <input
              type="file"
              id="cv"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">
              {t('apply.form.motivation', 'Motivation Letter')}
            </label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              disabled={isSubmitting}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
              {t('apply.form.portfolio', 'Portfolio Link')} ({t('apply.optional', 'Optional')})
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="idCard" className="block text-sm font-medium text-gray-700">
              {t('apply.form.idCard', 'ID Card Copy (PDF, JPG, PNG)')}
            </label>
            <input
              type="file"
              id="idCard"
              name="idCard"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  {t('common.submitting', 'Submitting...')}
                </>
              ) : (
                <>
                  <span>{t('apply.submit', 'Submit Application')}</span>
                  <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
