import {type Character, CharacterType} from '@/model/character.ts';
import CharacterCard from '@/components/CharacterCard.tsx';
import {useColors} from '@/lib/hooks/useColors.ts';

interface SpotlightListProps {
    type: CharacterType;
    characters: Character[];
    setCharacters: (newCharacters: Character[]) => void;
}

export default function SpotlightList({type, characters, setCharacters}: SpotlightListProps) {
    const {getNextColor} = useColors();

    function createCharacter() {
        const oldCharacters = characters.map((character) => {
            return {...character, editable: false};
        });
        oldCharacters.push({
            id: crypto.randomUUID(),
            name: type + ' ' + (characters.length + 1),
            color: getNextColor(),
            editable: true,
            type
        })
        setCharacters(oldCharacters);
    }

    function spotlightCharacter(characterId: string) {
        const charactersCopy = [...characters];
        charactersCopy.sort((a, b) => a.id === characterId ? 1 : b.id === characterId ? -1 : 0);
        setCharacters(charactersCopy);
    }

    function updateCharacter(characterId: string, value: Character) {
        const updatedCharacters = [...characters];
        const oldCharacter = updatedCharacters.find((c) => c.id === characterId)!;
        Object.assign(oldCharacter, value);
        setCharacters(updatedCharacters);
    }

    function removeCharacter(characterId: string) {
        const updatedCharacters = characters.filter((c) => c.id !== characterId);
        setCharacters(updatedCharacters);
    }

    return <div className="w-full h-full p-2 bg-border [clip-path:polygon(3%_0,0_3%,0_97%,3%_100%,97%_100%,100%_97%,100%_3%,97%_0)]">
        <div className="w-full h-full overflow-auto flex flex-col gap-2 items-center p-2 bg-background [clip-path:polygon(3%_0,0_3%,0_97%,3%_100%,97%_100%,100%_97%,100%_3%,97%_0)]">
        {characters.map((character) =>
            <CharacterCard character={character} spotlightCharacter={spotlightCharacter}
                           updateCharacter={updateCharacter} removeCharacter={removeCharacter}
                           key={character.id}></CharacterCard>
        )}
        <img onClick={createCharacter} src="icons/plus.svg" className="w-8 cursor-pointer"></img>
        </div>
    </div>;
}