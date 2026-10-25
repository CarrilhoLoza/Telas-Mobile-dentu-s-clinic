import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Voltar',
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onCancel}
      >
        <View style={styles.box} onStartShouldSetResponder={() => true}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                destructive ? styles.dangerButton : styles.confirmButton,
                loading && { opacity: 0.6 },
              ]}
              onPress={onConfirm}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmText}>
                {loading ? 'Aguarde...' : confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  box: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 22,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Merriweather_700Bold',
    color: colors.textDark,
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Merriweather_400Regular',
    color: colors.textDark,
    lineHeight: 21,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    width: '48%',
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.brown,
  },
  confirmButton: { backgroundColor: colors.accent },
  dangerButton: { backgroundColor: colors.danger },
  cancelText: {
    color: colors.brown,
    fontSize: 15,
    fontFamily: 'Merriweather_700Bold',
  },
  confirmText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Merriweather_700Bold',
  },
});
