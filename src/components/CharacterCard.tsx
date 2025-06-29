import {Input} from '@/components/ui/input.tsx';
import type Character from '@/model/character.ts';
import type {ChangeEvent, KeyboardEvent} from 'react';
import {Badge} from '@/components/ui/badge.tsx';

interface CharacterCardProps {
    character: Character;
    updateCharacter: (characterId: string, value: Character) => void;
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
        if (event.key === 'Enter' || event.key === 'Escape') {
            event.currentTarget.blur();
        }
    }

    function handleBlur() {
        setEditable(false);
    }

    function setEditable(editable: boolean) {
        updateCharacter(character.id, {...character, editable});

    }

    function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
        const updatedCharacter = {...character, name: event.target.value};
        updateCharacter(character.id, updatedCharacter);
    }

    return <div className="w-full p-3 rounded-lg relative cursor-pointer group hover:mt-1 hover:mb-1" style={{backgroundColor: character.color}}
                onClick={() => spotlightCharacter(character.id)}>
        <div className="hidden group-hover:flex absolute top-[-5px] right-[-3px]  flex-row space-between items-center gap-1">
            <Badge className="rounded-full cursor-pointer px-1 h-5 min-w-5"
                   variant="default"
                   onClick={(event) => {
                       event.stopPropagation();
                       setEditable(true);
                   }}>
                <img src="public/icons/pencil.svg" alt="Edit icon" width={10} height={10} className="text-white"/>
            </Badge>


            <Badge className="rounded-full cursor-pointer px-1 h-5 min-w-5"
                   variant="destructive"
                   onClick={(event) => {
                       event.stopPropagation();
                       removeCharacter(character.id);
                   }}>
                <img src="public/icons/cross.svg" alt="Edit icon" width={10} height={10} className="text-white"/>
            </Badge>
        </div>

        {character.editable &&
        <Input key={character.id} value={character.name} autoFocus={true} onKeyUp={handleKeyUp}
               onClick={event => event.stopPropagation()}
               onChange={handleTextChange} onBlur={handleBlur}></Input>}
        {!character.editable && <span className="text-lg font-bold">{character.name}</span>}
    </div>;
}