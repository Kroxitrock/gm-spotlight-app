import SpotlightList from '@/components/SpotlightList.tsx';
import {useState} from 'react';
import type Character from '@/model/character.ts';

function App() {
    const [adversaries, setAdversaries] = useState<Character[]>([]);
    const [players, setPlayers] = useState<Character[]>([]);

    return (
        <div className="w-full h-screen flex flex-row gap-2 p-4">
            <SpotlightList characters={adversaries} setCharacters={setAdversaries}></SpotlightList>
            <SpotlightList characters={players} setCharacters={setPlayers}></SpotlightList>
        </div>
    );
}

export default App;
