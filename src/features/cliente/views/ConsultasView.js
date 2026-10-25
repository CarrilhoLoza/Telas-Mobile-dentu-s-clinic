import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useConsultasViewModel } from '../viewmodels/ConsultasViewModel';
import { colors } from '../../../theme/colors';
import ConfirmModal from '../../../components/ConfirmModal';

function InfoConsulta({ item }) {
  return (
    <>
      <Text style={styles.cardTitle}>{item.procedimento}</Text>

      <View style={styles.row}>
        <View style={styles.info}>
          <FontAwesome5 name="user-md" size={24} color={colors.textDark} />
          <View style={styles.infoText}>
            <Text style={styles.label}>Dentista</Text>
            <Text style={styles.value}>{item.dentista}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Feather name="clock" size={24} color={colors.textDark} />
          <View style={styles.infoText}>
            <Text style={styles.label}>Horário</Text>
            <Text style={styles.value}>{item.horario}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.info, styles.dateRow]}>
        <FontAwesome5 name="calendar-alt" size={40} color={colors.textDark} />
        <View style={styles.infoText}>
          <Text style={styles.dateLabel}>Data</Text>
          <Text style={styles.date}>{item.data}</Text>
        </View>
      </View>
    </>
  );
}

export default function ConsultasView() {
  const {
    pendentes,
    confirmadas,
    loading,
    error,
    carregarConsultas,
    confirmarConsulta,
    recusarConsulta,
  } = useConsultasViewModel();

  useEffect(() => {
    carregarConsultas();
  }, [carregarConsultas]);

  // { tipo: 'confirmar' | 'recusar', item } ou null
  const [acaoPendente, setAcaoPendente] = useState(null);
  const [processando, setProcessando] = useState(false);

  const fecharModal = () => {
    if (!processando) setAcaoPendente(null);
  };

  const executarAcao = async () => {
    if (!acaoPendente || processando) return;
    setProcessando(true);
    try {
      if (acaoPendente.tipo === 'confirmar') {
        await confirmarConsulta(acaoPendente.item.id);
      } else {
        await recusarConsulta(acaoPendente.item.id);
      }
    } finally {
      setProcessando(false);
      setAcaoPendente(null);
    }
  };

  const isRecusar = acaoPendente?.tipo === 'recusar';

  if (loading && pendentes.length === 0 && confirmadas.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.textDark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultas</Text>
      <Text style={styles.subtitle}>Suas Consultas agendadas</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={carregarConsultas}
            colors={[colors.textDark]}
          />
        }
      >
        {pendentes.map((item) => (
          <View key={item.id} style={styles.card}>
            <InfoConsulta item={item} />

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.refuseButton]}
                onPress={() => setAcaoPendente({ tipo: 'recusar', item })}
                activeOpacity={0.8}
              >
                <Text style={styles.refuseText}>Recusar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => setAcaoPendente({ tipo: 'confirmar', item })}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        {confirmadas.map((item) => (
          <View key={item.id} style={[styles.card, styles.cardConfirmada]}>
            <InfoConsulta item={item} />
          </View>
        ))}

        {pendentes.length === 0 ? (
          <Text style={styles.empty}>Sem Mais Consultas Agendadas</Text>
        ) : null}
      </ScrollView>

      <ConfirmModal
        visible={!!acaoPendente}
        destructive={isRecusar}
        loading={processando}
        title={isRecusar ? 'Recusar consulta?' : 'Confirmar consulta?'}
        message={
          acaoPendente
            ? `${acaoPendente.item.procedimento}\nDentista: ${acaoPendente.item.dentista}\n${acaoPendente.item.data} às ${acaoPendente.item.horario}\n\n${
                isRecusar
                  ? 'Essa ação remove a consulta da sua lista.'
                  : 'Você confirma sua presença nesse horário.'
              }`
            : ''
        }
        confirmLabel={isRecusar ? 'Sim, recusar' : 'Sim, confirmar'}
        cancelLabel="Voltar"
        onConfirm={executarAcao}
        onCancel={fecharModal}
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
    marginBottom: 20,
  },
  error: { color: colors.danger, marginBottom: 12 },
  card: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardConfirmada: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
  },
  cardTitle: {
    fontSize: 25.6,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textLight,
    letterSpacing: 0.77,
    marginBottom: 18,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  info: { flexDirection: 'row', alignItems: 'center' },
  infoText: { marginLeft: 10 },
  label: {
    fontSize: 10,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textLight,
  },
  value: {
    fontSize: 15,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textDark,
  },
  dateRow: { marginTop: 22 },
  dateLabel: {
    fontSize: 13,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textLight,
  },
  date: {
    fontSize: 18,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textDark,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  button: {
    width: '48%',
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refuseButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.brown,
  },
  confirmButton: { backgroundColor: colors.accent },
  refuseText: {
    color: colors.brown,
    fontSize: 15,
    fontFamily: 'Merriweather_700Bold',
  },
  confirmText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Merriweather_700Bold',
  },
  divider: {
    height: 1,
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  empty: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 10,
    fontFamily: 'Merriweather_700Bold',
    marginTop: 4,
  },
});
