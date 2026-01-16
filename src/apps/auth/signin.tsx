import React from 'react';
import {View, Text} from 'react-native';
import {StackScreenProp} from '@/types/router';

type Props = StackScreenProp<'Signin'>;

/* ---------- Component ---------- */
export const Signin = (props: Props) => {
  return (
    <View>
      <Text>Signin Screen</Text>
    </View>
  );
};
