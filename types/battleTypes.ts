import { Character, CharacterSpell } from './characterTypes';

export type BattleAction = BasicAction | SpellAction;
export interface BasicAction {
  type: 'ATTACK';
}
export interface SpellAction {
  type: 'SPELL';
  spell: CharacterSpell;
}

export interface Attendees {
  source: Character;
  affected: Character;
}
