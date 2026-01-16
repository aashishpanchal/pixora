import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const Providers: React.FC<React.PropsWithChildren> = ({
  children,
}) => <SafeAreaProvider>{children}</SafeAreaProvider>;
