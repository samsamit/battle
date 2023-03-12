import { Button, Flex, Progress, Text } from '@mantine/core';
import React from 'react';
import { BattleAction, BattleCharacter } from '../../types/battleTypes';
import {
  Character,
  getExperiencePercent,
  getPoolPercent,
  isCharacterDead,
  isPlayableCharacter,
} from '../../types/characterTypes';
import BattleActions from './BattleActions';

interface CharacterContainerProps {
  isOnTurn: boolean;
  battleCharacter: BattleCharacter;
  onBattleAction: (action: BattleAction) => void;
}
const CharacterContainer = (props: CharacterContainerProps) => {
  const { battleCharacter, isOnTurn } = props;
  const { character, actionPoints } = battleCharacter;
  const { health, mana } = character;
  const isPlayer = isPlayableCharacter(character);
  return (
    <Flex
      style={{ border: 'solid 1px', padding: 8, borderColor: isOnTurn ? 'green' : 'white' }}
      direction={'column'}
      align="center"
      gap={16}
      w={300}
    >
      <Text>{character.name}</Text>
      {isPlayer && (
        <Flex w="100%" justify={'flex-end'}>
          BA: {actionPoints}
        </Flex>
      )}
      <Text>atk: {character.attackDamage}</Text>
      <Text>hp: {character.health.current}</Text>
      <Progress w={'100%'} color="red" size="lg" value={getPoolPercent(health)} />
      <Progress w={'100%'} color="blue" size="lg" value={getPoolPercent(mana)} />
      {isPlayer && (
        <Progress
          w={'100%'}
          color="yellow"
          size="sm"
          value={getExperiencePercent(character.experience)}
        />
      )}
      {isCharacterDead(character) ? (
        <Text>DEAD!</Text>
      ) : (
        <BattleActions
          disable={!isOnTurn}
          character={character}
          onBattleAction={props.onBattleAction}
        />
      )}
    </Flex>
  );
};

export default CharacterContainer;
