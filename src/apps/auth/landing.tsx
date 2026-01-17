import React from 'react';
import {UniImage} from '@/libs/hocs';
import {WIDTH} from '@/consts/scaling';
import {images} from '@/consts/assets';
import {splitRows} from '@/libs/utils';
import {Marquee} from '@/widgets/marquee';
import {StackScreenProp} from '@/types/router';
import {Text, View, Pressable, StatusBar} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
import LucideIcon from '@react-native-vector-icons/lucide';

type Props = StackScreenProp<'Landing'>;

const SPACING = 8;
const ITEM_SIZE = WIDTH * 0.4;

/* ---------- Screen ---------- */
export const Landing = ({navigation}: Props) => {
  const imgs = React.useMemo(() => splitRows(images.splash, 3), []);

  const onSignup = () => navigation.navigate('Signup');
  const onSignin = () => navigation.navigate('Signin');

  /** Handles Google authentication action. */
  const onGoogle = () => console.log('Google Auth');

  return (
    <View className="flex-1 bg-black overflow-hidden">
      <StatusBar barStyle="light-content" />
      {/* Marquee Section */}
      <View className="flex-1">
        <View
          className="flex-1"
          style={{gap: SPACING, transform: [{rotate: '-4deg'}]}}>
          {imgs.map((column, idx1) => (
            <Marquee
              key={`marquee-${idx1}`}
              speed={0.2}
              spacing={SPACING}
              reverse={idx1 % 2 !== 0}>
              <View style={{flexDirection: 'row', gap: SPACING}}>
                {column.map((img, idx2) => (
                  <Animated.Image
                    key={`img-${idx1}-${idx2}`}
                    source={{uri: img}}
                    entering={
                      idx2 % 2 === 0
                        ? FadeInRight.duration(500).delay(300 * (idx1 + 1))
                        : FadeInLeft.duration(500).delay(300 * (idx1 + 1))
                    }
                    style={{
                      width: ITEM_SIZE,
                      aspectRatio: 1,
                      borderRadius: SPACING,
                    }}
                  />
                ))}
              </View>
            </Marquee>
          ))}
        </View>
        {/* Top Gradient Overlay */}
        <View className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black/85 via-black/45 to-transparent" />
      </View>

      {/* Bottom Section */}
      <View className="items-center px-6 pb-8 gap-2.5" style={{flex: 0.7}}>
        {/* Bottom Gradient Overlay */}
        <View className="absolute -top-24 left-0 right-0 h-32 bg-linear-to-b from-black/5 via-black/85 to-black" />

        <Animated.View
          entering={FadeInDown.duration(400)}
          className="w-[150px] h-[50px]">
          <UniImage
            source={images.logoLight}
            className="w-full h-full"
            resizeMode="cover"
          />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.duration(800)}
          className="text-white text-center text-lg font-bold">
          Explore, Create, Share Ultra 4K Wallpapers Now
        </Animated.Text>

        {/* Buttons */}
        <View className="w-full mt-5" style={{gap: 12}}>
          <Pressable
            onPress={onGoogle}
            className="h-[52px] rounded-xl bg-white flex-row items-center justify-center"
            style={{gap: 10}}>
            <LucideIcon name="chromium" size={20} color="#000" />
            <Text className="text-black text-sm font-semibold">
              Continue with Google
            </Text>
          </Pressable>

          <Pressable
            onPress={onSignup}
            className="h-[52px] rounded-xl bg-transparent border border-white flex-row items-center justify-center"
            style={{gap: 10}}>
            <LucideIcon name="mail" size={20} color="#fff" />
            <Text className="text-white text-sm font-semibold">
              Continue with Email
            </Text>
          </Pressable>

          <View className="flex-row justify-center items-center mt-2">
            <Text className="text-white text-xs font-medium">
              Already got an account?{' '}
            </Text>
            <Pressable onPress={onSignin}>
              <Text className="text-primary text-xs font-bold underline">
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
