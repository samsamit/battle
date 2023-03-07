import { basicPoison } from '../constants/spells';
import { Character } from '../types/characterTypes';

export const testCharacter: Character = {
  id: 0,
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
};

export const testEnemyCharacter: Character = {
  id: 1,
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
