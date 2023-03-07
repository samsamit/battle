import { Button, Flex, Grid } from '@mantine/core';
import React, { useState } from 'react';
import { BattleAction } from '../../types/battleTypes';
import { Character } from '../../types/characterTypes';

type MenuType = 'basic' | 'spells';

interface BattleActionsProps {
  character: Character;
  onBattleAction: (action: BattleAction) => void;
}

const BattleActions = ({ character, onBattleAction }: BattleActionsProps) => {
  const [menu, setMenu] = useState<MenuType>('basic');
  const { spells } = character;

  switch (menu) {
    case 'basic':
      return (
        <Grid w={'100%'}>
          <Grid.Col span={6}>
            <Button w={'100%'} onClick={() => onBattleAction({ type: 'ATTACK' })}>
              Attack
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button w={'100%'} onClick={() => setMenu('spells')}>
              Spells
            </Button>
          </Grid.Col>
        </Grid>
      );
    case 'spells':
      return (
        <Grid w={'100%'}>
          {spells.map((spell) => (
            <Grid.Col span={6}>
              <Button w={'100%'} onClick={() => onBattleAction({ type: 'SPELL', spell: spell })}>
                {spell.name}
              </Button>
            </Grid.Col>
          ))}
          <Grid.Col span={6}>
            <Button w={'100%'} onClick={() => setMenu('basic')}>
              Back
            </Button>
          </Grid.Col>
        </Grid>
      );
  }
};

export default BattleActions;
