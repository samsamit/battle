import { BASE_EXPERIENCE, EXPERIENCE_LEVELUP_MULTIPLER } from '../../constants/battleConstants';
import { Attendees, PlayerParty } from '../../types/battleTypes';
import { Character, isPlayableCharacter, PlayableCharacter } from '../../types/characterTypes';

export const gainExperience = (party: PlayerParty, killedEnemy: Character): PlayerParty => {
  const avgPartyLevel = getPartyAverageLevel(party);
  const baseExperience = party.length * BASE_EXPERIENCE;
  const levelGap = killedEnemy.level - avgPartyLevel;
  const multipler = getExperienceMultipler(levelGap);
  const experience = baseExperience * multipler;
  const newParty = party.map((character) => getNewLevelAndExperience(experience, character));
  return newParty;
};

export const getPartyAverageLevel = (party: PlayerParty) =>
  Math.round(party.map((char) => char.level).reduce((total, lvl) => (total += lvl)) / party.length);

export const getExperienceMultipler = (levelGap: number) =>
  levelGap < 0 ? 1 : 1 + Number((levelGap * 0.1).toPrecision(2));

export const getNewLevelAndExperience = (
  expGain: number,
  character: PlayableCharacter
): PlayableCharacter => {
  const newTotalExperience = character.experience.current + expGain;
  if (newTotalExperience >= character.experience.nextLevel) {
    character.level++;
    character.experience.current = newTotalExperience - character.experience.nextLevel;

    character.experience.nextLevel = getNewNexLevel(character);
    character = getNewLevelAndExperience(0, character);
  } else {
    character.experience.current += expGain;
  }
  return character;
};

export const getNewNexLevel = (character: PlayableCharacter) =>
  character.experience.nextLevel * EXPERIENCE_LEVELUP_MULTIPLER;
