import { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const EMOJIS = [
  '🎵', '🎶', '🎸', '🎹', '🎺', '🎻', '🥁', '🎤', '🎧', '🎼',
  '😂', '😱', '🤣', '😎', '😤', '🤩', '🥳', '💀', '🤯', '🥹',
  '🐶', '🐱', '🦁', '🐸', '🦊', '🐺', '🦅', '🦋', '🌊', '⚡',
  '💥', '💣', '🔔', '🔥', '💯', '🎯', '🏆', '🚨', '⚠️', '👏',
  '🎉', '🎊', '🌈', '✨', '💫', '⭐', '🚀', '🍕', '🎃', '👻',
];

interface EmojiItemProps {
  emoji: string;
  isSelected: boolean;
  onSelect: () => void;
}

function EmojiItem({ emoji, isSelected, onSelect }: EmojiItemProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.72, duration: 70, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.18, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 70, useNativeDriver: true }),
    ]).start();
    onSelect();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.item, isSelected && styles.itemSelected]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

interface EmojiPickerProps {
  selected: string;
  onSelect: (emoji: string) => void;
}

export function EmojiPicker({ selected, onSelect }: EmojiPickerProps) {
  return (
    <View style={styles.grid}>
      {EMOJIS.map((emoji) => (
        <EmojiItem
          key={emoji}
          emoji={emoji}
          isSelected={emoji === selected}
          onSelect={() => onSelect(emoji)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  item: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  itemSelected: {
    borderColor: '#CC0000',
    backgroundColor: '#2A1010',
  },
  emoji: {
    fontSize: 26,
  },
});
