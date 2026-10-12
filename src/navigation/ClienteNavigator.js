import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ConsultasView from '../features/cliente/views/ConsultasView';
import ProntuariosView from '../features/cliente/views/ProntuariosView';
import PerfilView from '../features/cliente/views/PerfilView';
import RedefinirSenhaView from '../features/cliente/views/RedefinirSenhaView';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Perfil" component={PerfilView} />
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenhaView} />
    </Stack.Navigator>
  );
}

export default function ClienteNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 72,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Merriweather_400Regular',
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Consultas"
        component={ConsultasView}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Prontuários"
        component={ProntuariosView}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard-outline" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
