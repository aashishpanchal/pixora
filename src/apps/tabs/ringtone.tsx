import React from 'react';
import {View, Text} from 'react-native';
import {TabScreenProp} from '@/types/router';

type Props = TabScreenProp<'Ringtone'>;

/* ---------- Screen ---------- */
export const Ringtone = (props: Props) => {
  return (
    <View>
      <Text>Ringtone Screen</Text>
    </View>
  );
};
