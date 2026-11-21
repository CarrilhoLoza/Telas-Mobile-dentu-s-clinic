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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useRedefinirSenhaEsquecidaViewModel } from '../viewmodels/RedefinirSenhaEsquecidaViewModel';
import FormField from '../../../components/FormField';
import { colors } from '../../../theme/colors';

export default function RedefinirSenhaEsquecidaView({ navigation, route }) {
  const { email } = route.params;
  const {
    novaSenha,
    confirmarNovaSenha,
    setNovaSenha,
    setConfirmarNovaSenha,
    loading,
    error,
    redefinirSenha,
  } = useRedefinirSenhaEsquecidaViewModel(email);

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableOpacity
        style={[styles.back, { top: insets.top + 8 }]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.85}
      >
        <Feather name="chevron-left" size={26} color="#FFFBEA" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <FontAwesome5 name="key" size={44} color={colors.textDark} />
            <Text style={styles.brand}>Dentu's Clinic</Text>
          </View>

          <Text style={styles.titulo}>Crie sua nova senha</Text>
          <Text style={styles.texto}>
            Defina uma nova senha para {email}.
          </Text>

          <FormField
            label="Nova Senha"
            value={novaSenha}
            onChangeText={setNovaSenha}
            placeholder="••••••••"
            secure
          />

          <FormField
            label="Confirmar Nova Senha"
            value={confirmarNovaSenha}
            onChangeText={setConfirmarNovaSenha}
            placeholder="••••••••"
            secure
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={() => redefinirSenha(navigation)}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <View style={styles.buttonContent}>
                <Feather name="check" size={16} color={colors.primary} />
                <Text style={styles.buttonText}>Salvar Senha</Text>
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
  },
  back: {
    position: 'absolute',
    left: 16,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 40,
    shadowColor: colors.textDark,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  header: { alignItems: 'center', marginBottom: 20 },
  brand: {
    marginTop: 10,
    fontSize: 25.6,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textDark,
    letterSpacing: 0.77,
  },
  titulo: {
    fontSize: 18,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  texto: {
    fontSize: 13.5,
    fontFamily: 'Inter_400Regular',
    color: colors.textDark,
    marginBottom: 20,
    lineHeight: 20,
  },
  error: { color: colors.danger, marginBottom: 12, fontFamily: 'Inter_400Regular' },
  button: {
    backgroundColor: colors.textDark,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 8,
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
