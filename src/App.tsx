import SpotlightList from '@/components/SpotlightList.tsx';
import {useState} from 'react';
import type Character from '@/model/character.ts';
import {ColorsProvider} from '@/lib/providers/ColorsProvider.tsx';

function App() {
    const [adversaries, setAdversaries] = useState<Character[]>([]);
    const [players, setPlayers] = useState<Character[]>([]);

    return (
        <div className="w-full h-screen flex flex-row gap-2 p-4">
            <ColorsProvider>
                <SpotlightList prefix='Adversary' characters={adversaries} setCharacters={setAdversaries}></SpotlightList>
                <SpotlightList prefix='Player' characters={players} setCharacters={setPlayers}></SpotlightList>
            </ColorsProvider>
        </div>
    );
}

export default App;
