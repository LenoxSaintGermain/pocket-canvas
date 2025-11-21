import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { ARCHETYPES } from "@/lib/sonicDNA/archetypes";
import { Users, Disc, Play, Pause, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sonicDNA } from "@/lib/sonicDNA/promptBuilder";

// Game States
type GameState = "SELECT_ARCHETYPE" | "GENERATING" | "RESULT";

export interface ArtistRPGRef {
    handleScroll: (direction: "up" | "down") => void;
    handleCenterClick: () => void;
}

interface ArtistRPGProps {
    onBack: () => void;
}

export const ArtistRPG = forwardRef<ArtistRPGRef, ArtistRPGProps>(({ onBack }, ref) => {
    const [gameState, setGameState] = useState<GameState>("SELECT_ARCHETYPE");
    const [selectedArchetypeIndex, setSelectedArchetypeIndex] = useState(0);
    const [generatedTrack, setGeneratedTrack] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const archetypesList = Object.values(ARCHETYPES);
    const currentArchetype = archetypesList[selectedArchetypeIndex];

    useImperativeHandle(ref, () => ({
        handleScroll: (direction: "up" | "down") => {
            if (gameState === "SELECT_ARCHETYPE") {
                setSelectedArchetypeIndex((prev) => {
                    if (direction === "up") return Math.max(0, prev - 1);
                    return Math.min(archetypesList.length - 1, prev + 1);
                });
            }
        },
        handleCenterClick: async () => {
            if (gameState === "SELECT_ARCHETYPE") {
                // Start Generation
                setGameState("GENERATING");

                try {
                    // 1. Generate Prompt locally
                    const promptData = sonicDNA.generatePrompt({
                        archetypeId: currentArchetype.id,
                        userVibe: "hit single", // Default vibe
                    });

                    // 2. Call Mock Edge Function
                    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mock-generate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
                        },
                        body: JSON.stringify({
                            prompt: promptData.prompt,
                            archetype: currentArchetype.name
                        })
                    });

                    const data = await response.json();

                    if (data.error) throw new Error(data.error);

                    setGeneratedTrack(data);
                    setGameState("RESULT");

                    // Initialize Audio
                    if (audioRef.current) {
                        audioRef.current.src = data.audio_url;
                        audioRef.current.load();
                    }

                } catch (error) {
                    console.error("Generation failed:", error);
                    setGameState("SELECT_ARCHETYPE"); // Go back on error
                }
            } else if (gameState === "RESULT") {
                // Toggle Play/Pause
                togglePlay();
            }
        }
    }));

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

            {gameState === "SELECT_ARCHETYPE" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-orbitron font-bold text-gradient-primary">
                            Select Archetype
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Scroll to choose your artist's vibe
                        </p>
                    </div>

                    <div className="relative h-48 flex items-center justify-center perspective-1000">
                        {/* 3D Carousel Effect (Simplified) */}
                        <div className="w-40 h-40 bg-card border-2 border-primary rounded-xl shadow-glow-primary flex flex-col items-center justify-center p-4 text-center transform transition-all duration-300">
                            <Users className="w-10 h-10 text-primary mb-3" />
                            <h4 className="font-bold font-orbitron text-sm leading-tight">
                                {currentArchetype.name}
                            </h4>
                            <div className="mt-2 flex flex-wrap justify-center gap-1">
                                {currentArchetype.defaultGenres.slice(0, 2).map(g => (
                                    <span key={g} className="text-[8px] px-1.5 py-0.5 bg-primary/20 rounded-full">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                        <p className="text-xs text-center italic text-muted-foreground">
                            "{currentArchetype.description}"
                        </p>
                    </div>
                </div>
            )}

            {gameState === "GENERATING" && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
                    <div className="relative">
                        <Disc className="w-32 h-32 text-primary animate-spin-slow" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-background rounded-full border-4 border-primary" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-orbitron font-bold animate-pulse">
                            Synthesizing DNA...
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Injecting {currentArchetype.name} traits
                        </p>
                    </div>
                </div>
            )}

            {gameState === "RESULT" && generatedTrack && (
                <div className="space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="relative aspect-square w-full max-w-[200px] mx-auto rounded-lg overflow-hidden shadow-2xl border border-border">
                        <img
                            src={generatedTrack.image_url}
                            alt="Cover Art"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            {isPlaying ? (
                                <Pause className="w-12 h-12 text-white/90" />
                            ) : (
                                <Play className="w-12 h-12 text-white/90" />
                            )}
                        </div>
                    </div>

                    <div className="text-center space-y-1">
                        <h3 className="text-lg font-bold font-orbitron text-foreground truncate px-4">
                            {generatedTrack.title}
                        </h3>
                        <p className="text-xs text-primary">
                            {currentArchetype.name}
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button variant="outline" size="sm" onClick={() => setGameState("SELECT_ARCHETYPE")}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Discard
                        </Button>
                        <Button size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
});

ArtistRPG.displayName = "ArtistRPG";
