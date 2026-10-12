import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

const ICONS = {
  Consultas: 'calendar',
  Prontuários: 'clipboard',
  Perfil: 'user',
};

export default function BottomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  // Esconde a barra em telas internas (ex.: Redefinir Senha)
  if (focusedOptions.tabBarStyle?.display === 'none') return null;

  return (
    <View style={[styles.bar, { height: 86 + insets.bottom }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const icon = ICONS[route.name] || 'circle';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} style={styles.item} onPress={onPress}>
            {focused ? (
              <>
                <View style={styles.notch}>
                  <View style={styles.circle}>
                    <Feather name={icon} size={24} color="#000000" />
                  </View>
                </View>
                <Text style={styles.label}>{route.name.toLowerCase()}</Text>
              </>
            ) : (
              <Feather
                name={icon}
                size={24}
                color="#000000"
                style={{ marginTop: 25 }}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'visible',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  notch: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -26,
  },
  circle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: 'Merriweather_400Regular',
    color: colors.textLight,
  },
});
