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
      
      {/* Screen content area */}
      <div 
        className="bg-background min-h-[400px] max-h-[500px] overflow-y-auto p-6"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--primary)) hsl(var(--muted))'
        }}
      >
        {children}
      </div>
    </div>
  );
};
