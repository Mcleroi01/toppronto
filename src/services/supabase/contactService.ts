import { supabase } from '@/lib/supabase';
import { z } from 'zod';

// Schéma de validation avec Zod
const contactMessageSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Adresse email invalide'),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères').max(200),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(2000),
  status: z.enum(['unread', 'read', 'archived']).default('unread'),
  is_read: z.boolean().default(false),
  created_at: z.string().or(z.instanceof(Date)).transform(val => new Date(val).toISOString())
});

// Type TypeScript généré à partir du schéma Zod
export type ContactMessage = z.infer<typeof contactMessageSchema>;

// Valider les données d'un message
export const validateContactMessage = (data: Partial<Omit<ContactMessage, 'created_at'>> & {
  created_at?: Date;
}): ContactMessage => {
  try {
    const result = contactMessageSchema.safeParse({
      ...data,
      created_at: data.created_at || new Date()
    });

    if (!result.success) {
      console.error('Erreurs de validation:', result.error.format());
      throw new Error('Données de message invalides');
    }

    return result.data;
  } catch (error) {
    console.error('Erreur lors de la validation du message:', error);
    throw error;
  }
};

// Envoyer un message de contact
export const sendContactMessage = async (messageData: Omit<ContactMessage, 'status' | 'is_read' | 'created_at' | 'updated_at'>) => {
  try {
    const validatedData = validateContactMessage({
      ...messageData,
      status: 'unread',
      is_read: false,
      created_at: new Date(),
    });

    const { data, error } = await supabase
      .from('contacts')
      .insert([validatedData])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    throw error;
  }
};

// Récupérer les messages de contact
export const getContactMessages = async (status?: ContactMessage['status']) => {
  try {
    let query = supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      // If status is 'read' or 'unread', use is_read field
      if (status === 'read' || status === 'unread') {
        query = query.eq('is_read', status === 'read');
      } else {
        query = query.eq('status', status);
      }
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data as ContactMessage[];
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    throw error;
  }
};

// Mettre à jour le statut d'un message
export const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
  try {
    const updateData: any = {
      status
    };

    // Update is_read based on status
    if (status === 'read' || status === 'unread') {
      updateData.is_read = status === 'read';
    }

    const { data, error } = await supabase
      .from('contacts')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
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

export default {
  sendContactMessage,
  getContactMessages,
  updateMessageStatus,
  archiveMessage,
  markAsRead,
  validateContactMessage,
};
