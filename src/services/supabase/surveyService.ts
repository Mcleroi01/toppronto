import { supabase } from '@/lib/supabase';
import { z } from 'zod';

// Align with UI structure but allow partials; we store raw JSON too.
export const partnershipDurationValues = ['menos_6m', '6m_1a', '1a_2a', 'mais_2a'] as const;
export const boolTriValues = ['sim', 'parcialmente', 'nao'] as const;
export const extravioValues = ['sim_frequente', 'sim_asvezes', 'nao'] as const;
export const pontualidadeValues = ['sempre', 'maioria', 'raramente', 'nunca'] as const;

const answersSchema = z.object({
  informacoesGerais: z.object({
    empresa: z.string().min(1),
    tempoParceria: z.enum(partnershipDurationValues).optional(),
  }),
  experienciaGeral: z.object({
    satisfacaoGeral: z.number().int().min(0).max(5).optional(),
    facilidadeUso: z.enum(boolTriValues).optional(),
    clarezaInfo: z.number().int().min(0).max(5).optional(),
  }),
  logistica: z.object({
    pontualidade: z.enum(pontualidadeValues).optional(),
    qualidadeProf: z.number().int().min(0).max(5).optional(),
    problemasExtravio: z.enum(extravioValues).optional(),
  }),
  relacionamento: z.object({
    suporte: z.number().int().min(0).max(5).optional(),
    comunicacao: z.enum(boolTriValues).optional(),
  }),
  financeiro: z.object({
    pagamentos: z.number().int().min(0).max(5).optional(),
    taxas: z.enum(boolTriValues).optional(),
    aumentouVendas: z.enum(boolTriValues).optional(),
  }),
  sugestoes: z.object({
    melhorias: z.string().optional(),
    recomenda: z.enum(['sim', 'nao']).optional(),
  }),
});

export type SurveyAnswers = z.infer<typeof answersSchema>;

export interface SaveSurveyPayload {
  answers: SurveyAnswers;
  locale?: string; // ex.: 'pt', 'en', 'fr'
  user_agent?: string;
}

export const saveSurvey = async ({ answers, locale, user_agent }: SaveSurveyPayload) => {
  // Validate
  const result = answersSchema.safeParse(answers);
  if (!result.success) {
    console.error('Survey validation errors:', result.error.flatten());
    throw new Error('Invalid survey payload');
  }

  const row = {
    company_name: answers.informacoesGerais.empresa,
    partnership_duration: answers.informacoesGerais.tempoParceria ?? null,
    locale: locale ?? null,
    user_agent: user_agent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : null),
    answers_json: result.data, // store full JSON for analytics
  };

  const { error } = await supabase
    .from('surveys')
    .insert([row]);

  if (error) {
    console.error('Error saving survey:', error);
    throw error;
  }

  // We intentionally return nothing to avoid SELECT (RLS safe)
  return { ok: true } as const;
};

export default {
  saveSurvey,
};
