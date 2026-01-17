import React from 'react';
import {VERSION} from '@/consts';
import {UniImage} from '@/libs/hocs';
import {images} from '@/consts/assets';
import {Text, View} from 'react-native';
import {useUniwind} from '@niibase/uniwind';
import {StackScreenProp} from '@/types/router';

type Props = StackScreenProp<'Splash'>;

/* ---------- Screen ---------- */
export const Splash = (props: Props) => {
  const {theme} = useUniwind();

  const navigate = (ms: number) =>
    setTimeout(() => props.navigation.replace('Landing'), ms);

  React.useEffect(() => {
    const timer = navigate(3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <UniImage
        className="w-[150px] h-[50px]"
        resizeMode="cover"
        source={theme === 'dark' ? images.logoLight : images.logoDark}
      />
      <Text className="absolute bottom-5 text-foreground text-xs font-bold">
        Version: {VERSION}
      </Text>
    </View>
  );
};
