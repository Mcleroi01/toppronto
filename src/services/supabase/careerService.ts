import { supabase } from '@/lib/supabase';
import { z } from 'zod';

// Schéma de validation avec Zod
const jobApplicationSchema = z.object({
  first_name: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères').max(100),
  last_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(10, 'Le numéro de téléphone est invalide'),
  experience_years: z.number().min(0, 'Le nombre d\'années d\'expérience doit être positif'),
  motivation: z.string().min(3, 'Le message doit contenir au moins 10 caractères').max(2000).optional(),
  message: z.string().optional(),
  job_offer_id: z.string().optional(),
  // Les URLs des fichiers sont gérées directement dans le stockage, pas dans la base de données
  status: z.enum(['pending', 'reviewed', 'accepted', 'rejected']).default('pending'),
  created_at: z.string()
});

// Type TypeScript généré à partir du schéma Zod
export type JobApplication = z.infer<typeof jobApplicationSchema>;

// Valider les données d'une candidature
export const validateJobApplication = (data: Partial<JobApplication>): JobApplication => {
  try {
    const now = new Date().toISOString();
    const result = jobApplicationSchema.safeParse({
      ...data,
      created_at: data.created_at || now,
    });

    if (!result.success) {
      console.error('Erreurs de validation:', result.error.format());
      throw new Error('Données de candidature invalides');
    }

    return result.data;
  } catch (error) {
    console.error('Erreur lors de la validation de la candidature:', error);
    throw error;
  }
};

// Taille maximale des fichiers (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Types de fichiers autorisés
const ALLOWED_FILE_TYPES = {
  cv: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  idCard: ['application/pdf', 'image/jpeg', 'image/png']
};

// Valider un fichier avant l'upload
const validateFile = (file: File, type: 'cv' | 'idCard'): void => {
  // Vérifier la taille du fichier
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Le fichier ${file.name} dépasse la taille maximale de 5MB`);
  }

  // Vérifier le type de fichier
  if (!ALLOWED_FILE_TYPES[type].includes(file.type)) {
    throw new Error(`Type de fichier non supporté pour ${type === 'cv' ? 'le CV' : 'la pièce d\'identité'}`);
  }
};

// Upload un fichier vers le stockage Supabase
const uploadFile = async (file: File, type: 'cv' | 'idCard'): Promise<string> => {
  // Valider le fichier
  validateFile(file, type);

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const folder = type === 'cv' ? 'cvs' : 'id-cards';
  const filePath = `${folder}/${fileName}`;

  try {
    // Upload du fichier
    const { error: uploadError } = await supabase.storage
      .from('job-applications')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('job-applications')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Erreur lors de l\'upload du fichier:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue lors de l\'upload du fichier';
    throw new Error(`Échec de l'upload du fichier: ${errorMessage}`);
  }
};

// Type pour les données de candidature
export interface JobApplicationData {
  name: string; // Will be split into first_name and last_name
  email: string;
  phone: string;
  experience_years: number | string;
  motivation: string;
  portfolio: string;
  message?: string;
  jobTitle: string;
  jobOfferId?: string;
  cv: File;
  idCard: File;
}

// Soumettre une candidature
export const submitJobApplication = async (applicationData: JobApplicationData) => {
  try {
    // Télécharger les fichiers en parallèle
    await Promise.all([
      uploadFile(applicationData.cv, 'cv'),
      uploadFile(applicationData.idCard, 'idCard')
    ]);

    // Split the name into first and last name, ensuring we always have both
    const nameParts = applicationData.name.trim().split(/\s+/);
    let first_name = '';
    let last_name = '';
    
    if (nameParts.length === 1) {
      // If only one name is provided, use it as the first name
      first_name = nameParts[0];
      last_name = 'N/A';
    } else {
      // Use the first part as first name and the rest as last name
      first_name = nameParts[0];
      last_name = nameParts.slice(1).join(' ');
    }
    
    // Prepare data for database
    const applicationDataForDb = {
      first_name: first_name,
      last_name: last_name,
      email: applicationData.email,
      phone: applicationData.phone,
      experience_years: Number(applicationData.experience_years) || 0,
      message: applicationData.motivation,
      job_offer_id: applicationData.jobOfferId,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
    };

    // Valider les données
    const validatedData = validateJobApplication(applicationDataForDb);

    // Insert the application data
    const { data, error } = await supabase
      .from('job_applications')
      .insert([validatedData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erreur lors de la soumission de la candidature:", error);
    throw error;
  }
};

// Récupérer toutes les candidatures
export const getJobApplications = async (status?: JobApplication['status']) => {
  try {
    let query = supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data as JobApplication[];
  } catch (error) {
    console.error('Erreur lors de la récupération des candidatures:', error);
    throw error;
  }
};

// Mettre à jour le statut d'une candidature
export const updateApplicationStatus = async (id: string, status: JobApplication['status']) => {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de la candidature:', error);
    throw error;
  }
};

// Ajouter une note à une candidature
export const addApplicationNote = async (id: string, note: string) => {
  try {
    // Récupérer les notes existantes
    const { data: existingData, error: fetchError } = await supabase
      .from('job_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    const existingNotes = existingData?.notes || '';
    const newNote = `[${new Date().toISOString()}] ${note}\n${existingNotes}`;

    const { data, error } = await supabase
      .from('job_applications')
      .update({ notes: newNote })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la note:', error);
    throw error;
  }
};

// Supprimer une candidature
export const deleteJobApplication = async (id: string) => {
  try {
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de la candidature:', error);
    throw error;
  }
};

export default {
  submitJobApplication,
  getJobApplications,
  updateApplicationStatus,
  addApplicationNote,
  deleteJobApplication,
  validateJobApplication,
};
