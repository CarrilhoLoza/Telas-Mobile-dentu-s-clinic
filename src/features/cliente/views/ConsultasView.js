import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useConsultasViewModel } from '../viewmodels/ConsultasViewModel';
import { colors } from '../../../theme/colors';

export default function ConsultasView() {
  const {
    consultas,
    loading,
    error,
    carregarConsultas,
    confirmarConsulta,
    recusarConsulta,
  } = useConsultasViewModel();

  useEffect(() => {
    carregarConsultas();
  }, [carregarConsultas]);

  if (loading && consultas.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primaryDark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultas</Text>
      <Text style={styles.subtitle}>Suas consultas agendadas</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={consultas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 24 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={carregarConsultas}
            colors={[colors.primaryDark]}
          />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            Sem mais consultas agendadas.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.procedimento}</Text>

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Dentista</Text>
                <Text style={styles.value}>{item.dentista}</Text>
              </View>

              <View>
                <Text style={styles.label}>Horário</Text>
                <Text style={styles.value}>{item.horario}</Text>
              </View>
            </View>

            <Text style={styles.date}>{item.data}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => recusarConsulta(item.id)}
              >
                <Text style={styles.secondaryButtonText}>Recusar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={() => confirmarConsulta(item.id)}
              >
                <Text style={styles.primaryButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 24,
    fontFamily: 'Merriweather_400Regular',
  },
  error: {
    color: colors.danger,
    marginBottom: 12,
  },
  empty: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '700',
    marginTop: 32,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    fontFamily: 'Merriweather_700Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'Merriweather_700Bold',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: 'Merriweather_700Bold',
  },
  date: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 24,
    fontFamily: 'Merriweather_700Bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primaryDark,
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.primaryDark,
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Merriweather_700Bold',
  },
  secondaryButtonText: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontFamily: 'Merriweather_700Bold',
  },
});
