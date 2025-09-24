import React, { useMemo, useState } from 'react';
import ProgressBar from '../components/survey/ProgressBar';
import RatingStars from '../components/survey/RatingStars';
import RadioGroup from '../components/survey/RadioGroup';
import { saveSurvey } from '@/services/supabase/surveyService';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Types for answers JSON
interface Answers {
  informacoesGerais: {
    empresa: string;
    tempoParceria?: 'menos_6m' | '6m_1a' | '1a_2a' | 'mais_2a';
  };
  experienciaGeral: {
    satisfacaoGeral?: number;
    facilidadeUso?: 'sim' | 'parcialmente' | 'nao';
    clarezaInfo?: number;
  };
  logistica: {
    pontualidade?: 'sempre' | 'maioria' | 'raramente' | 'nunca';
    qualidadeProf?: number;
    problemasExtravio?: 'sim_frequente' | 'sim_asvezes' | 'nao';
  };
  relacionamento: {
    suporte?: number;
    comunicacao?: 'sim' | 'parcialmente' | 'nao';
  };
  financeiro: {
    pagamentos?: number;
    taxas?: 'sim' | 'parcialmente' | 'nao';
    aumentouVendas?: 'sim' | 'parcialmente' | 'nao';
  };
  sugestoes: {
    melhorias?: string;
    recomenda?: 'sim' | 'nao';
  };
}

const initialAnswers: Answers = {
  informacoesGerais: {
    empresa: '',
    tempoParceria: undefined,
  },
  experienciaGeral: {},
  logistica: {},
  relacionamento: {},
  financeiro: {},
  sugestoes: {},
};

const cardClass = 'bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6';
const h1Class = 'text-xl sm:text-2xl font-semibold text-slate-900';
const labelClass = 'text-sm text-slate-600';
const actionBtn = 'inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:focus';

