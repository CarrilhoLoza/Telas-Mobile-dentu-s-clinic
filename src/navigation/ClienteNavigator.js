import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import ConsultasView from '../features/cliente/views/ConsultasView';
import ProntuariosView from '../features/cliente/views/ProntuariosView';
import ProntuarioExpandidoView from '../features/cliente/views/ProntuarioExpandidoView';
import PerfilView from '../features/cliente/views/PerfilView';
import RedefinirSenhaView from '../features/cliente/views/RedefinirSenhaView';
import BottomTabBar from '../components/BottomTabBar';
import { DispositivoService } from '../features/cliente/services/DispositivoService';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProntuariosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProntuariosHome" component={ProntuariosView} />
      <Stack.Screen
        name="ProntuarioExpandido"
        component={ProntuarioExpandidoView}
      />
    </Stack.Navigator>
  );
}

function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PerfilHome" component={PerfilView} />
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenhaView} />
    </Stack.Navigator>
  );
}

export default function ClienteNavigator() {
  // Registra o aparelho ao entrar na área autenticada, o que cobre tanto o
  // login normal quanto a entrada logo após definir a senha no primeiro acesso.
  // Falhar aqui não pode impedir o uso do aplicativo.
  useEffect(() => {
    DispositivoService.registrar().catch((erro) => {
      console.warn('Não foi possível registrar o aparelho para notificações:', erro?.message);
    });
  }, []);

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Consultas" component={ConsultasView} />
      <Tab.Screen
        name="Prontuários"
        component={ProntuariosStack}
        options={({ route }) => ({
          tabBarStyle: {
            display:
              getFocusedRouteNameFromRoute(route) === 'ProntuarioExpandido'
                ? 'none'
                : 'flex',
          },
        })}
      />
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
