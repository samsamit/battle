export type CharacterStatus = 'DEAD' | 'POISON';
export interface Pool {
  current: number;
  max: number;
}

export interface Experience {
  current: number;
  nextLevel: number;
}

export interface BaseCharacter {
  id: number;
  level: number;
  name: string;
  attackDamage: number;
  health: Pool;
  mana: Pool;
  statuses: CharacterStatus[];
  spells: CharacterSpell[];
  stats: Stats;
}

export interface Stats {
  initiative: number;
}

export interface PlayableCharacter extends BaseCharacter {
  experience: Experience;
}
export const isPlayableCharacter = (character: Character): character is PlayableCharacter =>
  'experience' in character;

export type UnplayableCharacter = BaseCharacter;
export type Character = UnplayableCharacter | PlayableCharacter;

export interface CharacterSpell {
  name: string;
  damage: number;
  cost: number;
  statuses: Exclude<CharacterStatus, 'DEAD'>[];
}

export const getPoolPercent = (pool: Pool) => (pool.current / pool.max) * 100;
export const getExperiencePercent = (experience: Experience) =>
  (experience.current / experience.nextLevel) * 100;
export const isCharacterDead = (char: Character) => char.statuses.includes('DEAD');
