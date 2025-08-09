import React, { useState } from "react";
import { vehicles } from "../../data/vehicles";
import { getTranslatedText } from "../../utils/translations";
import { toast } from "react-toastify";

// List of major Angolan cities
const angolanCities = [
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
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
  submitSuccess: boolean;
}

export const DriversForm: React.FC<DriversFormProps> = ({
  currentLanguage,
  onSubmit,
  isSubmitting,
  
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    hasVehicle: false,
    vehicleType: "",
    licenseNumber: "",
    experienceYears: 0,
    message: ""
  });
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const selectedVehicle = vehicles.find(
    (v) => v.type === formData.vehicleType
  );

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    
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
    
    if (!formData.email.trim()) {
      errors.email = getTranslatedText(
        { pt: "E-mail é obrigatório", en: "Email is required", fr: "L'email est requis" },
        currentLanguage
      );
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
    
    if (formData.hasVehicle && !formData.vehicleType) {
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
    
    if (formData.hasVehicle && !formData.licenseNumber?.trim()) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVehicleSelect = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      vehicleType: value,
    }));
    setVehicleModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Prepare driver data for submission
      const driverData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city,
        hasVehicle: formData.hasVehicle,
        ...(formData.hasVehicle && { 
          vehicleType: formData.vehicleType,
          licenseNumber: formData.licenseNumber?.trim() 
        }),
        experienceYears: formData.experienceYears,
        message: formData.message?.trim()
      };
      
      await onSubmit(driverData);
      
      // Show success message
      toast.success(
        getTranslatedText(
          { 
            pt: "Inscrição enviada com sucesso!", 
            en: "Application submitted successfully!", 
            fr: "Candidature soumise avec succès !" 
          },
          currentLanguage
        ),
        { position: 'top-center' }
      );
      
      // Reset form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        hasVehicle: false,
        vehicleType: "",
        licenseNumber: "",
        experienceYears: 0,
        message: ""
      });
      
    } catch (error) {
      console.error("Error submitting driver application:", error);
      toast.error(
        getTranslatedText(
          { 
            pt: "Erro ao enviar inscrição. Tente novamente mais tarde.", 
            en: "Error submitting application. Please try again later.", 
            fr: "Erreur lors de la soumission de la candidature. Veuillez réessayer plus tard." 
          },
          currentLanguage
        ),
        { position: 'top-center' }
      );
    } finally {
      // The parent component is responsible for managing the isSubmitting state
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8  space-y-6 max-w-lg mx-auto"
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

        {/* Ce champ a été déplacé dans la section conditionnelle hasVehicle */}

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
              {angolanCities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label[currentLanguage]}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          {formErrors.city && (
            <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
          )}
        </div>

        {/* Has Vehicle Toggle */}
        <div className="flex items-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="hasVehicle"
              checked={formData.hasVehicle}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  hasVehicle: e.target.checked,
                }));
              }}
              className="sr-only peer"
              disabled={isSubmitting}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-700">
              {getTranslatedText(
                { 
                  pt: "Possui veículo próprio?", 
                  en: "Do you have your own vehicle?", 
                  fr: "Avez-vous votre propre véhicule ?" 
                },
                currentLanguage
              )}
            </span>
          </label>
        </div>

        {/* Vehicle Type (conditionally shown) */}
        {formData.hasVehicle && (
          <>
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
                  <>
                    <img
                      src={selectedVehicle.image}
                      alt={selectedVehicle.label[currentLanguage]}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span>{selectedVehicle.label[currentLanguage]}</span>
                  </>
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
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.vehicleType}
                </p>
              )}
            </div>

            {/* License Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedText(
                  { pt: "Número da Carta de Condução", en: "Driver's License Number", fr: "Numéro de permis de conduire" },
                  currentLanguage
                )}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber || ""}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:opacity-70 disabled:bg-gray-100"
                placeholder={getTranslatedText(
                  { pt: "Ex: 123456789", en: "E.g., 123456789", fr: "Ex: 123456789" },
                  currentLanguage
                )}
              />
              {formErrors.licenseNumber && (
                <p className="mt-1 text-sm text-red-600">{formErrors.licenseNumber}</p>
              )}
            </div>
          </>
        )}

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
  );
};
