import React, { useState } from "react";
import { vehicles } from "../../data/vehicles";
import { getTranslatedText } from "../../utils/translations";
import { toast } from "react-toastify";
import { createDriver } from "../../services/supabase/driverService";

// Déplacer la déclaration de type en haut du fichier
type Language = 'pt' | 'en' | 'fr';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  hasVehicle: boolean;
  vehicleType?: string;
  licenseNumber?: string;
  experienceYears: number;
  message?: string;
};

interface DriversFormProps {
  currentLanguage: Language;
  onSubmitSuccess?: () => void;
}

// List of major Angolan cities
const Cities = [
  { value: "luanda", label: { pt: "Luanda", en: "Luanda", fr: "Luanda" } },
  { value: "huambo", label: { pt: "Huambo", en: "Huambo", fr: "Huambo" } },
  { value: "lobito", label: { pt: "Lobito", en: "Lobito", fr: "Lobito" } },
  { value: "benguela", label: { pt: "Benguela", en: "Benguela", fr: "Benguela" } },
  { value: "lubango", label: { pt: "Lubango", en: "Lubango", fr: "Lubango" } },
  { value: "malanje", label: { pt: "Malanje", en: "Malanje", fr: "Malanje" } },
  { value: "namibe", label: { pt: "Namibe", en: "Namibe", fr: "Namibe" } },
  { value: "saurimo", label: { pt: "Saurimo", en: "Saurimo", fr: "Saurimo" } },
  { value: "cabinda", label: { pt: "Cabinda", en: "Cabinda", fr: "Cabinda" } },
  { value: "uige", label: { pt: "Uíge", en: "Uíge", fr: "Uíge" } },
  { value: "soyo", label: { pt: "Soyo", en: "Soyo", fr: "Soyo" } },
  { value: "menongue", label: { pt: "Menongue", en: "Menongue", fr: "Menongue" } },
];

