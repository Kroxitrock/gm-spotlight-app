import {type ReactNode, useCallback, useState} from 'react';
import {ColorsContext} from '../hooks/useColors';

interface ColorsProviderProps {
    children: ReactNode;
}

export function ColorsProvider({children}: ColorsProviderProps) {
    const [colors] = useState<string[]>(['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD', '#E74C3C', '#2ECC71', '#3498DB', '#9B59B6', '#F39C12']);
    const [currentColor, setCurrentColor] = useState<number>(0);

    const getNextColor = useCallback(() => {
        const nextIndex = (currentColor + 1) % colors.length;
        setCurrentColor(nextIndex);
        return colors[nextIndex];
    }, [currentColor, colors]);

    return (
        <ColorsContext.Provider value={{colors, currentColor, getNextColor}}>
            {children}
        </ColorsContext.Provider>
    );
}