import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts, Merriweather_400Regular, Merriweather_700Bold } from '@expo-google-fonts/merriweather';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

import LoginView from './src/features/cliente/views/LoginView';
import PrimeiroAcessoView from './src/features/cliente/views/PrimeiroAcessoView';
import ClienteNavigator from './src/navigation/ClienteNavigator';
import { sessao } from './src/services/sessao';
import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator();

// Sem isto, uma notificação que chega com o aplicativo aberto não aparece.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/** No Android, a notificação só aparece como faixa na tela se o canal dela
 * tiver importância alta. O canal precisa existir antes de a notificação
 * chegar, por isso é criado na abertura do aplicativo. */
async function criarCanalDeConsultas() {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync('consultas', {
    name: 'Consultas',
    description: 'Avisos de confirmação de consulta',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    sound: 'default',
    enableVibrate: true,
  });
}

export default function App() {
  // null enquanto a sessão guardada ainda está sendo lida: mostrar o login
  // antes disso faria a tela piscar para quem escolheu manter conectado.
  const [telaInicial, setTelaInicial] = useState(null);

  useEffect(() => {
    criarCanalDeConsultas().catch(() => {});
  }, []);

  useEffect(() => {
    sessao
      .ler()
      .then((guardada) => {
        if (guardada) {
          global.authToken = guardada.token;
          global.paciente = guardada.paciente;
        }
        setTelaInicial(guardada ? 'Cliente' : 'Login');
      })
      .catch(() => setTelaInicial('Login'));
  }, []);

  const [fontsLoaded] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded || telaInicial === null) return null;

  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={telaInicial}>
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="PrimeiroAcesso" component={PrimeiroAcessoView} />
        <Stack.Screen name="Cliente" component={ClienteNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
