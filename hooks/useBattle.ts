import { useState } from 'react';
import { handleAttack, handleSpell, runBattleAction } from '../logic/battleActions/basicActions';
import { addAttendees } from '../logic/battleActions/characterFunctions';
import { Attendees, BattleAction, BattleCharacter } from '../types/battleTypes';
import { Character } from '../types/characterTypes';

export const useBattle = (chatracters: Character[]) => {
  const [characters, setCharacters] = useState<BattleCharacter[]>(getBattleCharacters(chatracters));
  const [turnNumber, setTurnNumber] = useState(0);

  const runAction = (action: BattleAction, attendees: Attendees) => {
    setCharacters((prev) => {
      const newBaseCharacters = runBattleAction(action, attendees, prev);
      return getBattleCharacters(newBaseCharacters);
    });
    checkTurn();
  };

  const checkTurn = () => {
    if (characters.length - 1 < turnNumber) setTurnNumber(0);
    if (characters[turnNumber].actionPoints <= 0)
      setTurnNumber((prev) => (prev + 1 > characters.length - 1 ? 0 : prev++));
  };

  return { turnNumber, battleCharacters: characters, runAction };
};

const getBattleCharacters = (characters: Character[]): BattleCharacter[] =>
  characters.map((character) => ({ character, actionPoints: 2 } as BattleCharacter));
