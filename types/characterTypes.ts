export type CharacterStatus = 'DEAD' | 'POISON';
export interface Pool {
  current: number;
  max: number;
}

export interface Character {
  id: number;
  name: string;
  attackDamage: number;
  health: Pool;
  mana: Pool;
  isUsers: boolean;
  statuses: CharacterStatus[];
  spells: CharacterSpell[];
}

export interface CharacterSpell {
  name: string;
  damage: number;
  cost: number;
  statuses: Exclude<CharacterStatus, 'DEAD'>[];
}

export const getPoolPercent = (pool: Pool) => (pool.current / pool.max) * 100;
export const isCharacterDead = (char: Character) => char.statuses.includes('DEAD');
