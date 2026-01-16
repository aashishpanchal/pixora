import type {NavigatorScreenParams} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

// Root Stack Navigation Params List
export type StackParamList = {
  // Auth stack
  Signin: undefined;
  Signup: undefined;
  OtpVerify: {
    email: string;
    hash: string;
  };
  // Public stack
  Landing: undefined;
  Splash: undefined;
  WebContent: {
    type: 'term-condition' | 'privacy-policy' | 'about-us';
  };
  // Private stack
  Tabs: NavigatorScreenParams<TabParamList>;
};

// Root Bottom Navigation Params List
export type TabParamList = {
  Home: undefined;
  Ringtone: undefined;
  Category: undefined;
  Trending: undefined;
  Account: undefined;
};

// Root stack screen props
export type StackScreenProp<Screen extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, Screen>;

// Root bottom tab screen props
export type TabScreenProp<Screen extends keyof TabParamList> =
  BottomTabScreenProps<TabParamList, Screen>;
