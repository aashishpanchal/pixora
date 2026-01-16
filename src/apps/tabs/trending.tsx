import React from 'react';
import {View, Text} from 'react-native';
import {TabScreenProp} from '@/types/router';

type Props = TabScreenProp<'Trending'>;

/* ---------- Component ---------- */
export const Trending = (props: Props) => {
  return (
    <View>
      <Text>Trending Screen</Text>
    </View>
  );
};
