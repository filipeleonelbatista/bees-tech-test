// Interfaces para componentes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface NavbarProps {
  userName: string;
  onLogout: () => void;
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

interface BadgeProps {
  text: string;
  type: 'micro' | 'zipcode' | 'phone';
}

interface CardProps {
  title: string;
  address?: string;
  location?: string;
  badges?: string[];
  children?: React.ReactNode;
  onAdd?: () => void;
  onRemove?: () => void;
}

// Remove a duplicação de CheckboxProps aqui

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

// Interfaces para contextos e dados
interface Bar {
  id: string;
  name: string;
  address: string;
  location: string;
  badges: Array<{
    text: string;
    type: 'micro' | 'zipcode' | 'phone';
  }>;
}

// Auth Context
interface AuthState {
  isAuthenticated: boolean;
  name: string | null;
  loading?: boolean;
  error?: string | null;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

// Bars Context
interface BarsState {
  savedBars: Bar[];
  loading: boolean;
  error: string | null;
}

interface BarsAction {
  type: string;
  payload?: any;
}

interface BarsContextType {
  state: BarsState;
  dispatch: React.Dispatch<BarsAction>;
}

// Search Context
interface SearchState {
  searchTerm: string;
  searchResults: Bar[];
  loading: boolean;
  error: string | null;
}

interface SearchAction {
  type: string;
  payload?: any;
}

interface SearchContextType {
  searchState: SearchState;
  searchDispatch: React.Dispatch<SearchAction>;
  searchBars: (term: string) => void;
  setSearchTerm: (term: string) => void;
}

export interface Brewery {
  id: string;
  name: string;
  [key: string]: any;
}

interface UserContextProps {
  name: string;
  setName: (name: string) => void;
  isAdult: boolean;
  setIsAdult: (isAdult: boolean) => void;
  breweryFavorites: Brewery[];
  addFavorite: (brewery: Brewery) => void;
  removeFavorite: (id: string) => void;
  setBreweryFavorites: (favorites: Brewery[]) => void;
}