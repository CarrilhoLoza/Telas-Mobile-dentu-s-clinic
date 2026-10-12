import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import ConsultasView from '../features/cliente/views/ConsultasView';
import ProntuariosView from '../features/cliente/views/ProntuariosView';
import PerfilView from '../features/cliente/views/PerfilView';
import RedefinirSenhaView from '../features/cliente/views/RedefinirSenhaView';
import BottomTabBar from '../components/BottomTabBar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PerfilHome" component={PerfilView} />
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenhaView} />
    </Stack.Navigator>
  );
}

export default function ClienteNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Consultas" component={ConsultasView} />
      <Tab.Screen name="Prontuários" component={ProntuariosView} />
      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
        options={({ route }) => ({
          tabBarStyle: {
            display:
              getFocusedRouteNameFromRoute(route) === 'RedefinirSenha'
                ? 'none'
                : 'flex',
          },
        })}
      />
    </Tab.Navigator>
  );
}
