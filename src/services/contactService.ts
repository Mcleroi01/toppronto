import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, updateDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';

// Schéma de validation avec Zod
const contactMessageSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Adresse email invalide'),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères').max(200),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(2000),
  status: z.enum(['unread', 'read', 'archived']).default('unread'),
  createdAt: z.string().or(z.instanceof(Date)).transform(val => new Date(val).toISOString()),
  updatedAt: z.string().or(z.instanceof(Date)).transform(val => new Date(val).toISOString()).optional(),
});

// Type TypeScript généré à partir du schéma Zod
export type ContactMessage = z.infer<typeof contactMessageSchema>;

// Valider les données d'un message
export const validateContactMessage = (data: unknown): ContactMessage => {
  try {
    // Valider avec le schéma
    const result = contactMessageSchema.safeParse({
      ...data,
      createdAt: data?.createdAt || new Date(),
      updatedAt: data?.updatedAt || new Date(),
    });

    if (!result.success) {
      // Formater les erreurs de validation
      const formattedErrors = result.error.format();
      console.error('Erreurs de validation:', formattedErrors);
      throw new Error('Données de message invalides');
    }

    return result.data;
  } catch (error) {
    console.error('Erreur lors de la validation du message:', error);
    throw error;
  }
};

// Envoyer un message de contact
export const sendContactMessage = async (messageData: Omit<ContactMessage, 'status' | 'createdAt' | 'updatedAt'>) => {
  try {
    // Valider les données avant l'envoi
    const validatedData = validateContactMessage({
      ...messageData,
      status: 'unread',
      createdAt: new Date(),
    });

    // Ajouter le document à Firestore
    const docRef = await addDoc(collection(db, 'contacts'), validatedData);
    
    return { 
      id: docRef.id, 
      ...validatedData 
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi du message: ", error);
    throw error;
  }
};

// Récupérer les messages de contact
export const getContactMessages = async (status?: ContactMessage['status']) => {
  try {
    let q = collection(db, 'contacts');
    
    if (status) {
      q = query(q, where('status', '==', status)) as any;
    }
    
    q = query(q, orderBy('createdAt', 'desc')) as any;
    
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => {
      try {
        // Validate each document against the schema
        const data = doc.data();
        return {
          id: doc.id,
          ...validateContactMessage(data) // This will throw if data is invalid
        };
      } catch (error) {
        console.error(`Invalid message data for document ${doc.id}:`, error);
        return null;
      }
    }).filter((msg): msg is ContactMessage & { id: string } => msg !== null);
    
    return messages;
  } catch (error) {
    console.error("Erreur lors de la récupération des messages: ", error);
    throw error;
  }
};

// Mettre à jour le statut d'un message
export const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
  try {
    // Valider le statut
    if (!['unread', 'read', 'archived'].includes(status)) {
      throw new Error('Statut de message invalide');
    }

    const messageRef = doc(db, 'contacts', id);
    const updateData = {
      status,
      updatedAt: serverTimestamp()
    };

    await updateDoc(messageRef, updateData);
    return id;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du message ${id}: `, error);
    throw error;
  }
};

// Archiver un message
export const archiveMessage = async (id: string) => {
  return updateMessageStatus(id, 'archived');
};

// Marquer un message comme lu
export const markAsRead = async (id: string) => {
  return updateMessageStatus(id, 'read');
};
