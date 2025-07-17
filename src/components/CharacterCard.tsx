import {Input} from '@/components/ui/input.tsx';
import {type Character, CharacterType} from '@/model/character.ts';
import type {ChangeEvent, KeyboardEvent} from 'react';
import {Badge} from '@/components/ui/badge.tsx';
import CharacterCardGem from "@/components/CharacterCardGem.tsx";

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

    function characterStyle() {
        switch (character.type) {
            case CharacterType.ADVERSARY:
                return 'bg-adversary-background';
            case CharacterType.PLAYER:
                return 'bg-player-background';
            default:
                throw new Error(`Unsupported type ${character.type}`);
        }
    }

    return <>
        <div
            className={`w-full p-2 ${character.type === CharacterType.ADVERSARY ? 'bg-adversary-border' : 'bg-player-border'} [clip-path:polygon(5%_0,0_40%,0_60%,5%_100%,95%_100%,100%_60%,100%_40%,95%_0)]`}>
            <div
                className={`w-full flex flex-row gap-2 items-center pl-15 pr-15 p-3 rounded-lg relative cursor-pointer group hover:mt-1 hover:mb-1 text-foreground ${characterStyle()} [clip-path:polygon(5%_0,0_45%,0_55%,5%_100%,95%_100%,100%_55%,100%_45%,95%_0)]`}
                onClick={() => spotlightCharacter(character.id)}>
                <CharacterCardGem color={character.color}></CharacterCardGem>
                {character.editable &&
                    <Input key={character.id} value={character.name} autoFocus={true} onKeyUp={handleKeyUp}
                           onClick={event => event.stopPropagation()}
                           onChange={handleTextChange} onBlur={handleBlur}></Input>}
                {!character.editable && <span className="text-lg font-bold">{character.name}</span>}
                <div
                    className="hidden group-hover:flex flex-row space-between items-center gap-1">
                    <Badge className="rounded-full cursor-pointer px-1 h-5 min-w-5"
                           variant="default"
                           onClick={(event) => {
                               event.stopPropagation();
                               setEditable(true);
                           }}>
                        <img src="icons/pencil.svg" alt="Edit icon" width={10} height={10} className="text-white"/>
                    </Badge>


                    <Badge className="rounded-full cursor-pointer px-1 h-5 min-w-5"
                           variant="destructive"
                           onClick={(event) => {
                               event.stopPropagation();
                               removeCharacter(character.id);
                           }}>
                        <img src="icons/cross.svg" alt="Edit icon" width={10} height={10} className="text-white"/>
                    </Badge>
                </div>
            </div>
        </div>
    </>


}