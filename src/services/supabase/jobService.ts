import { supabase } from '@/lib/supabase';
import { z } from 'zod';

// Schéma de validation avec Zod
const jobOfferSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2, 'Le titre doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  location: z.string().min(2, 'La localisation est requise'),
  salary_range: z.string().optional().nullable(),
  employment_type: z.string(),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  is_active: z.boolean().default(true),
  applications_count: z.number().int().nonnegative().default(0),
  created_at: z.string(),
  updated_at: z.string().nullable()
});

// Type TypeScript généré à partir du schéma Zod
export type JobOffer = z.infer<typeof jobOfferSchema>;

// Type pour les options de filtrage
export type JobFilters = {
  search?: string;
  location?: string;
  employment_type?: string[];
  is_active?: boolean;
  date_posted?: string;
};

// Récupérer toutes les offres d'emploi
export const getJobOffers = async (filters: JobFilters = {}) => {
  console.log('getJobOffers called with filters:', JSON.stringify(filters, null, 2));
  
  try {
    console.log('Testing Supabase connection and RLS...');
    
    // Test 1: Compter les offres actives
    const { count, error: countError } = await supabase
      .from('job_offers')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);
      
    // Test 2: Récupérer les 5 premières offres
    const { data: testJobs, error: fetchError } = await supabase
      .from('job_offers')
      .select('*')
      .eq('is_active', true)
      .limit(5);
    
    if (countError || fetchError) {
      console.error('Supabase test failed:', {
        countError,
        fetchError,
        rlsHint: 'Vérifiez les politiques RLS dans Supabase > Authentication > Policies'
      });
    } else {
      console.log('Supabase test results:', {
        activeJobsCount: count,
        fetchedJobs: testJobs?.length || 0,
        firstJob: testJobs?.[0] ? 'exists' : 'none',
        rlsStatus: 'Si le comptage est différent de zéro mais que fetchedJobs est vide, vérifiez les politiques RLS'
      });
    }

    console.log('Creating Supabase query...');
    let query = supabase
      .from('job_offers')
      .select('*')
      .eq('is_active', true);
      
    console.log('Base query created');

    // Appliquer les filtres
    if (filters.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters.employment_type?.length) {
      query = query.in('employment_type', filters.employment_type);
    }

    console.log('Executing Supabase query...');
    const { data, error, status, statusText } = await query.order('created_at', { ascending: false });
    
    console.log('Query result:', {
      status,
      statusText,
      error,
      dataLength: data?.length || 0
    });

    if (error) {
      console.error('Supabase query error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }

    console.log('Validating data with Zod...');
    const validatedData = z.array(jobOfferSchema).safeParse(data);
    
    if (!validatedData.success) {
      console.error('Erreur de validation des données:', {
        error: validatedData.error,
        firstInvalidItem: data?.[0],
        dataLength: data?.length
      });
      throw new Error('Données des offres d\'emploi invalides');
    }

    console.log('Data validated successfully, returning', validatedData.data.length, 'jobs');
    return validatedData.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des offres d\'emploi:', error);
    throw error;
  }
};

// Récupérer une offre d'emploi par son ID
export const getJobOfferById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('job_offers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Offre d\'emploi non trouvée');

    // Valider les données avec Zod
    const validatedData = jobOfferSchema.safeParse(data);
    
    if (!validatedData.success) {
      console.error('Erreur de validation des données:', validatedData.error);
      throw new Error('Données de l\'offre d\'emploi invalides');
    }

    return validatedData.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'offre d'emploi ${id}:`, error);
    throw error;
  }
};

// Incrémenter le compteur de candidatures
export const incrementApplicationCount = async (jobId: string) => {
  try {
    const { error } = await supabase.rpc('increment_applications_count', {
      job_id: jobId
    });

    if (error) throw error;
  } catch (error) {
    console.error(`Erreur lors de l'incrémentation du compteur pour l'offre ${jobId}:`, error);
    throw error;
  }
};

export default {
  getJobOffers,
  getJobOfferById,
  incrementApplicationCount
};
