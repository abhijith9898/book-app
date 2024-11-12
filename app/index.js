import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home from './home';
import borrowed from './borrowed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from './colors';

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'book-open-page-variant' : 'book-outline';
            } else if (route.name === 'Borrowed') {
              iconName = focused ? 'book-check' : 'book-check-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.inactive,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: colors.background,
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={home} 
          options={{ tabBarLabel: 'Home',  headerShown: false, }} 
        />
        <Tab.Screen 
          name="Borrowed" 
          component={borrowed} 
          options={{ tabBarLabel: 'Borrowed', }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
