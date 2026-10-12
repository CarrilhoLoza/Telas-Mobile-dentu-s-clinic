import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  c1: '#6E5430',
  c2: '#8A783F',
  c3: '#BEB48B',
  c4: '#E7E7DB',
  c5: '#F9F9F9',
};

const QUADRANTES = {
  superiorDireito: ['18', '17', '16', '15', '14', '13', '12', '11'],
  superiorEsquerdo: ['21', '22', '23', '24', '25', '26', '27', '28'],
  inferiorDireito: ['48', '47', '46', '45', '44', '43', '42', '41'],
  inferiorEsquerdo: ['31', '32', '33', '34', '35', '36', '37', '38'],
};

function Quadrante({ dentes, denteTratado }) {
  return (
    <View style={styles.quadrante}>
      {dentes.map((dente) => (
        <View
          key={dente}
          style={[styles.tooth, dente === denteTratado && styles.toothSelected]}
        >
          <Text
            style={[
              styles.toothText,
              dente === denteTratado && styles.toothTextSelected,
            ]}
          >
            {dente}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function ProntuarioExpandidoView({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const prontuario = route.params?.prontuario ?? {};

  const procedimento = prontuario.procedimento ?? 'Extração';
  const data = prontuario.data ?? '20/09/2026';
  const status = prontuario.status ?? 'Procedimento concluído';
  const condicao = prontuario.condicao ?? 'Dente 48 parcialmente erupcionado com episódios recorrentes de inflamação.';
  const planejamento = prontuario.planejamento ?? 'Extração de terceiro molar inferior direito.';
  const realizado = prontuario.realizado ?? [
    'Extração realizada após avaliação radiográfica.',
    'Orientações pós-operatórias fornecidas.',
  ];
  const dentista = prontuario.dentista ?? 'Gustavo';
  const denteTratado = prontuario.denteTratado ?? '48';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.c3} />

      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Feather name="chevron-left" size={24} color={COLORS.c5} />
        </TouchableOpacity>

        <Text style={styles.headerLabel}>PLANO SELECIONADO</Text>
        <Text style={styles.headerTitle}>{procedimento}</Text>

        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{data}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Feather name="check" size={16} color={COLORS.c5} />
          </View>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Odontograma</Text>

          <Text style={styles.arcadaLabel}>ARCADA SUPERIOR</Text>
          <View style={styles.arcada}>
            <Quadrante
              dentes={QUADRANTES.superiorDireito}
              denteTratado={denteTratado}
            />
            <View style={styles.midline} />
            <Quadrante
              dentes={QUADRANTES.superiorEsquerdo}
              denteTratado={denteTratado}
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.arcadaLabel}>ARCADA INFERIOR</Text>
          <View style={styles.arcada}>
            <Quadrante
              dentes={QUADRANTES.inferiorDireito}
              denteTratado={denteTratado}
            />
            <View style={styles.midline} />
            <Quadrante
              dentes={QUADRANTES.inferiorEsquerdo}
              denteTratado={denteTratado}
            />
          </View>

          {denteTratado ? (
            <View style={styles.legendRow}>
              <View style={styles.legendDot} />
              <Text style={styles.legendText}>
                Tratado em consulta (dente {denteTratado})
              </Text>
            </View>
          ) : null}
        </View>

        <View style={[styles.infoCard, styles.conditionCard]}>
          <Text style={styles.conditionLabel}>CONDIÇÃO</Text>
          <Text style={styles.infoText}>{condicao}</Text>
        </View>

        <View style={[styles.infoCard, styles.planningCard]}>
          <Text style={styles.planningLabel}>PLANEJAMENTO DO TRATAMENTO</Text>
          <Text style={styles.infoText}>{planejamento}</Text>
        </View>

        <View style={styles.procedureCard}>
          <Text style={styles.cardTitle}>Procedimento realizado</Text>
          {realizado.map((linha) => (
            <Text key={linha} style={styles.procedureText}>
              {linha}
            </Text>
          ))}
        </View>

        <View style={styles.dentistCard}>
          <View style={styles.dentistAvatar}>
            <Text style={styles.dentistInitial}>{dentista.charAt(0)}</Text>
          </View>

          <View>
            <Text style={styles.dentistLabel}>Dentista responsável</Text>
            <Text style={styles.dentistName}>{dentista}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.c4,
  },
  header: {
    backgroundColor: COLORS.c3,
    paddingHorizontal: 24,
    paddingBottom: 26,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(249, 249, 249, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerLabel: {
    color: COLORS.c1,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  headerTitle: {
    color: COLORS.c1,
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    marginTop: 2,
  },
  dateBadge: {
    position: 'absolute',
    right: 24,
    bottom: 30,
    backgroundColor: 'rgba(249, 249, 249, 0.25)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dateText: {
    color: COLORS.c1,
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.c4,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  statusIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.c1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  statusText: {
    color: COLORS.c1,
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  card: {
    backgroundColor: COLORS.c5,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: COLORS.c1,
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 14,
  },
  arcadaLabel: {
    color: COLORS.c2,
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  arcada: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quadrante: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 2,
  },
  midline: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: COLORS.c3,
    marginHorizontal: 4,
  },
  tooth: {
    width: 32,
    height: 42,
    borderRadius: 4,
    backgroundColor: COLORS.c4,
    borderWidth: 1,
    borderColor: COLORS.c3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toothSelected: {
    backgroundColor: COLORS.c2,
    borderColor: COLORS.c1,
  },
  toothText: {
    color: COLORS.c1,
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
  },
  toothTextSelected: {
    color: COLORS.c5,
    fontFamily: 'Inter_700Bold',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.c3,
    marginVertical: 16,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.c2,
    marginRight: 8,
  },
  legendText: {
    color: COLORS.c1,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  infoCard: {
    backgroundColor: COLORS.c5,
    borderRadius: 12,
    padding: 16,
    paddingLeft: 20,
    marginBottom: 16,
  },
  conditionCard: {
    borderLeftWidth: 5,
    borderLeftColor: COLORS.c2,
  },
  conditionLabel: {
    color: COLORS.c2,
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  planningCard: {
    borderLeftWidth: 5,
    borderLeftColor: COLORS.c1,
  },
  planningLabel: {
    color: COLORS.c1,
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  infoText: {
    color: COLORS.c1,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
  },
  procedureCard: {
    backgroundColor: COLORS.c5,
    borderWidth: 1,
    borderColor: COLORS.c3,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  procedureText: {
    color: COLORS.c2,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    marginBottom: 6,
  },
  dentistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.c5,
    borderRadius: 12,
    padding: 16,
  },
  dentistAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.c2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  dentistInitial: {
    color: COLORS.c5,
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  dentistLabel: {
    color: COLORS.c2,
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  dentistName: {
    color: COLORS.c1,
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
});
