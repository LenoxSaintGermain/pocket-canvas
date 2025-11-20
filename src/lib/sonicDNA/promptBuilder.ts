import { ARCHETYPES, Archetype } from './archetypes';
import { translateToLeet, findLeetByTags, getRetrowaveStyle } from './leetDictionary';
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
  technicalParams: {
    bpm?: number;
    key?: string;
    mode?: string;
  };
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
      sideB,
      technicalParams: {
        bpm: this.estimateBPM(genre),
        key: this.selectKey(archetype),
        mode: 'major'
      }
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
   * Generate a variant of the prompt (Side B) - True remix/alternative take
   */
  private generateVariant(originalPrompt: string): string {
    // Side B is a true remix - different plot twist, alternative instrumentation
    let variant = originalPrompt;
    
    // 1. Swap plot twist with a different one
    const alternativeTwist = getRandomPlotTwist();
    const twistMatch = originalPrompt.match(/\. ([^.]*(?:but|like|with|inspired)[^.]*)\./);
    if (twistMatch) {
      variant = variant.replace(twistMatch[0], `. ${alternativeTwist.formula}.`);
    }
    
    // 2. Alternative instrumentation - strip drums for acoustic version if trap/hip-hop
    if (originalPrompt.includes('808s') || originalPrompt.includes('trap')) {
      variant = variant.replace(/808s[^,.]*/gi, 'acoustic guitar');
      variant = variant.replace(/trap hi-hats[^,.]*/gi, 'light percussion');
      variant = variant.replace(/Instrumentation:/gi, 'Acoustic Arrangement:');
    } else {
      // Add electronic elements if originally acoustic
      variant = variant.replace(/acoustic guitar/gi, '808 bass');
      variant = variant.replace(/Instrumentation:/gi, 'Electronic Production:');
    }
    
    // 3. Apply Retrowave transformation to artist influences
    const artistMatches = originalPrompt.match(/style of ([^.]+)\./);
    if (artistMatches && artistMatches[1]) {
      const artists = artistMatches[1].split(', ');
      const retrowaveArtists = artists.map(artist => {
        const cleanName = artist.replace(/[0-9$@]/g, match => {
          const map: Record<string, string> = {'0': 'o', '1': 'i', '3': 'e', '4': 'a', '$': 's', '@': 'a'};
          return map[match] || match;
        });
        return getRetrowaveStyle(cleanName);
      });
      variant = variant.replace(artistMatches[1], retrowaveArtists.join(', '));
    }
    
    // 4. Append [Side B] tag
    variant = variant.trim();
    if (variant.endsWith('.')) {
      variant = variant.slice(0, -1) + ' [Side B].';
    } else {
      variant += ' [Side B]';
    }
    
    return variant;
  }
  
  /**
   * Estimate BPM based on genre
   */
  private estimateBPM(genre: string): number {
    const lowerGenre = genre.toLowerCase();
    if (lowerGenre.includes('trap') || lowerGenre.includes('hip hop')) return 140;
    if (lowerGenre.includes('pop')) return 120;
    if (lowerGenre.includes('afrobeats')) return 105;
    if (lowerGenre.includes('rnb') || lowerGenre.includes('r&b')) return 90;
    if (lowerGenre.includes('ballad')) return 70;
    return 120; // default
  }
  
  /**
   * Select key based on archetype mood
   */
  private selectKey(archetype: Archetype): string {
    const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'];
    // Deterministic selection based on archetype id
    const index = archetype.id.length % keys.length;
    return keys[index];
  }
}

// Export singleton instance
export const sonicDNA = new SonicDNAEngine();
