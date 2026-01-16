import React from 'react';
import {View, Text} from 'react-native';
import {StackScreenProp} from '@/types/router';

type Props = StackScreenProp<'Landing'>;

/* ---------- Component ---------- */
export const Landing = (props: Props) => {
  return (
    <View>
      <Text>Landing Screen</Text>
    </View>
  );
};
