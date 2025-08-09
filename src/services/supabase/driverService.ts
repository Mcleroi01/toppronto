import { supabase } from '@/lib/supabase';

// Types
export interface DriverData {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  has_vehicle: boolean;
  vehicle_type?: string;
  license_number?: string;
  experience_years: number;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  created_at: string;
  updated_at?: string;
}

// Créer un chauffeur
export const createDriver = async (driverData: Omit<DriverData, 'status' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('drivers')
      .insert([{
        ...driverData,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Erreur lors de l'inscription du chauffeur: ", error);
    throw error;
  }
};

// Récupérer tous les chauffeurs
export const getDrivers = async (status?: DriverData['status']) => {
  try {
    let query = supabase
      .from('drivers')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data as DriverData[];
  } catch (error) {
    console.error("Erreur lors de la récupération des chauffeurs: ", error);
    throw error;
  }
};

// Mettre à jour le statut d'un chauffeur
export const updateDriverStatus = async (id: string, status: DriverData['status']) => {
  try {
    const { data, error } = await supabase
      .from('drivers')
      .update({ 
        status,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut du chauffeur: ", error);
    throw error;
  }
};

// Supprimer un chauffeur
export const deleteDriver = async (id: string) => {
  try {
    const { error } = await supabase
      .from('drivers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du chauffeur: ", error);
    throw error;
  }
};

export default {
  createDriver,
  getDrivers,
  updateDriverStatus,
  deleteDriver,
};
