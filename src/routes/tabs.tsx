import {TabParamList} from '@/types/router';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account, Category, Home, Ringtone, Trending} from '@/apps/tabs';

// RootTab navigator
const Tabs = createBottomTabNavigator<TabParamList>();

// RootTab Navigator component.
export const RootTab = () => (
  <Tabs.Navigator
    screenOptions={{
      animation: 'shift',
      headerShown: false,
    }}
    initialRouteName="Home">
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Category" component={Category} />
    <Tabs.Screen name="Ringtone" component={Ringtone} />
    <Tabs.Screen name="Trending" component={Trending} />
    <Tabs.Screen name="Account" component={Account} />
  </Tabs.Navigator>
);
