import { ARCHETYPES, Archetype } from './archetypes';
import { translateToLeet, findLeetByTags } from './leetDictionary';
import { VOCAL_TEXTURES, VocalTexture, getVocalTextureById } from './vocalTextures';
import { PLOT_TWISTS, PlotTwist, getRandomPlotTwist, getPlotTwistById, applyPlotTwist } from './plotTwists';
import { INSTRUMENTATION_CATEGORIES } from './instrumentationTags';

export interface PromptInput {
  archetypeId: string;
  userVibe?: string; // e.g., "sad and moody"
  customInfluences?: string[]; // e.g., ["Drake", "The Weeknd"]
  plotTwistId?: string; // Optional: specify a twist, or random
  customInstrumentation?: string[];
}

export interface GeneratedPrompt {
  prompt: string;
  characterCount: number;
  breakdown: {
    genre: string;
    leetReferences: string[];
    vocalTexture: string;
    instrumentation: string[];
    plotTwist: string;
    tags: string[];
  };
  sideA: string; // Variant A
  sideB: string; // Variant B
}

export class SonicDNAEngine {
  
  /**
   * Main function: Generate Suno prompt from user input
   */
  generatePrompt(input: PromptInput): GeneratedPrompt {
    // 1. Get archetype
    const archetype = ARCHETYPES[input.archetypeId];
    if (!archetype) throw new Error(`Archetype ${input.archetypeId} not found`);
    
    // 2. Determine genre/vibe
    const genre = this.selectGenre(archetype, input.userVibe);
    
    // 3. Find Leet references based on influences
    const leetRefs = this.getLeetReferences(input.customInfluences || [], archetype);
    
    // 4. Select vocal texture
    const vocalTexture = this.selectVocalTexture(archetype);
    
    // 5. Select instrumentation
    const instrumentation = this.selectInstrumentation(archetype, input.customInstrumentation);
    
    // 6. Select plot twist
    const plotTwist = input.plotTwistId 
      ? getPlotTwistById(input.plotTwistId) || getRandomPlotTwist()
      : getRandomPlotTwist();
    
    // 7. Build the prompt using the formula
    const prompt = this.buildPromptFormula({
      genre,
      leetRefs,
      vocalTexture,
      instrumentation,
      plotTwist,
      archetype,
      tags: this.generateTags(archetype, input.userVibe)
    });
    
    // 8. Optimize to 498 characters
    const optimizedPrompt = this.optimizeLength(prompt, 498);
    
    // 9. Generate variants (Side A / Side B)
    const sideA = optimizedPrompt;
    const sideB = this.generateVariant(optimizedPrompt);
    
    return {
      prompt: optimizedPrompt,
      characterCount: optimizedPrompt.length,
      breakdown: {
        genre,
        leetReferences: leetRefs,
        vocalTexture: vocalTexture.sunoTag,
        instrumentation,
        plotTwist: plotTwist.formula,
        tags: this.generateTags(archetype, input.userVibe)
      },
      sideA,
      sideB
    };
  }
  
  private selectGenre(archetype: Archetype, userVibe?: string): string {
    // If user specifies vibe, try to match genre
    if (userVibe) {
      // Simple keyword matching (can be enhanced with AI later)
      if (userVibe.toLowerCase().includes('sad') || userVibe.toLowerCase().includes('moody')) {
        return `${archetype.defaultGenres[0]}, melancholic`;
      }
      if (userVibe.toLowerCase().includes('happy') || userVibe.toLowerCase().includes('upbeat')) {
        return `${archetype.defaultGenres[0]}, upbeat`;
      }
      if (userVibe.toLowerCase().includes('dark')) {
        return `${archetype.defaultGenres[0]}, dark`;
      }
      if (userVibe.toLowerCase().includes('chill')) {
        return `${archetype.defaultGenres[0]}, chill`;
      }
    }
    // Default: use first genre from archetype
    return archetype.defaultGenres[0];
  }
  
