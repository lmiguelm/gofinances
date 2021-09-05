import React from 'react';
import { Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MaterialIcons } from '@expo/vector-icons';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';
import { Signin } from '../screens/Signin';

import { useTheme } from 'styled-components';
import { useAuth } from '../hooks/useAuth';

export function AppRoutes() {
  const TabNavigator = createBottomTabNavigator();
  const StackNavigator = createNativeStackNavigator();

  const { colors } = useTheme();
  const { isLogged } = useAuth();

  if (!isLogged) {
    return (
      <NavigationContainer>
        <StackNavigator.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <StackNavigator.Screen name="Signin" component={Signin} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <TabNavigator.Navigator
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
        <TabNavigator.Screen
          name="Listagem"
          component={Dashboard}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons size={size} color={color} name="format-list-bulleted" />
            ),
          }}
        />

        <TabNavigator.Screen
          name="Cadastrar"
          component={Register}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons size={size} color={color} name="attach-money" />
            ),
          }}
        />

        <TabNavigator.Screen
          name="Resumo"
          component={Resume}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons size={size} color={color} name="pie-chart" />
            ),
          }}
        />
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
}
