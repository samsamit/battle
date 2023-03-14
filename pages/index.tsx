import { Container, Title, Flex, Text, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CharacterCard from '../components/characterCard/CharacterCard';
import { testCharacters } from '../constants/testCharacters';
import { PlayableCharacter } from '../types/characterTypes';

export default function HomePage() {
  const [party, setParty] = useState<PlayableCharacter[]>([]);
  const router = useRouter();
  return (
    <Container>
      <Flex direction={'column'} gap={16}>
        <Title>Welcome</Title>
        <Text>Available characters:</Text>
        <Flex gap={16} wrap="wrap">
          {testCharacters.map((character) => {
            const isInParty = party.findIndex((char) => char.id === character.id) >= 0;
            return (
              <CharacterCard
                character={character}
                onCharacterClick={() => {
                  if (isInParty)
                    setParty((prev) => prev.filter((char) => char.id !== character.id));
                  else setParty((prev) => [...prev, character]);
                }}
                highlight={isInParty}
              />
            );
          })}
        </Flex>
        <Text>Current party:</Text>
        <Flex gap={16} wrap="wrap">
          {party.map((character) => (
            <CharacterCard
              character={character}
              onCharacterClick={() => {
                setParty((prev) => prev.filter((char) => char.id !== character.id));
              }}
              highlight={false}
            />
          ))}
        </Flex>
        {party.length > 0 && <Button onClick={() => router.push('/battle')}>Start!</Button>}
      </Flex>
    </Container>
  );
}
