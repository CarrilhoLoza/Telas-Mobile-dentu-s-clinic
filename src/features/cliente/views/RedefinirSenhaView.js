import React, { useState } from 'react';
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
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { usePerfilViewModel } from '../viewmodels/PerfilViewModel';
import FormField from '../../../components/FormField';
import { colors } from '../../../theme/colors';

export default function RedefinirSenhaView({ navigation }) {
  const { redefinirSenha, error, sucesso } = usePerfilViewModel();

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const atualizar = async () => {
    setLoading(true);
    await redefinirSenha({ senhaAtual, novaSenha, confirmarNovaSenha });
    setLoading(false);
  };

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
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Feather name="chevron-left" size={26} color="#FFFBEA" />
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.header}>
            <FontAwesome5 name="key" size={44} color={colors.textDark} />
            <Text style={styles.brand}>Dentu's Clinic</Text>
          </View>

          <FormField
            label="Senha Atual"
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            placeholder="••••••••"
            secure
          />

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
          {sucesso ? (
            <Text style={styles.sucesso}>Senha atualizada com sucesso.</Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={atualizar}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <View style={styles.buttonContent}>
                <Feather name="refresh-cw" size={16} color={colors.primary} />
                <Text style={styles.buttonText}>Atualizar Senha</Text>
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
  scroll: { flexGrow: 1, paddingHorizontal: 16, paddingTop: 25, paddingBottom: 24 },
  back: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
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
  header: { alignItems: 'center', marginBottom: 28 },
  brand: {
    marginTop: 10,
    fontSize: 25.6,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textDark,
    letterSpacing: 0.77,
  },
  error: { color: colors.danger, marginBottom: 12, fontFamily: 'Inter_400Regular' },
  sucesso: { color: colors.success, marginBottom: 12, fontFamily: 'Inter_400Regular' },
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
