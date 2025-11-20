import { useState } from 'react';
import { sonicDNA } from '@/lib/sonicDNA/promptBuilder';
import { ARCHETYPES } from '@/lib/sonicDNA/archetypes';
import { Button } from './ui/button';

export function SonicDNATest() {
  const [result, setResult] = useState<any>(null);
  const [selectedArchetype, setSelectedArchetype] = useState('trapSoulKing');
  
  const testPromptGeneration = () => {
    const prompt = sonicDNA.generatePrompt({
      archetypeId: selectedArchetype,
      userVibe: 'sad and emotional',
      customInfluences: ['Drake', 'The Weeknd'],
    });
    
    console.log('═══════════════════════════════════════');
    console.log('🧬 SONIC DNA PROMPT GENERATED 🧬');
    console.log('═══════════════════════════════════════');
    console.log('');
    console.log('📝 PROMPT (for Suno):');
    console.log(prompt.prompt);
    console.log('');
    console.log('📊 STATS:');
    console.log(`  Character Count: ${prompt.characterCount}/498`);
    console.log('');
    console.log('🎵 BREAKDOWN:');
    console.log(`  Genre: ${prompt.breakdown.genre}`);
    console.log(`  Leet References: ${prompt.breakdown.leetReferences.join(', ')}`);
    console.log(`  Vocal Texture: ${prompt.breakdown.vocalTexture}`);
    console.log(`  Instrumentation: ${prompt.breakdown.instrumentation.join(', ')}`);
    console.log(`  Plot Twist: ${prompt.breakdown.plotTwist}`);
    console.log(`  Tags: ${prompt.breakdown.tags.join(', ')}`);
    console.log('');
    console.log('🎚️ VARIANTS:');
    console.log('  Side A:', prompt.sideA);
    console.log('  Side B:', prompt.sideB);
    console.log('');
    console.log('═══════════════════════════════════════');
    
    setResult(prompt);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-4 space-y-4 max-h-[60vh] overflow-y-auto z-50">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-orbitron font-bold text-gradient-primary">
          🧬 Sonic DNA Test Console
        </h2>
      </div>
      
      <div className="grid gap-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Select Archetype
          </label>
          <select 
            value={selectedArchetype}
            onChange={(e) => setSelectedArchetype(e.target.value)}
            className="w-full p-2 bg-background border border-border rounded-lg font-orbitron"
          >
            {Object.values(ARCHETYPES).map((arch) => (
              <option key={arch.id} value={arch.id}>
                {arch.name} - {arch.description}
              </option>
            ))}
          </select>
        </div>
        
        <Button 
          onClick={testPromptGeneration}
          className="w-full font-orbitron"
        >
          🎲 Generate Test Prompt
        </Button>
      </div>
      
      {result && (
        <div className="space-y-2 p-4 bg-background/50 rounded-xl border border-primary/20">
          <div className="font-mono text-xs space-y-2">
            <div className="bg-primary/10 p-3 rounded-lg">
              <strong className="text-primary">Prompt:</strong>
              <p className="mt-1 text-foreground">{result.prompt}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/50 p-2 rounded">
                <strong className="text-xs">Characters:</strong>
                <p className="text-sm font-bold">{result.characterCount}/498</p>
              </div>
              <div className="bg-muted/50 p-2 rounded">
                <strong className="text-xs">Genre:</strong>
                <p className="text-sm">{result.breakdown.genre}</p>
              </div>
            </div>
            
            <div className="bg-muted/50 p-2 rounded">
              <strong className="text-xs">Leet Refs:</strong>
              <p className="text-sm text-primary">{result.breakdown.leetReferences.join(', ')}</p>
            </div>
            
            <div className="bg-muted/50 p-2 rounded">
              <strong className="text-xs">Plot Twist:</strong>
              <p className="text-sm">{result.breakdown.plotTwist}</p>
            </div>
          </div>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground text-center">
        ✨ Check browser console for detailed output
      </p>
    </div>
  );
}
