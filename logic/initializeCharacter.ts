import {
  BASE_ATTACK_DAMAGE,
  BASE_EXPERIENCE_LEVEL,
  BASE_HEALTH,
  BASE_MANA,
  BASE_STATS,
} from '../constants/characterConstants';
import { PlayableCharacter } from '../types/characterTypes';

export const initializePlayableCharacter = (id: number, name: string): PlayableCharacter => {
  const playableCharacter: PlayableCharacter = {
    experience: {
      current: 0,
      nextLevel: BASE_EXPERIENCE_LEVEL,
    },
    id,
    level: 1,
    name,
    attackDamage: BASE_ATTACK_DAMAGE,
    health: BASE_HEALTH,
    mana: BASE_MANA,
    statuses: [],
    spells: [],
    stats: BASE_STATS,
  };
  return playableCharacter;
};
