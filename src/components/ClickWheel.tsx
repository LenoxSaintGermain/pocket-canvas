import { useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface ClickWheelProps {
  onMenuClick?: () => void;
  onPlayPauseClick?: () => void;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  onCenterClick?: () => void;
  onScroll?: (direction: "up" | "down") => void;
}

export const ClickWheel = ({
  onMenuClick,
  onPlayPauseClick,
  onPreviousClick,
  onNextClick,
  onCenterClick,
  onScroll,
}: ClickWheelProps) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastAngleRef = useRef<number>(0);

  const handleCircularScroll = (e: React.TouchEvent | React.MouseEvent) => {
    if (!wheelRef.current) return;

    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    
    if (isScrolling) {
      const angleDiff = angle - lastAngleRef.current;
      
      if (Math.abs(angleDiff) > 10) {
        if (angleDiff > 0) {
          onScroll?.("down");
        } else {
          onScroll?.("up");
        }
        
        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate(10);
        }
      }
    }
    
    lastAngleRef.current = angle;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsScrolling(true);
    handleCircularScroll(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isScrolling) {
      handleCircularScroll(e);
    }
  };

  const handleTouchEnd = () => {
    setIsScrolling(false);
  };

  const handleButtonClick = (action: () => void, section: string) => {
    setActiveSection(section);
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    
    action();
    
    setTimeout(() => setActiveSection(null), 200);
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-[280px] aspect-square mx-auto">
      {/* Outer ring with gradient */}
      <div 
        ref={wheelRef}
        className="relative w-full h-full rounded-full bg-gradient-to-br from-muted via-card to-muted shadow-elegant overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Touch-sensitive circular area */}
        <div className="absolute inset-0 rounded-full border-4 border-border/30" />
        
        {/* Menu button - top */}
        <button
          onClick={() => handleButtonClick(onMenuClick || (() => {}), "menu")}
          className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-orbitron font-bold uppercase tracking-wider transition-smooth ${
            activeSection === "menu" 
              ? "bg-primary text-primary-foreground scale-95" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Menu
        </button>

        {/* Previous button - left */}
        <button
          onClick={() => handleButtonClick(onPreviousClick || (() => {}), "prev")}
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
            activeSection === "prev"
              ? "bg-secondary text-secondary-foreground scale-95"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next button - right */}
        <button
          onClick={() => handleButtonClick(onNextClick || (() => {}), "next")}
          className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
            activeSection === "next"
              ? "bg-secondary text-secondary-foreground scale-95"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Play/Pause button - bottom */}
        <button
          onClick={() => handleButtonClick(onPlayPauseClick || (() => {}), "play")}
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-orbitron font-bold uppercase tracking-wider transition-smooth ${
            activeSection === "play"
              ? "bg-accent text-accent-foreground scale-95"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Play
        </button>

        {/* Center button */}
        <button
          onClick={() => handleButtonClick(onCenterClick || (() => {}), "center")}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center font-orbitron font-bold text-primary-foreground shadow-glow-primary transition-spring ${
            activeSection === "center" ? "scale-90" : "hover:scale-105"
          }`}
        >
          SELECT
        </button>
      </div>

      {/* Scroll indicator */}
      {isScrolling && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-orbitron animate-pulse">
          Scroll to navigate
        </div>
      )}
    </div>
  );
};
