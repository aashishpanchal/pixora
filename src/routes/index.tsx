import React from 'react';
import {RootStack} from './stacks';
import {NavigationContainer} from '@react-navigation/native';

// App navigation component.
export const AppRouter: React.FC = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);
