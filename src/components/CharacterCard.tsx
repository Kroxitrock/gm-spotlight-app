import {Input} from '@/components/ui/input.tsx';
import type Character from '@/model/character.ts';
import type {KeyboardEvent} from 'react';

interface CharacterCardProps {
    character: Character;
    updateCharacter: (characterId: string, value: string) => void;
    spotlightCharacter: (characterId: string) => void;
    removeCharacter: (characterId: string) => void;
}

export default function CharacterCard({
                                          character,
                                          spotlightCharacter,
                                          updateCharacter,
                                          removeCharacter
                                      }: CharacterCardProps) {
    function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            event.currentTarget.blur();
        }
    }

    return <div className="w-full p-3 rounded-lg relative cursor-pointer" style={{backgroundColor: character.color}}
                onClick={() => spotlightCharacter(character.id)}>
        <span className="absolute top-0 right-0 cursor-pointer"
              onClick={(event) => {
                  event.stopPropagation();
                  removeCharacter(character.id);
              }}>x</span>
        <Input key={character.id} value={character.name} autoFocus={true} onKeyUp={handleKeyUp}
               onClick={event => event.stopPropagation()}
               onChange={(event) => updateCharacter(character.id, event.target.value)}></Input>
    </div>;
}