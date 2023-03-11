import { basicPoison } from '../constants/spells';
import { PlayableCharacter, UnplayableCharacter } from '../types/characterTypes';

export const testCharacter: PlayableCharacter = {
  id: 0,
  level: 1,
  name: 'testCharacter1',
  attackDamage: 10,
  health: {
    current: 100,
    max: 100,
  },
  mana: {
    current: 100,
    max: 100,
  },
  isUsers: true,
  statuses: [],
  spells: [basicPoison],
  experience: {
    current: 0,
    nextLevel: 100,
  },
};

export const testEnemyCharacter: UnplayableCharacter = {
  id: 1,
  level: 5,
  name: 'testEnemy1',
  attackDamage: 10,
  health: {
    current: 100,
    max: 100,
  },
  mana: {
    current: 100,
    max: 100,
  },
  isUsers: false,
  statuses: [],
  spells: [],
};

export const getPlayableCharacterWithLevel = (level: number): PlayableCharacter => ({
  ...testCharacter,
  level,
});
