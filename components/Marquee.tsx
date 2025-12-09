import React from 'react';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', className = '' }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex border-y border-ind-black bg-ind-orange ${className}`}>
      <div className={`animate-marquee flex`}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-4 text-black font-bold font-mono text-sm uppercase tracking-widest py-1">
             {text}
          </span>
        ))}
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;