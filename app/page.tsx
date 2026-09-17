'use client';

import { useState, useRef } from 'react';
import { ShieldCheck, UserCheck, X } from 'lucide-react';

export default function Page() {
  const [step, setStep] = useState<'welcome' | 'captcha' | 'confirmation'>('welcome');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState(false);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCaptchaSubmit = () => {
    const answer = captchaInput.trim().toLowerCase();
    if (answer === '3' || answer === 'três' || answer === 'tres') {
      setStep('confirmation');
      setTimeout(() => {
        const params = window.location.search;
        window.location.href = 'https://www.test.com' + params;
      }, 3000);
    } else {
      setError(true);
      setCaptchaInput('');
      inputRef.current?.focus();
      setTimeout(() => setError(false), 2500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCaptchaSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#161823] flex flex-col font-sans">
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        {step !== 'confirmation' && (
           <div className="fixed inset-0 bg-[#161823]/55 backdrop-blur-sm z-50 flex items-center justify-center p-6">
             <div className="bg-white rounded-2xl p-9 max-w-[420px] w-full shadow-[0_16px_60px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-250">
               {step === 'welcome' && (
                 <>
                   <div className="w-[52px] h-[52px] bg-[#FE2C55]/10 rounded-full flex items-center justify-center mx-auto mb-5 text-[#FE2C55]">
                     <UserCheck size={26} />
                   </div>
                   <h2 className="text-[1.2rem] font-bold text-[#010101] mb-2 text-center">Bem-vindo</h2>
                   <p className="text-[0.88rem] text-[#666666] leading-relaxed mb-6 text-center">
                     Vamos fazer uma verificação rápida para liberar o acesso à sua consulta.
                   </p>
                   <div className="flex gap-3">
                     <button 
                       onClick={() => setStep('captcha')}
                       className="flex-1 bg-[#FE2C55] hover:bg-[#E6244B] text-white py-3 rounded-lg text-[0.95rem] font-bold transition-colors shadow-[0_4px_20px_rgba(254,44,85,0.28)]"
                     >
                       Iniciar acesso
                     </button>
                   </div>
                 </>
               )}

               {step === 'captcha' && (
                 <>
                   <div className="w-[52px] h-[52px] bg-[#FE2C55]/10 rounded-full flex items-center justify-center mx-auto mb-5 text-[#FE2C55]">
                     <ShieldCheck size={26} />
                   </div>
                   <h2 className="text-[1.2rem] font-bold text-[#010101] mb-2 text-center">Prova humana</h2>
                   <div className="bg-[#25F4EE]/10 rounded-lg p-[14px] text-[1.1rem] font-bold text-[#010101] mb-4 text-center">
                     Quanto é 1 + 2?
                   </div>
                   <div className="text-[0.82rem] font-semibold text-[#666666] uppercase tracking-[0.5px] mb-[6px]">
                     Digite sua resposta
                   </div>
                   <input 
                     ref={inputRef}
                     type="text" 
                     autoFocus
                     value={captchaInput}
                     onChange={(e) => setCaptchaInput(e.target.value)}
                     onKeyDown={handleKeyDown}
                     className={`w-full border-[1.5px] rounded-lg p-3 text-[1rem] text-[#161823] outline-none transition-all mb-5 ${error ? 'border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.12)]' : 'border-[#e8e8e8] focus:border-[#FE2C55] focus:shadow-[0_0_0_3px_rgba(254,44,85,0.15)]'}`}
                     placeholder="Sua resposta..." 
                     maxLength={5} 
                   />
                   {error && (
                     <div className="text-[0.82rem] text-red-500 -mt-3 mb-3">
                       Resposta incorreta. Tente novamente.
                     </div>
                   )}
                   <div className="flex gap-3">
                     <button 
                       onClick={handleCaptchaSubmit}
                       className="flex-1 bg-[#FE2C55] hover:bg-[#E6244B] text-white py-3 rounded-lg text-[0.95rem] font-bold transition-colors"
                     >
                       Prosseguir
                     </button>
                     <button 
                       onClick={() => setStep('welcome')}
                       className="flex-1 bg-[#f5f5f5] hover:bg-[#e8e8e8] text-[#666666] border border-[#e8e8e8] py-3 rounded-lg text-[0.95rem] font-medium transition-colors"
                     >
                       Voltar
                     </button>
                   </div>
                 </>
               )}
             </div>
           </div>
        )}

        {step === 'confirmation' && (
          <div className="flex flex-col items-center justify-center w-full animate-in fade-in duration-500">
            <div className="w-[72px] h-[72px] bg-[#FE2C55]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#FE2C55]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="text-[1.6rem] font-bold text-[#010101] mb-3 text-center">
              Confirmação de segurança
            </div>
            <p className="text-[0.95rem] text-[#666666] max-w-[360px] leading-[1.7] mb-8 text-center">
              Confirmamos que você não é um robô.<br/>
              Aguarde enquanto realizamos o direcionamento seguro para o atendimento.
            </p>
            <div className="flex items-center gap-[6px]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FE2C55] animate-[bounce_1.2s_infinite_ease-in-out]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FE2C55] animate-[bounce_1.2s_infinite_ease-in-out_0.2s]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FE2C55] animate-[bounce_1.2s_infinite_ease-in-out_0.4s]"></span>
            </div>
          </div>
        )}
      </main>

      {step !== 'confirmation' && (
        <footer className="bg-white text-[#666666] text-center p-5 text-[0.8rem] border-t border-[#e8e8e8] z-40">
          <div className="flex justify-center items-center gap-2 mb-1.5 flex-wrap">
            <button onClick={() => setPolicyModal('privacy')} className="hover:text-[#FE2C55] transition-colors">Política de Privacidade</button>
            <span className="text-[#9a9a9a]">•</span>
            <button onClick={() => setPolicyModal('terms')} className="hover:text-[#FE2C55] transition-colors">Termos de Uso</button>
          </div>
          <div>© 2025 Todos os direitos reservados.</div>
        </footer>
      )}

      {/* POLICY MODAL */}
      {policyModal && (
        <div className="fixed inset-0 bg-[#161823]/55 backdrop-blur-sm z-[200] flex items-center justify-center p-6" onClick={(e) => {
          if (e.target === e.currentTarget) setPolicyModal(null);
        }}>
          <div className="bg-white rounded-[14px] max-w-[560px] w-full max-h-[80vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-4 duration-250">
            <div className="p-6 md:p-7 pb-4 border-b border-[#e8e8e8] flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-[1.1rem] font-bold text-[#010101]">
                {policyModal === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso'}
              </h3>
              <button onClick={() => setPolicyModal(null)} className="text-[#9a9a9a] hover:text-[#161823] p-1 rounded-md transition-colors">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-6 md:px-7 md:pb-7 text-[0.88rem] text-[#666666] leading-[1.8]">
              {policyModal === 'privacy' ? (
                <>
                  <p>Esta plataforma respeita sua privacidade e está comprometida com a proteção dos seus dados pessoais, nos termos da Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">1. Dados coletados</h4>
                  <p>Coletamos apenas os dados estritamente necessários para o funcionamento do serviço: dados de navegação (IP, data/hora de acesso) e informações fornecidas voluntariamente pelo usuário durante a consulta.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">2. Finalidade</h4>
                  <p>Os dados são utilizados exclusivamente para viabilizar a prestação do serviço, garantir a segurança das operações e cumprir obrigações legais.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">3. Compartilhamento</h4>
                  <p>Não vendemos, alugamos ou compartilhamos dados pessoais com terceiros, salvo quando exigido por lei ou mediante consentimento expresso do titular.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">4. Segurança</h4>
                  <p>Adotamos medidas técnicas e administrativas para proteger seus dados contra acesso não autorizado, perda ou divulgação indevida.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">5. Seus direitos (LGPD)</h4>
                  <p>Você pode solicitar acesso, correção, portabilidade ou exclusão dos seus dados a qualquer momento pelos canais disponíveis na plataforma.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">6. Cookies</h4>
                  <p>Utilizamos cookies estritamente funcionais. Nenhum cookie de rastreamento é utilizado sem seu consentimento.</p>
                </>
              ) : (
                <>
                  <p>Ao acessar e utilizar esta plataforma, você declara ter lido, compreendido e concordado com os presentes Termos de Uso.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">1. Objeto</h4>
                  <p>Esta plataforma disponibiliza um canal de acesso a informações e serviços relacionados à consulta e negociação de débitos, facilitando o direcionamento do usuário ao atendimento especializado.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">2. Aceitação</h4>
                  <p>O uso desta plataforma implica aceitação integral destes termos. Caso não concorde, recomendamos que não utilize o serviço.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">3. Responsabilidades do usuário</h4>
                  <p>O usuário compromete-se a utilizar a plataforma de forma lícita e de boa-fé, não realizando ações que possam prejudicar o funcionamento do sistema ou outros usuários.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">4. Limitação de responsabilidade</h4>
                  <p>A plataforma não se responsabiliza por danos decorrentes do uso indevido, falhas de conexão ou informações incorretas fornecidas pelo próprio usuário.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">5. Propriedade intelectual</h4>
                  <p>Todo o conteúdo disponível nesta plataforma é protegido por direitos autorais e não pode ser reproduzido sem autorização prévia.</p>
                  <h4 className="text-[#010101] font-semibold mt-4 mb-1.5">6. Alterações</h4>
                  <p>Estes termos podem ser atualizados a qualquer momento, valendo sempre a versão publicada nesta página.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
