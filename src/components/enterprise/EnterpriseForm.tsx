import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { getTranslatedText } from '../../utils/translations';
// Vehicle types are now managed directly in the form options
import { createEnterprise } from '../../services/enterpriseService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Language = 'pt' | 'en' | 'fr';

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  email: string;
  position: string;
  contactMethod: string;
  city: string;
  industry: string;
  vehicleType: string;
  monthlyDeliveries: string;
  orderPreference: string;
  message?: string;
  status?: 'new' | 'contacted' | 'converted' | 'rejected';
  contactPerson?: string;
  name?: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const formOptions = {
  contactMethods: [
    { value: 'email', label: { pt: 'E-mail', en: 'Email', fr: 'E-mail' } },
    { value: 'phone', label: { pt: 'Telefone', en: 'Phone', fr: 'Téléphone' } },
    { value: 'whatsapp', label: { pt: 'WhatsApp', en: 'WhatsApp', fr: 'WhatsApp' } },
  ],
  cities: [
    { value: 'luanda', label: { pt: 'Luanda', en: 'Luanda', fr: 'Luanda' } },
    { value: 'benguela', label: { pt: 'Benguela', en: 'Benguela', fr: 'Benguela' } },
    { value: 'lubango', label: { pt: 'Lubango', en: 'Lubango', fr: 'Lubango' } },
    { value: 'outra', label: { pt: 'Outra cidade', en: 'Other city', fr: 'Autre ville' } },
  ],
  industries: [
    { value: 'retail', label: { pt: 'Varejo', en: 'Retail', fr: 'Commerce de détail' } },
    { value: 'food', label: { pt: 'Alimentação', en: 'Food', fr: 'Alimentation' } },
    { value: 'ecommerce', label: { pt: 'E-commerce', en: 'E-commerce', fr: 'Commerce électronique' } },
    { value: 'health', label: { pt: 'Saúde', en: 'Healthcare', fr: 'Santé' } },
    { value: 'other', label: { pt: 'Outro', en: 'Other', fr: 'Autre' } },
  ],
  vehicleTypes: [
    { value: 'moto', label: { pt: 'Moto', en: 'Motorbike', fr: 'Moto' } },
    { value: 'carro', label: { pt: 'Carro', en: 'Car', fr: 'Voiture' } },
    { value: 'van', label: { pt: 'Van', en: 'Van', fr: 'Fourgonnette' } },
    { value: 'caminhao', label: { pt: 'Caminhão', en: 'Truck', fr: 'Camion' } },
    { value: 'diversos', label: { pt: 'Diversos', en: 'Various', fr: 'Divers' } },
  ],
  monthlyDeliveries: [
    { value: '1-10', label: { pt: '1-10/mês', en: '1-10/month', fr: '1-10/mois' } },
    { value: '11-50', label: { pt: '11-50/mês', en: '11-50/month', fr: '11-50/mois' } },
    { value: '51-200', label: { pt: '51-200/mês', en: '51-200/month', fr: '51-200/mois' } },
    { value: '200+', label: { pt: '+200/mês', en: '200+/month', fr: '+200/mois' } },
  ],
  orderPreferences: [
    { value: 'app', label: { pt: 'Aplicativo', en: 'Mobile App', fr: 'Application mobile' } },
    { value: 'website', label: { pt: 'Website', en: 'Website', fr: 'Site web' } },
    { value: 'api', label: { pt: 'Integração via API', en: 'API Integration', fr: 'Intégration API' } },
    { value: 'whatsapp', label: { pt: 'WhatsApp', en: 'WhatsApp', fr: 'WhatsApp' } },
  ]
};

interface EnterpriseFormProps {
  currentLanguage: Language;
  onSuccess?: () => void;
}

