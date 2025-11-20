export interface VocalTexture {
  id: string;
  name: string;
  description: string;
  sunoTag: string;
}

export const VOCAL_TEXTURES: VocalTexture[] = [
  { 
    id: 'autotuned', 
    name: 'Auto-Tuned', 
    description: 'Heavily processed with Auto-Tune', 
    sunoTag: 'autotuned vocals, pitch-corrected, processed vocals' 
  },
  { 
    id: 'melodicRap', 
    name: 'Melodic Rap', 
    description: 'Singing-rap hybrid', 
    sunoTag: 'melodic rap flow, sung-rap hybrid, melodic delivery' 
  },
  { 
    id: 'falsetto', 
    name: 'Falsetto', 
    description: 'High, breathy register', 
    sunoTag: 'falsetto vocals, airy high notes, head voice' 
  },
  { 
    id: 'belting', 
    name: 'Belting', 
    description: 'Powerful, chest-voice singing', 
    sunoTag: 'powerful belting, strong vocals, chest voice' 
  },
  { 
    id: 'breathy', 
    name: 'Breathy', 
    description: 'Soft, intimate delivery', 
    sunoTag: 'breathy vocals, whisper singing, intimate delivery' 
  },
  { 
    id: 'gritty', 
    name: 'Gritty', 
    description: 'Raw, rough texture', 
    sunoTag: 'gritty vocals, raspy voice, raw delivery' 
  },
  { 
    id: 'runs', 
    name: 'Vocal Runs', 
    description: 'R&B style vocal runs and riffs', 
    sunoTag: 'vocal runs, riffs, melismatic singing' 
  },
  { 
    id: 'emotional', 
    name: 'Emotional', 
    description: 'Vulnerable, heartfelt delivery', 
    sunoTag: 'emotional vocals, vulnerable delivery, heartfelt' 
  },
  { 
    id: 'aggressive', 
    name: 'Aggressive', 
    description: 'Intense, forceful delivery', 
    sunoTag: 'aggressive vocals, intense delivery, forceful' 
  },
  { 
    id: 'monotone', 
    name: 'Monotone', 
    description: 'Flat, drill-style delivery', 
    sunoTag: 'monotone flow, flat delivery, drill vocals' 
  },
  { 
    id: 'layered', 
    name: 'Layered', 
    description: 'Multiple vocal tracks stacked', 
    sunoTag: 'layered vocals, vocal stacks, harmonies' 
  },
  { 
    id: 'distorted', 
    name: 'Distorted', 
    description: 'Heavy vocal distortion and effects', 
    sunoTag: 'distorted vocals, vocal fx, processed' 
  },
  { 
    id: 'pitched', 
    name: 'Pitch-Shifted', 
    description: 'Heavily pitch-shifted vocals', 
    sunoTag: 'pitch-shifted vocals, vocal manipulation, altered pitch' 
  },
  { 
    id: 'callAndResponse', 
    name: 'Call and Response', 
    description: 'Alternating vocal patterns', 
    sunoTag: 'call and response, vocal interplay, back and forth' 
  },
  { 
    id: 'melodicFlow', 
    name: 'Melodic Flow', 
    description: 'Smooth, flowing melodic rap', 
    sunoTag: 'melodic flow, smooth delivery, flowing vocals' 
  },
  { 
    id: 'patoisAccent', 
    name: 'Patois Accent', 
    description: 'Caribbean/Jamaican accent', 
    sunoTag: 'patois accent, caribbean vocals, jamaican delivery' 
  },
  { 
    id: 'spanish', 
    name: 'Spanish Vocals', 
    description: 'Spanish language delivery', 
    sunoTag: 'spanish vocals, latin delivery, spanish language' 
  },
  { 
    id: 'soft', 
    name: 'Soft', 
    description: 'Gentle, delicate vocals', 
    sunoTag: 'soft vocals, gentle delivery, delicate voice' 
  },
  { 
    id: 'intimate', 
    name: 'Intimate', 
    description: 'Close, personal delivery', 
    sunoTag: 'intimate vocals, close mic, personal delivery' 
  },
  { 
    id: 'soulful', 
    name: 'Soulful', 
    description: 'Deep, soul-influenced vocals', 
    sunoTag: 'soulful vocals, soul singing, emotive delivery' 
  },
  { 
    id: 'clean', 
    name: 'Clean', 
    description: 'Clear, unprocessed vocals', 
    sunoTag: 'clean vocals, natural voice, unprocessed' 
  },
  { 
    id: 'storytelling', 
    name: 'Storytelling', 
    description: 'Narrative, conversational delivery', 
    sunoTag: 'storytelling vocals, narrative delivery, conversational' 
  },
  { 
    id: 'twang', 
    name: 'Country Twang', 
    description: 'Country-style vocal twang', 
    sunoTag: 'country twang, southern vocals, twangy delivery' 
  },
  { 
    id: 'rhythmic', 
    name: 'Rhythmic', 
    description: 'Percussive, rhythm-focused delivery', 
    sunoTag: 'rhythmic vocals, percussive delivery, rhythm-focused' 
  },
];

/**
 * Get vocal texture by ID
 */
export function getVocalTextureById(id: string): VocalTexture | undefined {
  return VOCAL_TEXTURES.find(vt => vt.id === id);
}

/**
 * Get random vocal texture
 */
export function getRandomVocalTexture(): VocalTexture {
  return VOCAL_TEXTURES[Math.floor(Math.random() * VOCAL_TEXTURES.length)];
}
