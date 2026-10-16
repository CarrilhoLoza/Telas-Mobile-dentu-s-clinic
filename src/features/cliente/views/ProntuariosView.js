import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useProntuariosViewModel } from '../viewmodels/ProntuariosViewModel';
import { colors } from '../../../theme/colors';

export default function ProntuariosView({ navigation }) {
  const { prontuarios, paciente, loading, error, carregarProntuarios } =
    useProntuariosViewModel();

  useEffect(() => {
    carregarProntuarios();
  }, [carregarProntuarios]);

  if (loading && prontuarios.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.textDark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={prontuarios}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListHeaderComponent={
          <View>
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
              <Text style={styles.counter}>{prontuarios.length} registros</Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <Text style={styles.footer}>Você está vendo todos os seus registros.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardDate}>
              {item.data}  •  {item.status}
            </Text>
            <Text style={styles.cardTitle}>{item.procedimento}</Text>
            {item.dentista ? (
              <Text style={styles.cardDentista}>Dentista: {item.dentista}</Text>
            ) : null}
            <Text style={styles.cardDescription}>{item.descricao}</Text>

            <TouchableOpacity
              style={styles.documentButton}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ProntuarioExpandido', {
                  prontuario: item,
                })
              }
            >
              <Feather name="file-text" size={14} color={colors.textDark} />
              <Text style={styles.documentText}>{item.documentoTitulo}  ›</Text>
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
    paddingHorizontal: 35,
    paddingTop: 70,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 25.6,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textLight,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Merriweather_400Regular',
    color: colors.textDark,
    marginTop: 4,
  },
  error: { color: colors.danger, marginTop: 12 },
  paciente: {
    fontSize: 15,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textDark,
    marginTop: 28,
  },
  pacienteInfo: {
    fontSize: 11,
    fontFamily: 'Merriweather_400Regular',
    color: colors.textDark,
    marginTop: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textLight,
  },
  counter: {
    fontSize: 11,
    fontFamily: 'Merriweather_400Regular',
    color: colors.textDark,
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
    fontFamily: 'Merriweather_400Regular',
    color: colors.textLight,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textLight,
    marginTop: 8,
  },
  cardDentista: {
    fontSize: 12,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textDark,
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: 'Merriweather_400Regular',
    color: colors.textDark,
    marginTop: 8,
  },
  documentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  documentText: {
    marginLeft: 8,
    fontSize: 11,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textDark,
  },
  footer: {
    fontSize: 10,
    fontFamily: 'Merriweather_400Regular',
    color: colors.textDark,
    marginTop: 6,
  },
});
