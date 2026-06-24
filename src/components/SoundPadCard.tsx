import { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
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
  const status = useAudioPlayerStatus(player);

  const handlePress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.86, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.06, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();

    if (status.playing) {
      player.pause();
    } else {
      player.seekTo(0);
      player.play();
      void onPlay(pad.id);
    }
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
          style={[styles.button, status.playing && styles.buttonPlaying]}
          onPress={handlePress}
          onLongPress={() => onLongPress(pad)}
          delayLongPress={500}
          activeOpacity={0.85}
        >
          <Text style={styles.emoji}>{pad.emoji}</Text>
          {status.playing && (
            <View style={styles.playingOverlay}>
              <Ionicons name="pause" size={26} color="rgba(255,255,255,0.95)" />
            </View>
          )}
        </TouchableOpacity>
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
    borderRadius: 20,
    marginVertical: 8,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  buttonPlaying: {
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  emoji: {
    fontSize: 40,
  },
  playingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
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
