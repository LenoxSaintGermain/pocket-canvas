import { ReactNode } from "react";

interface ScreenProps {
  children: ReactNode;
  title?: string;
}

export const Screen = ({ children, title }: ScreenProps) => {
  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-3xl shadow-elegant overflow-hidden border border-border/50">
      {/* Screen header */}
      {title && (
        <div className="bg-gradient-primary px-6 py-4">
          <h2 className="text-xl font-orbitron font-bold text-primary-foreground text-center">
            {title}
          </h2>
        </div>
      )}
      
      {/* Screen content area with retro effects */}
      <div 
        className="bg-background min-h-[400px] max-h-[500px] overflow-y-auto p-6 relative"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--primary)) hsl(var(--muted))'
        }}
      >
        {/* Scanline overlay for retro OLED/LCD effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary)) 2px, hsl(var(--primary)) 4px)',
          }}
        />
        
        {/* Content with text glow */}
        <div className="relative z-10" style={{ textShadow: '0 0 8px hsl(var(--primary) / 0.3)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