const Survey: React.FC = () => {
  const [step, setStep] = useState(0); // 0..5 are content steps, 6 is summary
  const totalSteps = 6; // excluding summary
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const successStep = totalSteps + 1;

  const canGoNext = useMemo(() => {
    if (step === 0) {
      return (
        answers.informacoesGerais.empresa.trim().length > 0 &&
        !!answers.informacoesGerais.tempoParceria
      );
    }
    return true;
  }, [step, answers]);

  const goNext = () => {
    if (step < totalSteps) setStep((s) => s + 1);
  };
  const goPrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log('Respostas do Inquérito:', answers);
      await saveSurvey({ answers, locale: i18n.language });
      // Go to success step
      setStep(successStep);
    } catch (e) {
      console.error('Erro ao enviar o inquérito:', e);
      alert('Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Sticky top bar with progress */}
      <div className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur supports-[backdrop-filter]:bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <ProgressBar
            current={Math.min(step + 1, totalSteps)}
            total={totalSteps}
            label="Progresso"
            showPercent
            compact
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto w-full px-4 py-6 sm:py-8 flex-1">
        <div className={`${cardClass} animate-slideDownIn`}> 
          {step === 0 && (
            <div className="space-y-6">
              <h1 className={h1Class}>1. Informações Gerais</h1>
              <div className="space-y-2">
                <label className={labelClass}>Nome da Empresa/Restaurante</label>
                <input
                  type="text"
                  value={answers.informacoesGerais.empresa}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      informacoesGerais: { ...prev.informacoesGerais, empresa: e.target.value },
                    }))
                  }
                  placeholder="Ex.: Pizzaria Sabor & Arte"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Tempo de parceria com a plataforma</label>
                <RadioGroup<'menos_6m' | '6m_1a' | '1a_2a' | 'mais_2a'>
                  name="tempoParceria"
                  value={answers.informacoesGerais.tempoParceria}
                  onChange={(val) =>
                    setAnswers((prev) => ({
                      ...prev,
                      informacoesGerais: { ...prev.informacoesGerais, tempoParceria: val },
                    }))
                  }
                  options={[
                    { label: 'Menos de 6 meses', value: 'menos_6m' },
                    { label: '6 meses a 1 ano', value: '6m_1a' },
                    { label: '1 a 2 anos', value: '1a_2a' },
                    { label: 'Mais de 2 anos', value: 'mais_2a' },
                  ]}
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h1 className={h1Class}>2. Experiência Geral</h1>
              <div className="space-y-2">
                <label className={labelClass}>Como avalia a sua satisfação geral com o App?</label>
                <RatingStars
                  value={answers.experienciaGeral.satisfacaoGeral || 0}
                  onChange={(v) => setAnswers((prev) => ({
                    ...prev,
                    experienciaGeral: { ...prev.experienciaGeral, satisfacaoGeral: v },
                  }))}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>A plataforma é fácil de usar e intuitiva?</label>
                <RadioGroup<'sim' | 'parcialmente' | 'nao'>
                  name="facilidadeUso"
                  value={answers.experienciaGeral.facilidadeUso}
                  onChange={(val) => setAnswers((prev) => ({
                    ...prev,
                    experienciaGeral: { ...prev.experienciaGeral, facilidadeUso: val },
                  }))}
                  options={[
                    { label: 'Sim', value: 'sim' },
                    { label: 'Parcialmente', value: 'parcialmente' },
                    { label: 'Não', value: 'nao' },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Como avalia a clareza e precisão das informações sobre os pedidos?</label>
                <RatingStars
                  value={answers.experienciaGeral.clarezaInfo || 0}
                  onChange={(v) => setAnswers((prev) => ({
                    ...prev,
                    experienciaGeral: { ...prev.experienciaGeral, clarezaInfo: v },
                  }))}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h1 className={h1Class}>3. Logística e Entregas</h1>
              <div className="space-y-2">
                <label className={labelClass}>A pontualidade dos motoboys/entregadores tem sido satisfatória?</label>
                <RadioGroup<'sempre' | 'maioria' | 'raramente' | 'nunca'>
                  name="pontualidade"
                  value={answers.logistica.pontualidade}
                  onChange={(val) => setAnswers((prev) => ({
                    ...prev,
                    logistica: { ...prev.logistica, pontualidade: val },
                  }))}
                  options={[
                    { label: 'Sempre', value: 'sempre' },
                    { label: 'Na maioria das vezes', value: 'maioria' },
                    { label: 'Raramente', value: 'raramente' },
                    { label: 'Nunca', value: 'nunca' },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Como classifica a qualidade e profissionalismo dos entregadores?</label>
                <RatingStars
                  value={answers.logistica.qualidadeProf || 0}
                  onChange={(v) => setAnswers((prev) => ({
                    ...prev,
                    logistica: { ...prev.logistica, qualidadeProf: v },
                  }))}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Já enfrentou problemas com pedidos não entregues ou extraviados?</label>
                <RadioGroup<'sim_frequente' | 'sim_asvezes' | 'nao'>
                  name="problemasExtravio"
                  value={answers.logistica.problemasExtravio}
                  onChange={(val) => setAnswers((prev) => ({
                    ...prev,
                    logistica: { ...prev.logistica, problemasExtravio: val },
                  }))}
                  options={[
                    { label: 'Sim, frequentemente', value: 'sim_frequente' },
                    { label: 'Sim, às vezes', value: 'sim_asvezes' },
                    { label: 'Não', value: 'nao' },
                  ]}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h1 className={h1Class}>4. Relacionamento e Apoio</h1>
              <div className="space-y-2">
                <label className={labelClass}>Como avalia o suporte/atendimento ao cliente da plataforma?</label>
                <RatingStars
                  value={answers.relacionamento.suporte || 0}
                  onChange={(v) => setAnswers((prev) => ({
                    ...prev,
                    relacionamento: { ...prev.relacionamento, suporte: v },
                  }))}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>A comunicação entre o restaurante/lojista e a plataforma é eficiente?</label>
                <RadioGroup<'sim' | 'parcialmente' | 'nao'>
                  name="comunicacao"
                  value={answers.relacionamento.comunicacao}
                  onChange={(val) => setAnswers((prev) => ({
                    ...prev,
                    relacionamento: { ...prev.relacionamento, comunicacao: val },
                  }))}
                  options={[
                    { label: 'Sim', value: 'sim' },
                    { label: 'Parcialmente', value: 'parcialmente' },
                    { label: 'Não', value: 'nao' },
                  ]}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h1 className={h1Class}>5. Financeiro</h1>
              <div className="space-y-2">
                <label className={labelClass}>Como avalia a clareza e pontualidade dos pagamentos recebidos?</label>
                <RatingStars
                  value={answers.financeiro.pagamentos || 0}
                  onChange={(v) => setAnswers((prev) => ({
                    ...prev,
                    financeiro: { ...prev.financeiro, pagamentos: v },
                  }))}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>As taxas cobradas pela plataforma são justas?</label>
                <RadioGroup<'sim' | 'parcialmente' | 'nao'>
                  name="taxas"
                  value={answers.financeiro.taxas}
                  onChange={(val) => setAnswers((prev) => ({
                    ...prev,
                    financeiro: { ...prev.financeiro, taxas: val },
                  }))}
                  options={[
                    { label: 'Sim', value: 'sim' },
                    { label: 'Parcialmente', value: 'parcialmente' },
                    { label: 'Não', value: 'nao' },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Trabalhar com aplicativos de entrega aumentou as suas vendas?</label>
                <RadioGroup<'sim' | 'parcialmente' | 'nao'>
                  name="aumentouVendas"
                  value={answers.financeiro.aumentouVendas}
                  onChange={(val) => setAnswers((prev) => ({
                    ...prev,
                    financeiro: { ...prev.financeiro, aumentouVendas: val },
                  }))}
                  options={[
                    { label: 'Sim', value: 'sim' },
                    { label: 'Parcialmente', value: 'parcialmente' },
                    { label: 'Não', value: 'nao' },
                  ]}
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h1 className={h1Class}>6. Sugestões</h1>
              <div className="space-y-2">
                <label className={labelClass}>Quais melhorias gostaria de ver no App?</label>
                <textarea
                  value={answers.sugestoes.melhorias || ''}
                  onChange={(e) => setAnswers((prev) => ({
                    ...prev,
                    sugestoes: { ...prev.sugestoes, melhorias: e.target.value },
                  }))}
                  placeholder="Conte-nos suas ideias..."
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Recomenda o uso desta plataforma a outros lojistas/restaurantes?</label>
                <RadioGroup<'sim' | 'nao'>
                  name="recomenda"
                  value={answers.sugestoes.recomenda}
                  onChange={(val) => setAnswers((prev) => ({
                    ...prev,
                    sugestoes: { ...prev.sugestoes, recomenda: val },
                  }))}
                  options={[
                    { label: 'Sim', value: 'sim' },
                    { label: 'Não', value: 'nao' },
                  ]}
                />
              </div>
            </div>
          )}

          {step >= totalSteps && (
            <div className="space-y-6">
              <h1 className={h1Class}>Resumo das Respostas</h1>
              <div className="grid grid-cols-1 gap-4 text-sm text-slate-700">
                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-medium text-slate-900 mb-1">Informações Gerais</h3>
                  <p>Empresa: {answers.informacoesGerais.empresa || '-'}</p>
                  <p>
                    Tempo de parceria: {
                      (() => {
                        const map: Record<'menos_6m' | '6m_1a' | '1a_2a' | 'mais_2a', string> = {
                          menos_6m: 'Menos de 6 meses',
                          '6m_1a': '6 meses a 1 ano',
                          '1a_2a': '1 a 2 anos',
                          mais_2a: 'Mais de 2 anos',
                        };
                        return answers.informacoesGerais.tempoParceria
                          ? map[answers.informacoesGerais.tempoParceria]
                          : '-';
                      })()
                    }
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-medium text-slate-900 mb-1">Experiência Geral</h3>
                  <p>Satisfação geral: {answers.experienciaGeral.satisfacaoGeral || '-'}</p>
                  <p>Facilidade de uso: {answers.experienciaGeral.facilidadeUso || '-'}</p>
                  <p>Clareza das informações: {answers.experienciaGeral.clarezaInfo || '-'}</p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-medium text-slate-900 mb-1">Logística e Entregas</h3>
                  <p>Pontualidade: {answers.logistica.pontualidade || '-'}</p>
                  <p>Qualidade/profissionalismo: {answers.logistica.qualidadeProf || '-'}</p>
                  <p>Problemas não entregues/extraviados: {answers.logistica.problemasExtravio || '-'}</p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-medium text-slate-900 mb-1">Relacionamento e Apoio</h3>
                  <p>Suporte: {answers.relacionamento.suporte || '-'}</p>
                  <p>Comunicação eficiente: {answers.relacionamento.comunicacao || '-'}</p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-medium text-slate-900 mb-1">Financeiro</h3>
                  <p>Pagamentos: {answers.financeiro.pagamentos || '-'}</p>
                  <p>Taxas justas: {answers.financeiro.taxas || '-'}</p>
                  <p>Aumento de vendas: {answers.financeiro.aumentouVendas || '-'}</p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-medium text-slate-900 mb-1">Sugestões</h3>
                  <p>Melhorias: {answers.sugestoes.melhorias || '-'}</p>
                  <p>Recomenda: {answers.sugestoes.recomenda || '-'}</p>
                </div>
              </div>
            </div>
          )}

          {step === successStep && (
            <div className="text-center space-y-4 py-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-50 flex items-center justify-center ring-1 ring-green-100">
                <svg className="h-9 w-9 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h1 className={h1Class}>Obrigado!</h1>
              <p className="text-slate-600 text-sm max-w-md mx-auto">Recebemos o seu inquérito com sucesso. A sua opinião ajuda-nos a melhorar continuamente.</p>
            </div>
          )}

          {/* Step hint */}
          {step < totalSteps && (
            <div className="mt-4 text-center text-xs text-slate-500">Questão {step + 1} de {totalSteps}</div>
          )}
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <div className="sticky bottom-0 z-20 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-t border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3 [padding-bottom:env(safe-area-inset-bottom)]">
          {step !== successStep && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={step === 0 || isSubmitting}
                className={`${actionBtn} border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50`}
              >
                Anterior
              </button>

              {step < totalSteps && (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canGoNext || isSubmitting}
                  className={`${actionBtn} bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50`}
                >
                  Próximo
                </button>
              )}

              {step >= totalSteps && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`${actionBtn} bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50`}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              )}
            </>
          )}

          {step === successStep && (
            <div className="w-full flex items-center justify-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className={`${actionBtn} bg-blue-600 text-white hover:bg-blue-700`}
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Survey;
