import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// Types
export interface DriverData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  hasVehicle: boolean;
  vehicleType?: string;
  licenseNumber?: string;
  experienceYears: number;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  createdAt: string;
  updatedAt?: string;
}

// Créer un chauffeur
export const createDriver = async (driverData: Omit<DriverData, 'status' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'drivers'), {
      ...driverData,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { id: docRef.id, ...driverData };
  } catch (error) {
    console.error("Erreur lors de l'inscription du chauffeur: ", error);
    throw error;
  }
};

// Récupérer tous les chauffeurs
export const getDrivers = async (status?: DriverData['status']) => {
  try {
    let q = collection(db, 'drivers');
    if (status) {
      q = query(q, where('status', '==', status)) as any;
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as DriverData[];
  } catch (error) {
    console.error("Erreur lors de la récupération des chauffeurs: ", error);
    throw error;
  }
};

// Mettre à jour le statut d'un chauffeur
export const updateDriverStatus = async (id: string, status: DriverData['status']) => {
  try {
    const driverRef = doc(db, 'drivers', id);
    await updateDoc(driverRef, {
      status,
      updatedAt: new Date().toISOString()
    });
    return id;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du statut du chauffeur ${id}: `, error);
    throw error;
  }
};

// Supprimer un chauffeur
export const deleteDriver = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'drivers', id));
    return id;
  } catch (error) {
    console.error(`Erreur lors de la suppression du chauffeur ${id}: `, error);
    throw error;
  }
};
