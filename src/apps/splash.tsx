import React from 'react';
import {Text, View} from 'react-native';
import {StackScreenProp} from '@/types/router';

type Props = StackScreenProp<'Splash'>;

/* ---------- Component ---------- */
export const Splash = (props: Props) => {
  return (
    <View>
      <Text>Splash Screen</Text>
    </View>
  );
};
