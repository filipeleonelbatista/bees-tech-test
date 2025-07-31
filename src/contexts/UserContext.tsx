import { createContext, type ReactNode, useContext, useState } from 'react';
import type { Brewery, UserContextProps } from '../types';

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState('');
    const [isAdult, setIsAdult] = useState(false);
    const [breweryFavorites, setBreweryFavorites] = useState<Brewery[]>([]);

    const addFavorite = (brewery: Brewery) => {
        setBreweryFavorites(prev => {
            if (!prev.some(b => b.id === brewery.id)) {
                return [...prev, brewery];
            }
            return prev;
        });
    };

    const removeFavorite = (id: string) => {
        setBreweryFavorites(prev => prev.filter(b => b.id !== id));
    };

    return (
        <UserContext.Provider value={{ name, setName, isAdult, setIsAdult, breweryFavorites, addFavorite, removeFavorite }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
