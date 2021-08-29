import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';

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
          component={Register}
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
