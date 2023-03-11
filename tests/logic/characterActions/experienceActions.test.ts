import {
  gainExperience,
  getExperienceMultipler,
  getNewLevelAndExperience,
  getNewNexLevel,
  getPartyAverageLevel,
} from '../../../logic/characterActions/experienceActions';
import { PlayerParty } from '../../../types/battleTypes';
import {
  getPlayableCharacterWithLevel,
  testCharacter,
  testEnemyCharacter,
} from '../../testConstants';
import { deepCopy } from '../../utils';

describe('gainExperience', () => {
  const party: PlayerParty = [
    getPlayableCharacterWithLevel(1),
    getPlayableCharacterWithLevel(1),
    getPlayableCharacterWithLevel(3),
    getPlayableCharacterWithLevel(3),
  ];

  it('calculates party avg level correctly', () => {
    const avgPartyLevel = getPartyAverageLevel(party);
    expect(avgPartyLevel).toBe(2);
  });
  it('calculates experience multipler correctly', () => {
    const avgPartyLevel = getPartyAverageLevel(party);
    const multipler = getExperienceMultipler(testEnemyCharacter.level - avgPartyLevel);
    expect(multipler).toBe(1.3);
  });
  it('gives correct xp to character', () => {
    const testChar = deepCopy(testCharacter);
    const expGained = 50;
    const expCharacter = getNewLevelAndExperience(expGained, testChar);
    expect(expCharacter.experience.current).toBe(50);
  });
  it('gets correct newNextLevel', () => {
    const testChar = deepCopy(testCharacter);
    const newNextLevel = getNewNexLevel(testChar);
    expect(newNextLevel).toBe(150);
  });
  it('gives character a level up', () => {
    const testChar = deepCopy(testCharacter);
    const expGained = 110;
    const expCharacter = getNewLevelAndExperience(expGained, testChar);
    expect(expCharacter.level).toBe(2);
    expect(expCharacter.experience.current).toBe(10);
  });
  it('gives character multiple levels', () => {
    const testChar = deepCopy(testCharacter);
    const expGained = 260;
    const expCharacter = getNewLevelAndExperience(expGained, testChar);
    expect(expCharacter.level).toBe(3);
    expect(expCharacter.experience.current).toBe(10);
  });
  it('gives party members correct xp and level', () => {
    let testParty = deepCopy(party);
    testParty = gainExperience(testParty, testEnemyCharacter);
    expect(testParty[0].experience.current).toBe(52);
    expect(testParty[1].experience.current).toBe(52);
    expect(testParty[2].experience.current).toBe(52);
    expect(testParty[3].experience.current).toBe(52);
    testParty = gainExperience(testParty, testEnemyCharacter);
    expect(testParty[0].experience.current).toBe(4);
    expect(testParty[1].experience.current).toBe(4);
    expect(testParty[2].experience.current).toBe(4);
    expect(testParty[3].experience.current).toBe(4);
    expect(testParty[0].level).toBe(2);
    expect(testParty[1].level).toBe(2);
    expect(testParty[2].level).toBe(4);
    expect(testParty[3].level).toBe(4);
  });
});
