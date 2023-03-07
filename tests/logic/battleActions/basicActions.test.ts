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
    const enemyCurrentHealth = actionProps.affected.currentHealth;
    let affected = handleAttack(actionProps);
    expect(affected.currentHealth).toBe(enemyCurrentHealth - attackerDatamge);
    actionProps.affected = affected;
    affected = handleAttack(actionProps);
    expect(affected.currentHealth).toBe(enemyCurrentHealth - attackerDatamge * 2);
    expect(affected.health).toBe(testEnemyCharacter.health);
    for (let i = 0; i < 10; i++) {
      affected = handleAttack(actionProps);
      actionProps.affected = affected;
    }
    expect(affected.statuses).toContain('DEAD');
    expect(affected.currentHealth).toBe(0);
  });
});
