import type Character from '@/model/character.ts';
import CharacterCard from '@/components/CharacterCard.tsx';
import {useColors} from '@/lib/hooks/useColors.ts';

interface SpotlightListProps {
    prefix: string;
    characters: Character[];
    setCharacters: (newCharacters: Character[]) => void;
}

export default function SpotlightList({prefix, characters, setCharacters}: SpotlightListProps) {
    const {getNextColor} = useColors();

    function createCharacter() {
        setCharacters([...characters, {
            id: crypto.randomUUID(),
            name: prefix + ' ' + (characters.length + 1),
            color: getNextColor(),
        }]);
    }

    function spotlightCharacter(characterId: string) {
        const charactersCopy = [...characters];
        charactersCopy.sort((a, b) => a.id === characterId ? 1 : b.id === characterId ? -1 : 0);
        setCharacters(charactersCopy);
    }

    function updateCharacter(characterId: string, value: string) {
        const updatedCharacters = [...characters];
        updatedCharacters.find((c) => c.id === characterId)!.name = value;
        setCharacters(updatedCharacters);
    }

    function removeCharacter(characterId: string) {
        const updatedCharacters = characters.filter((c) => c.id !== characterId);
        setCharacters(updatedCharacters);
    }

    return <div className="w-full h-full flex flex-col gap-1 items-center border-1 border-border rounded-2xl p-1">
        {characters.map((character) =>
            <CharacterCard character={character} spotlightCharacter={spotlightCharacter}
                           updateCharacter={updateCharacter} removeCharacter={removeCharacter}></CharacterCard>
        )}
        <span onClick={createCharacter}>+</span>
    </div>;
}