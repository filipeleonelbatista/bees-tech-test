import {
    createContext,
    type ReactNode,
    useContext,
    useState,
    useEffect,
} from 'react';
import type { Brewery, UserContextProps } from '../types';

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState('');
    const [isAdult, setIsAdult] = useState(false);
    const [breweryFavorites, setBreweryFavorites] = useState<Brewery[]>([]);
    const [favoritesLoaded, setFavoritesLoaded] = useState(false);    

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                setBreweryFavorites(JSON.parse(savedFavorites));
            } catch (e) {
                console.error('Error during load favorites:', e);
            }
        }
        setFavoritesLoaded(true);

        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                if (parsed.name) setName(parsed.name);
                if (typeof parsed.isAdult === 'boolean') setIsAdult(parsed.isAdult);
            } catch (e) {
                console.error('Error during load user:', e);
            }
        }
    }, []);

    useEffect(() => {
        if (favoritesLoaded) {
            localStorage.setItem('favorites', JSON.stringify(breweryFavorites));
        }
    }, [breweryFavorites, favoritesLoaded]);

    useEffect(() => {
        localStorage.setItem(
            'user',
            JSON.stringify({ name, isAdult })
        );
    }, [name, isAdult]);

    const addFavorite = (brewery: Brewery) => {
        setBreweryFavorites((prev) => {
            if (!prev.some((b) => b.id === brewery.id)) {
                return [...prev, brewery];
            }
            return prev;
        });
    };

    const removeFavorite = (id: string) => {
        setBreweryFavorites((prev) => prev.filter((b) => b.id !== id));
    };

    return (
        <UserContext.Provider
            value={{
                name,
                setName,
                isAdult,
                setIsAdult,
                breweryFavorites,
                addFavorite,
                removeFavorite,
                setBreweryFavorites,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context)
        throw new Error('useUser must be used within a UserProvider');
    return context;
};
