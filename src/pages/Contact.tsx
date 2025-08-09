import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendContactMessage } from "@/services/supabase/contactService";

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  // currentLanguage est utilisé pour la traduction via la fonction t() de react-i18next
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Envoyer le message via le service de contact Supabase
      await sendContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      
      // Réinitialiser le formulaire
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitSuccess(true);
      
      // Afficher un message de succès
      toast.success(
        t("contact.successMessage", "Votre message a été envoyé avec succès !"),
        { 
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (error: any) {
      console.error("Erreur lors de l'envoi du message:", error);
      
      // Message d'erreur plus détaillé
      const errorMessage = error?.message || 
        t(
          "contact.errorMessage",
          "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer."
        );
        
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold py-16 text-center text-gray-800"
      >
        {t("contact.title", "Fale Conosco")}
      </motion.h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 relative pb-16">
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5"
            style={{
              backgroundImage: "url('/images/background.png')",
            }}
          ></div>
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg p-8 rounded-xl z-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("contact.name", "Nome")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("contact.email", "Email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("contact.subject", "Assunto")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("contact.message", "Mensagem")}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="flex items-center justify-center w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    {t("contact.sending", "Envoi en cours...")}
                  </>
                ) : submitSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    {t("contact.sent", "Message envoyé")}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    {t("contact.sendButton", "Envoyer le message")}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Info + Carte */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-gray-100 p-6 rounded-xl shadow">
              <div className="flex items-start gap-4">
                <Phone className="text-green-600" />
                <div>
                  <p className="font-semibold">
                    {t("contact.phone", "Telefone")}
                  </p>
                  <p>+244 929 302 094</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mt-4">
                <Mail className="text-green-600" />
                <div>
                  <p className="font-semibold">{t("contact.email", "Email")}</p>
                  <p>topronto@geral.ao</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mt-4">
                <MapPin className="text-green-600" />
                <div>
                  <p className="font-semibold">
                    Morro bento, rua do kikagil, casa 341, Luanda, Angola
                  </p>
                  <p>Luanda, Angola</p>
                </div>
              </div>
            </div>

            {/* Carte Google Maps */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Localização"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15771.947923768958!2d13.234409644446415!3d-8.838333938975953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f3c1fd775f91%3A0x84ecb98c1aeab25e!2sLuanda!5e0!3m2!1spt-PT!2sao!4v1620123456789"
                width="100%"
                height="300"
                loading="lazy"
                allowFullScreen
                className="w-full h-[300px] border-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
