import { useState, FormEvent } from 'react';
import { Mail, MapPin, Send, Compass, CheckCircle2, Clock, Globe } from 'lucide-react';

export default function Connect() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [proposalType, setProposalType] = useState('Textile Upcycling');
  const [proposalText, setProposalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !proposalText) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const coordinates = [
    {
      city: 'Lisbon Atelier',
      coords: '38.7223° N, 9.1393° W',
      desc: 'Central design, hand-weaving, and natural unbleached yarn botanical dyeing facilities.',
      hours: 'Mon - Fri, 10:00 - 18:00 WET'
    },
    {
      city: 'Manila Sourcing Lab',
      coords: '14.5995° N, 120.9842° E',
      desc: 'Pineapple leaf agricultural harvesting, Piñatex extraction research, & raw processing centers.',
      hours: 'Mon - Fri, 09:00 - 17:00 PHT'
    },
    {
      city: 'Oaxaca Organic Center',
      coords: '17.0732° N, 96.7266° W',
      desc: 'Local cooperative seed banks, botanical indigo nurseries, and loomed wool structures.',
      hours: 'Tue - Sat, 08:00 - 16:00 CST'
    }
  ];

  return (
    <div id="connect-root" className="min-h-screen bg-[#070506] text-white pt-24 px-6 md:px-12 pb-24 overflow-y-auto w-full relative z-[100] text-left">
      {/* Light glow effects */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-emerald-950/5 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-rose-950/5 blur-[120px] pointer-events-none select-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Header Block */}
        <div className="border-b border-white/5 pb-8 mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-sans tracking-[0.2em] uppercase mb-4 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <Compass size={11} /> Global Alignment coordinates
          </span>
          <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-wide mb-4">
            Connect Coordinates
          </h1>
          <p className="font-sans text-neutral-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Whether you are a biodynamic cotton farm, an upcycling research laboratory, or an eco-minded enthusiast, we align coordinates to construct beautiful, responsible futures together.
          </p>
        </div>

        {/* Master layout grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Physical Sourcing Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-serif text-2xl uppercase tracking-wide border-b border-white/5 pb-3">
              Molded Ateliers
            </h2>

            <div className="space-y-6">
              {coordinates.map((item) => (
                <div 
                  key={item.city}
                  className="bg-white/[0.01] border border-white/5 rounded-3xl p-5 hover:border-emerald-500/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <span className="font-serif text-base text-white font-medium uppercase tracking-wide">
                      {item.city}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      GPS Validated
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[11px] font-mono text-white/50 flex items-center gap-1.5">
                      <MapPin size={12} className="text-emerald-500" /> {item.coords}
                    </p>
                    <p className="text-[12px] text-neutral-400 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                    <p className="text-[11px] font-sans text-neutral-500 flex items-center gap-1.5">
                      <Clock size={12} /> {item.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-950/10 border border-emerald-900/20 rounded-3xl p-5 flex items-center gap-3">
              <Globe size={24} className="text-emerald-400 shrink-0" />
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                <span className="text-white font-semibold">General Digital Inquiries:</span> Contact our central fiber desk directly at <span className="text-emerald-400 underline cursor-pointer">inquire@reverie.space</span>.
              </p>
            </div>
          </div>

          {/* Right Side: Partnership & Proposal Form (High fidelity) */}
          <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl uppercase tracking-wide mb-1">
                    Propose Alignment
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Submit coordinates of collaborations, environmental cleanups, or organic custom fabric demands.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-wider text-white/50 uppercase font-sans mb-1.5 ml-1">Your Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sebastian Sterling" 
                      required
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.04] transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-wider text-white/50 uppercase font-sans mb-1.5 ml-1">Email Coordinates</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sebastian@gmail.com" 
                      required
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.04] transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider text-white/50 uppercase font-sans mb-1.5 ml-1">Proposal Alignment Type</label>
                  <select 
                    value={proposalType}
                    onChange={(e) => setProposalType(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500/30 focus:bg-[#070506] transition-all font-sans"
                  >
                    <option value="Textile Upcycling">Textile Upcycling Research Partnership</option>
                    <option value="Reforestation">Reforestation / Carbon Planting Initiative</option>
                    <option value="Raw Farming">Local Cotton / Hemp Family Farm Onboarding</option>
                    <option value="Custom Order">Commercial Uniform / Tailoring Contract</option>
                    <option value="Other">Other Ecological Project Synergy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider text-white/50 uppercase font-sans mb-1.5 ml-1">Your Narrative Coordinates</label>
                  <textarea 
                    rows={4}
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    placeholder="Provide a detailed roadmap explaining material quantities, environmental impact, or specialized botanical dyeing specifications..." 
                    required
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.04] transition-all font-sans leading-relaxed resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 text-black hover:bg-emerald-400 active:scale-[0.98] font-sans text-xs uppercase tracking-[0.16em] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      Transmit Proposal <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 animate-bounce">
                  <CheckCircle2 size={30} />
                </div>

                <h3 className="font-serif text-2xl text-white uppercase tracking-wider mb-2">
                  Proposal Transmitted
                </h3>
                <p className="font-sans text-xs text-neutral-400 max-w-[340px] mb-8 leading-relaxed">
                  Excellent, {name}. Our fiber technicians and environmental officers will review your proposal and respond to {email} within 48 planetary hours.
                </p>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setProposalText('');
                  }}
                  className="bg-white/5 hover:bg-white/10 text-white font-sans text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full border border-white/10 transition-colors"
                >
                  Submit another proposal
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
