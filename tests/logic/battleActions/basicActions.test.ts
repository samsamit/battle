import { handleAttack } from '../../../logic/battleActions/basicActions';
import { Attendees } from '../../../types/battleTypes';
import { testCharacter, testEnemyCharacter } from '../../testConstants';

describe('Basic battle actions', () => {
  const actionProps: Attendees = {
    source: testCharacter,
    affected: testEnemyCharacter,
  };
  it('handleAttack', () => {
    const attackerDatamge = actionProps.source.attackDamage;
    const enemyCurrentHealth = actionProps.affected.health.current;
    let affected = handleAttack(actionProps).affected;
    expect(affected.health.current).toBe(enemyCurrentHealth - attackerDatamge);
    actionProps.affected = affected;
    affected = handleAttack(actionProps).affected;
    expect(affected.health.current).toBe(enemyCurrentHealth - attackerDatamge * 2);
    expect(affected.health).toBe(testEnemyCharacter.health);
    for (let i = 0; i < 10; i++) {
      affected = handleAttack(actionProps).affected;
      actionProps.affected = affected;
    }
    expect(affected.statuses).toContain('DEAD');
    expect(affected.health.current).toBe(0);
  });

  it('handle poison spell', () => {
    const spellDamage = actionProps.source.spells[0].damage;
    const enemyCurrentHealth = actionProps.affected.health.current;
    const sourceCurrentMana = actionProps.source.mana.current;
    const spellCost = actionProps.source.spells[0].cost;
  });
});
