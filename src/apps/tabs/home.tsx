import React from 'react';
import {View, Text} from 'react-native';
import {TabScreenProp} from '@/types/router';

type Props = TabScreenProp<'Home'>;

/* ---------- Component ---------- */
export const Home = (props: Props) => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};
