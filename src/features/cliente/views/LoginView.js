import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useLoginViewModel } from '../viewmodels/LoginViewModel';
import FormField from '../../../components/FormField';
import { colors } from '../../../theme/colors';

function ToggleSwitch({ value, onValueChange }) {
  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      style={[
        styles.track,
        value && { backgroundColor: colors.textLight, alignItems: 'flex-end' },
      ]}
    >
      <View
        style={[styles.thumb, value && { backgroundColor: colors.primary }]}
      />
    </Pressable>
  );
}

export default function LoginView({ navigation }) {
  const { email, senha, manterLogado, loading, error, setCampo, entrar } =
    useLoginViewModel();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <FontAwesome5 name="tooth" size={44} color={colors.textDark} />
            <Text style={styles.welcome}>Bem-vindo ao</Text>
            <Text style={styles.brand}>Dentu's Clinic</Text>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <FormField
            label="E-mail"
            value={email}
            onChangeText={(v) => setCampo('email', v)}
            placeholder="usuario@dentusclinic.com"
            keyboardType="email-address"
          />

          <FormField
            label="Senha"
            value={senha}
            onChangeText={(v) => setCampo('senha', v)}
            placeholder="••••••••"
            secure
          />

          <View style={styles.switchRow}>
            <ToggleSwitch
              value={manterLogado}
              onValueChange={(v) => setCampo('manterLogado', v)}
            />
            <Text style={styles.switchText}>Manter Logado</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => entrar(navigation)}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <View style={styles.buttonContent}>
                <Feather name="log-in" size={16} color="#FFF" />
                <Text style={styles.buttonText}>Entrar</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 48,
    shadowColor: colors.textDark,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  header: { alignItems: 'center', marginBottom: 32 },
  welcome: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
  },
  brand: {
    fontSize: 25.6,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textDark,
    letterSpacing: 0.77,
  },
  error: {
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
  },
  track: {
    width: 32,
    height: 16,
    borderRadius: 16,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.textLight,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textLight,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  switchText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.textDark,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonContent: { flexDirection: 'row', alignItems: 'center' },
  buttonText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 15.2,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.6,
  },
});
