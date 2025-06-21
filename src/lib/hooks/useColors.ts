import {createContext, useContext} from 'react';


interface ColorsContextType {
    colors: string[];
    currentColor: number;
    getNextColor: () => string;
}

export const ColorsContext = createContext<ColorsContextType | undefined>(undefined);

export function useColors() {
    const context = useContext(ColorsContext);
    if (!context) {
        throw new Error('useColors must be used within a ColorsProvider');
    }
    return context;
}
