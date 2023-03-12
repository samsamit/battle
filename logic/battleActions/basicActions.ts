import { Attendees, BattleAction, BattleCharacter } from '../../types/battleTypes';
import { Character, CharacterSpell, Pool } from '../../types/characterTypes';
import { addAttendees } from './characterFunctions';

export const runBattleAction = (
  action: BattleAction,
  attendees: Attendees,
  characters: BattleCharacter[]
): Character[] => {
  const baseCharacters = characters.map((bc) => bc.character);
  if (attendees.source.statuses.includes('DEAD')) return baseCharacters;

  switch (action.type) {
    case 'ATTACK': {
      const newAttendees = handleAttack(attendees);
      return addAttendees(baseCharacters, newAttendees);
    }
    case 'SPELL': {
      const newAttendees = handleSpell(action.spell, attendees);
      return addAttendees(baseCharacters, newAttendees);
    }
    default:
      return baseCharacters;
  }
};

export const handleAttack = ({ source, affected }: Attendees): Attendees => {
  affected.health = setPool(affected.health, source.attackDamage);
  if (affected.health.current === 0) {
    affected.statuses.push('DEAD');
  }
  return { source, affected };
};

export const handleSpell = (spell: CharacterSpell, { source, affected }: Attendees) => {
  source.mana = setPool(affected.health, spell.cost);
  if (source.mana.current >= 0) {
    affected.health = setPool(affected.health, spell.damage);
    if (affected.health.current === 0) {
      affected.statuses.push('DEAD');
    }
    affected.statuses.push(...spell.statuses);
  }
  return { source, affected };
};

const setPool = (pool: Pool, difference: number): Pool => {
  const newCurrent = pool.current - difference;
  if (newCurrent <= 0) {
    pool.current = 0;
  } else {
    pool.current = newCurrent;
  }
  return pool;
};