  private getLeetReferences(influences: string[], archetype: Archetype): string[] {
    // Translate influences to Leet
    const leetInfluences = influences.map(inf => translateToLeet(inf));
    
    // Also find Leet refs by archetype tags
    const archetypeRefs = findLeetByTags(archetype.defaultGenres.map(g => g.toLowerCase()));
    
    // Combine and limit to 3
    const combined = [...new Set([...leetInfluences, ...archetypeRefs.map(r => r.leet)])];
    return combined.slice(0, 3);
  }
  
  private selectVocalTexture(archetype: Archetype): VocalTexture {
    const presetId = archetype.vocalTexturePresets[0];
    return getVocalTextureById(presetId) || VOCAL_TEXTURES[0];
  }
  
  private selectInstrumentation(archetype: Archetype, custom?: string[]): string[] {
    if (custom && custom.length > 0) return custom;
    return archetype.instrumentationTags;
  }
  
  private generateTags(archetype: Archetype, userVibe?: string): string[] {
    const tags = [...archetype.defaultGenres];
    if (userVibe) tags.push(userVibe);
    return tags;
  }
  
  /**
   * Build prompt using the formula:
   * [Genre/Vibe] + [Leet Ref] + [Instrumentation] + [Vocal Texture] + [Plot Twist] + [Tags]
   */
  private buildPromptFormula(parts: {
    genre: string;
    leetRefs: string[];
    vocalTexture: VocalTexture;
    instrumentation: string[];
    plotTwist: PlotTwist;
    archetype: Archetype;
    tags: string[];
  }): string {
    const { genre, leetRefs, vocalTexture, instrumentation, plotTwist, tags } = parts;
    
    // Build the prompt with Leet influences
    let prompt = `${genre} track`;
    
    if (leetRefs.length > 0) {
      prompt += ` in the style of ${leetRefs.join(', ')}`;
    }
    
    prompt += `. ${vocalTexture.sunoTag}.`;
    
    if (instrumentation.length > 0) {
      prompt += ` Instrumentation: ${instrumentation.join(', ')}.`;
    }
    
    // Apply plot twist with context
    const twistContext = {
      genre: tags[0],
      artist: leetRefs[0]
    };
    const appliedTwist = applyPlotTwist(plotTwist, twistContext);
    prompt += ` ${appliedTwist}.`;
    
    if (tags.length > 0) {
      prompt += ` Tags: ${tags.join(', ')}.`;
    }
    
    return prompt;
  }
  
  /**
   * Optimize prompt to fit within character limit
   */
  private optimizeLength(prompt: string, maxLength: number): string {
    if (prompt.length <= maxLength) return prompt;
    
    // Strategy: progressively remove less important parts
    let optimized = prompt;
    
    // 1. Remove tags section if needed
    if (optimized.length > maxLength) {
      optimized = optimized.replace(/Tags:.*?\./g, '');
    }
    
    // 2. Shorten instrumentation
    if (optimized.length > maxLength) {
      optimized = optimized.replace(/Instrumentation: (.+?)\./g, (match, instruments) => {
        const instArray = instruments.split(', ');
        return `Instrumentation: ${instArray.slice(0, 2).join(', ')}.`;
      });
    }
    
    // 3. If still too long, hard cut
    if (optimized.length > maxLength) {
      optimized = optimized.slice(0, maxLength - 3) + '...';
    }
    
    return optimized;
  }
  
  /**
   * Generate a variant of the prompt (Side B)
   */
  private generateVariant(originalPrompt: string): string {
    // Simple variants: replace keywords
    let variant = originalPrompt;
    
    // Swap some words
    variant = variant.replace('track', 'song');
    variant = variant.replace('Instrumentation', 'Production');
    variant = variant.replace('in the style of', 'inspired by');
    
    return variant;
  }
}

// Export singleton instance
export const sonicDNA = new SonicDNAEngine();
