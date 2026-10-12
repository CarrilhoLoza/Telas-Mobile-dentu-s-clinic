import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { usePerfilViewModel } from '../viewmodels/PerfilViewModel';
import { colors } from '../../../theme/colors';

function EditableField({ label, value, editing, onToggle, onChangeText, keyboardType }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>

      <View style={styles.group}>
        <TextInput
          style={[styles.input, !editing && styles.inputDisabled]}
          value={value}
          editable={editing}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />

        <Pressable style={styles.addon} onPress={onToggle} hitSlop={6}>
          <Feather
            name={editing ? 'check' : 'edit-2'}
            size={20}
            color="#000000"
          />
        </Pressable>
      </View>
    </View>
  );
}

export default function PerfilView({ navigation }) {
  const { width } = useWindowDimensions();
  const avatar = Math.min(234, width * 0.58);

  const { perfil, error, sucesso, setCampo, carregarPerfil, salvarPerfil, sair } =
    usePerfilViewModel();

  const [editEmail, setEditEmail] = useState(false);
  const [editTelefone, setEditTelefone] = useState(false);

  useEffect(() => {
    carregarPerfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nome = perfil.nome || global.paciente?.nome || '';
  const email = perfil.email || global.paciente?.email || '';
  const telefone = perfil.telefone || global.paciente?.telefone || '';

  const alternar = async (editando, setEditando) => {
    if (editando) await salvarPerfil();
    setEditando(!editando);
  };

  const sairDoApp = async () => {
    try {
      await sair();
    } catch (e) {
      // sem back-end ainda: segue para o login mesmo assim
    }

    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] })
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.avatar,
          { width: avatar, height: avatar, borderRadius: avatar / 2 },
        ]}
      >
        <FontAwesome5 name="user-alt" size={avatar * 0.47} color={colors.textDark} />

        <View style={styles.editBadge}>
          <Feather name="edit-2" size={18} color="#000" />
        </View>
      </View>

      <Text style={styles.nome}>{nome}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {sucesso ? (
        <Text style={styles.sucesso}>Perfil atualizado com sucesso.</Text>
      ) : null}

      <EditableField
        label="Email"
        value={email}
        editing={editEmail}
        onChangeText={(v) => setCampo('email', v)}
        onToggle={() => alternar(editEmail, setEditEmail)}
        keyboardType="email-address"
      />

      <EditableField
        label="Telefone"
        value={telefone}
        editing={editTelefone}
        onChangeText={(v) => setCampo('telefone', v)}
        onToggle={() => alternar(editTelefone, setEditTelefone)}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary, marginTop: 28 }]}
        onPress={() => navigation.navigate('RedefinirSenha')}
        activeOpacity={0.85}
      >
        <Feather name="lock" size={16} color="#FFF" />
        <Text style={styles.buttonText}>Redefinir Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.brown, marginTop: 20 }]}
        onPress={sairDoApp}
        activeOpacity={0.85}
      >
        <Feather name="log-out" size={16} color="#FFF" />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 40, paddingTop: 66, paddingBottom: 32 },
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 47,
    height: 47,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nome: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textLight,
    letterSpacing: 0.77,
    marginTop: 14,
    marginBottom: 20,
  },
  error: { color: colors.danger, textAlign: 'center', marginBottom: 8 },
  sucesso: { color: colors.success, textAlign: 'center', marginBottom: 8 },
  field: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: colors.formLabel,
    marginBottom: 8,
  },
  group: { flexDirection: 'row', height: 40 },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#212529',
  },
  inputDisabled: { backgroundColor: colors.inputDisabled },
  addon: {
    width: 59,
    backgroundColor: colors.addon,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: colors.inputBorder,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 8,
  },
  buttonText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 15.2,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.6,
  },
});
