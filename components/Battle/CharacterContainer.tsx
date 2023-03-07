import { Button, Flex, Progress, Text } from '@mantine/core';
import React from 'react';
import { BattleAction } from '../../types/battleTypes';
import { Character, getPoolPercent, isCharacterDead } from '../../types/characterTypes';
import BattleActions from './BattleActions';

interface CharacterContainerProps {
  character: Character;
  onBattleAction: (action: BattleAction) => void;
}
const CharacterContainer = (props: CharacterContainerProps) => {
  const { character } = props;
  const { health, mana } = character;
  return (
    <Flex direction={'column'} align="center" gap={16} w={300}>
      <Text>{character.name}</Text>
      <Text>atk: {character.attackDamage}</Text>
      <Text>atk: {character.health.current}</Text>
      <Progress w={'100%'} color="red" size="lg" value={getPoolPercent(health)} />
      <Progress w={'100%'} color="blue" size="lg" value={getPoolPercent(mana)} />
      {isCharacterDead(character) ? <Text>DEAD!</Text> : <BattleActions {...props} />}
    </Flex>
  );
};

export default CharacterContainer;
