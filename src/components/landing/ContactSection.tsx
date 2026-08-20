import React, { useState } from 'react';
import { WORKSHOP_METADATA } from '../../data/syllabus';
import { 
  Building2, 
  Mail, 
  Phone, 
  ExternalLink, 
  Send, 
  CheckCircle, 
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  Users
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const f = WORKSHOP_METADATA.facilitator;

  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    instituicao: '',
    email: '',
    whatsapp: '',
    cidadeUf: '',
    turmas: '1 turma (até 20 alunos)',
    formato: 'Padrão (4 encontros de 3h = 12h)',
    mensagem: '',
    consentimento: true
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppMessage = () => {
    const text = `*SOLICITAÇÃO DE PROPOSTA - WORKSHOP IA APLICADA*%0A%0A` +
      `*Nome:* ${formData.nome || 'Não informado'}%0A` +
      `*Cargo:* ${formData.cargo || 'Não informado'}%0A` +
      `*Instituição:* ${formData.instituicao || 'Não informada'}%0A` +
      `*E-mail:* ${formData.email || 'Não informado'}%0A` +
      `*WhatsApp:* ${formData.whatsapp || 'Não informado'}%0A` +
      `*Cidade/UF:* ${formData.cidadeUf || 'Não informada'}%0A` +
      `*Estimativa:* ${formData.turmas}%0A` +
      `*Formato:* ${formData.formato}%0A` +
      (formData.mensagem ? `*Mensagem:* ${formData.mensagem}%0A` : '');
    return text;
  };

  return (
    <section 
      id="contato" 
      aria-labelledby="contato-title" 
      className="py-16 lg:py-24 bg-slate-900 text-white transition-colors relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-95" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>CONTRATAÇÃO INSTITUCIONAL & PARCERIAS</span>
          </div>
          <h2 id="contato-title" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Leve o Workshop para sua Escola ou Organização
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Preencha os dados da sua instituição para receber a proposta pedagógica completa, cronogramas customizados e detalhamento de investimento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Formatos & Benefícios Institucionais (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Formatos do Workshop */}
            <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                Formatos Disponíveis
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400">Formato Padrão (Semestral/Modular)</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">12 Horas</span>
                  </div>
                  <p className="text-slate-300">4 encontros práticos de 3 horas. Até 20 alunos organizados em 4 equipes.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400">Imersão Intensiva (Bootcamp)</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">2 Dias x 6h</span>
                  </div>
                  <p className="text-slate-300">Jornada acelerada para semanas de inovação, feiras de ciências ou contraturno.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400">Formação de Professores & Multiplicadores</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Capacitação</span>
                  </div>
                  <p className="text-slate-300">Treinamento pedagógico e metodológico para o corpo docente conduzir a oficina.</p>
                </div>
              </div>

              {/* O que está incluso */}
              <div className="pt-4 border-t border-slate-700/80 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  O que está incluso no pacote institucional:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acesso vitalício ao Webapp Operacional e Biblioteca de Prompts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Minutas de autorização LGPD e termos de consentimento parental</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Condução e mentoria direta com Pedro Lago (O Forno)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Relatório técnico com documentação dos protótipos gerados</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Direct Quick Contact */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a
                href={`mailto:${f.email}`}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-amber-500 transition-all flex flex-col items-center text-center gap-1.5"
              >
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-white">E-mail Direto</span>
                <span className="text-[11px] text-slate-400 truncate max-w-full">{f.email}</span>
              </a>

              <a
                href={f.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500 transition-all flex flex-col items-center text-center gap-1.5"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white">WhatsApp</span>
                <span className="text-[11px] text-slate-400">{f.phone}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Institutional Proposal Form (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700 shadow-2xl space-y-6">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-white">
                    Solicitar Proposta Institucional
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Responderemos em até 24h com a minuta pedagógica e disponibilidade de agenda.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nome */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-nome" className="text-xs font-bold text-slate-300">
                      Nome do Responsável *
                    </label>
                    <input
                      id="form-nome"
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: Profa. Maria Silva"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Cargo */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-cargo" className="text-xs font-bold text-slate-300">
                      Cargo / Função *
                    </label>
                    <input
                      id="form-cargo"
                      type="text"
                      required
                      value={formData.cargo}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      placeholder="Ex: Coordenação Pedagógica / Direção"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Instituição */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-instituicao" className="text-xs font-bold text-slate-300">
                      Nome da Escola / Instituição *
                    </label>
                    <input
                      id="form-instituicao"
                      type="text"
                      required
                      value={formData.instituicao}
                      onChange={(e) => setFormData({ ...formData, instituicao: e.target.value })}
                      placeholder="Ex: Colégio Estadual Santos Dumont"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Cidade/UF */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-cidade" className="text-xs font-bold text-slate-300">
                      Cidade e Estado (UF) *
                    </label>
                    <input
                      id="form-cidade"
                      type="text"
                      required
                      value={formData.cidadeUf}
                      onChange={(e) => setFormData({ ...formData, cidadeUf: e.target.value })}
                      placeholder="Ex: Belo Horizonte - MG"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* E-mail */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-xs font-bold text-slate-300">
                      E-mail Institucional *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu.email@escola.edu.br"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-whatsapp" className="text-xs font-bold text-slate-300">
                      WhatsApp com DDD *
                    </label>
                    <input
                      id="form-whatsapp"
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="(31) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Estimativa de Turmas */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-turmas" className="text-xs font-bold text-slate-300">
                      Estimativa de Alunos
                    </label>
                    <select
                      id="form-turmas"
                      value={formData.turmas}
                      onChange={(e) => setFormData({ ...formData, turmas: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option>1 turma (até 20 alunos)</option>
                      <option>2 turmas (até 40 alunos)</option>
                      <option>3 ou mais turmas (60+ alunos)</option>
                      <option>Capacitação exclusiva para professores</option>
                    </select>
                  </div>

                  {/* Formato */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-formato" className="text-xs font-bold text-slate-300">
                      Formato de Preferência
                    </label>
                    <select
                      id="form-formato"
                      value={formData.formato}
                      onChange={(e) => setFormData({ ...formData, formato: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option>Padrão (4 encontros de 3h = 12h)</option>
                      <option>Imersão Intensiva (2 dias x 6h)</option>
                      <option>Formato Híbrido Customizado</option>
                      <option>A definir com a equipe</option>
                    </select>
                  </div>
                </div>

                {/* Mensagem */}
                <div className="space-y-1.5">
                  <label htmlFor="form-mensagem" className="text-xs font-bold text-slate-300">
                    Mensagem ou Contexto da Instituição (Opcional)
                  </label>
                  <textarea
                    id="form-mensagem"
                    rows={3}
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    placeholder="Conte-nos brevemente o contexto da turma, expectativas pedagógicas ou datas pretendidas..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>

                {/* Checkbox LGPD */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="form-consentimento"
                    type="checkbox"
                    required
                    checked={formData.consentimento}
                    onChange={(e) => setFormData({ ...formData, consentimento: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-slate-900 border-slate-700"
                  />
                  <label htmlFor="form-consentimento" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                    Concordo com o tratamento dos dados institucionais informados exclusivamente para envio da proposta, em conformidade com a LGPD.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-base shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/35 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Send className="w-5 h-5" />
                    <span>Enviar Solicitação de Proposta</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation Box */
              <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">
                    Solicitação Recebida com Sucesso!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong>{formData.nome}</strong>. Já registramos o interesse de <strong>{formData.instituicao}</strong>. Entraremos em contato pelo e-mail <strong>{formData.email}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-xs text-slate-300 max-w-md mx-auto text-left space-y-2">
                  <p className="font-bold text-amber-400">Quer acelerar o atendimento?</p>
                  <p>Envie os dados preenchidos diretamente para o WhatsApp de Pedro Lago:</p>
                  <a
                    href={`https://wa.me/5532998344329?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 text-sm shadow-md transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Abrir Conversa no WhatsApp</span>
                  </a>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Fazer outra solicitação
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
