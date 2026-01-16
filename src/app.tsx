import './styles.css';
import React from 'react';
import {AppRouter} from './routes';
import {StatusBar} from 'react-native';
import {useUniwind} from '@niibase/uniwind';
import {Providers} from '@/widgets/provider';

const App: React.FC = () => {
  const {theme} = useUniwind();
  return (
    <Providers>
      <AppRouter />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === 'dark' ? 'dark-content' : 'light-content'}
      />
    </Providers>
  );
};

export default App;
