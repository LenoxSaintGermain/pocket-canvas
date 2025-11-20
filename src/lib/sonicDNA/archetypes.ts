export interface Archetype {
  id: string;
  name: string;
  description: string;
  defaultGenres: string[];
  vocalTexturePresets: string[];
  instrumentationTags: string[];
}

export const ARCHETYPES: Record<string, Archetype> = {
  trapSoulKing: {
    id: 'trapSoulKing',
    name: 'Trap Soul King',
    description: 'Drake meets The Weeknd - moody, introspective, Auto-Tuned',
    defaultGenres: ['Trap Soul', 'R&B', 'Hip Hop'],
    vocalTexturePresets: ['autotuned', 'melodicRap', 'falsetto'],
    instrumentationTags: ['808s', 'ambient synths', 'minimalist production']
  },
  popRnBQueen: {
    id: 'popRnBQueen',
    name: 'Pop R&B Queen',
    description: 'Ariana Grande meets SZA - powerful vocals, modern production',
    defaultGenres: ['Pop', 'R&B', 'Contemporary R&B'],
    vocalTexturePresets: ['belting', 'runs', 'breathy'],
    instrumentationTags: ['trap drums', 'piano', 'vocal layering']
  },
  afrobeatsKing: {
    id: 'afrobeatsKing',
    name: 'Afrobeats King',
    description: 'Burna Boy meets Wizkid - infectious rhythms, global sound',
    defaultGenres: ['Afrobeats', 'Afropop', 'Dancehall'],
    vocalTexturePresets: ['patoisAccent', 'melodicFlow', 'callAndResponse'],
    instrumentationTags: ['log drums', 'shakers', 'guitar riffs']
  },
  emoRapper: {
    id: 'emoRapper',
    name: 'Emo Rapper',
    description: 'Juice WRLD meets Lil Peep - emotional, melodic, guitar-driven',
    defaultGenres: ['Emo Rap', 'Cloud Rap', 'Alternative Hip Hop'],
    vocalTexturePresets: ['autotuned', 'melodicRap', 'emotional'],
    instrumentationTags: ['electric guitar', '808s', 'melancholic melodies']
  },
  hyperpopStar: {
    id: 'hyperpopStar',
    name: 'Hyperpop Star',
    description: '100 gecs meets Charli XCX - chaotic, experimental, maximalist',
    defaultGenres: ['Hyperpop', 'Experimental Pop', 'Electronic'],
    vocalTexturePresets: ['pitched', 'distorted', 'layered'],
    instrumentationTags: ['glitch effects', 'bass drops', 'synth arpeggios']
  },
  latinTrapStar: {
    id: 'latinTrapStar',
    name: 'Latin Trap Star',
    description: 'Bad Bunny meets Rosalía - reggaeton beats, Spanish flair',
    defaultGenres: ['Latin Trap', 'Reggaeton', 'Urban Latino'],
    vocalTexturePresets: ['melodicFlow', 'spanish', 'rhythmic'],
    instrumentationTags: ['dembow rhythm', 'reggaeton drums', 'latin percussion']
  },
  indiePopDreamer: {
    id: 'indiePopDreamer',
    name: 'Indie Pop Dreamer',
    description: 'Clairo meets Beabadoobee - lo-fi, intimate, bedroom pop',
    defaultGenres: ['Indie Pop', 'Bedroom Pop', 'Lo-Fi'],
    vocalTexturePresets: ['breathy', 'soft', 'intimate'],
    instrumentationTags: ['acoustic guitar', 'lo-fi drums', 'reverb']
  },
  drillWarrior: {
    id: 'drillWarrior',
    name: 'Drill Warrior',
    description: 'Pop Smoke meets Central Cee - aggressive, dark, drill beats',
    defaultGenres: ['Drill', 'UK Drill', 'Hip Hop'],
    vocalTexturePresets: ['gritty', 'aggressive', 'monotone'],
    instrumentationTags: ['drill hi-hats', '808 slides', 'dark piano']
  },
  soulVocalist: {
    id: 'soulVocalist',
    name: 'Soul Vocalist',
    description: 'H.E.R. meets Daniel Caesar - soulful, jazzy, emotional',
    defaultGenres: ['Neo-Soul', 'R&B', 'Jazz'],
    vocalTexturePresets: ['soulful', 'runs', 'emotional'],
    instrumentationTags: ['live instruments', 'rhodes piano', 'jazz chords']
  },
  countryPopCrossover: {
    id: 'countryPopCrossover',
    name: 'Country Pop Crossover',
    description: 'Taylor Swift meets Morgan Wallen - storytelling meets pop hooks',
    defaultGenres: ['Country Pop', 'Pop', 'Americana'],
    vocalTexturePresets: ['clean', 'storytelling', 'twang'],
    instrumentationTags: ['acoustic guitar', 'banjo', 'pop production']
  }
};
