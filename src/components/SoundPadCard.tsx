import { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import type { SoundPad } from '../types';

interface SoundPadCardProps {
  pad: SoundPad;
  onFavorite: (id: string, isFavorite: boolean) => void;
  onLongPress: (pad: SoundPad) => void;
  onPlay: (id: string) => void;
}

export function SoundPadCard({ pad, onFavorite, onLongPress, onPlay }: SoundPadCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const player = useAudioPlayer({ uri: pad.audio_url });

  const handlePress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.86, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.06, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();

    player.seekTo(0);
    player.play();
    void onPlay(pad.id);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.favoriteBtn}
        onPress={() => onFavorite(pad.id, pad.is_favorite)}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        <Ionicons
          name={pad.is_favorite ? 'heart' : 'heart-outline'}
          size={20}
          color={pad.is_favorite ? '#FF4444' : '#555555'}
        />
      </TouchableOpacity>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: pad.color }]}
          onPress={handlePress}
          onLongPress={() => onLongPress(pad)}
          delayLongPress={500}
          activeOpacity={0.85}
        />
      </Animated.View>

      <Text style={styles.title} numberOfLines={2}>{pad.title}</Text>
      <Text style={styles.count}>{pad.play_count}×</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minHeight: 150,
  },
  favoriteBtn: {
    alignSelf: 'flex-end',
  },
  button: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginVertical: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 4,
    flex: 1,
  },
  count: {
    fontSize: 11,
    color: '#555555',
    marginTop: 4,
  },
});
