import './App.css';
import Board from './BallonGame';
import { createContext, useCallback, useState } from 'react';

//switching toggle url
//https://www.npmjs.com/package/react-toggle-dark-mode
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export const ThemeContext = createContext('light');

const App = () => {
    const [theme, setTheme] = useState('light');
    const [isDarkMode, setDarkMode] = React.useState(false);

    const toggleTheme = () => {
        setDarkMode(!isDarkMode);
        setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="App" id={theme}>
                
                <DarkModeSwitch
                    style={{ marginBottom: '2rem' }}
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    moonColor="#d6d383"
                    sunColor="#fff7e6"
                    size={80}
                    className="toggleSwitch"
                />
                <Board />
            </div>
        </ThemeContext.Provider>
    );
};

export default App;
