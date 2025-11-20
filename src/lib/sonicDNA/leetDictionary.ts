export interface LeetReference {
  original: string;
  leet: string;
  category: 'artist' | 'album' | 'song' | 'style';
  tags: string[];
}

export const LEET_DICTIONARY: LeetReference[] = [
  // Artists - Trap/R&B
  { original: 'Drake', leet: 'Dr4k3', category: 'artist', tags: ['trap soul', 'emotional', 'rnb'] },
  { original: 'Future', leet: 'FUtUr3', category: 'artist', tags: ['trap', 'autotune', 'atlanta'] },
  { original: 'The Weeknd', leet: 'Th3 W33knd', category: 'artist', tags: ['rnb', 'dark', 'alternative'] },
  { original: 'SZA', leet: '$Z4', category: 'artist', tags: ['rnb', 'alternative', 'soul'] },
  { original: 'Travis Scott', leet: 'Tr4v1$ $c0tt', category: 'artist', tags: ['psychedelic trap', 'autotune'] },
  { original: 'Bryson Tiller', leet: 'Bry$0n T1ll3r', category: 'artist', tags: ['trap soul', 'rnb'] },
  { original: 'PartyNextDoor', leet: 'P4rtyN3xtD00r', category: 'artist', tags: ['rnb', 'ovo', 'dark'] },
  { original: '6LACK', leet: '6L4CK', category: 'artist', tags: ['rnb', 'trap soul', 'moody'] },
  
  // Artists - Pop
  { original: 'Ariana Grande', leet: '4r14n4 Gr4nd3', category: 'artist', tags: ['pop', 'vocals', 'rnb'] },
  { original: 'Dua Lipa', leet: 'Du4 L1p4', category: 'artist', tags: ['pop', 'dance', 'disco'] },
  { original: 'The Weeknd', leet: 'Th3 W33knd', category: 'artist', tags: ['pop', 'rnb', 'synth'] },
  { original: 'Billie Eilish', leet: 'B1ll13 31l1$h', category: 'artist', tags: ['alt pop', 'dark', 'whisper'] },
  { original: 'Olivia Rodrigo', leet: '0l1v14 R0dr1g0', category: 'artist', tags: ['pop rock', 'emotional'] },
  
  // Artists - Afrobeats
  { original: 'Burna Boy', leet: 'BUrn4 B0y', category: 'artist', tags: ['afrobeats', 'afrofusion'] },
  { original: 'Wizkid', leet: 'W1zk1d', category: 'artist', tags: ['afrobeats', 'afropop'] },
  { original: 'Tems', leet: 'T3m$', category: 'artist', tags: ['afrobeats', 'rnb', 'soul'] },
  { original: 'Rema', leet: 'R3m4', category: 'artist', tags: ['afrobeats', 'afrorave'] },
  
  // Artists - Hip Hop
  { original: 'Kendrick Lamar', leet: 'K3ndr1ck L4m4r', category: 'artist', tags: ['hip hop', 'conscious rap'] },
  { original: 'J. Cole', leet: 'J. C0l3', category: 'artist', tags: ['hip hop', 'conscious rap'] },
  { original: 'Lil Baby', leet: 'L1l B4by', category: 'artist', tags: ['trap', 'melodic rap'] },
  { original: 'Gunna', leet: 'GUnn4', category: 'artist', tags: ['trap', 'melodic'] },
  
  // Artists - Emo Rap
  { original: 'Juice WRLD', leet: 'JU1c3 WRLD', category: 'artist', tags: ['emo rap', 'melodic', 'emotional'] },
  { original: 'Lil Peep', leet: 'L1l P33p', category: 'artist', tags: ['emo rap', 'emo', 'punk'] },
  { original: 'XXXTentacion', leet: 'XXXT3nt4c10n', category: 'artist', tags: ['emo rap', 'alternative'] },
  
  // Artists - Hyperpop
  { original: '100 gecs', leet: '100 g3c$', category: 'artist', tags: ['hyperpop', 'experimental'] },
  { original: 'Charli XCX', leet: 'Ch4rl1 XCX', category: 'artist', tags: ['hyperpop', 'pop', 'experimental'] },
  { original: 'Sophie', leet: '$0ph13', category: 'artist', tags: ['hyperpop', 'pc music'] },
  
  // Albums
  { original: 'Take Care', leet: 'T4k3 C4r3', category: 'album', tags: ['drake', 'emotional', 'rnb'] },
  { original: 'Starboy', leet: '$t4rb0y', category: 'album', tags: ['weeknd', 'synth', 'pop'] },
  { original: 'After Hours', leet: '4ft3r H0ur$', category: 'album', tags: ['weeknd', 'synth', '80s'] },
  { original: 'CTRL', leet: 'CTRL', category: 'album', tags: ['sza', 'rnb', 'alternative'] },
  { original: 'Astroworld', leet: '4$tr0w0rld', category: 'album', tags: ['travis scott', 'psychedelic'] },
  
  // Songs (for plot twists)
  { original: 'Hotline Bling', leet: 'H0tl1n3 Bl1ng', category: 'song', tags: ['drake', 'dancehall'] },
  { original: 'Blinding Lights', leet: 'Bl1nd1ng L1ght$', category: 'song', tags: ['weeknd', 'synth'] },
  { original: 'Good Days', leet: 'G00d D4y$', category: 'song', tags: ['sza', 'soul'] },
  { original: 'SICKO MODE', leet: '$1CK0 M0D3', category: 'song', tags: ['travis scott', 'trap'] },
  { original: 'Lucid Dreams', leet: 'LUc1d Dr34m$', category: 'song', tags: ['juice wrld', 'emo'] },
  
  // Styles
  { original: 'Auto-Tune', leet: '4ut0-tUn3', category: 'style', tags: ['vocal effect', 'trap'] },
  { original: 'Falsetto', leet: 'F4l$3tt0', category: 'style', tags: ['vocal technique', 'rnb'] },
  { original: 'Melodic Rap', leet: 'M3l0d1c R4p', category: 'style', tags: ['rap', 'singing'] },
  { original: '808s', leet: '808$', category: 'style', tags: ['drums', 'bass', 'trap'] },
  { original: 'Vocal Runs', leet: 'V0c4l RUn$', category: 'style', tags: ['rnb', 'technique'] },
  { original: 'Ad-libs', leet: '4d-l1b$', category: 'style', tags: ['rap', 'trap', 'vocal'] },
];

