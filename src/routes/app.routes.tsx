import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';

export function AppRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator();

  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            height: Platform.OS === 'ios' ? 88 : 60,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Screen
          name="Listagem"
          component={Dashboard}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons size={size} color={color} name="format-list-bulleted" />
            ),
          }}
        />

        <Screen
          name="Cadastrar"
          component={Register}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons size={size} color={color} name="attach-money" />
            ),
          }}
        />

        <Screen
          name="Resumo"
          component={Resume}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons size={size} color={color} name="pie-chart" />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
