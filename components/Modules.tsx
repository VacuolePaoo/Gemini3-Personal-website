
import React from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Terminal, Cpu } from 'lucide-react';

interface ModulesProps {
  isActive: boolean;
}

const Modules: React.FC<ModulesProps> = ({ isActive }) => {
  return (
    <section className="min-h-screen w-full bg-[#0a0a0a] relative flex flex-col pt-24 pb-24 md:pb-12 px-6 md:px-20">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-20 w-px h-full bg-ind-concrete opacity-30"></div>
      <div className="absolute top-20 right-0 w-full h-px bg-ind-concrete opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-hazard opacity-5 pointer-events-none"></div>

      <div className="flex items-center gap-4 mb-10 z-10">
            <div className={`w-16 h-16 bg-ind-orange flex items-center justify-center border border-ind-light transition-transform duration-500 ${isActive ? 'rotate-0 scale-100' : '-rotate-180 scale-0'}`}>
                <Terminal className="text-black w-8 h-8" />
            </div>
            <div>
                <h2 className={`text-5xl md:text-7xl font-display font-bold uppercase text-ind-light transition-all duration-700 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                Active_Modules
                </h2>
                <div className={`h-1 bg-ind-concrete mt-2 transition-all duration-1000 delay-300 ${isActive ? 'w-full' : 'w-0'}`}></div>
            </div>
      </div>

      <div className="flex-1 z-10">
        <div className="grid grid-cols-1 gap-6 pb-20">
            {PROJECTS.map((project, index) => (
                <div 
                    key={project.id} 
                    className={`
                        group relative bg-[#121212] border-l-4 border-ind-concrete hover:border-ind-orange transition-all duration-500
                        ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}
                    `}
                    style={{ transitionDelay: `${200 + (index * 150)}ms` }}
                >
                    <div className="absolute top-0 right-0 bg-ind-concrete/20 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Cpu size={16} />
                    </div>

                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
                        {/* ID */}
                        <div className="font-mono text-xl text-ind-concrete font-bold rotate-0 md:-rotate-90 md:origin-center md:self-center whitespace-nowrap">
                            {project.id}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                             <div className="flex flex-wrap items-baseline gap-4 mb-2">
                                <h3 className="text-3xl font-display font-bold text-ind-light group-hover:text-ind-orange transition-colors">
                                    {project.title}
                                </h3>
                                <span className="font-mono text-xs text-black bg-ind-concrete px-2 py-0.5 rounded-sm group-hover:bg-ind-orange transition-colors">
                                    {project.status}
                                </span>
                             </div>
                             <p className="font-mono text-ind-concrete mb-4 text-sm max-w-2xl">
                                {project.description}
                             </p>
                             
                             <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="text-[10px] uppercase font-bold tracking-wider font-mono bg-black text-ind-light px-2 py-1 border border-ind-concrete/30">
                                        {t}
                                    </span>
                                ))}
                             </div>
                        </div>

                        {/* Action */}
                        <div className="self-end md:self-center">
                             <a 
                                href={project.link}
                                className="w-12 h-12 bg-ind-light flex items-center justify-center hover:bg-ind-orange transition-colors"
                             >
                                <ExternalLink size={20} className="text-black" />
                             </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;
