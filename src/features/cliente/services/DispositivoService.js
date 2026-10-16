import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import api from '../../../services/api';

/**
 * Registro do aparelho para receber as notificações de consulta.
 *
 * POST /api/paciente-app/dispositivos
 * Body: { tokenPush, plataforma }
 *
 * O token usado é o nativo do Firebase (getDevicePushTokenAsync), e não o
 * token da Expo: o backend envia pelo Firebase Admin, que só entende o
 * primeiro. Por isso também não funciona pelo Expo Go — é preciso um build
 * de desenvolvimento, com o google-services.json do projeto.
 */
export const DispositivoService = {
  async registrar() {
    // Emulador sem Google Play e navegador não têm serviço de notificação.
    if (!Device.isDevice) return { registrado: false, motivo: 'emulador' };

    const permissaoAtual = await Notifications.getPermissionsAsync();
    let concedida = permissaoAtual.granted;

    if (!concedida && permissaoAtual.canAskAgain) {
      const solicitada = await Notifications.requestPermissionsAsync();
      concedida = solicitada.granted;
    }

    if (!concedida) return { registrado: false, motivo: 'permissao-negada' };

    const token = await Notifications.getDevicePushTokenAsync();

    await api.post('/paciente-app/dispositivos', {
      tokenPush: token.data,
      plataforma: Platform.OS === 'ios' ? 'iOS' : 'Android',
    });

    return { registrado: true };
  },
};
