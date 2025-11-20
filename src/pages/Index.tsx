import { useState } from "react";
import { ClickWheel } from "@/components/ClickWheel";
import { Screen } from "@/components/Screen";
import { SonicDNATest } from "@/components/SonicDNATest";
import { Sparkles, Music, Zap, Users } from "lucide-react";

type MenuOption = "artist-rpg" | "quick-mix" | "library" | "settings";

const Index = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuOption>("artist-rpg");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [debugMode, setDebugMode] = useState(false);

  const menuOptions: { id: MenuOption; label: string; icon: any }[] = [
    { id: "artist-rpg", label: "Artist RPG", icon: Users },
    { id: "quick-mix", label: "Quick Mix", icon: Zap },
    { id: "library", label: "My Library", icon: Music },
    { id: "settings", label: "Settings", icon: Sparkles },
  ];

  const handleScroll = (direction: "up" | "down") => {
    setSelectedIndex((prev) => {
      if (direction === "up") {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(menuOptions.length - 1, prev + 1);
      }
    });
  };

  const handleCenterClick = () => {
    setSelectedMenu(menuOptions[selectedIndex].id);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "artist-rpg":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-orbitron font-bold text-gradient-primary mb-2">
                Artist RPG Mode
              </h3>
              <p className="text-sm text-muted-foreground">
                Create your synthetic artist and start your musical journey
              </p>
            </div>
            
            <div className="bg-card/50 rounded-2xl p-6 border border-primary/20 glow-primary">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-orbitron font-semibold">New Artist</h4>
                  <p className="text-xs text-muted-foreground">Level 1 · 0 XP</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Select this option to create your first artist and begin generating tracks with the Sonic DNA system.
              </p>
            </div>
          </div>
        );
      
      case "quick-mix":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-orbitron font-bold text-gradient-secondary mb-2">
                Quick Mix
              </h3>
              <p className="text-sm text-muted-foreground">
                Fast-track music generation without the story
              </p>
            </div>
            
            <div className="grid gap-3">
              {["Kids Songs", "Jingles", "Background Music", "Workout Tracks"].map((preset) => (
                <div 
                  key={preset}
                  className="bg-muted/50 rounded-xl p-4 border border-border/50 hover:border-secondary/50 transition-smooth cursor-pointer"
                >
                  <p className="font-medium">{preset}</p>
                  <p className="text-xs text-muted-foreground mt-1">Quick generation preset</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "library":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-orbitron font-bold text-gradient-accent mb-2">
                My Library
              </h3>
              <p className="text-sm text-muted-foreground">
                Your generated tracks and artists
              </p>
            </div>
            
            <div className="text-center py-12">
              <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No tracks yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start creating in Artist RPG or Quick Mix mode
              </p>
            </div>
          </div>
        );
      
      case "settings":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-orbitron font-bold text-foreground mb-2">
                Settings
              </h3>
              <p className="text-sm text-muted-foreground">
                Customize your PocketLegend experience
              </p>
            </div>
            
            <div className="space-y-2">
              {["Account", "Audio Quality", "Haptic Feedback", "About"].map((setting) => (
                <div 
                  key={setting}
                  className="bg-muted/30 rounded-xl p-4 border border-border/30 hover:border-border transition-smooth cursor-pointer"
                >
                  <p className="font-medium">{setting}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-8">
      {/* Header */}
      <div className="text-center">
        <h1 
          className="text-4xl md:text-5xl font-orbitron font-black text-gradient-hero mb-2 cursor-pointer"
          onClick={() => setDebugMode(!debugMode)}
          title="Click to toggle Sonic DNA Test Console"
        >
          PocketLegend
        </h1>
        <p className="text-sm text-muted-foreground font-orbitron">
          AI Music Creation · Powered by Sonic DNA
        </p>
        {debugMode && (
          <p className="text-xs text-primary mt-1 animate-pulse">
            🧬 Debug Mode Active
          </p>
        )}
      </div>

      {/* Main iPod interface */}
      <div className="w-full max-w-md space-y-6">
        {/* Screen */}
        <Screen>
          {/* Menu selection */}
          <div className="mb-6 space-y-2">
            {menuOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-smooth cursor-pointer ${
                    selectedIndex === index
                      ? "bg-primary text-primary-foreground scale-[1.02] shadow-glow-primary"
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-orbitron font-semibold">{option.label}</span>
                </div>
              );
            })}
          </div>

          {/* Selected content */}
          <div className="border-t border-border pt-6">
            {renderContent()}
          </div>
        </Screen>

        {/* Click Wheel */}
        <ClickWheel
          onScroll={handleScroll}
          onCenterClick={handleCenterClick}
          onMenuClick={() => setSelectedMenu("artist-rpg")}
        />
      </div>

      {/* Sonic DNA Test Console (Debug Mode) */}
      {debugMode && <SonicDNATest />}
    </div>
  );
};

export default Index;
