import { Attendees, BattleCharacter } from '../../types/battleTypes';
import { Character } from '../../types/characterTypes';

export const addAttendees = (characters: Character[], attendees: Attendees) => {
  const restOfTheCharacters = characters.filter(
    (character) => character.id !== attendees.affected.id && character.id !== attendees.source.id
  );
  return [attendees.affected, attendees.source, ...restOfTheCharacters];
};
