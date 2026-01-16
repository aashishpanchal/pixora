import React from 'react';
import {View, Text} from 'react-native';
import {StackScreenProp} from '@/types/router';

type Props = StackScreenProp<'OtpVerify'>;

/* ---------- Component ---------- */
export const OtpVerify = (props: Props) => {
  return (
    <View>
      <Text>OtpVerify Screen</Text>
    </View>
  );
};
