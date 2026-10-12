import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useProntuariosViewModel } from '../viewmodels/ProntuariosViewModel';
import { colors } from '../../../theme/colors';

export default function ProntuariosView() {
  const {
    prontuarios,
    paciente,
    loading,
    error,
    carregarProntuarios,
  } = useProntuariosViewModel();

  useEffect(() => {
    carregarProntuarios();
  }, [carregarProntuarios]);

  if (loading && prontuarios.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primaryDark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu prontuário</Text>
      <Text style={styles.subtitle}>
        Seu histórico de cuidados, em um só lugar.
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.paciente}>{paciente?.nome}</Text>
      <Text style={styles.pacienteInfo}>
        Registros compartilhados pela clínica
      </Text>

      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Atendimentos</Text>
        <Text style={styles.counter}>
          {prontuarios.length} registros
        </Text>
      </View>

      <FlatList
        data={prontuarios}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Você está vendo todos os seus registros.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardDate}>
              {item.data} • {item.status}
            </Text>

            <Text style={styles.cardTitle}>{item.procedimento}</Text>
            <Text style={styles.cardDentista}>
              Dentista: {item.dentista}
            </Text>
            <Text style={styles.cardDescription}>{item.descricao}</Text>

            <TouchableOpacity style={styles.documentButton}>
              <Text style={styles.documentText}>
                {item.documentoTitulo} ›
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'Merriweather_700Bold',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textDark,
    marginTop: 4,
    fontFamily: 'Merriweather_400Regular',
  },
  error: {
    color: colors.danger,
    marginTop: 12,
  },
  paciente: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: 32,
    fontFamily: 'Merriweather_700Bold',
  },
  pacienteInfo: {
    fontSize: 11,
    color: colors.textDark,
    marginTop: 3,
    fontFamily: 'Merriweather_400Regular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'Merriweather_700Bold',
  },
  counter: {
    fontSize: 11,
    color: colors.textDark,
    fontFamily: 'Merriweather_400Regular',
  },
  empty: {
    textAlign: 'center',
    color: colors.textDark,
    marginTop: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  cardDate: {
    fontSize: 11,
    color: colors.text,
    fontFamily: 'Merriweather_400Regular',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    fontFamily: 'Merriweather_700Bold',
  },
  cardDentista: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: 8,
    fontFamily: 'Merriweather_700Bold',
  },
  cardDescription: {
    fontSize: 12,
    color: colors.textDark,
    marginTop: 8,
    fontFamily: 'Merriweather_400Regular',
  },
  documentButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  documentText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: 'Merriweather_700Bold',
  },
});
