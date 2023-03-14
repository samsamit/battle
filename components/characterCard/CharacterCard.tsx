import styled from '@emotion/styled';
import { Flex, Text, Card } from '@mantine/core';
import React from 'react';
import css from 'styled-jsx/css';
import { PlayableCharacter } from '../../types/characterTypes';

interface CharacterCardProps {
  character: PlayableCharacter;
  onCharacterClick: () => void;
  highlight: boolean;
}
const CharacterCard = ({ character, onCharacterClick, highlight }: CharacterCardProps) => {
  return (
    <Card
      onClick={onCharacterClick}
      style={{
        border: highlight ? '2px solid green' : '2px solid transparent',
        cursor: 'pointer',
      }}
    >
      <Flex direction={'column'}>
        <Text size={'lg'}>{character.name}</Text>
        <Text>id: {character.id}</Text>
        <Text>level: {character.level}</Text>
        <Text>maxHealth: {character.health.max}</Text>
        <Text>damage: {character.attackDamage}</Text>
        <Text>experience: {character.experience.current}</Text>
      </Flex>
    </Card>
  );
};

export default CharacterCard;
