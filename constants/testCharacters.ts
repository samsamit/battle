import { initializePlayableCharacter } from '../logic/initializeCharacter';
import { PlayableCharacter } from '../types/characterTypes';

export const testCharacters: PlayableCharacter[] = [
  initializePlayableCharacter(0, 'Character 1'),
  initializePlayableCharacter(1, 'Character 2'),
  initializePlayableCharacter(2, 'Character 3'),
  initializePlayableCharacter(3, 'Character 4'),
];
