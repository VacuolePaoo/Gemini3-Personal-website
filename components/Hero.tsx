
import React from 'react';
import Marquee from './Marquee';

interface HeroProps {
  isActive: boolean;
}

const Hero: React.FC<HeroProps> = ({ isActive }) => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between bg-ind-black overflow-hidden border-r border-ind-concrete">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-sm opacity-20 pointer-events-none"></div>
      
      {/* Decorative Giant Text */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-0 transition-all duration-1000 ${isActive ? 'opacity-10 scale-100' : 'opacity-0 scale-90'}`}>
         <h1 className="text-[25vw] font-display font-bold leading-none text-center text-ind-concrete stroke-text">
            SYS_01
         </h1>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 lg:px-32">
        <div className="max-w-6xl">
            <div className={`inline-flex items-center gap-2 bg-ind-orange/10 border border-ind-orange text-ind-orange px-4 py-2 font-mono text-sm mb-6 font-bold transition-all duration-700 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="w-2 h-2 bg-ind-orange animate-pulse"></span>
                STATUS: ONLINE [V.1.0.4]
            </div>
            
            <h1 className="text-6xl md:text-9xl font-display font-bold uppercase leading-[0.85] tracking-tighter mb-8 text-ind-light overflow-hidden">
                <div className={`transition-transform duration-700 delay-200 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}>
                  Creative
                </div>
                <div className={`transition-transform duration-700 delay-300 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-ind-concrete to-white">Engineer</span>
                </div>
            </h1>
            
            <div className={`flex flex-col md:flex-row items-start md:items-end gap-8 border-l-4 border-ind-orange pl-6 ml-2 transition-all duration-700 delay-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <p className="font-mono text-ind-concrete max-w-lg text-sm md:text-lg leading-relaxed">
                    Constructing digital realities through code. Maximalist aesthetics meets industrial-grade performance. 
                </p>
            </div>
        </div>
      </div>

      {/* Footer Area */}
      <div className={`relative z-10 transition-all duration-1000 delay-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="flex justify-between items-end px-6 md:px-12 pb-8">
            <div className="flex flex-col">
                <span className="font-mono text-xs text-ind-orange">SECTOR</span>
                <span className="font-mono font-bold text-ind-light text-2xl">01</span>
            </div>
            <div className="hidden md:block w-1/3 h-px bg-ind-concrete"></div>
            <div className="flex flex-col text-right">
                 <span className="font-mono text-xs text-ind-orange">INITIATED</span>
                 <span className="font-mono font-bold text-ind-light">2024</span>
            </div>
        </div>
        <Marquee text="AVAILABLE FOR NEW PROTOCOLS // REACT // TYPESCRIPT // SYSTEM ARCHITECTURE" />
      </div>
    </section>
  );
};

export default Hero;
