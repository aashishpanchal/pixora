import React from 'react';
import {View, Text} from 'react-native';
import {TabScreenProp} from '@/types/router';

type Props = TabScreenProp<'Ringtone'>;

/* ---------- Component ---------- */
export const Ringtone = (props: Props) => {
  return (
    <View>
      <Text>Ringtone Screen</Text>
    </View>
  );
};
