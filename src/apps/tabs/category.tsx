import React from 'react';
import {View, Text} from 'react-native';
import {TabScreenProp} from '@/types/router';

type Props = TabScreenProp<'Category'>;

/* ---------- Component ---------- */
export const Category = (props: Props) => {
  return (
    <View>
      <Text>Category Screen</Text>
    </View>
  );
};
