import React, { useEffect } from 'react';
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

export default function PerfilView({ navigation }) {
  const {
    perfil,
    loading,
    error,
    sucesso,
    setCampo,
    carregarPerfil,
    salvarPerfil,
    sair,
  } = usePerfilViewModel();

  useEffect(() => {
    carregarPerfil();
  }, [carregarPerfil]);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarIcon}>👤</Text>
      </View>

      <Text style={styles.nome}>{perfil.nome || 'Perfil'}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {sucesso ? (
        <Text style={styles.sucesso}>Perfil atualizado com sucesso.</Text>
      ) : null}

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={perfil.email}
          editable={false}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={perfil.telefone}
          onChangeText={(valor) => setCampo('telefone', valor)}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('RedefinirSenha')}
      >
        <Text style={styles.secondaryButtonText}>Redefinir Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={async () => {
          await sair();
          navigation.replace('Login');
        }}
      >
        <Text style={styles.primaryButtonText}>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={salvarPerfil}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.primaryButtonText}>Salvar</Text>
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    fontSize: 48,
  },
  nome: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    fontFamily: 'Merriweather_700Bold',
  },
  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: 8,
  },
  sucesso: {
    color: colors.success,
    textAlign: 'center',
    marginTop: 8,
  },
  field: {
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    color: '#212529',
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.75,
  },
  secondaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  primaryButton: {
    backgroundColor: colors.primaryDark,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: colors.primaryDark,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});
