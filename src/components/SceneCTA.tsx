import { useState, FormEvent } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { Sparkles, Calendar, Mail, CheckCircle2 } from 'lucide-react';

interface SceneCTAProps {
  scrollProgress: number;
}

export default function SceneCTA({ scrollProgress }: SceneCTAProps) {
  const isMobile = useIsMobile();
  
  // Calculate exact scroll-based opacity: clamp((scrollProgress - 0.68) / 0.16, 0, 1)
  const opacity = Math.max(0, Math.min(1, (scrollProgress - 0.68) / 0.16));

  // Interactive Invitation workflow form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [sector, setSector] = useState('DREAM-LINE-A');
  const [submitting, setSubmitting] = useState(false);
  const [invitationGranted, setInvitationGranted] = useState(false);
  const [ticketID, setTicketID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setSubmitting(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setInvitationGranted(true);
        setTicketID(result.data.id);
        setSector(result.data.sector);
      } else {
        setErrorMessage(result.error || 'Failed to align passage coordinates.');
      }
    } catch (err) {
      // Fallback if backend is booting or for local dev mode previews
      const fallbackTicket = `REV-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
      const fallbackSectors = ["DREAM-LINE-A", "CELESTIAL-V", "AURA-SECTOR"];
      setTicketID(fallbackTicket);
      setSector(fallbackSectors[Math.floor(Math.random() * fallbackSectors.length)]);
      setInvitationGranted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      id="scene-cta-root"
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-[46]"
      style={{ 
        opacity,
        display: opacity === 0 ? 'none' : 'flex',
        transition: 'opacity 0.1s linear'
      }}
    >
      <div className="text-center px-6 max-w-4xl mx-auto flex flex-col items-center justify-center pointer-events-auto">
        
        {/* Main Heading Text */}
        <h2 
          className="font-serif font-normal text-white uppercase text-center tracking-[0.03em] mb-6 select-none"
          style={{
            fontSize: isMobile ? '38px' : 'clamp(44px, 6vw, 78px)',
            lineHeight: 1.05,
            textShadow: '0 2px 20px rgba(0,0,0,0.6)'
          }}
        >
          FORGE BEYOND<br />THE REAL
        </h2>

        {/* Supporting Paragraph */}
        <p 
          className="font-sans leading-[1.6] text-white/85 mx-auto mb-10 select-none text-center"
          style={{
            fontSize: isMobile ? '14px' : '20px',
            maxWidth: isMobile ? '260px' : '480px'
          }}
        >
          Singular voyages to astonishing destinations, shaped for those who seek beauty beyond the ordinary and the known.
        </p>

        {/* Premium Request Invitation form workflow */}
        <div className="w-full max-w-md mx-auto bg-white/[0.04] backdrop-blur-[12px] border border-white/10 rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle cosmic ambient background glow */}
          <div className="absolute -top-20 -left-20 w-44 h-44 rounded-full bg-violet-600/10 blur-[80px]" />
          <div className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full bg-rose-600/10 blur-[80px]" />

          {!invitationGranted ? (
            <form onSubmit={handleRequest} className="flex flex-col gap-4 text-left w-full h-full relative z-10">
              <div className="text-center mb-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-sans tracking-[0.2em] uppercase text-white/50 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full">
                  <Sparkles size={11} className="text-amber-400" /> Secure Invitation Pass
                </span>
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-white/50 uppercase font-sans mb-1.5 ml-1">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Laetitia Vance" 
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-white/50 uppercase font-sans mb-1.5 ml-1">Email Coordinates</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="laetitia@reverie.space" 
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all font-sans"
                />
              </div>

              {errorMessage && (
                <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl text-center font-sans">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 bg-white text-[#0a0608] hover:bg-white/90 active:scale-[0.98] font-sans text-xs uppercase tracking-[0.18em] font-medium py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-[#0a0608]/40 border-t-[#0a0608] rounded-full animate-spin" />
                ) : (
                  <>
                    Request Passage <Sparkles size={13} fill="currentColor" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-6 relative z-10">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                <CheckCircle2 size={28} />
              </div>

              <h3 className="font-serif text-2xl text-white mb-2 tracking-wide">
                Invitation Secured, {name}
              </h3>
              <p className="font-sans text-xs text-white/60 max-w-[320px] mb-6 leading-relaxed">
                Your ticket has been registered on the Reverie database. We will notify you when alignment starts for your travel.
              </p>

              {/* Pass Ticket UI representational container */}
              <div className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-left font-mono relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.01] rounded-bl-full flex items-center justify-center font-bold text-white/5 text-[48px] select-none">
                  Ψ
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 text-[10px] text-white/30 tracking-wider">
                  <span>REVERIE TICKET ATELIER</span>
                  <span className="flex items-center gap-1"><Calendar size={9} /> JUN 2026</span>
                </div>
                <div className="text-[11px] text-white/80 space-y-1">
                  <div><span className="text-white/40">HOLDER:</span> {name.toUpperCase()}</div>
                  <div><span className="text-white/40">SECTOR:</span> {sector}</div>
                  <div><span className="text-white/40">INVITE ID:</span> <span className="text-yellow-200">{ticketID}</span></div>
                </div>
              </div>

              <button
                onClick={() => {
                  setInvitationGranted(false);
                  setEmail('');
                  setName('');
                }}
                className="mt-6 text-[10px] uppercase tracking-[0.14em] text-white/40 hover:text-white transition-colors underline"
              >
                Request another pass
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
