import { Container, Flex, Text } from '@mantine/core';
import React from 'react';
import { useBattle } from '../hooks/useBattle';
import { testCharacter, testEnemyCharacter } from '../tests/testConstants';
import { BattleCharacter } from '../types/battleTypes';
import CharacterContainer from './Battle/CharacterContainer';

const Battle = () => {
  const { turnNumber, battleCharacters, runAction } = useBattle([
    testCharacter,
    testEnemyCharacter,
  ]);
  const userCharacters = battleCharacters.filter(
    (battleCharacter) => battleCharacter.character.isUsers
  );
  const enemyCharacters = battleCharacters.filter(
    (battleCharacter) => !battleCharacter.character.isUsers
  );

  const isCharacterTurn = (character: BattleCharacter) => {
    const characterIndex = battleCharacters.findIndex(
      (battleCharacter) => battleCharacter.character.id === character.character.id
    );
    return characterIndex === turnNumber;
  };

  return (
    <Container>
      <Flex h={500} w={'100%'} align="center" justify={'center'} gap={20}>
        <Flex>
          {userCharacters.map((character) => (
            <CharacterContainer
              isOnTurn={isCharacterTurn(character)}
              battleCharacter={character}
              onBattleAction={(action) =>
                runAction(action, {
                  source: character.character,
                  affected: enemyCharacters[0].character,
                })
              }
            />
          ))}
        </Flex>
        <Text>vs</Text>
        <Flex>
          {enemyCharacters.map((character) => (
            <CharacterContainer
              isOnTurn={isCharacterTurn(character)}
              battleCharacter={character}
              onBattleAction={(action) =>
                runAction(action, {
                  source: character.character,
                  affected: userCharacters[0].character,
                })
              }
            />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Battle;
