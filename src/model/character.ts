export interface Character {
    id: string;
    name: string;
    color: string;
    editable: boolean;
    type: CharacterType;
}

export enum CharacterType {
    ADVERSARY = 'Adversary',
    PLAYER = 'Player'
}