import React from 'react';
import Home from './pages/Home/Home';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
    return (
      <FavoritesProvider>
        <Home />
      </FavoritesProvider>
    );

}

export default App;