export const EnterpriseForm: React.FC<EnterpriseFormProps> = ({
  currentLanguage,
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    email: '',
    position: '',
    contactMethod: '',
    city: '',
    industry: '',
    vehicleType: '',
    monthlyDeliveries: '',
    orderPreference: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = getTranslatedText(
        { pt: "Nome é obrigatório", en: "First name is required", fr: "Le prénom est requis" },
        currentLanguage
      );
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = getTranslatedText(
        { pt: "Sobrenome é obrigatório", en: "Last name is required", fr: "Le nom est requis" },
        currentLanguage
      );
    }
    
    if (!formData.companyName.trim()) {
      errors.companyName = getTranslatedText(
        { pt: "Nome da empresa é obrigatório", en: "Company name is required", fr: "Le nom de l'entreprise est requis" },
        currentLanguage
      );
    }
    
    if (!formData.phone.trim()) {
      errors.phone = getTranslatedText(
        { pt: "Telefone é obrigatório", en: "Phone is required", fr: "Le téléphone est requis" },
        currentLanguage
      );
    } else if (!/^\+?[0-9\s-]+$/.test(formData.phone)) {
      errors.phone = getTranslatedText(
        { pt: "Número inválido", en: "Invalid number", fr: "Numéro invalide" },
        currentLanguage
      );
    }
    
    if (!formData.email.trim()) {
      errors.email = getTranslatedText(
        { pt: "E-mail é obrigatório", en: "Email is required", fr: "L'e-mail est requis" },
        currentLanguage
      );
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = getTranslatedText(
        { pt: "E-mail inválido", en: "Invalid email", fr: "E-mail invalide" },
        currentLanguage
      );
    }
    
    if (!formData.contactMethod) {
      errors.contactMethod = getTranslatedText(
        { pt: "Método de contato é obrigatório", en: "Contact method is required", fr: "Méthode de contact requise" },
        currentLanguage
      );
    }
    
    if (!formData.city) {
      errors.city = getTranslatedText(
        { pt: "Cidade é obrigatória", en: "City is required", fr: "La ville est requise" },
        currentLanguage
      );
    }
    
    if (!formData.industry) {
      errors.industry = getTranslatedText(
        { pt: "Setor é obrigatório", en: "Industry is required", fr: "Le secteur est requis" },
        currentLanguage
      );
    }
    
    if (!formData.vehicleType) {
      errors.vehicleType = getTranslatedText(
        { pt: "Tipo de veículo é obrigatório", en: "Vehicle type is required", fr: "Le type de véhicule est requis" },
        currentLanguage
      );
    }
    
    if (!formData.monthlyDeliveries) {
      errors.monthlyDeliveries = getTranslatedText(
        { pt: "Número de entregas é obrigatório", en: "Number of deliveries is required", fr: "Le nombre de livraisons est requis" },
        currentLanguage
      );
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare data for enterprise service
      const enterpriseData = {
        name: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        contactPerson: `${formData.firstName} ${formData.lastName}`,
        position: formData.position,
        contactMethod: formData.contactMethod,
        city: formData.city,
        industry: formData.industry,
        vehicleType: formData.vehicleType,
        monthlyDeliveries: formData.monthlyDeliveries,
        orderPreference: formData.orderPreference,
        message: formData.message,
        status: 'new' as const,
      };

      await createEnterprise(enterpriseData);
      
      // Show success message
      toast.success(
        getTranslatedText({
          pt: 'Solicitação enviada com sucesso!',
          en: 'Request submitted successfully!',
          fr: 'Demande envoyée avec succès !',
        }, currentLanguage),
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      setSubmitSuccess(true);
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast.error(
        getTranslatedText({
          pt: 'Erro ao enviar o formulário. Por favor, tente novamente.',
          en: 'Error submitting the form. Please try again.',
          fr: 'Erreur lors de la soumission du formulaire. Veuillez réessayer.',
        }, currentLanguage),
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Vehicle type is now selected directly from the dropdown

  if (submitSuccess) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {getTranslatedText({
            pt: 'Obrigado pelo seu interesse!',
            en: 'Thank you for your interest!',
            fr: 'Merci pour votre intérêt !'
          }, currentLanguage)}
        </h3>
        <p className="text-gray-600 mb-6">
          {getTranslatedText({
            pt: 'Nossa equipe entrará em contato em breve para discutir como podemos ajudar sua empresa.',
            en: 'Our team will contact you soon to discuss how we can help your business.',
            fr: 'Notre équipe vous contactera bientôt pour discuter de la façon dont nous pouvons vous aider.'
          }, currentLanguage)}
        </p>
      </div>
    );
  }

  return (
    <div id="form" className="bg-white p-8 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {getTranslatedText({
          pt: 'Fale Conosco',
          en: 'Contact Us',
          fr: 'Contactez-nous'
        }, currentLanguage)}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Nome',
                en: 'First Name',
                fr: 'Prénom'
              }, currentLanguage)} *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {formErrors.firstName && (
              <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Sobrenome',
                en: 'Last Name',
                fr: 'Nom'
              }, currentLanguage)} *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {formErrors.lastName && (
              <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            {getTranslatedText({
              pt: 'Nome da Empresa',
              en: 'Company Name',
              fr: 'Nom de l\'entreprise'
            }, currentLanguage)} *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.companyName ? 'border-red-500' : 'border-gray-300'}`}
            disabled={isSubmitting}
          />
          {formErrors.companyName && (
            <p className="mt-1 text-sm text-red-600">{formErrors.companyName}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Telefone',
                en: 'Phone',
                fr: 'Téléphone'
              }, currentLanguage)} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Cargo',
                en: 'Position',
                fr: 'Poste'
              }, currentLanguage)} *
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.position ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {formErrors.position && (
              <p className="mt-1 text-sm text-red-600">{formErrors.position}</p>
            )}
          </div>

          <div>
            <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Melhor forma de contato',
                en: 'Preferred Contact Method',
                fr: 'Méthode de contact préférée'
              }, currentLanguage)} *
            </label>
            <select
              id="contactMethod"
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.contactMethod ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            >
              <option value="">
                {getTranslatedText({
                  pt: 'Selecione...',
                  en: 'Select...',
                  fr: 'Sélectionnez...'
                }, currentLanguage)}
              </option>
              {formOptions.contactMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {getTranslatedText(method.label, currentLanguage)}
                </option>
              ))}
            </select>
            {formErrors.contactMethod && (
              <p className="mt-1 text-sm text-red-600">{formErrors.contactMethod}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Cidade',
                en: 'City',
                fr: 'Ville'
              }, currentLanguage)} *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {formErrors.city && (
              <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Setor',
                en: 'Industry',
                fr: 'Secteur'
              }, currentLanguage)} *
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.industry ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            >
              <option value="">
                {getTranslatedText({
                  pt: 'Selecione...',
                  en: 'Select...',
                  fr: 'Sélectionnez...'
                }, currentLanguage)}
              </option>
              {formOptions.industries.map((industry) => (
                <option key={industry.value} value={industry.value}>
                  {getTranslatedText(industry.label, currentLanguage)}
                </option>
              ))}
            </select>
            {formErrors.industry && (
              <p className="mt-1 text-sm text-red-600">{formErrors.industry}</p>
            )}
          </div>

          <div>
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Tipo de Veículo',
                en: 'Vehicle Type',
                fr: 'Type de véhicule'
              }, currentLanguage)} *
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.vehicleType ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            >
              <option value="">
                {getTranslatedText({
                  pt: 'Selecione...',
                  en: 'Select...',
                  fr: 'Sélectionnez...'
                }, currentLanguage)}
              </option>
              {formOptions.vehicleTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {getTranslatedText(type.label, currentLanguage)}
                </option>
              ))}
            </select>
            {formErrors.vehicleType && (
              <p className="mt-1 text-sm text-red-600">{formErrors.vehicleType}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="monthlyDeliveries" className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Número de Entregas Mensais',
                en: 'Monthly Deliveries',
                fr: 'Livraisons mensuelles'
              }, currentLanguage)} *
            </label>
            <select
              id="monthlyDeliveries"
              name="monthlyDeliveries"
              value={formData.monthlyDeliveries}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.monthlyDeliveries ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            >
              <option value="">
                {getTranslatedText({
                  pt: 'Selecione...',
                  en: 'Select...',
                  fr: 'Sélectionnez...'
                }, currentLanguage)}
              </option>
              {formOptions.monthlyDeliveries.map((delivery) => (
                <option key={delivery.value} value={delivery.value}>
                  {getTranslatedText(delivery.label, currentLanguage)}
                </option>
              ))}
            </select>
            {formErrors.monthlyDeliveries && (
              <p className="mt-1 text-sm text-red-600">{formErrors.monthlyDeliveries}</p>
            )}
          </div>

          <div>
            <label htmlFor="orderPreference" className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Preferência de Pedido',
                en: 'Order Preference',
                fr: 'Préférence de commande'
              }, currentLanguage)} *
            </label>
            <select
              id="orderPreference"
              name="orderPreference"
              value={formData.orderPreference}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.orderPreference ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            >
              <option value="">
                {getTranslatedText({
                  pt: 'Selecione...',
                  en: 'Select...',
                  fr: 'Sélectionnez...'
                }, currentLanguage)}
              </option>
              {formOptions.orderPreferences.map((pref) => (
                <option key={pref.value} value={pref.value}>
                  {getTranslatedText(pref.label, currentLanguage)}
                </option>
              ))}
            </select>
            {formErrors.orderPreference && (
              <p className="mt-1 text-sm text-red-600">{formErrors.orderPreference}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {getTranslatedText({
              pt: 'Mensagem (Opcional)',
              en: 'Message (Optional)',
              fr: 'Message (Optionnel)'
            }, currentLanguage)}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {getTranslatedText({
                  pt: 'Enviando...',
                  en: 'Sending...',
                  fr: 'Envoi en cours...'
                }, currentLanguage)}
              </span>
            ) : (
              getTranslatedText({
                pt: 'Enviar Mensagem',
                en: 'Send Message',
                fr: 'Envoyer le message'
              }, currentLanguage)
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
