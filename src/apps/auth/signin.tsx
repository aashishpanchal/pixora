import React from 'react';
import {View, Text} from 'react-native';
import {StackScreenProp} from '@/types/router';

type Props = StackScreenProp<'Signin'>;

/* ---------- Component ---------- */
export const Signin = (props: Props) => {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-foreground font-bold">Signin Screen</Text>
    </View>
  );
};
