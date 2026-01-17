import React from 'react';
import {API_URL} from '@/consts/config';
import {Text, View} from 'react-native';
import {StackScreenProp} from '@/types/router';

type Props = StackScreenProp<'WebContent'>;

/* ---------- Screen ---------- */
export const WebContent = ({route}: Props) => {
  const urls = {
    'about-us': `${API_URL}/about`,
    'term-condition': `${API_URL}/terms`,
    'privacy-policy': `${API_URL}/privacy`,
  };

  return (
    <View className="flex-1 bg-background">
      <Text>Web Content</Text>
    </View>
  );
};
