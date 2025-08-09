import { supabase } from '@/lib/supabase';

// Types
export interface EnterpriseData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  contact_person: string;
  position: string;
  contact_method: string;
  city: string;
  industry: string;
  vehicle_type: string;
  monthly_deliveries: string;
  order_preference: string;
  message?: string;
  status: 'new' | 'contacted' | 'converted' | 'rejected';
  created_at: string;
  updated_at?: string;
}

// Créer une entreprise
export const createEnterprise = async (enterpriseData: Omit<EnterpriseData, 'status' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('enterprises')
      .insert([{
        ...enterpriseData,
        status: 'new',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Erreur lors de la création de l'entreprise: ", error);
    throw error;
  }
};

// Récupérer toutes les entreprises
export const getEnterprises = async (status?: EnterpriseData['status']) => {
  try {
    let query = supabase
      .from('enterprises')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data as EnterpriseData[];
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises: ", error);
    throw error;
  }
};

// Mettre à jour une entreprise
export const updateEnterprise = async (id: string, enterpriseData: Partial<EnterpriseData>) => {
  try {
    const { data, error } = await supabase
      .from('enterprises')
      .update({
        ...enterpriseData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'entreprise: ", error);
    throw error;
  }
};

// Supprimer une entreprise
export const deleteEnterprise = async (id: string) => {
  try {
    const { error } = await supabase
      .from('enterprises')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'entreprise: ", error);
    throw error;
  }
};

export default {
  createEnterprise,
  getEnterprises,
  updateEnterprise,
  deleteEnterprise,
};
