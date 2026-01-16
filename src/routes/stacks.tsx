import {RootTab} from './tabs';
import {Splash} from '@/apps/splash';
import {StackParamList} from '@/types/router';
import {Landing, OtpVerify, Signin, Signup} from '@/apps/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Root Stack Router
const Stack = createNativeStackNavigator<StackParamList>();

// RootStack navigator component
export const RootStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      animation: 'fade',
      headerShown: false,
    }}
    initialRouteName="Splash">
    <Stack.Screen name="Signin" component={Signin} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Tabs" component={RootTab} />
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="OtpVerify" component={OtpVerify} />
  </Stack.Navigator>
);
