import { useState, FormEvent, FC } from 'react';
import { CheckCircle } from 'lucide-react';
import { getTranslatedText } from '../../utils/translations';
import { createEnterprise } from '../../services/supabase/enterpriseService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { vehicles } from '../../data/vehicles';

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

interface EnterpriseFormProps {
  currentLanguage: Language;
  onSuccess?: () => void;
}

const EnterpriseForm: FC<EnterpriseFormProps> = ({
  currentLanguage,
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
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
      { value: 'moto', label: { pt: 'Moto', en: 'Motorcycle', fr: 'Moto' } },
      { value: 'carro', label: { pt: 'Carro', en: 'Car', fr: 'Voiture' } },
      { value: 'bicicleta', label: { pt: 'Bicicleta', en: 'Bicycle', fr: 'Vélo' } },
      { value: 'caminhao', label: { pt: 'Caminhão', en: 'Truck', fr: 'Camion' } },
    ],
    monthlyDeliveries: [
      { value: '1-50', label: { pt: '1-50', en: '1-50', fr: '1-50' } },
      { value: '51-200', label: { pt: '51-200', en: '51-200', fr: '51-200' } },
      { value: '201-500', label: { pt: '201-500', en: '201-500', fr: '201-500' } },
      { value: '500+', label: { pt: '500+', en: '500+', fr: '500+' } },
    ],
    orderPreferences: [
      { value: 'web', label: { pt: 'Site Web', en: 'Website', fr: 'Site Web' } },
      { value: 'app', label: { pt: 'Aplicativo', en: 'Mobile App', fr: 'Application mobile' } },
      { value: 'telefone', label: { pt: 'Telefone', en: 'Phone', fr: 'Téléphone' } },
      { value: 'outro', label: { pt: 'Outro', en: 'Other', fr: 'Autre' } },
    ]
  };

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

  const handleVehicleSelect = (vehicleType: string) => {
    setFormData(prev => ({
      ...prev,
      vehicleType
    }));
    setVehicleModalOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const enterpriseData = {
        name: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        contact_person: `${formData.firstName} ${formData.lastName}`,
        position: formData.position,
        contact_method: formData.contactMethod,
        city: formData.city,
        industry: formData.industry,
        vehicle_type: formData.vehicleType,
        monthly_deliveries: formData.monthlyDeliveries,
        order_preference: formData.orderPreference,
        message: formData.message,
      };

      const response = await createEnterprise(enterpriseData);
      
      const successMessage = response?.id
        ? getTranslatedText({
            pt: `✅ Solicitação #${response.id} enviada com sucesso!`,
            en: `✅ Request #${response.id} submitted successfully!`,
            fr: `✅ Demande #${response.id} envoyée avec succès !`,
          }, currentLanguage)
        : getTranslatedText({
            pt: '✅ Solicitação enviada com sucesso!',
            en: '✅ Request submitted successfully!',
            fr: '✅ Demande envoyée avec succès !',
          }, currentLanguage);
      
      toast.success(successMessage);
      setSubmitSuccess(true);
      
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
      }
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      let errorMessage = getTranslatedText({
        pt: '❌ Erro ao enviar o formulário. Por favor, tente novamente.',
        en: '❌ Error submitting the form. Please try again.',
        fr: '❌ Erreur lors de la soumission du formulaire. Veuillez réessayer.',
      }, currentLanguage);
      
      if (error?.message) {
        errorMessage = `${errorMessage} (${error.message})`;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedText({
                pt: 'Tipo de Veículo',
                en: 'Vehicle Type',
                fr: 'Type de véhicule'
              }, currentLanguage)} *
            </label>
            <button
              type="button"
              onClick={() => setVehicleModalOpen(true)}
              className={`w-full px-4 py-2 border rounded-lg text-left flex items-center justify-between ${formErrors.vehicleType ? 'border-red-500' : 'border-gray-300'}`}
            >
              {formData.vehicleType ? (
                <div className="flex items-center">
                  {vehicles.find(v => v.type === formData.vehicleType) && (
                    <img 
                      src={vehicles.find(v => v.type === formData.vehicleType)?.image} 
                      alt={getTranslatedText(vehicles.find(v => v.type === formData.vehicleType)?.label || { pt: '', en: '', fr: '' }, currentLanguage)}
                      className="w-8 h-8 mr-3 object-contain"
                    />
                  )}
                  <span>
                    {getTranslatedText(
                      vehicles.find(v => v.type === formData.vehicleType)?.label || { pt: '', en: '', fr: '' },
                      currentLanguage
                    )}
                  </span>
                </div>
              ) : (
                <span className="text-gray-500">
                  {getTranslatedText({
                    pt: 'Selecione um veículo...',
                    en: 'Select a vehicle...',
                    fr: 'Sélectionnez un véhicule...'
                  }, currentLanguage)}
                </span>
              )}
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {formErrors.vehicleType && (
              <p className="mt-1 text-sm text-red-600">{formErrors.vehicleType}</p>
            )}
          </div>

          {/* Modal de sélection du véhicule */}
          {vehicleModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {getTranslatedText(
                        { pt: "Selecione o tipo de veículo", en: "Select vehicle type", fr: "Sélectionnez le type de véhicule" },
                        currentLanguage
                      )}
                    </h3>
                    <button
                      onClick={() => setVehicleModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {vehicles.map((vehicle) => (
                      <button
                        key={vehicle.type}
                        type="button"
                        onClick={() => handleVehicleSelect(vehicle.type)}
                        className={`w-full flex items-start p-4 border rounded-xl text-left transition-all ${
                          formData.vehicleType === vehicle.type
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg overflow-hidden mr-4">
                          <img 
                            src={vehicle.image} 
                            alt={getTranslatedText(vehicle.label, currentLanguage)} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {getTranslatedText(vehicle.label, currentLanguage)}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {getTranslatedText(vehicle.desc, currentLanguage)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
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

export default EnterpriseForm;
