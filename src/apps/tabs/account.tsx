import React from 'react';
import {View, Text} from 'react-native';
import {TabScreenProp} from '@/types/router';

type Props = TabScreenProp<'Account'>;

/* ---------- Screen ---------- */
export const Account = (props: Props) => {
  return (
    <View>
      <Text>Account Screen</Text>
    </View>
  );
};
