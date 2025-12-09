
import React from 'react';
import { BIO_STATS } from '../constants';
import { Activity, Cpu, Database, HardDrive, Wifi, Zap } from 'lucide-react';

interface SpecsProps {
  isActive: boolean;
}

const Specs: React.FC<SpecsProps> = ({ isActive }) => {
  const getIcon = (index: number) => {
    const icons = [Cpu, Activity, Database, Wifi, HardDrive, Zap];
    const Icon = icons[index % icons.length];
    return <Icon className="w-8 h-8 mb-4 text-ind-orange" />;
  };

  return (
    <section className="min-h-screen w-full bg-[#121212] relative flex items-center justify-center p-4 md:p-12 pb-24 md:pb-12">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-dots bg-dots-sm opacity-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-ind-black/50 transform skew-x-12 translate-x-32 border-l border-ind-concrete pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col justify-center pt-20 md:pt-0">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-ind-concrete pb-4">
          <h2 className={`text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter text-ind-light transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            Specifications
          </h2>
          <span className={`font-mono text-xl text-ind-orange font-bold transition-all duration-700 delay-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
             /// SYS_INFO_V1.0
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BIO_STATS.map((stat, idx) => (
            <div 
              key={stat.label} 
              className={`
                p-8 border border-ind-concrete bg-ind-black/80 backdrop-blur-sm
                hover:border-ind-orange hover:bg-ind-concrete/10 transition-all duration-300 group
                transform transition-all duration-700
                ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
              `}
              style={{ transitionDelay: `${300 + (idx * 100)}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                 {getIcon(idx)}
                 <span className="font-mono text-xs text-ind-concrete group-hover:text-ind-orange transition-colors">0{idx + 1}</span>
              </div>
              <h3 className="font-mono text-sm uppercase tracking-widest mb-2 text-ind-concrete group-hover:text-ind-light">
                {stat.label}
              </h3>
              <p className="font-display text-4xl font-bold uppercase text-ind-light group-hover:text-ind-orange transition-colors">
                {stat.value}
              </p>
              
              {/* Corner accent */}
              <div className="w-2 h-2 bg-ind-concrete absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 group-hover:bg-ind-orange transition-all"></div>
            </div>
          ))}
        </div>

        <div className={`mt-12 p-6 border-l-4 border-ind-orange bg-ind-black/90 font-mono text-sm md:text-base leading-relaxed max-w-4xl text-ind-light transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                <span className="bg-ind-orange text-black px-1 font-bold">WARNING:</span> HIGHLY OPTIMIZED WORKFLOW DETECTED.
            </p>
            <p className="text-ind-concrete">
                Full-stack engineer specializing in scalable architecture and brutalist UI design. 
                Constructing digital infrastructure with precision and raw efficiency. 
                System integrity verified.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Specs;
