
import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Specs from './components/Specs';
import Modules from './components/Modules';
import { NAV_ITEMS } from './constants';
import { Menu, X, ArrowDown, Hexagon, ChevronUp, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Slide Configuration
  const slides = [
    { component: Hero, id: 'hero' },
    { component: Specs, id: 'specs' },
    { component: Modules, id: 'modules' }
  ];

  const totalSlides = slides.length;
  const slideContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Optimized Custom Cursor Logic
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch devices to prevent artifacts
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && cursorRef.current) {
        cursorRef.current.style.display = 'none';
        return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
    };

    const onMouseDown = () => {
      cursor.classList.add('scale-75');
      cursorDot.classList.add('bg-ind-orange');
    };

    const onMouseUp = () => {
      cursor.classList.remove('scale-75');
      cursorDot.classList.remove('bg-ind-orange');
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        cursor.classList.add('w-16', 'h-16', 'bg-ind-orange/20', 'border-ind-orange', 'mix-blend-difference');
        cursor.classList.remove('w-4', 'h-4', 'bg-ind-light', 'mix-blend-normal');
        cursorDot.style.opacity = '0';
      }
    };

    const onMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
            cursor.classList.remove('w-16', 'h-16', 'bg-ind-orange/20', 'border-ind-orange', 'mix-blend-difference');
            cursor.classList.add('w-4', 'h-4', 'bg-ind-light', 'mix-blend-normal');
            cursorDot.style.opacity = '1';
        }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  // Navigation Logic
  const lastScrollTime = useRef(0);
  const scrollCooldown = 800; 

  const handleSlideChange = (direction: 'next' | 'prev') => {
    const now = Date.now();
    if (now - lastScrollTime.current < scrollCooldown) return;
    
    if (direction === 'next' && currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
      lastScrollTime.current = now;
    } else if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      lastScrollTime.current = now;
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 1. Disable scroll jacking on mobile (width check)
      if (window.innerWidth < 768) return;

      const currentContainer = slideContainerRefs.current[currentSlide];
      if (!currentContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = currentContainer;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      const isAtTop = scrollTop <= 0;

      // 2. Only switch slides if we are at the scroll boundaries
      if (e.deltaY > 0) {
        // Scrolling Down
        if (isAtBottom && Math.abs(e.deltaY) > 30) {
           handleSlideChange('next');
        }
      } else {
        // Scrolling Up
        if (isAtTop && Math.abs(e.deltaY) > 30) {
           handleSlideChange('prev');
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') handleSlideChange('next');
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') handleSlideChange('prev');
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]);

  return (
    <div className="h-screen w-screen bg-ind-black text-ind-light font-sans overflow-hidden relative selection:bg-ind-orange selection:text-black">
      
      {/* Optimized Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed z-[100] pointer-events-none transition-all duration-150 ease-out 
                   w-4 h-4 bg-ind-light border border-transparent rounded-full flex items-center justify-center mix-blend-normal top-0 left-0 hidden md:flex"
        style={{ willChange: 'transform, width, height' }}
      >
        <div ref={cursorDotRef} className="w-1 h-1 bg-black rounded-full transition-opacity duration-200"></div>
      </div>

      {/* Persistent UI: Navigation Rail */}
      <nav className="fixed right-0 top-0 h-full w-20 z-50 border-l border-ind-concrete bg-ind-black/50 backdrop-blur-md hidden md:flex flex-col justify-between items-center py-10">
        <div className="w-px h-24 bg-ind-concrete"></div>
        <div className="flex flex-col gap-6">
          {slides.map((slide, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`relative w-3 h-3 transition-all duration-300 ${currentSlide === idx ? 'bg-ind-orange scale-150' : 'bg-ind-concrete hover:bg-white'}`}
            >
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                0{idx + 1} // {slide.id.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
           <span className="writing-vertical font-mono text-xs text-ind-orange font-bold tracking-widest">SCROLL</span>
           <ArrowDown className="w-4 h-4 text-ind-orange animate-bounce" />
        </div>
      </nav>

      {/* Persistent UI: Header */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-8 py-4 md:py-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <div className="flex items-center gap-3">
             <Hexagon className="text-ind-orange fill-ind-orange/20 w-8 h-8 md:w-10 md:h-10 animate-spin-slow" />
             <div>
                <h1 className="font-display font-bold text-xl md:text-2xl leading-none tracking-tighter">PROTO_OS</h1>
                <p className="font-mono text-[10px] text-ind-concrete tracking-widest">SYSTEM_READY</p>
             </div>
          </div>
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="pointer-events-auto md:hidden text-white"
        >
          <Menu />
        </button>
      </header>

      {/* Slides Container */}
      <main className="relative w-full h-full bg-ind-black overflow-hidden perspective-[1000px]">
        {slides.map((Slide, index) => {
          let styles = '';
          let overlayOpacity = 'opacity-0';

          if (index === currentSlide) {
            styles = 'z-20 translate-y-0 opacity-100 blur-0 scale-100 grayscale-0';
            overlayOpacity = 'opacity-0';
          } else if (index < currentSlide) {
            styles = 'z-10 -translate-y-1/2 opacity-60 blur-md scale-95 grayscale';
            overlayOpacity = 'opacity-40';
          } else {
            styles = 'z-30 translate-y-full opacity-100 blur-0 scale-100 grayscale-0';
            overlayOpacity = 'opacity-0';
          }

          return (
            <div
              key={index}
              // Fix: Wrapped assignment in curly braces to ensure return type is void
              ref={(el) => { slideContainerRefs.current[index] = el; }}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform will-change-transform overflow-y-auto overflow-x-hidden ${styles}`}
            >
              <Slide.component isActive={index === currentSlide} />
              <div className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-1000 ${overlayOpacity}`}></div>
            </div>
          );
        })}
      </main>

      {/* Mobile Navigation Controls (Footer) */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden flex border-t border-ind-concrete bg-ind-black">
        <button 
          onClick={() => handleSlideChange('prev')}
          disabled={currentSlide === 0}
          className="flex-1 py-4 bg-ind-black text-ind-light border-r border-ind-concrete disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ind-concrete/20 uppercase font-mono font-bold flex items-center justify-center gap-2 transition-colors active:bg-ind-concrete/40"
        >
          <ChevronUp size={20} /> Prev
        </button>
        <button 
          onClick={() => handleSlideChange('next')}
          disabled={currentSlide === totalSlides - 1}
          className="flex-1 py-4 bg-ind-orange text-black font-bold uppercase font-mono flex items-center justify-center gap-2 transition-colors active:bg-white"
        >
          Next <ChevronDown size={20} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-ind-black text-ind-light flex flex-col items-center justify-center gap-8 border-l-4 border-ind-orange">
             <button className="absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}><X size={32}/></button>
             {NAV_ITEMS.map((item, idx) => (
                <button 
                    key={item.label} 
                    className="font-display text-5xl font-bold hover:text-ind-orange uppercase tracking-tighter"
                    onClick={() => {
                      setCurrentSlide(idx);
                      setIsMenuOpen(false);
                    }}
                >
                    <span className="text-lg font-mono text-ind-concrete block text-center mb-2">{item.code}</span>
                    {item.label}
                </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