/**
 * Translate text to Leet code
 */
export function translateToLeet(input: string): string {
  let result = input;
  LEET_DICTIONARY.forEach(ref => {
    const regex = new RegExp(ref.original, 'gi');
    result = result.replace(regex, ref.leet);
  });
  return result;
}

/**
 * Find Leet references by tags
 */
export function findLeetByTags(tags: string[]): LeetReference[] {
  return LEET_DICTIONARY.filter(ref => 
    ref.tags.some(tag => tags.some(t => tag.toLowerCase().includes(t.toLowerCase())))
  );
}

/**
 * Find Leet references by category
 */
export function findLeetByCategory(category: LeetReference['category']): LeetReference[] {
  return LEET_DICTIONARY.filter(ref => ref.category === category);
}

/**
 * Retrowave Style Translation Map - Converts modern artists to 80s synthwave equivalents
 */
const RETROWAVE_MAP: Record<string, string> = {
  'Drake': 'Dr. Ake (Synthwave Ver)',
  'The Weeknd': 'The W33kend (Retrowave Mix)',
  'SZA': 'S.Z.A. (80s Edit)',
  'Travis Scott': 'Travis Sc0tt (Neon Nights)',
  'Ariana Grande': 'Ariana Grand3 (Vapor Edit)',
  'Future': 'FUtUr3 (Retro Future)',
  'Billie Eilish': 'Billie 31lish (Cyber Dreams)',
  'Dua Lipa': 'Dua Lip4 (Disco Redux)',
  'Burna Boy': 'Burn4 Boy (Afro Synth)',
  'Kendrick Lamar': 'K3ndrick (80s Fusion)',
};

/**
 * Get Retrowave Style - Translates modern artist names into 80s synth-wave equivalents
 * This creates a specific "Retro Mode" capability for Side B variants
 */
export function getRetrowaveStyle(artistName: string): string {
  return RETROWAVE_MAP[artistName] || `${translateToLeet(artistName)} (Retrowave Ver)`;
}
