import SpotlightList from '@/components/SpotlightList.tsx';
import {useState} from 'react';
import {type Character, CharacterType} from '@/model/character.ts';
import {ColorsProvider} from '@/lib/providers/ColorsProvider.tsx';

function App() {
    const [players, setPlayers] = useState<Character[]>([]);
    const [adversaries, setAdversaries] = useState<Character[]>([]);

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="w-full flex justify-center items-center text-center text-5xl pt-4">
                <h1> GM Spotlight</h1>
            </div>
            <div className="w-full h-full flex flex-row gap-2 p-4">
                <ColorsProvider>
                    <SpotlightList type={CharacterType.ADVERSARY} characters={adversaries}
                                   setCharacters={setAdversaries}></SpotlightList>
                    <SpotlightList type={CharacterType.PLAYER} characters={players}
                                   setCharacters={setPlayers}></SpotlightList>
                </ColorsProvider>
            </div>
        </div>

    );
}

export default App;
