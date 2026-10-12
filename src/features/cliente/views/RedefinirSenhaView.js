import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { usePerfilViewModel } from '../viewmodels/PerfilViewModel';
import { colors } from '../../../theme/colors';

export default function RedefinirSenhaView({ navigation }) {
  const { redefinirSenha, error, sucesso } = usePerfilViewModel();

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const atualizar = async () => {
    setLoading(true);
    await redefinirSenha({
      senhaAtual,
      novaSenha,
      confirmarNovaSenha,
    });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.brand}>Dentu's Clinic</Text>

      <Text style={styles.label}>Senha Atual</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={senhaAtual}
        onChangeText={setSenhaAtual}
      />

      <Text style={styles.label}>Nova Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      <Text style={styles.label}>Confirmar Nova Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmarNovaSenha}
        onChangeText={setConfirmarNovaSenha}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {sucesso ? (
        <Text style={styles.sucesso}>Senha atualizada com sucesso.</Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={atualizar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Atualizar Senha</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  back: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  brand: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    color: colors.textDark,
    marginVertical: 32,
    fontFamily: 'Merriweather_700Bold',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    fontFamily: 'Inter_600SemiBold',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  error: {
    color: colors.danger,
    marginBottom: 12,
  },
  sucesso: {
    color: colors.success,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.primaryDark,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});
