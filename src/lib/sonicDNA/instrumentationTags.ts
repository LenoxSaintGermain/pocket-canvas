export const INSTRUMENTATION_CATEGORIES = {
  drums: [
    '808s',
    'trap hi-hats',
    'live drums',
    'electronic drums',
    'drum machine',
    'drill hi-hats',
    'dembow rhythm',
    'reggaeton drums',
    'log drums',
    'lo-fi drums',
    'breakbeats',
    'boom bap drums'
  ],
  bass: [
    'sub bass',
    'synth bass',
    'electric bass',
    'upright bass',
    '808 bass',
    'reese bass',
    'wobble bass',
    'bass guitar'
  ],
  keys: [
    'piano',
    'electric piano',
    'synths',
    'ambient pads',
    'organ',
    'rhodes piano',
    'dark piano',
    'bright piano',
    'keys'
  ],
  strings: [
    'violin',
    'cello',
    'string section',
    'pizzicato strings',
    'orchestral strings',
    'staccato strings'
  ],
  brass: [
    'trumpet',
    'saxophone',
    'trombone',
    'horn section',
    'brass hits'
  ],
  guitars: [
    'acoustic guitar',
    'electric guitar',
    'bass guitar',
    'guitar riffs',
    'guitar strums',
    'distorted guitar',
    'clean guitar',
    'guitar solo',
    'banjo'
  ],
  synths: [
    'ambient synths',
    'synth arpeggios',
    'synth leads',
    'synth pads',
    'retro synths',
    '80s synths',
    'analog synths',
    'digital synths',
    'synth bass'
  ],
  percussion: [
    'shakers',
    'congas',
    'bongos',
    'tambourine',
    'claps',
    'snaps',
    'latin percussion',
    'african percussion',
    'hand drums'
  ],
  effects: [
    'vocal chops',
    'reversed sounds',
    'glitch effects',
    'vinyl crackle',
    'tape hiss',
    'ambient noise',
    'sound fx',
    'risers',
    'downlifters',
    'bass drops'
  ],
  production: [
    'minimalist',
    'maximalist',
    'lo-fi',
    'hi-fi',
    'atmospheric',
    'spacious',
    'compressed',
    'raw',
    'polished',
    'experimental',
    'psychedelic',
    'dark',
    'bright',
    'warm',
    'cold'
  ]
};

/**
 * Get all instrumentation tags as flat array
 */
export function getAllInstrumentationTags(): string[] {
  return Object.values(INSTRUMENTATION_CATEGORIES).flat();
}

/**
 * Get random instrumentation tags
 */
export function getRandomInstrumentation(count: number = 3): string[] {
  const allTags = getAllInstrumentationTags();
  const shuffled = allTags.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get instrumentation by category
 */
export function getInstrumentationByCategory(category: keyof typeof INSTRUMENTATION_CATEGORIES): string[] {
  return INSTRUMENTATION_CATEGORIES[category];
}
