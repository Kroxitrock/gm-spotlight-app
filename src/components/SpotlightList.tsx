import type Character from '@/model/character.ts';
import {Input} from '@/components/ui/input.tsx';

interface SpotlightListProps {
    characters: Character[];
    setCharacters: (newCharacters: Character[]) => void;
}

export default function SpotlightList({characters, setCharacters}: SpotlightListProps) {
    function createCharacter() {
        console.log('SpotlightList create');
        setCharacters([...characters, {
            id: crypto.randomUUID(),
            name: 'Petar Petrov',
            color: 'blue'
        }]);
    }

    function updateCreature(creature: Character, value: string) {
        const updatedCharacters = [...characters];
        updatedCharacters.find((c) => c.id === creature.id)!.name = value;
        setCharacters(updatedCharacters);
    }

    return <div className="w-full h-full flex flex-col gap-1 items-center border-1 border-border rounded-2xl p-1">
        {characters.map((creature) =>
            <div className="w-full p-1 rounded-lg" style={{backgroundColor: creature.color}}>
                <Input key={creature.id} value={creature.name} autoFocus={true}
                       onChange={(event) => updateCreature(creature, event.target.value)}></Input>
            </div>
        )}
        <span onClick={createCharacter}>+</span>
    </div>;
}