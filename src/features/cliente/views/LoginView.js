import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { useLoginViewModel } from '../viewmodels/LoginViewModel';
import { colors } from '../../../theme/colors';

export default function LoginView({ navigation }) {
  const {
    email,
    senha,
    manterLogado,
    loading,
    error,
    setCampo,
    entrar,
  } = useLoginViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcome}>Bem-vindo ao</Text>
        <Text style={styles.brand}>Dentu's Clinic</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="usuario@dentusclinic.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={(valor) => setCampo('email', valor)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={(valor) => setCampo('senha', valor)}
          secureTextEntry
        />

        <View style={styles.switchRow}>
          <Switch
            value={manterLogado}
            onValueChange={(valor) => setCampo('manterLogado', valor)}
          />
          <Text style={styles.switchText}>Manter Logado</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => entrar(navigation)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
    letterSpacing: 1.8,
    fontFamily: 'Inter_400Regular',
  },
  brand: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 32,
    fontFamily: 'Merriweather_700Bold',
  },
  error: {
    color: colors.danger,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    fontFamily: 'Inter_600SemiBold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  switchText: {
    marginLeft: 8,
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.primaryDark,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});