export const DriversForm: React.FC<DriversFormProps> = ({
  currentLanguage,
  onSubmitSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    hasVehicle: true, // Set to true by default
    vehicleType: "",
    licenseNumber: "",
    experienceYears: 0,
    message: ""
  });

  // Find the selected vehicle for display
  const selectedVehicle = vehicles.find(v => v.type === formData.vehicleType);

  // Gérer les changements de champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = getTranslatedText(
        { pt: "Nome é obrigatório", en: "First name is required", fr: "Le prénom est requis" },
        currentLanguage
      );
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = getTranslatedText(
        { pt: "Sobrenome é obrigatório", en: "Last name is required", fr: "Le nom de famille est requis" },
        currentLanguage
      );
    }
    
    // Make email validation optional, only validate format if provided
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = getTranslatedText(
        { pt: "E-mail inválido", en: "Invalid email", fr: "Email invalide" },
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
    
    if (!formData.vehicleType) {
      errors.vehicleType = getTranslatedText(
        { pt: "Selecione um veículo", en: "Select a vehicle", fr: "Sélectionnez un véhicule" },
        currentLanguage
      );
    }
    
    if (!formData.city.trim()) {
      errors.city = getTranslatedText(
        { pt: "Cidade é obrigatória", en: "City is required", fr: "La ville est requise" },
        currentLanguage
      );
    }
    
    if (!formData.licenseNumber?.trim()) {
      errors.licenseNumber = getTranslatedText(
        { pt: "Número da carta de condução é obrigatório", en: "Driver's license number is required", fr: "Le numéro de permis de conduire est requis" },
        currentLanguage
      );
    }
    
    if (formData.experienceYears < 0) {
      errors.experienceYears = getTranslatedText(
        { pt: "Anos de experiência inválidos", en: "Invalid years of experience", fr: "Années d'expérience invalides" },
        currentLanguage
      );
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle vehicle type change
  const handleVehicleTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      vehicleType: type,
      licenseNumber: "" // Reset license number when vehicle type changes
    }));
    setVehicleModalOpen(false);
  };

  // Check if selected vehicle is a motorcycle
  const isMotorcycle = formData.vehicleType === 'moto';

  // Get the appropriate license field label based on vehicle type
  const getLicenseLabel = () => {
    if (isMotorcycle) {
      return {
        pt: "Número da Carta de Condução de Moto",
        en: "Motorcycle License Number",
        fr: "Numéro de permis moto"
      }[currentLanguage];
    } else if (formData.vehicleType) {
      return {
        pt: "Número da Carta de Condução",
        en: "Driver's License Number",
        fr: "Numéro de permis de conduire"
      }[currentLanguage];
    }
    return {
      pt: "Número da Carta de Condução",
      en: "License Number",
      fr: "Numéro de permis"
    }[currentLanguage];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      
      // Préparer les données pour Supabase
      const driverData = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city,
        vehicle_type: formData.vehicleType,
        license_number: formData.licenseNumber?.trim(),
        experience_years: formData.experienceYears,
        message: formData.message?.trim(),
        status: 'pending' as const,
        has_vehicle: formData.hasVehicle
      };

      const response = await createDriver(driverData);
      
      if (response.error) {
        throw new Error(response.error.message || 'Erreur lors de la soumission');
      }
      
      // Afficher le message de succès avec plus de détails
      // Message de succès avec ID de la candidature si disponible
      const successMessage = response.data?.[0]?.id
        ? getTranslatedText(
            { 
              pt: `✅ Inscrição #${response.data[0].id} enviada com sucesso!`, 
              en: `✅ Application #${response.data[0].id} submitted successfully!`, 
              fr: `✅ Candidature #${response.data[0].id} soumise avec succès !` 
            },
            currentLanguage
          )
        : getTranslatedText(
            { 
              pt: '✅ Inscrição enviada com sucesso!', 
              en: '✅ Application submitted successfully!', 
              fr: '✅ Candidature soumise avec succès !' 
            },
            currentLanguage
          );
      
      toast.success(successMessage);
      
      // Réinitialiser le formulaire en cas de succès
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        vehicleType: "",
        licenseNumber: "",
        experienceYears: 0,
        message: "",
        hasVehicle: false
      });
      
      setSubmitSuccess(true);
      
      // Fermer le modal après 2 secondes et recharger la page
      setTimeout(() => {
        if (onSubmitSuccess) {
          onSubmitSuccess();
        } else {
          window.location.reload();
        }
      }, 2000);
      
    } catch (error: any) {
      console.error("Error submitting form:", error);
      
      // Message d'erreur plus détaillé
      let errorMessage: string;
      
      if (error.response?.data?.message) {
        // Si l'API renvoie un message d'erreur
        errorMessage = error.response.data.message;
      } else if (error.message) {
        // Si c'est une erreur personnalisée avec un message
        errorMessage = error.message;
      } else {
        // Message par défaut
        errorMessage = getTranslatedText(
          { 
            pt: "Erro ao enviar inscrição. Tente novamente ou entre em contato conosco.", 
            en: "Error submitting application. Please try again or contact us.", 
            fr: "Erreur lors de la soumission. Veuillez réessayer ou nous contacter." 
          },
          currentLanguage
        );
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
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
                    onClick={() => handleVehicleTypeChange(vehicle.type)}
                    className={`w-full flex items-start p-4 border rounded-xl text-left transition-all ${
                      formData.vehicleType === vehicle.type
                        ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                        : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden mr-4 bg-white border border-gray-100">
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.label[currentLanguage]} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {vehicle.label[currentLanguage]}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {vehicle.desc[currentLanguage]}
                      </p>
                      {vehicle.features && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {vehicle.features.map((feature, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                              {typeof feature === 'string' ? feature : feature[currentLanguage]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {formData.vehicleType === vehicle.type && (
                      <div className="ml-2 flex-shrink-0 text-green-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 space-y-6 rounded-lg shadow-sm"
      >
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {getTranslatedText(
          {
            pt: "Quero ser motorista",
            en: "I want to be a driver",
            fr: "Je veux être chauffeur",
          },
          currentLanguage
        )}
      </h3>

      <div className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {getTranslatedText(
              { pt: "Nome", en: "First name", fr: "Prénom" },
              currentLanguage
            )}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder={getTranslatedText(
              { pt: "Seu nome", en: "Your first name", fr: "Votre prénom" },
              currentLanguage
            )}
          />
          {formErrors.firstName && (
            <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {getTranslatedText(
              { pt: "Sobrenome", en: "Last name", fr: "Nom de famille" },
              currentLanguage
            )}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder={getTranslatedText(
              { pt: "Seu sobrenome", en: "Your last name", fr: "Votre nom de famille" },
              currentLanguage
            )}
          />
          {formErrors.lastName && (
            <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {getTranslatedText(
              { pt: "E-mail", en: "Email", fr: "E-mail" },
              currentLanguage
            )}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder={getTranslatedText(
              { pt: "seu@email.com", en: "your@email.com", fr: "votre@email.com" },
              currentLanguage
            )}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {getTranslatedText(
              { pt: "Telefone", en: "Phone", fr: "Téléphone" },
              currentLanguage
            )}{" "}
            *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 bg-gray-100 rounded-l-lg border-r border-gray-300">
              <img 
                src="/images/flags/angola-flag.png" 
                alt="Angola Flag" 
                className="w-5 h-3.5 mr-2"
              />
              <span className="text-gray-700 font-medium">+244</span>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full pl-24 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder={getTranslatedText(
                { pt: "9XX XXX XXX", en: "9XX XXX XXX", fr: "9XX XXX XXX" },
                currentLanguage
              )}
            />
          </div>
        </div>

        {/* Ville */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {getTranslatedText(
              { pt: "Cidade", en: "City", fr: "Ville" },
              currentLanguage
            )}{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border ${
                formErrors.city ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-green-500'
              } rounded-lg appearance-none bg-white`}
            >
              <option value="" disabled>
                {getTranslatedText(
                  { pt: "Selecione sua cidade", en: "Select your city", fr: "Sélectionnez votre ville" },
                  currentLanguage
                )}
              </option>
              {Cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label[currentLanguage]}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-2.5 text-gray-500">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          {formErrors.city && (
            <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
          )}
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {getTranslatedText(
              { pt: "Tipo de veículo", en: "Vehicle type", fr: "Type de véhicule" },
              currentLanguage
            )}
            <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setVehicleModalOpen(true)}
            className={`w-full flex items-center px-4 py-2 border ${
              formErrors.vehicleType ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50 hover:bg-gray-100 transition`}
          >
            {selectedVehicle ? (
              <div className="flex items-center">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.label[currentLanguage]}
                  className="w-10 h-8 rounded mr-3 object-cover"
                />
                <span>{selectedVehicle.label[currentLanguage]}</span>
              </div>
            ) : (
              <span className="text-gray-400">
                {getTranslatedText(
                  {
                    pt: "Selecione o tipo de veículo",
                    en: "Select vehicle type",
                    fr: "Sélectionnez le type de véhicule",
                  },
                  currentLanguage
                )}
              </span>
            )}
            <svg
              className="w-5 h-5 ml-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {formErrors.vehicleType && (
            <p className="mt-1 text-sm text-red-600">{formErrors.vehicleType}</p>
          )}
        </div>

        {/* License Number */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="licenseNumber">
            {getLicenseLabel()}
          </label>
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={getTranslatedText(
              { pt: isMotorcycle ? "Ex: M-1234567" : "Ex: 123456789", 
                en: isMotorcycle ? "e.g., M-1234567" : "e.g., 123456789", 
                fr: isMotorcycle ? "Ex: M-1234567" : "Ex: 123456789" },
              currentLanguage
            )}
          />
          {formErrors.licenseNumber && (
            <p className="text-red-500 text-xs italic">{formErrors.licenseNumber}</p>
          )}
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {getTranslatedText(
              { pt: "Anos de experiência como motorista", en: "Years of driving experience", fr: "Années d'expérience de conduite" },
              currentLanguage
            )}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="experienceYears"
              min="0"
              max="50"
              value={formData.experienceYears || ""}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setFormData(prev => ({
                  ...prev,
                  experienceYears: value > 50 ? 50 : value < 0 ? 0 : value
                }));
              }}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-70 disabled:bg-gray-100"
              placeholder="0"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">
              {getTranslatedText(
                { pt: "anos", en: "years", fr: "ans" },
                currentLanguage
              )}
            </span>
          </div>
          {formErrors.experienceYears && (
            <p className="mt-1 text-sm text-red-600">{formErrors.experienceYears}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {getTranslatedText(
                { pt: "Enviando...", en: "Sending...", fr: "Envoi en cours..." },
                currentLanguage
              )}
            </span>
          ) : (
            getTranslatedText(
              { pt: "Enviar Inscrição", en: "Submit Application", fr: "Soumettre la candidature" },
              currentLanguage
            )
          )}
        </button>
      </div>
    </form>
  </div>
);
};
