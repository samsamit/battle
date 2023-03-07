import { Container, Flex, Text } from '@mantine/core';
import React from 'react';
import { useBattle } from '../hooks/useBattle';
import { testCharacter, testEnemyCharacter } from '../tests/testConstants';
import { Character } from '../types/characterTypes';
import CharacterContainer from './Battle/CharacterContainer';

const Battle = () => {
  const { characters, runAction } = useBattle([testCharacter, testEnemyCharacter]);
  const userCharacters = characters.filter((character) => character.isUsers);
  const enemyCharacters = characters.filter((character) => !character.isUsers);

  return (
    <Container>
      <Flex h={500} w={'100%'} align="center" justify={'center'} gap={20}>
        <Flex>
          {userCharacters.map((character) => (
            <CharacterContainer
              character={character}
              onBattleAction={(action) =>
                runAction(action, { source: character, affected: enemyCharacters[0] })
              }
            />
          ))}
        </Flex>
        <Text>vs</Text>
        <Flex>
          {enemyCharacters.map((character) => (
            <CharacterContainer
              character={character}
              onBattleAction={(action) =>
                runAction(action, { source: character, affected: userCharacters[0] })
              }
            />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Battle;
