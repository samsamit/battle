import { useState } from 'react';
import { handleAttack, handleSpell } from '../logic/battleActions/basicActions';
import { addAttendees } from '../logic/battleActions/characterFunctions';
import { Attendees, BattleAction } from '../types/battleTypes';
import { Character } from '../types/characterTypes';

export const useBattle = (chatracters: Character[]) => {
  const [characters, setCharacters] = useState<Character[]>(chatracters);
  const runAction = (action: BattleAction, attendees: Attendees) => {
    if (attendees.source.statuses.includes('DEAD')) return;
    switch (action.type) {
      case 'ATTACK': {
        const newAttendees = handleAttack(attendees);
        setCharacters((prev) => addAttendees(prev, newAttendees));
        break;
      }
      case 'SPELL': {
        const newAttendees = handleSpell(action.spell, attendees);
        setCharacters((prev) => addAttendees(prev, newAttendees));
        break;
      }
    }
  };

  return { characters, runAction };
};
