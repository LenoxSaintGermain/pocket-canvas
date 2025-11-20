export interface PlotTwist {
  id: string;
  name: string;
  formula: string;
  example: string;
}

export const PLOT_TWISTS: PlotTwist[] = [
  {
    id: 'oppositeVibe',
    name: 'Opposite Vibe',
    formula: 'Take [Famous Song] but make it [Opposite Genre]',
    example: 'Take "Hotline Bling" but make it Death Metal'
  },
  {
    id: 'eraSwap',
    name: 'Era Swap',
    formula: 'Take [Modern Artist Style] but produce it like [Decade]',
    example: 'Take Travis Scott\'s style but produce it like 1980s synth-pop'
  },
  {
    id: 'genreFusion',
    name: 'Genre Fusion',
    formula: 'Blend [Genre A] with [Genre B]',
    example: 'Blend Reggaeton with Jazz in the style of The Weeknd'
  },
  {
    id: 'emotionalFlip',
    name: 'Emotional Flip',
    formula: 'Take [Sad Song] and make it [Happy/Upbeat]',
    example: 'Take "Marvin\'s Room" and make it an upbeat summer anthem'
  },
  {
    id: 'instrumentSwap',
    name: 'Instrument Swap',
    formula: 'Replace [Typical Instruments] with [Unusual Instruments]',
    example: 'Replace trap 808s with orchestral strings and harps'
  },
  {
    id: 'speedChange',
    name: 'Speed Change',
    formula: 'Take [Song] and make it [2x faster/slower]',
    example: 'Take "Blinding Lights" and make it a slow ballad'
  },
  {
    id: 'culturalFusion',
    name: 'Cultural Fusion',
    formula: 'Blend [Western Artist] with [Non-Western Music Tradition]',
    example: 'Blend Drake with traditional Indian classical music'
  },
  {
    id: 'acousticFlip',
    name: 'Acoustic Flip',
    formula: 'Take [Electronic Song] and make it acoustic',
    example: 'Take a Future trap banger and make it an acoustic guitar ballad'
  },
  {
    id: 'genderSwap',
    name: 'Gender Swap',
    formula: 'Take [Male Artist Song] and reimagine with [Female Vocal Style]',
    example: 'Take Drake\'s "God\'s Plan" but with Ariana Grande\'s vocal runs'
  },
  {
    id: 'languageSwitch',
    name: 'Language Switch',
    formula: 'Translate [English Song] to [Another Language]',
    example: 'Take "Blinding Lights" but sing it in Spanish with reggaeton beats'
  }
];

/**
 * Get random plot twist
 */
export function getRandomPlotTwist(): PlotTwist {
  return PLOT_TWISTS[Math.floor(Math.random() * PLOT_TWISTS.length)];
}

/**
 * Get plot twist by ID
 */
export function getPlotTwistById(id: string): PlotTwist | undefined {
  return PLOT_TWISTS.find(pt => pt.id === id);
}

/**
 * Apply plot twist to a prompt context
 */
export function applyPlotTwist(
  twist: PlotTwist, 
  context: { song?: string; genre?: string; artist?: string }
): string {
  let result = twist.formula;
  
  // Simple placeholder replacement
  if (context.song) {
    result = result.replace('[Famous Song]', context.song);
    result = result.replace('[Song]', context.song);
    result = result.replace('[Sad Song]', context.song);
    result = result.replace('[Electronic Song]', context.song);
    result = result.replace('[English Song]', context.song);
    result = result.replace('[Male Artist Song]', context.song);
  }
  
  if (context.genre) {
    result = result.replace('[Opposite Genre]', context.genre);
    result = result.replace('[Genre A]', context.genre);
  }
  
  if (context.artist) {
    result = result.replace('[Modern Artist Style]', `${context.artist}'s style`);
    result = result.replace('[Western Artist]', context.artist);
  }
  
  return result;
}
