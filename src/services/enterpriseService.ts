import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// Types
export interface EnterpriseData {
  name: string;
  email: string;
  phone: string;
  contactPerson: string;
  position: string;
  contactMethod: string;
  city: string;
  industry: string;
  vehicleType: string;
  monthlyDeliveries: string;
  orderPreference: string;
  message?: string;
  status: 'new' | 'contacted' | 'converted' | 'rejected';
  createdAt: string;
  updatedAt?: string;
}

// Créer une entreprise
export const createEnterprise = async (enterpriseData: Omit<EnterpriseData, 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'enterprises'), {
      ...enterpriseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { id: docRef.id, ...enterpriseData };
  } catch (error) {
    console.error("Erreur lors de la création de l'entreprise: ", error);
    throw error;
  }
};

// Récupérer toutes les entreprises
export const getEnterprises = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'enterprises'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as EnterpriseData[];
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises: ", error);
    throw error;
  }
};

// Mettre à jour une entreprise
export const updateEnterprise = async (id: string, enterpriseData: Partial<EnterpriseData>) => {
  try {
    const enterpriseRef = doc(db, 'enterprises', id);
    await updateDoc(enterpriseRef, {
      ...enterpriseData,
      updatedAt: new Date().toISOString()
    });
    return { id, ...enterpriseData };
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'entreprise ${id}: `, error);
    throw error;
  }
};

// Supprimer une entreprise
export const deleteEnterprise = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'enterprises', id));
    return id;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'entreprise ${id}: `, error);
    throw error;
  }
};
