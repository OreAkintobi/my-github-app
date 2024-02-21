import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Theme, themes } from './';

const LOCAL_STORAGE_THEME_KEY = 'theme';

interface ThemeContextType {
  color: Theme;
  changeTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>();

  const changeTheme = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    setTheme(storedTheme as Theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ color: theme ?? themes[0], changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
